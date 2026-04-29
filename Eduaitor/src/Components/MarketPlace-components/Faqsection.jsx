import React, { useState } from "react";
import "./Faqsection.css";

const FaqSection = ({faqs}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">
          <span>FAQs</span>
        </h2>

        <div className="faq-list">
          {faqs?.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h4>{item.question}</h4>
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
