
import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const siteLinks = {
  googleForm: "https://forms.gle/SmSXKuZiD3nK2Hsf6",
  socials: {
    linkedin: "https://www.linkedin.com/in/jakubpradzynski/",
    twitter: "https://x.com/HVB_software",
    github: "https://github.com/hvb-software",
  }
};

const siteImages = {
  logo: "images/hvb_software_logo.png",
  portfolio: {
    jiroai: "images/jiroai_pl.png",
    homedecorator: "images/homedecoratorai_com.png",
  },
  people: {
    jakub: "images/people/jakub_pradzynski.jpg",
    piotr: "images/people/piotr_pradzynski.jpg",
  },
};

const translations = {
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
        { name: "JiroAI.pl", url: "https://jiroai.pl", description: "Inteligentny asystent AI ułatwiający prowadzenie firmy w Polsce.", imageId: "jiroai" },
        { name: "HomeDecoratorAI.com", url: "https://homedecoratorai.com", description: "Platforma AI do aranżacji wnętrz, która pozwala wyszukiwać produkty na podstawie inspirujących zdjęć.", imageId: "homedecorator" },
      ],
      image_placeholder: "Zrzut ekranu aplikacji",
      visit_button: "Zobacz projekt",
    },
     aboutUs: {
      title: "O nas",
      people: [
        {
          name: "Jakub Prądzyński",
          title: "Founder",
          email: "jakub@hvb.software",
          imageId: "jakub",
          description: "Od stażysty do Engineering Managera w największej platformie e-commerce w Polsce - Allegro. Wcześniej miałem okazje współ-organizować meeting Toruń JUG, współ-prowadzić zajęcia na Uniwersytecie Mikołaja Kopernika w Toruniu czy pracować w Software House.\n\nObecnie jestem liderem zespołu wdrażającego rozwiązania głównie bazujące na najnowszych technologiach AI dla selling partnerów Allegro.\nWcześniej, jako Senior Software Engineer, tworzyłem mikroserwisy w Kotlinie (lub Javie) i Springu, korzystając z bazy MongoDB i udogodnień GCP. Duża część pracy opierała się również na działaniach Big Data np. w Apache Spark.\n\nPrywatnie gram w golfa, kibicuję Manchesterowi United i jeżdzę motocyklem :)",
        },
        {
          name: "Piotr Prądzyński",
          title: "Founder",
          email: "piotr@hvb.software",
          imageId: "piotr",
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
       socials: {
        linkedin: "Odwiedź nasz profil na LinkedIn",
        twitter: "Odwiedź nasz profil na Twitter (X)",
        github: "Odwiedź nasz profil na GitHub",
      },
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
        { name: "JiroAI.pl", url: "https://jiroai.pl", description: "An intelligent AI assistant that simplifies running a business in Poland.", imageId: "jiroai" },
        { name: "HomeDecoratorAI.com", url: "https://homedecoratorai.com", description: "An AI platform for interior design that lets you find products based on inspirational photos.", imageId: "homedecorator" },
      ],
      image_placeholder: "Screenshot of the application",
      visit_button: "View Project",
    },
     aboutUs: {
      title: "About us",
      people: [
        {
          name: "Jakub Prądzyński",
          title: "Founder",
          email: "jakub@hvb.software",
          imageId: "jakub",
          description: "From an intern to an Engineering Manager at Poland's largest e-commerce platform - Allegro. Previously, I had the opportunity to co-organize the Toruń JUG meeting, co-lead classes at Nicolaus Copernicus University in Toruń, and work in a Software House.\n\nCurrently, I lead a team implementing solutions mainly based on the latest AI technologies for Allegro's selling partners.\nPreviously, as a Senior Software Engineer, I created microservices in Kotlin (or Java) and Spring, using MongoDB and GCP. A large part of the work was also based on Big Data activities, e.g., in Apache Spark.\n\nPrivately, I play golf, support Manchester United, and ride a motorcycle :)",
        },
        {
          name: "Piotr Prądzyński",
          title: "Founder",
          email: "piotr@hvb.software",
          imageId: "piotr",
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
      socials: {
        linkedin: "Visit our LinkedIn profile",
        twitter: "Visit our Twitter (X) profile",
        github: "Visit our GitHub profile",
      },
    }
  },
};

const App = () => {
    const [lang, setLang] = useState('pl');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const content = translations[lang];

    const heroRef = useRef(null);
    const whyAIRef = useRef(null);
    const servicesRef = useRef(null);
    const portfolioRef = useRef(null);
    const aboutUsRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToRef = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop - 80, // header offset
            behavior: 'smooth',
        });
        setIsMenuOpen(false);
    };
    
    // For fade-in animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                }
            });
        }, { threshold: 0.1 });

        [whyAIRef, servicesRef, portfolioRef, aboutUsRef, contactRef].forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
             [whyAIRef, servicesRef, portfolioRef, aboutUsRef, contactRef].forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);

    // For dynamic SEO meta tags
    useEffect(() => {
        const sectionRefs = [
            { ref: heroRef, name: 'home' },
            { ref: whyAIRef, name: 'whyAI' },
            { ref: servicesRef, name: 'services' },
            { ref: portfolioRef, name: 'portfolio' },
            { ref: aboutUsRef, name: 'aboutUs' },
            { ref: contactRef, name: 'contact' },
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                     const sectionName = sectionRefs.find(s => s.ref.current === entry.target)?.name;
                     if (sectionName) {
                        setActiveSection(sectionName);
                     }
                }
            });
        }, {
            rootMargin: '-80px 0px -40% 0px',
            threshold: 0.4
        });

        sectionRefs.forEach(section => {
            if (section.ref.current) {
                observer.observe(section.ref.current);
            }
        });

        return () => {
            sectionRefs.forEach(section => {
                if (section.ref.current) {
                    observer.unobserve(section.ref.current);
                }
            });
        };
    }, []);

    // Effect for updating meta tags based on active section and language
    useEffect(() => {
        const seoContent = translations[lang].seo?.[activeSection];
        const baseUrl = window.location.origin;
        const pageUrl = `${baseUrl}${window.location.pathname}`;
        const socialImageUrl = `${baseUrl}/images/hvb_software_logo.png`; 

        const setMeta = (id, attribute, value) => {
            const el = document.getElementById(id);
            if (el) el.setAttribute(attribute, value);
        };

        if (seoContent) {
            document.title = seoContent.title;
            setMeta('meta-description', 'content', seoContent.description);
            setMeta('og-title', 'content', seoContent.title);
            setMeta('og-description', 'content', seoContent.description);
            setMeta('twitter-title', 'content', seoContent.title);
            setMeta('twitter-description', 'content', seoContent.description);
        }

        document.documentElement.lang = lang;
        setMeta('canonical-link', 'href', pageUrl);
        setMeta('og-url', 'content', pageUrl);
        setMeta('og-image', 'content', socialImageUrl);
        setMeta('twitter-url', 'content', pageUrl);
        setMeta('twitter-image', 'content', socialImageUrl);

    }, [activeSection, lang]);


    return (
        <div className="app-container">
            <header className="header">
                 <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <img src={siteImages.logo} alt="HVB.software Logo" className="logo" />
                </a>
                <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    <a onClick={() => scrollToRef(whyAIRef)}>{content.nav.about}</a>
                    <a onClick={() => scrollToRef(servicesRef)}>{content.nav.services}</a>
                    <a onClick={() => scrollToRef(portfolioRef)}>{content.nav.portfolio}</a>
                    <a onClick={() => scrollToRef(aboutUsRef)}>{content.nav.aboutUs}</a>
                    <a onClick={() => scrollToRef(contactRef)}>{content.nav.contact}</a>
                </nav>
                <div className="header-actions">
                    <button onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')} className="lang-switcher">
                        {lang === 'pl' ? 'EN' : 'PL'}
                    </button>
                    <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        <span/><span/><span/>
                    </button>
                </div>
            </header>

            <main>
                <section ref={heroRef} className="hero">
                    <div className="hero-content">
                        <h1>{content.hero.headline}</h1>
                        <h2>{content.hero.subheadline}</h2>
                        <p>{content.hero.description}</p>
                        <button className="cta-button" onClick={() => scrollToRef(contactRef)}>{content.hero.contact_button}</button>
                    </div>
                </section>

                <section ref={whyAIRef} className="content-section fade-in">
                    <h2>{content.whyAI.title}</h2>
                    <p className="section-description">{content.whyAI.description}</p>
                    <div className="card-grid three-cols">
                        {content.whyAI.points.map((point, index) => (
                            <div className="card" key={index}>
                                <div className="card-title-container">
                                    <span className="material-symbols-outlined">{point.icon}</span>
                                    <h3>{point.title}</h3>
                                </div>
                                <p>{point.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section ref={servicesRef} className="content-section fade-in">
                    <h2>{content.services.title}</h2>
                    <div className="card-grid one-col">
                         {content.services.items.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="card-title-container">
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                    <h3>{item.title}</h3>
                                </div>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section ref={portfolioRef} className="content-section fade-in">
                    <h2>{content.portfolio.title}</h2>
                    <div className="card-grid two-cols">
                        {content.portfolio.projects.map((project, index) => (
                            <div className="card portfolio-card" key={index}>
                                <div className="portfolio-image-container">
                                    <img src={siteImages.portfolio[project.imageId]} alt={`${content.portfolio.image_placeholder} ${project.name}`} />
                                </div>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="cta-button secondary">{content.portfolio.visit_button}</a>
                            </div>
                        ))}
                    </div>
                </section>

                <section ref={aboutUsRef} className="content-section fade-in">
                    <h2>{content.aboutUs.title}</h2>
                    <div className="card-grid two-cols">
                        {content.aboutUs.people.map((person, index) => (
                            <div className="card about-card" key={index}>
                                <img src={siteImages.people[person.imageId]} alt={person.name} className="about-image" />
                                <h3>{person.name}</h3>
                                <p className="about-title">{person.title}</p>
                                <p className="about-description">
                                    {person.description_link_url ? (
                                        <>
                                            {person.description_part1}
                                            <a href={person.description_link_url} target="_blank" rel="noopener noreferrer" className="inline-link">{person.description_link_text}</a>
                                            {person.description_part2}
                                        </>
                                    ) : (
                                        person.description
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section ref={contactRef} className="content-section contact-section fade-in">
                    <h2>{content.contact.title}</h2>
                    <p className="section-description">{content.contact.subtitle}</p>
                     <a href={siteLinks.googleForm} target="_blank" rel="noopener noreferrer" className="cta-button">
                        {content.contact.form.send_button}
                    </a>
                    <p className="contact-email">
                        {content.contact.email_contact}
                        <a href={`mailto:${content.contact.email_address}`}>{content.contact.email_address}</a>
                    </p>
                </section>
            </main>

            <footer className="footer">
                <img src={siteImages.logo} alt="HVB.software Logo" className="logo footer-logo" />
                <div className="footer-nav">
                    <a onClick={() => scrollToRef(whyAIRef)}>{content.nav.about}</a>
                    <a onClick={() => scrollToRef(servicesRef)}>{content.nav.services}</a>
                    <a onClick={() => scrollToRef(portfolioRef)}>{content.nav.portfolio}</a>
                    <a onClick={() => scrollToRef(aboutUsRef)}>{content.nav.aboutUs}</a>
                    <a onClick={() => scrollToRef(contactRef)}>{content.nav.contact}</a>
                </div>
                <div className="social-links">
                    <a href={siteLinks.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={content.footer.socials.linkedin}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href={siteLinks.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label={content.footer.socials.twitter}>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.21-6.815-6.041 6.815h-3.308l7.73-8.805-7.956-10.69h6.767l4.634 6.253zm-1.149 18.48h1.786l-12.6-16.845h-1.93l12.744 16.845z"/></svg>
                    </a>
                    <a href={siteLinks.socials.github} target="_blank" rel="noopener noreferrer" aria-label={content.footer.socials.github}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                </div>
                <p>&copy; {new Date().getFullYear()} HVB.software. {content.footer.rights}</p>
            </footer>
        </div>
    );
};

const styles = `
:root {
    --bg-color: #000000; /* Black */
    --card-bg-color: #141414; /* Dark Grey */
    --border-color: #333333; /* Grey */
    --primary-color: #F91D26; /* HVB Red */
    --primary-hover-color: #D3121B; /* Darker HVB Red */
    --text-color: #FFFFFF; /* White */
    --text-muted-color: #AAAAAA; /* Light Grey */
    --font-family: 'Inter', sans-serif;
}

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
    background-color: var(--bg-color);
}

body {
    font-family: var(--font-family);
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
}

.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
}

.logo-link {
    cursor: pointer;
    line-height: 0;
}

.logo {
    height: 45px;
    object-fit: contain;
}

.nav {
    display: flex;
    gap: 2rem;
}

.nav a {
    color: var(--text-muted-color);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    cursor: pointer;
}

.nav a:hover {
    color: var(--text-color);
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.lang-switcher {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s, border-color 0.3s;
}

.lang-switcher:hover {
    background-color: var(--card-bg-color);
    border-color: var(--primary-color);
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    flex-direction: column;
    gap: 5px;
}

.menu-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: var(--text-color);
    border-radius: 3px;
    transition: all 0.3s ease;
}

/* Hero Section */
.hero {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8rem 2rem;
    min-height: 80vh;
    background-image: radial-gradient(circle at 50% 50%, rgba(249, 29, 38, 0.15), transparent 70%);
}

.hero-content {
    max-width: 800px;
}

.hero h1 {
    font-size: 3.5rem;
    font-weight: 700;
}
.hero h2 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    color: var(--text-muted-color);
    max-width: 600px;
    margin: 0 auto 2rem;
}

.cta-button {
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    padding: 0.9rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.3s, transform 0.3s;
}

.cta-button:hover {
    background-color: var(--primary-hover-color);
    transform: translateY(-2px);
}

/* Animations */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in-visible {
    opacity: 1;
    transform: translateY(0);
}

/* General Content Section */
.content-section {
    padding: 6rem 5%;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    border-top: 1px solid var(--border-color);
}

.hero + .content-section {
    border-top: none;
}


.content-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.section-description {
    font-size: 1.1rem;
    color: var(--text-muted-color);
    max-width: 700px;
    margin: 0 auto 3rem auto;
}

/* Card Grid */
.card-grid {
    display: grid;
    gap: 1.5rem;
    text-align: left;
}

.card-grid.one-col { grid-template-columns: 1fr; }
.card-grid.three-cols { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.card-grid.two-cols { grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); }

.card {
    background-color: var(--card-bg-color);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: transform 0.3s, border-color 0.3s;
}

.card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
}

.card-title-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.card-title-container .material-symbols-outlined {
    font-size: 2rem;
    color: var(--primary-color);
}

.card h3 {
    font-size: 1.5rem;
    color: var(--text-color);
}

.card p {
    color: var(--text-muted-color);
}

/* Portfolio Section */
.portfolio-card {
    display: flex;
    flex-direction: column;
}
.portfolio-image-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    border: 1px solid var(--border-color);
}
.portfolio-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.portfolio-card p {
    flex-grow: 1;
    margin-bottom: 1.5rem;
}
.cta-button.secondary {
    background-color: transparent;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
}
.cta-button.secondary:hover {
    background-color: var(--primary-color);
    color: var(--text-color);
}

/* About Us Section */
.about-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.about-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.5rem;
    border: 3px solid var(--border-color);
    transition: border-color 0.3s;
}

.about-card:hover .about-image {
    border-color: var(--primary-color);
}

.about-card h3 {
    margin-bottom: 0.25rem;
}

.about-title {
    color: var(--text-muted-color);
    font-weight: 600;
    margin-bottom: 1rem;
}

.about-description {
    text-align: left;
    white-space: pre-wrap;
    flex-grow: 1;
    margin-bottom: 1.5rem;
}

.about-description .inline-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    transition: text-decoration 0.3s;
}
.about-description .inline-link:hover {
    text-decoration: underline;
}


/* Contact Section */
.contact-section {
    background-color: var(--card-bg-color);
    border-radius: 12px;
    margin: 6rem auto;
    max-width: 90%;
    border-top: none;
}

.contact-email {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: var(--text-muted-color);
}
.contact-email a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    transition: text-decoration 0.3s;
}
.contact-email a:hover {
    text-decoration: underline;
}

/* Footer */
.footer {
    padding: 3rem 5% 2rem;
    border-top: 1px solid var(--border-color);
    text-align: center;
    color: var(--text-muted-color);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-logo {
    margin-bottom: 1.5rem;
}

.footer-nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
}
.footer-nav a {
    color: var(--text-muted-color);
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease;
}
.footer-nav a:hover {
    color: var(--text-color);
}

.social-links {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.social-links a {
    color: var(--text-muted-color);
    transition: color 0.3s ease, transform 0.3s ease;
    line-height: 0;
}

.social-links a:hover {
    color: var(--text-color);
    transform: translateY(-2px);
}

.social-links svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
}


/* Responsive Design */
@media (max-width: 900px) {
    .header {
        justify-content: space-between; /* Align logo left, actions right */
    }
    .nav {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: var(--bg-color);
        border-bottom: 1px solid var(--border-color);
        padding: 1rem 0;
        text-align: center;
    }
    .nav-open {
        display: flex;
    }
    .menu-toggle {
        display: flex;
    }
    .nav a {
        padding: 1rem 0;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    .hero h2 {
        font-size: 1.8rem;
    }

    .card-grid.two-cols {
        grid-template-columns: 1fr;
    }
}
@media (max-width: 600px) {
    .header {
       justify-content: space-between;
    }
    .nav {
        order: 1; /* Move nav below actions on smaller screens if needed */
    }
    .hero {
        padding: 6rem 1rem;
    }
    .content-section {
        padding: 4rem 5%;
    }
    .card-grid.three-cols {
        grid-template-columns: 1fr;
    }
    .footer-nav {
        flex-direction: column;
        gap: 0.5rem;
    }
}

@media (min-width: 601px) {
    .hero h2 {
        white-space: nowrap;
    }
}

@media (min-width: 901px) {
    .header {
        justify-content: space-between;
    }
    .nav {
        display: flex;
    }
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);