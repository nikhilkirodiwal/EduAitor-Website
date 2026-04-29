import React, { useState } from "react";
import "./pricingFAQ.css";

const PricingFAQ = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="pricing-faq-section">
      <div className="faq-container">
        <h2> <span>  Frequently  </span>Asked Questions</h2>
        <p className="faq-subtitle">
          Everything you need to know before choosing a plan.
        </p>

        <div className="faq-list">
          {faqs.map((item, index) => (
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
                <span>{activeIndex === index ? "−" : "+"}</span>
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

export default PricingFAQ;
