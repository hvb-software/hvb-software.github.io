import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import { createRoot } from 'react-dom/client';
import { translations } from './data';
import Hero from './components/Hero';
import WhyAI from './components/WhyAI';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    const [lang, setLang] = useState<'pl' | 'en'>('pl');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const content = translations[lang];

    const heroRef = useRef<HTMLElement | null>(null);
    const whyAIRef = useRef<HTMLElement | null>(null);
    const servicesRef = useRef<HTMLElement | null>(null);
    const portfolioRef = useRef<HTMLElement | null>(null);
    const aboutUsRef = useRef<HTMLElement | null>(null);
    const contactRef = useRef<HTMLElement | null>(null);

    const scrollToRef = (ref: MutableRefObject<HTMLElement | null>) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 80, // header offset
                behavior: 'smooth',
            });
            setIsMenuOpen(false);
        }
    };

    const scrollToContact = () => scrollToRef(contactRef);

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
        const seoContent = translations[lang].seo?.[activeSection as keyof typeof translations['pl']['seo']];
        const baseUrl = window.location.origin;
        const pageUrl = `${baseUrl}${window.location.pathname}`;
        const socialImageUrl = `${baseUrl}/images/hvb_software_logo.jpeg`;

        const setMeta = (id: string, attribute: string, value: string) => {
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
            <Header
                content={content}
                lang={lang}
                setLang={setLang}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                scrollToRef={scrollToRef}
                refs={{ whyAIRef, servicesRef, portfolioRef, aboutUsRef, contactRef }}
            />

            <main>
                <Hero ref={heroRef} content={content.hero} scrollToContact={scrollToContact} />
                <WhyAI ref={whyAIRef} content={content.whyAI} />
                <Services ref={servicesRef} content={content.services} />
                <Portfolio 
                    ref={portfolioRef} 
                    content={content.portfolio} 
                    contactButtonText={content.contact.form.send_button}
                    scrollToContact={scrollToContact} 
                />
                <AboutUs ref={aboutUsRef} content={content.aboutUs} />
                <Contact ref={contactRef} content={content.contact} />
            </main>

            <Footer 
                content={content} 
                scrollToRef={scrollToRef} 
                refs={{ whyAIRef, servicesRef, portfolioRef, aboutUsRef, contactRef }} 
            />
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
