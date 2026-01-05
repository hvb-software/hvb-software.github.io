import React, { forwardRef } from 'react';
import { siteImages } from '../data';
import SocialIcon from './SocialIcon';

interface AboutUsProps {
    content: any;
}

const AboutUs = forwardRef<HTMLElement, AboutUsProps>(({ content }, ref) => {
    return (
        <section ref={ref} className="content-section fade-in">
            <h2>{content.title}</h2>
            <div className="card-grid two-cols">
                {content.people.map((person: any, index: number) => (
                    <div className="card about-card" key={index}>
                        <img src={siteImages.people[person.imageId as keyof typeof siteImages.people]} alt={person.name} className="about-image" />
                        <h3>{person.name}</h3>
                        <p className="about-title">{person.title}</p>
                        <div className="person-socials">
                            <SocialIcon type="linkedin" url={person.socials.linkedin} ariaLabel={`LinkedIn ${person.name}`} />
                            <SocialIcon type="twitter" url={person.socials.twitter} ariaLabel={`Twitter (X) ${person.name}`} />
                            <SocialIcon type="github" url={person.socials.github} ariaLabel={`GitHub ${person.name}`} />
                        </div>
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
    );
});

export default AboutUs;