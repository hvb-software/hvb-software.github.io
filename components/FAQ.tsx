import React, { forwardRef, useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    content: {
        title: string;
        items: FAQItem[];
    };
}

const FAQ = forwardRef<HTMLElement, FAQProps>(({ content }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section ref={ref} className="content-section fade-in">
            <h2>{content.title}</h2>
            <div className="faq-container">
                {content.items.map((item, index) => (
                    <div 
                        key={index} 
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            <h3>{item.question}</h3>
                            <span className="material-symbols-outlined">
                                {activeIndex === index ? 'remove' : 'add'}
                            </span>
                        </div>
                        <div className="faq-answer">
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default FAQ;
