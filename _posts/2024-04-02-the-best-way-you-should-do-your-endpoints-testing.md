---
title: The best way you should do your endpoints testing 
author: piotr
date: 2024-04-02 21:40:00 +0200
categories: [Testing]
tags: [spring boot, spring framework, rest, tests]
pin: false
---

What is worse than missing tests? Incorrectly written tests. They can give us a false impression of safety.

Once upon a time I had a situation when I've broke all the application endpoint by upgrading version of one of used libraries and I was not aware of that at all... 

All tests passed...

What happened there?

Let's take a look how endpoints tests were written.

## Sample controller

First, let's create a dummy controller which will return information about two users:

```java
@RestController
class UserController {

    @GetMapping("/users")
    public List<User> listAllUsers() {
        return List.of(
                new User(1L, "Walter", "White"),
                new User(2L, "Jesse", "Pinkman")
        );
    }
}
```
{: file='UserController.java'}

An user record is pretty simple, but enough to see the possible problem:

```java
public record User (
        Long id,
        String firstName,
        String lastName
) {
    // empty by design
}
```
{: file='User.java'}

## Testing with mapping into POJOs

Now we can take a look how the tests were written in the mentioned project:

```java
@SpringBootTest(webEnvironment = RANDOM_PORT)
class UserControllerPojoTest {

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void shouldListAllUsers() {
        List<User> expectedUsers = List.of(
                new User(1L, "Walter", "White"),
                new User(2L, "Jesse", "Pinkman")
        );

        List<User> users =
                given()
                    .contentType(APPLICATION_JSON_VALUE)
                .when()
                    .get("/users")
                .then()
                    .statusCode(OK.value())
                    .contentType(APPLICATION_JSON_VALUE)
                    .extract().as(new TypeRef<>() {});

        assertEquals(expectedUsers, users);
    }
}
```
{: file='UserControllerPojoTest.java'}

The above test is perfectly valid and will be green after running:

![UserControllerPojoTest#shouldListAllUsers test passed](/assets/img/posts/001-endpoints-testing-1.png){: .normal width="400"}

## Comparing entire JSONs

But it also can be written in a bit different manner:

```java
@WebMvcTest
class UserControllerJsonTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldListAllUsers() throws Exception {

        // when
        mockMvc.perform(
                    get("/users")
                        .contentType(APPLICATION_JSON)
                )

                // then
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().json("""
                        [
                            {
                                "id": 1,
                                "firstName": "Walter",
                                "lastName": "White"
                            },
                            {
                                "id": 2,
                                "firstName": "Jesse",
                                "lastName": "Pinkman"
                            }
                        ]
                        """, true));
    }
}
```
{: file='UserControllerJsonTest.java'}

and it will pass as well:

![UserControllerJsonTest#shouldListAllUsers test passed](/assets/img/posts/001-endpoints-testing-2.png){: .normal width="400"}

Now, let's add one annotation to the `User` entity:

```java
@JsonNaming(SnakeCaseStrategy.class)
public record User (
        Long id,
        String firstName,
        String lastName
) {
    // empty by design
}
```
{: file='User.java with different JSON fields naming strategy'}

and rerun both tests:

![UserControllerJsonTest#shouldListAllUsers test failed](/assets/img/posts/001-endpoints-testing-3.png){: .normal width="400"}

What just happened? Why is one test green and the other red?

Let's look at the information from the failed test:

```
MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json"]
     Content type = application/json
             Body = [
                      {
                      	"id": 1,
                      	"first_name": "Walter",
                      	"last_name": "White"
                      },
                      {
                      	"id":2,
                      	"first_name": "Jesse",
                      	"last_name": "Pinkman"
                      }
                    ]
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: [0]
Expected: firstName
     but none found
 ; [0]
Expected: lastName
     but none found
 ; [0]
Unexpected: first_name
 ; [0]
Unexpected: last_name
 ; [1]
Expected: firstName
     but none found
 ; [1]
Expected: lastName
     but none found
 ; [1]
Unexpected: first_name
 ; [1]
Unexpected: last_name
```
{: file='an output of the failed test'}

If we take a look at the response body, we will see the effect of the added `@JsonNaming` annotation. 
The naming of the fields has actually been changed from camelCase to snake_case. 
So the `UserControllerJsonTest#shouldListAllUsers` test failed correctly.
Why the `UserControllerPojoTest#shouldListAllUsers` passed?

## What happened?

The secret lies in this piece of code (or what is actually used underneath it):

```java
        List<User> users =
                    // some code omitted
                    .extract().as(new TypeRef<>() {});

        assertEquals(expectedUsers, users);
```
{: file='UserControllerPojoTest.java'}

Under the hood, RestAssured uses the same object mapper that Spring uses to serialize to JSON strings in endpoints.
So the `@JsonNaming(SnakeCaseStrategy.class)` annotation affects both equally and the test passes.
The test passes, reassuring us that everything is working properly and that we have not broken anything.
Sadly, this is a lie! Any service that uses our API will stop working.

Of course, the case with the `@JsonNaming` annotation is just an example. 
The configuration that caused a problem in the project I was involved in was a bit more complex. 
Unfortunately, I do not have the code for it and have not been able to reproduce the situation. 
However, as you can see, the problem exists.

And that's why I strongly encourage the use of raw JSON in endpoint testing:

```java
                // some code omitted
                .andExpect(content().json("""
                        [
                            {
                                "id": 1,
                                "firstName": "Walter",
                                "lastName": "White"
                            },
                            {
                                "id": 2,
                                "firstName": "Jesse",
                                "lastName": "Pinkman"
                            }
                        ]
                        """, true));
```
{: file='UserControllerJsonTest.java'}

I know that sometimes the JSONs can be huge. That is the only small drawback. 
On the other hand, with raw JSONs, we get an extra benefit - tests that are **great, living documentation** of our endpoints.

So... this is the Way.

You can find the entire sample code on [our GitHub](https://github.com/hvb-software/valuable-endpoints-tests/tree/main).

Code using `@JsonNaming(SnakeCaseStrategy.class)` is on the [`snake_case` branch](https://github.com/hvb-software/valuable-endpoints-tests/tree/snake_case).

## Appendix: _jsonPath_

During the post review, [Jakub](/#jakub-prądzyński) rightly pointed out to me that I did not mention about an alternative for comparing entire JSONs which is the [`jsonPath` matcher](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/test/web/servlet/result/MockMvcResultMatchers.html#jsonPath(java.lang.String,java.lang.Object...)).

With `jsonPath`, the above test might look like this:

```java
    @Test
    void shouldListAllUsersWithJsonPaths() throws Exception {

        // when
        mockMvc.perform(
                    get("/users")
                        .contentType(APPLICATION_JSON)
                )

                // then
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].firstName", is( "Walter")))
                .andExpect(jsonPath("$[0].lastName", is("White")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].firstName", is("Jesse")))
                .andExpect(jsonPath("$[1].lastName", is("Pinkman")));
    }
```
{: file='UserControllerJsonPathsTest.java'}

Overall, I'm not a big fan of this approach. It looks a bit ugly and does not protect us from omitting certain fields, which is enforced when comparing entire JSONs in strict mode.

But that doesn't mean I don't use the `jsonPath` matcher at all. It's useful, especially when I have some untested legacy endpoints that return huge JSONs with a lot of hard to mock generators, and I'm taking the first steps to introduce tests.

In this case, comparing whole JSONs is hard to do at first. But it is nice to introduce asserts for at least the most important fields.
