import React, { MutableRefObject } from 'react';
import { siteImages } from '../data';

interface HeaderProps {
    content: any;
    lang: string;
    setLang: (lang: string) => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    scrollToRef: (ref: MutableRefObject<HTMLElement | null>) => void;
    refs: {
        aiFirstRef: MutableRefObject<HTMLElement | null>;
        servicesRef: MutableRefObject<HTMLElement | null>;
        portfolioRef: MutableRefObject<HTMLElement | null>;
        aboutUsRef: MutableRefObject<HTMLElement | null>;
        contactRef: MutableRefObject<HTMLElement | null>;
    };
}

const Header: React.FC<HeaderProps> = ({ content, lang, setLang, isMenuOpen, setIsMenuOpen, scrollToRef, refs }) => {
    return (
        <header className="header">
            <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <img src={siteImages.logo} alt="HVB.software Logo" className="logo" />
            </a>
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                <a onClick={() => scrollToRef(refs.aiFirstRef)}>{content.nav.about}</a>
                <a onClick={() => scrollToRef(refs.servicesRef)}>{content.nav.services}</a>
                <a onClick={() => scrollToRef(refs.portfolioRef)}>{content.nav.portfolio}</a>
                <a onClick={() => scrollToRef(refs.aboutUsRef)}>{content.nav.aboutUs}</a>
                <a onClick={() => scrollToRef(refs.contactRef)}>{content.nav.contact}</a>
            </nav>
            <div className="header-actions">
                <button onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')} className="lang-switcher">
                    {lang === 'pl' ? 'EN' : 'PL'}
                </button>
                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                    <span /><span /><span />
                </button>
            </div>
        </header>
    );
};

export default Header;