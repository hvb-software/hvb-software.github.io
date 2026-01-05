export const siteLinks = {
    googleForm: "https://forms.gle/SmSXKuZiD3nK2Hsf6",
    socials: {
        linkedin: "https://www.linkedin.com/in/jakubpradzynski/",
        twitter: "https://x.com/HVB_software",
        github: "https://github.com/hvb-software",
    }
};

export const siteImages = {
    logo: "images/hvb_software_logo.jpeg",
    portfolio: {
        jiroai: "images/projects/jiroai_pl.png",
        homedecorator: "images/projects/homedecoratorai_com.png",
        programistanaswoim: "images/projects/programistanaswoim_pl.png",
        przegladai: "images/projects/przegladai_news.png",
    },
    people: {
        jakub: "images/people/jakub_pradzynski.jpg",
        piotr: "images/people/piotr_pradzynski.jpg",
    },
};

export const translations = {
    pl: {
        seo: {
            home: {
                title: "HVB.software - tworzymy inteligentne oprogramowanie w duchu AI-First",
                description: "HVB.software: specjalizujemy się w tworzeniu oprogramowania w podejściu AI-first. Projektujemy innowacyjne aplikacje i automatyzujemy procesy biznesowe przy użyciu narzędzi no-code jak n8n."
            },
            whyAI: {
                title: "Podejście AI-first - innowacja i przewaga | HVB.software",
                description: "Poznaj korzyści płynące z podejścia AI-first. Zyskaj innowacyjność, efektywność i przewagę konkurencyjną dzięki dedykowanym rozwiązaniom AI od HVB.software."
            },
            services: {
                title: "Usługi AI - rozwój, integracje, automatyzacje | HVB.software",
                description: "Oferujemy kompleksowe usługi AI: tworzenie oprogramowania AI-first, integracje z istniejącymi systemami, szkolenia dla zespołów oraz automatyzację procesów z n8n."
            },
            portfolio: {
                title: "Nasze projekty i realizacje AI | HVB.software",
                description: "Przeglądaj nasze portfolio zrealizowanych projektów AI, w tym inteligentnego asystenta JiroAI.pl i innowacyjną platformę HomeDecoratorAI.com."
            },
            aboutUs: {
                title: "O nas - poznaj zespół HVB.software",
                description: "Poznaj założycieli HVB.software, Jakuba i Piotra Prądzyńskich. Dowiedz się więcej o naszym doświadczeniu w technologiach AI, Java, Kotlin, Spring i nie tylko."
            },
            contact: {
                title: "Skontaktuj się z nami | HVB.software",
                description: "Masz pomysł na projekt AI? Skontaktuj się z nami, aby omówić szczegóły. Wypełnij formularz kontaktowy, a nasz zespół odezwie się do Ciebie."
            }
        },
        nav: {
            about: "Dlaczego AI-first?",
            services: "Usługi",
            portfolio: "Portfolio",
            aboutUs: "O nas",
            contact: "Kontakt",
        },
        hero: {
            headline: "HVB.software",
            subheadline: "Tworzymy oprogramowanie w oparciu o AI",
            description: "Projektujemy i wdrażamy innowacyjne rozwiązania oparte na sztucznej inteligencji. Automatyzujemy procesy biznesowe, wykorzystując elastyczne narzędzia no-code, takie jak n8n, aby dostarczać realne korzyści dla Twojej firmy.",
            contact_button: "Bezpłatna konsultacja",
        },
        whyAI: {
            title: "Dlaczego podejście AI-first to przyszłość?",
            description: "Wdrażanie sztucznej inteligencji na etapie projektowania pozwala budować inteligentne i wydajne rozwiązania. Zyskaj przewagę konkurencyjną dzięki produktom, które uczą się i adaptują do potrzeb rynku.",
            points: [
                { title: "Nieograniczone innowacje", text: "Projektuj produkty, które dynamicznie uczą się i adaptują do zmieniających się potrzeb użytkowników, otwierając nowe możliwości biznesowe.", icon: "lightbulb" },
                { title: "Maksymalna efektywność", text: "Automatyzuj powtarzalne zadania i optymalizuj kluczowe procesy, aby maksymalnie oszczędzać czas i zasoby Twojej firmy.", icon: "speed" },
                { title: "Zdecydowana przewaga rynkowa", text: "Wyróżnij się na tle konkurencji, dostarczając unikalną wartość i funkcjonalności, niedostępne w tradycyjnych systemach.", icon: "workspace_premium" },
            ],
        },
        services: {
            title: "Nasze usługi",
            items: [
                { title: "Rozwój oprogramowania AI-first", text: "Projektujemy i tworzymy dedykowane aplikacje (w tym agentowe) od podstaw, wykorzystując najnowsze modele i technologie AI, aby idealnie odpowiadały Twoim celom biznesowym.", icon: "developer_mode" },
                { title: "Integracje z systemami AI", text: "Modernizujemy Twoje obecne systemy, integrując je z zaawansowanymi rozwiązaniami AI, co zwiększa ich możliwości i wydajność.", icon: "integration_instructions" },
                { title: "Szkolenia i warsztaty AI", text: "Wyposażamy Twój zespół w wiedzę i praktyczne umiejętności, pozwalające w pełni wykorzystać potencjał sztucznej inteligencji w codziennej pracy.", icon: "school" },
                { title: "Automatyzacja procesów biznesowych", text: "Analizujemy, optymalizujemy i automatyzujemy przepływy pracy. Łączymy aplikacje i usługi za pomocą elastycznych narzędzi no-code, takich jak n8n, aby usprawnić działanie Twojej firmy.", icon: "hub" },
                { title: "Rozwój w standardowych technologiach", text: "Projektujemy i tworzymy oprogramowanie wykorzystując technologie, w których mamy wieloletnie doświadczenie, takich jak Java/Kotlin, Spring, MongoDB, ElasticSearch, React, Flutter oraz GCP.", icon: "terminal" }
            ],
        },
        portfolio: {
            title: "Nasze projekty",
            projects: [
                { name: "ProgramistaNaSwoim.pl", url: "https://programistanaswoim.pl", description: "Notatnik samozatrudnionego programisty... po swojemu.", imageId: "programistanaswoim", action: "link" },
                { name: "PrzeglądAI.news", url: "https://przegladai.news", description: "Newsletter - Twój przewodnik w świecie AI.", imageId: "przegladai", action: "link" },
                {
                    name: "JiroAI.pl",
                    url: "https://jiroai.pl",
                    description: "Inteligentny asystent AI ułatwiający prowadzenie firmy w Polsce.",
                    imageId: "jiroai",
                    action: "contact"
                },
                {
                    name: "HomeDecoratorAI.com",
                    url: "https://homedecoratorai.com",
                    description: "Platforma AI do aranżacji wnętrz, która pozwala wyszukiwać produkty na podstawie inspirujących zdjęć.",
                    imageId: "homedecorator",
                    action: "contact"
                },
            ],
            image_placeholder: "Zrzut ekranu aplikacji",
            visit_button: "Zobacz projekt",
            contact_cta: "Jesteś zainteresowany demo?",
        },
        aboutUs: {
            title: "O nas",
            people: [
                {
                    name: "Jakub Prądzyński",
                    title: "Founder",
                    email: "jakub@hvb.software",
                    imageId: "jakub",
                    socials: {
                        linkedin: "https://www.linkedin.com/in/jakubpradzynski/",
                        twitter: "https://x.com/jakubpradzynski",
                        github: "https://github.com/jakubpradzynski",
                    },
                    description: "Od stażysty do Engineering Managera w największej platformie e-commerce w Polsce - Allegro. Wcześniej miałem okazje współ-organizować meeting Toruń JUG, współ-prowadzić zajęcia na Uniwersytecie Mikołaja Kopernika w Toruniu czy pracować w Software House.\n\nObecnie jestem liderem zespołu wdrażającego rozwiązania głównie bazujące na najnowszych technologiach AI dla selling partnerów Allegro.\nWcześniej, jako Senior Software Engineer, tworzyłem mikroserwisy w Kotlinie (lub Javie) i Springu, korzystając z bazy MongoDB i udogodnień GCP. Duża część pracy opierała się również na działaniach Big Data np. w Apache Spark.\n\nPrywatnie gram w golfa, kibicuję Manchesterowi United i jeżdzę motocyklem :)",
                },
                {
                    name: "Piotr Prądzyński",
                    title: "Founder",
                    email: "piotr@hvb.software",
                    imageId: "piotr",
                    socials: {
                        linkedin: "https://www.linkedin.com/in/prondzyn/",
                        twitter: "https://x.com/prondzyn",
                        github: "https://github.com/prondzyn",
                    },
                    description_part1: "Z zawodowym programowaniem jestem związany od 2009 roku. Pracowałem dla software house'ów, dużych korporacji i startupów. Zarówno w monolitach, jak i mikroserwisach.\n\nObecnie pracuje nad rozwiązaniami głosowymi AI. Doświadczony w backendach, pisanych w Javie (lub Kotlinie) i Spring Boot. Lubię Elasticsearch. Jestem otwarty na nowe wyzwania i technologie.\n\nZałożyciel ",
                    description_link_text: "ProgramistaNaSwoim.pl",
                    description_link_url: "https://programistanaswoim.pl",
                    description_part2: ".\n\nPrywatnie fan LEGO, Gwiezdnych Wojen, świata fantasy Wiedźmina i Manchesteru United.",
                }
            ]
        },
        contact: {
            title: "Porozmawiajmy o Twoich potrzebach",
            subtitle: "Masz pomysł na innowacyjną aplikację AI lub chcesz usprawnić procesy w swojej firmie? Wypełnij formularz, aby umówić się na bezpłatną konsultację.",
            form: {
                send_button: "Skontaktuj się z nami",
            },
            email_contact: "Lub skontaktuj się z nami pod adresem ",
            email_address: "hi@hvb.software",
        },
        footer: {
            rights: "Wszelkie prawa zastrzeżone.",
        }
    },
    en: {
        seo: {
            home: {
                title: "HVB.software - building intelligent AI-first software",
                description: "HVB.software: We specialize in AI-first software development. We design innovative applications and automate business processes using no-code tools like n8n."
            },
            whyAI: {
                title: "The AI-first approach - innovation & advantage | HVB.software",
                description: "Discover the benefits of an AI-first approach. Gain innovation, efficiency, and a competitive edge with custom AI solutions from HVB.software."
            },
            services: {
                title: "AI services - development, integration, automation | HVB.software",
                description: "We offer comprehensive AI services: AI-first software development, integration with existing systems, team training, and process automation with n8n."
            },
            portfolio: {
                title: "Our AI projects & implementations | HVB.software",
                description: "Explore our portfolio of completed AI projects, including the JiroAI.pl intelligent assistant and the innovative HomeDecoratorAI.com platform."
            },
            aboutUs: {
                title: "About us - Meet the HVB.software team",
                description: "Meet the founders of HVB.software, Jakub and Piotr Prądzyński. Learn more about our experience in AI, Java, Kotlin, Spring, and more."
            },
            contact: {
                title: "Contact us | HVB.software",
                description: "Have an idea for an AI project? Contact us to discuss the details. Fill out the contact form, and our team will get in touch with you."
            }
        },
        nav: {
            about: "Why AI-first?",
            services: "Services",
            portfolio: "Portfolio",
            aboutUs: "About us",
            contact: "Contact",
        },
        hero: {
            headline: "HVB.software",
            subheadline: "Building the Future with AI",
            description: "We design and implement innovative solutions powered by Artificial Intelligence. We automate business processes using flexible no-code tools like n8n to deliver tangible benefits for your company.",
            contact_button: "Get a Free Consultation",
        },
        whyAI: {
            title: "Why is AI-first the future?",
            description: "Integrating AI from the design phase allows you to build smarter, more efficient solutions. Gain a competitive edge with products that learn and adapt to market needs.",
            points: [
                { title: "Limitless innovation", text: "Design products that dynamically learn and adapt to changing user needs, unlocking new business opportunities.", icon: "lightbulb" },
                { title: "Maximum efficiency", text: "Automate repetitive tasks and optimize key processes to save your company's valuable time and resources.", icon: "speed" },
                { title: "Decisive market advantage", text: "Stand out from the competition by delivering unique value and features unavailable in traditional systems.", icon: "workspace_premium" },
            ],
        },
        services: {
            title: "Our services",
            items: [
                { title: "AI-first software development", text: "We design and build custom AI applications (including agentic systems) from the ground up, using the latest AI models and technologies to perfectly match your business goals.", icon: "developer_mode" },
                { title: "AI system integrations", text: "We modernize your current systems by integrating them with advanced AI solutions, boosting their capabilities and performance.", icon: "integration_instructions" },
                { title: "AI training & workshops", text: "We equip your team with the knowledge and practical skills to fully leverage the potential of artificial intelligence in their daily work.", icon: "school" },
                { title: "Business process automation", text: "We analyze, optimize, and automate workflows. We connect applications and services using flexible no-code tools like n8n to streamline your business operations.", icon: "hub" },
                { title: "Standard technology development", text: "We design and build software using technologies in which we have many years of experience, such as Java/Kotlin, Spring, MongoDB, ElasticSearch, React, Flutter, and GCP.", icon: "terminal" }
            ],
        },
        portfolio: {
            title: "Our portfolio",
            projects: [
                { name: "ProgramistaNaSwoim.pl", url: "https://programistanaswoim.pl", description: "Self-employed programmer's notebook... my way.", imageId: "programistanaswoim", action: "link" },
                { name: "PrzeglądAI.news", url: "https://przegladai.news", description: "Newsletter - Your guide in the world of AI.", imageId: "przegladai", action: "link" },
                {
                    name: "JiroAI.pl",
                    url: "https://jiroai.pl",
                    description: "An intelligent AI assistant that simplifies running a business in Poland.",
                    imageId: "jiroai",
                    action: "contact"
                },
                {
                    name: "HomeDecoratorAI.com",
                    url: "https://homedecoratorai.com",
                    description: "An AI platform for interior design that lets you find products based on inspirational photos.",
                    imageId: "homedecorator",
                    action: "contact"
                },
            ],
            image_placeholder: "Screenshot of the application",
            visit_button: "View Project",
            contact_cta: "Interested in a demo?",
        },
        aboutUs: {
            title: "About us",
            people: [
                {
                    name: "Jakub Prądzyński",
                    title: "Founder",
                    email: "jakub@hvb.software",
                    imageId: "jakub",
                    socials: {
                        linkedin: "https://www.linkedin.com/in/jakubpradzynski/",
                        twitter: "https://x.com/jakubpradzynski",
                        github: "https://github.com/jakubpradzynski",
                    },
                    description: "From an intern to an Engineering Manager at Poland's largest e-commerce platform - Allegro. Previously, I had the opportunity to co-organize the Toruń JUG meeting, co-lead classes at Nicolaus Copernicus University in Toruń, and work in a Software House.\n\nCurrently, I lead a team implementing solutions mainly based on the latest AI technologies for Allegro's selling partners.\nPreviously, as a Senior Software Engineer, I created microservices in Kotlin (or Java) and Spring, using MongoDB and GCP. A large part of the work was also based on Big Data activities, e.g., in Apache Spark.\n\nPrivately, I play golf, support Manchester United, and ride a motorcycle :)",
                },
                {
                    name: "Piotr Prądzyński",
                    title: "Founder",
                    email: "piotr@hvb.software",
                    imageId: "piotr",
                    socials: {
                        linkedin: "https://www.linkedin.com/in/piotrpradzynski/",
                        twitter: "https://x.com/piotrpradzynski",
                        github: "https://github.com/piotrpradzynski",
                    },
                    description_part1: "I have been involved in professional programming since 2009. Worked for software houses, large corporations and startups. Both in monoliths and microservices.\n\nCurrently working on AI voice solutions. Experienced in backends, written in Java (or Kotlin) and Spring Boot. Enjoys Elasticsearch. Open to new challenges and technologies.\n\nFounder of the ",
                    description_link_text: "ProgramistaNaSwoim.pl",
                    description_link_url: "https://programistanaswoim.pl",
                    description_part2: ".\n\nPrivately, a fan of LEGO, Star Wars, The Witcher fantasy world, and Manchester United.",
                }
            ]
        },
        contact: {
            title: "Let's talk about your needs",
            subtitle: "Have an idea for an innovative AI application or want to improve your business processes? Fill out the form to schedule a free consultation.",
            form: {
                send_button: "Contact Us",
            },
            email_contact: "Or contact us at ",
            email_address: "hi@hvb.software",
        },
        footer: {
            rights: "All rights reserved.",
        }
    },
};