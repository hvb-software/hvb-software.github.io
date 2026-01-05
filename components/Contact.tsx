import React, { forwardRef } from 'react';
import { siteLinks } from '../data';

interface ContactProps {
    content: any;
}

const Contact = forwardRef<HTMLElement, ContactProps>(({ content }, ref) => {
    return (
        <section ref={ref} className="content-section contact-section fade-in">
            <h2>{content.title}</h2>
            <p className="section-description">{content.subtitle}</p>
            <a href={siteLinks.googleForm} target="_blank" rel="noopener noreferrer" className="cta-button">
                {content.form.send_button}
            </a>
            <p className="contact-email">
                {content.email_contact}
                <a href={`mailto:${content.email_address}`}>{content.email_address}</a>
            </p>
        </section>
    );
});

export default Contact;