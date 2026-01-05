import React, { forwardRef } from 'react';

interface HeroProps {
    content: any;
    scrollToContact: () => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ content, scrollToContact }, ref) => {
    return (
        <section ref={ref} className="hero">
            <div className="hero-content">
                <h1>{content.headline}</h1>
                <h2>{content.subheadline}</h2>
                <p>{content.description}</p>
                <button className="cta-button" onClick={scrollToContact}>{content.contact_button}</button>
            </div>
        </section>
    );
});

export default Hero;