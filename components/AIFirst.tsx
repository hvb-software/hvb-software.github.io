import React, { forwardRef } from 'react';

interface AIFirstProps {
    content: any;
}

const AIFirst = forwardRef<HTMLElement, AIFirstProps>(({ content }, ref) => {
    return (
        <section ref={ref} className="content-section fade-in">
            <h2>{content.title}</h2>
            <p className="section-description">{content.description}</p>
            <div className="card-grid three-cols">
                {content.points.map((point: any, index: number) => (
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
    );
});

export default AIFirst;