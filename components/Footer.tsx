import React, { MutableRefObject } from 'react';
import { siteImages } from '../data';

interface FooterProps {
    content: any;
    scrollToRef: (ref: MutableRefObject<HTMLElement | null>) => void;
    refs: {
        whyAIRef: MutableRefObject<HTMLElement | null>;
        servicesRef: MutableRefObject<HTMLElement | null>;
        portfolioRef: MutableRefObject<HTMLElement | null>;
        aboutUsRef: MutableRefObject<HTMLElement | null>;
        faqRef: MutableRefObject<HTMLElement | null>;
        contactRef: MutableRefObject<HTMLElement | null>;
    };
}

const Footer: React.FC<FooterProps> = ({ content, scrollToRef, refs }) => {
    return (
        <footer className="footer">
            <img src={siteImages.logo} alt="HVB.software Logo" className="logo footer-logo" />
            <div className="footer-nav">
                <a onClick={() => scrollToRef(refs.whyAIRef)}>{content.nav.about}</a>
                <a onClick={() => scrollToRef(refs.servicesRef)}>{content.nav.services}</a>
                <a onClick={() => scrollToRef(refs.portfolioRef)}>{content.nav.portfolio}</a>
                <a onClick={() => scrollToRef(refs.aboutUsRef)}>{content.nav.aboutUs}</a>
                <a onClick={() => scrollToRef(refs.faqRef)}>{content.nav.faq}</a>
                <a onClick={() => scrollToRef(refs.contactRef)}>{content.nav.contact}</a>
            </div>
            <p>&copy; {new Date().getFullYear()} HVB.software. {content.footer.rights}</p>
        </footer>
    );
};

export default Footer;