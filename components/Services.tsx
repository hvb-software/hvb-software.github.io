import React, { forwardRef } from 'react';

interface ServicesProps {
    content: any;
}

const Services = forwardRef<HTMLElement, ServicesProps>(({ content }, ref) => {
    return (
        <section ref={ref} className="content-section fade-in">
            <h2>{content.title}</h2>
            <div className="card-grid one-col">
                {content.items.map((item: any, index: number) => (
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
    );
});

export default Services;