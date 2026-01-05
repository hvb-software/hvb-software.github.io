import React, { forwardRef } from 'react';
import { siteImages } from '../data';
import SocialIcon from './SocialIcon';

interface PortfolioProps {
    content: any;
    contactButtonText: string;
    scrollToContact: () => void;
}

const Portfolio = forwardRef<HTMLElement, PortfolioProps>(({ content, contactButtonText, scrollToContact }, ref) => {
    return (
        <section ref={ref} className="content-section fade-in">
            <h2>{content.title}</h2>
            <div className="card-grid two-cols">
                {content.projects.map((project: any, index: number) => (
                    <div className="card portfolio-card" key={index}>
                        <div className="portfolio-image-container">
                            <img src={siteImages.portfolio[project.imageId as keyof typeof siteImages.portfolio]} alt={`${content.image_placeholder} ${project.name}`} />
                        </div>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <div className="portfolio-actions">
                            {project.action === 'contact' ? (
                                <div className="portfolio-contact-cta">
                                    <p>{content.contact_cta}</p>
                                    <button
                                        onClick={scrollToContact}
                                        className="cta-button secondary"
                                    >
                                        {contactButtonText}
                                    </button>
                                </div>
                            ) : (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="cta-button secondary">{content.visit_button}</a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default Portfolio;