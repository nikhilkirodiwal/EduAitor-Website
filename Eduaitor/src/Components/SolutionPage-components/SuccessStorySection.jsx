import React from "react";
import "./SuccessStorySection.css";
import Counter from "../Counter"

const SuccessStorySection = () => {
  return (
    <section className="success-story">
      <div className="success-container">

        {/* LEFT CONTENT */}
        <div className="success-text">
          <span className="tag">SUCCESS STORY</span>

          <h2>
            Transforming Education Operations for
            <span> Leading Institutions</span>
          </h2>

          <p className="quote">
            “With EduAitor, we automated fee collection, reduced
            manual errors, and improved parent engagement within weeks.”
          </p>

          <p className="description">
            A growing school network integrated EduAitor’s digital payment
            system and marketplace tools to streamline operations across
            12 branches. The result? Increased transparency, faster
            collections, and measurable growth.
          </p>

          {/* STATS */}
          <div className="success-stats">
            <div>
              <h3><Counter end={40} suffix="%" /></h3>
              <p>Faster Fee Collection</p>
            </div>

            <div>
              <h3><Counter end={12} suffix="+" /></h3>
              <p>Branches Integrated</p>
            </div>

            <div>
              <h3><Counter end={98} suffix="%" /></h3>
              <p>Parent Satisfaction</p>
            </div>
          </div>

          <button className="success-btn">Read Full Case Study</button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="success-image">
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350"
            alt="success"
          />
          <div className="image-overlay"></div>
        </div>

      </div>
    </section>
  );
};

export default SuccessStorySection;
