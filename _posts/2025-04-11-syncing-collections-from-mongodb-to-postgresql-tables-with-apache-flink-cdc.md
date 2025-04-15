---
title: Syncing collections from MongoDB to PostgreSQL tables with Apache Flink CDC
author: piotr
date: 2025-04-14 21:40:00 +0100
categories: [Development]
tags: [apache flink, cdc, postgresql, mongodb]
pin: false
---

Recently I’ve struggled a lot with preparing working example of Apache Flink CDC job synchronizing collections from MongoDB into PostgreSQL tables.

I've faced some obstacles, lacks in documentation and issues with versions incompatibility but finally I have something working.

As there is no much examples on the Internet, I've decided to share my results and a few comments to help you with potential issues.

## The purpose and the solution

What I wanted to achieve was preparing a CDC job which will be constantly syncing changes from specified MongoDB collections into a separate PostgreSQL tables.

The below code is fulfilling its purpose, but please keep in mind, that I'm quite fresh with Apache Flink CDC, so it could not be the best possible way to do.

## Sample code

The hearth of the job is basically a class with a main method:

```java
package software.hvb.apache.flink.cdc.example;

import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.api.connector.sink2.Sink;
import org.apache.flink.cdc.connectors.base.options.StartupOptions;
import org.apache.flink.cdc.connectors.mongodb.source.MongoDBSource;
import org.apache.flink.cdc.debezium.JsonDebeziumDeserializationSchema;
import org.apache.flink.connector.jdbc.JdbcConnectionOptions.JdbcConnectionOptionsBuilder;
import org.apache.flink.connector.jdbc.JdbcSink;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.functions.ProcessFunction;
import org.apache.flink.util.Collector;
import org.apache.flink.util.OutputTag;
import software.hvb.apache.flink.cdc.example.extract.MongoOperation;
import software.hvb.apache.flink.cdc.example.extract.MongoOperationExtractor;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;


public class SyncMongoToPostgresJob {

    public static void main(String[] args) throws Exception {

        // helping configuration and mappings
        // from MongoDB collections to PostgreSQL tables

        var mongoDatabase = "mongo_database";
        var mongoCollections = List.of("collectionABC", "collectionDEF");

        var collectionToDocumentKeyPath = Map.of(
            mongoCollections.get(0), "_id",
            mongoCollections.get(1), "_id.value"
        );

        var collectionToTable = Map.of(
            mongoCollections.get(0), "table_abc_cdc",
            mongoCollections.get(1), "table_def_cdc"
        );

        var extractor = new MongoOperationExtractor();

        try (StreamExecutionEnvironment environment = 
                StreamExecutionEnvironment.getExecutionEnvironment()) {

            // initial stream settings
            var stream = environment
                .enableCheckpointing(5000)
                .fromSource(
                    createSource(mongoDatabase, mongoCollections),
                    WatermarkStrategy.noWatermarks(),
                    "Source-MongoDB"
                )
                .setParallelism(2)
                // processor which route documents based on collection name
                // or pass data without collection name to the default sink
                .process(new ProcessFunction<String, String>() {

                    @Override
                    public void processElement(
                        String value,
                        ProcessFunction<String, String>.Context ctx,
                        Collector<String> out
                    ) {
                        try {
                            // add tag with collection name to route the stream
                            ctx.output(
                                createTag(extractor.extractCollectionName(value)), 
                                value
                            );
                        } catch (Exception ex) {
                            // route other data to the default sink
                            out.collect(value);
                        }
                    }
                });

            mongoCollections.forEach(
                collection -> {
                	// setup to properly extract document key as it can be nested
                    String documentKeyPath = collectionToDocumentKeyPath.get(collection);
                    String postgresTable = collectionToTable.get(collection);
                    stream
                        // connect sink to stream based on collection name
                        .getSideOutput(createTag(collection))
                        .map(operation -> extractor.extract(operation, documentKeyPath))
                        .sinkTo(createSink(postgresTable))
                        .name("Sink-PostgreSQL: " + postgresTable)
                        .setParallelism(1);
                }
            );

            // set print to stdout as default sink
            // in theory should never happen
            stream.print();

            environment.execute(
                "Syncing collections from MongoDB to PostgreSQL tables: " 
                    + mongoCollections
            );
        }
    }

    private static MongoDBSource<String> createSource(
        String database, List<String> collections
    ) {
        return MongoDBSource.<String>builder()
            .hosts("host.docker.internal:27017")
            .username("root")
            .password("password")
            .connectionOptions("authSource=admin")
            .collectionList(
                collections.stream()
                    .map(collection -> database + "." + collection)
                    .toArray(String[]::new)
            )
            .deserializer(new JsonDebeziumDeserializationSchema())
            .startupOptions(StartupOptions.initial())
            .build();
    }

    private static OutputTag<String> createTag(String id) {
        return new OutputTag<>(id) {
            // empty by design
        };
    }

    private static Sink<MongoOperation> createSink(String tableName) {
        return JdbcSink.<MongoOperation>builder()
            .withQueryStatement(
                "INSERT INTO " + tableName +
                "  (document_key, operation_time, operation_type, document) " +
                "VALUES " + 
                "  (?, ?, ?, ?::JSONB) " +
                "ON CONFLICT (document_key, operation_time, operation_type) " +
                "   DO UPDATE SET document = EXCLUDED.document::JSONB",
                (statement, operation) -> {
                    statement.setString(1, operation.getDocumentKey());
                    statement.setTimestamp(2, new Timestamp(
                        operation.getTimestampMs() != null 
                            ? operation.getTimestampMs() : 0
                    ));
                    statement.setString(3, operation.getType());
                    statement.setObject(4, operation.getDocument());
                }
            )
            .buildAtLeastOnce(
                new JdbcConnectionOptionsBuilder()
                    .withUrl("jdbc:postgresql://host.docker.internal:5433/postgres")
                    .withDriverName("org.postgresql.Driver")
                    .withUsername("postgres")
                    .withPassword("mysecretpassword")
                    .build()
            );
    }
}
```

The second necessary class is extractor which extracts data from raw JSON string into Java object. This is rather a thing which depends on your specific preferences and approach. Treat it as a generic sample.

In my case I've decided to store every change in MongoDB as a separate entry event in PostgreSQL table.

```java
package software.hvb.apache.flink.cdc.example.extract;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.NullNode;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.Serializable;

import static org.apache.commons.lang3.ObjectUtils.firstNonNull;
import static org.apache.commons.lang3.ObjectUtils.isEmpty;

@Slf4j
public class MongoOperationExtractor implements Serializable {

    private final ObjectMapper objectMapper = new ObjectMapper();

    // Worked on Mongo 5.0.6 change events
    // https://www.mongodb.com/docs/v5.0/reference/change-events/
    public MongoOperation extract(String json, String documentKeyPath) throws IOException {

        log.info("Raw JSON to extract from: {}", json);

        JsonNode rootNode = objectMapper.readTree(json);

        JsonNode clusterTimeTextNode = rootNode.get("clusterTime");
        Long clusterTimeMs = (clusterTimeTextNode != NullNode.instance)
                ? objectMapper.readTree(clusterTimeTextNode.asText()).get("$timestamp").get("t").asLong() * 1000
                : null;
        Long eventProcessedTimeMs = rootNode.get("ts_ms").asLong();

        JsonNode documentTextNode = rootNode.get("fullDocument");
        String document = (documentTextNode != NullNode.instance)
                ? objectMapper.readTree(documentTextNode.asText()).toString()
                : null;

        JsonNode documentKeyNode = objectMapper.readTree(rootNode.get("documentKey").asText());
        for (String s : documentKeyPath.split("\\.")) {
            documentKeyNode = documentKeyNode.get(s);
        }
        // When operation is "delete" then there is no document provided.
        String documentKey = documentKeyNode != null ? documentKeyNode.asText() : null;

        return MongoOperation.builder()
                .database(rootNode.get("ns").get("db").asText())
                .collection(extractCollectionName(rootNode))
                .documentKey(documentKey)
                // In some case cluster time will be absent
                // so I'm taking event processed time in those cases.
                // Be careful with that as those time depends on system time. 
                .timestampMs(firstNonNull(clusterTimeMs, eventProcessedTimeMs))
                // The absence of cluster time means that this is the initial snapshot insert
                // instead of a normal insert and I'm marking it as "snapshot".
                .type(isEmpty(clusterTimeMs) ? "snapshot" : rootNode.get("operationType").asText())
                .document(document)
                .build();
    }

    public String extractCollectionName(String json) throws Exception {
        return extractCollectionName(objectMapper.readTree(json));
    }

    private static String extractCollectionName(JsonNode node) {
        return node.get("ns").get("coll").asText();
    }
}
```

Last but not least is docker compose file to prepare all necessary services. 

I'm attaching it as I had some issues with connecting everything together and I hope it will be helpful for you.

```yaml
version: "2.2"
services:
  jobmanager:
    image: flink:1.19.1-java11
    command: jobmanager
    environment:
      - |
        FLINK_PROPERTIES=
        jobmanager.rpc.address: jobmanager
        parallelism.default: 2
    ports:
      - "8181:8081"
  taskmanager:
    image: flink:1.19.1-java11
    depends_on:
      - jobmanager
    command: taskmanager
    scale: 1
    environment:
      - |
        FLINK_PROPERTIES=
        jobmanager.rpc.address: jobmanager
        taskmanager.numberOfTaskSlots: 8
        parallelism.default: 2
  mongo:
    image: bitnami/mongodb:5.0.6-debian-10-r35
    environment:
      - MONGODB_ROOT_PASSWORD=password
      - MONGODB_USERNAME=mongo
      - MONGODB_PASSWORD=password
      - MONGODB_DATABASE=voicebot
      - MONGODB_REPLICA_SET_MODE=primary
      - MONGODB_REPLICA_SET_NAME=rs0
      - MONGODB_REPLICA_SET_KEY=replicaPassWd
      - MONGODB_ADVERTISED_HOSTNAME=localhost
    volumes:
      - ./mongo/data/mongodb:/bitnami/mongodb
      - ./mongo/rs-initiate.js:/docker-entrypoint-initdb.d/rs-initiate.js:ro
    networks:
      - internal-network
    ports:
      - "27017:27017"
  postgres:
    image: postgres:14.2
    environment:
      - POSTGRES_PASSWORD=mysecretpassword
    volumes:
      - ./postgres/data:/var/lib/postgresql/data
    ports:
      - "5433:5432"

```

You can find the entire sample project in [a dedicated repository on our GitHub](https://github.com/hvb-software/apache-flink-cdc-example).

## Troubleshooting

In addition to the aforementioned problems with connecting to running services, the most unobvious issue which I faced was taking correct Maven dependency version and incompatibilities between them. Additionally, even when I found all the necessary libraries compatible with each other, Apache Flink runtime was still showing errors with lacking of some classes which directed me again to incompatibility in Maven dependencies. Few hours later, after some tries and failes, lots of sweat and several curses I've realized that I have to have exactly the same version of Apache Flink runtime and Apache Flink library dependencies. In my case I've finished at version 1.19.1.

## If you need help, just ask

I did not find much examples on this topic while I was working on this, so I understand you can have some troubles or questions. Do not hesitate to ask in comments bellow if you need any help.