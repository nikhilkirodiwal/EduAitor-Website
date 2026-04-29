import React from "react";
import "./MarketPlace.css";
import FaqSection from "../Components/MarketPlace-components/Faqsection";
import { NavLink } from "react-router-dom";

const MarketPlace = () => {
    const faqs = [
      {
        question: "What are add-ons?",
        answer:
          "Add-ons are like power-ups for your EduAitor experience. These are ready-to-use tools, integrations, and services that help you extend platform capabilities without writing code. They enhance performance, automation, and operational efficiency.",
      },
      {
        question: "Why use add-ons?",
        answer:
          "Add-ons allow institutions to customize their ecosystem based on their needs. Whether it's payment automation, analytics, or communication tools, you can scale smarter and faster.",
      },
      {
        question: "What types of solutions are available?",
        answer:
          "You can find fee management tools, analytics dashboards, marketplace integrations, communication systems, infrastructure solutions, and more — all designed for educational institutions.",
      },
    ];
    return (
        <section className="marketplace">

            {/* HERO */}
            <div className="market-hero">
                <div className="market-hero-text">
                    <h1>
                        Discover the <span>EduAitor Marketplace</span>
                    </h1>
                    <p>
                        A powerful ecosystem connecting schools, educators, service providers,
                        and technology partners — all in one seamless platform.
                    </p>
                    <button>
                      
                        <a href="#market-section">  Explore Marketplace </a>
                        </button>
                </div>

                <div className="market-hero-img">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                        alt="marketplace"
                    />
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="market-section" id="market-section">
                <h2>How It Works</h2>

                <div className="market-grid-3">
                    <div className="market-card">
                        <div className="icon-circle">🔍</div>
                        <h4>Browse Services</h4>
                        <p>
                            Explore verified vendors offering educational tools,
                            sports programs, digital solutions, and more.
                        </p>
                    </div>

                    <div className="market-card">
                        <div className="icon-circle">🤝</div>
                        <h4>Connect Instantly</h4>
                        <p>
                            Directly connect with service providers that match your
                            school or institutional requirements.
                        </p>
                    </div>

                    <div className="market-card">
                        <div className="icon-circle">🚀</div>
                        <h4>Scale Efficiently</h4>
                        <p>
                            Grow faster with trusted partners and tools designed
                            specifically for the education ecosystem.
                        </p>
                    </div>
                </div>
            </div>

            {/* CATEGORIES */}
            <div className="market-section light-bg">
                <h2>Marketplace Categories</h2>

                <div className="market-grid-4">
                    <div className="category-card">EdTech Solutions</div>
                    <div className="category-card">Sports Programs</div>
                    <div className="category-card">Fee Management Tools</div>
                    <div className="category-card">School Infrastructure</div>
                    <div className="category-card">Digital Marketing</div>
                    <div className="category-card">Teacher Training</div>
                    <div className="category-card">Student Assessments</div>
                    <div className="category-card">Learning Content</div>
                </div>
            </div>

            {/* PARTNERS */}
            <div className="market-section">
                <h2>Trusted by Growing Brands</h2>

                <div className="partners">
                    <img src="https://img.freepik.com/free-vector/human-leaf-logo-design-template_474888-1810.jpg" alt="" />
                    <img src="https://media.istockphoto.com/id/1369899988/vector/handshake-sign-in-the-circle-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=auA4GuM2p-EmKmEgcFjIOUibPiXsuvTxfvRKB-EN7o8=" alt="" />
                    <img src="https://img.freepik.com/free-vector/gradient-culture-logo-template_23-2149840309.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    <img src="https://img.freepik.com/free-vector/friends-logo-template_23-2149505594.jpg?semt=ais_user_personalization&w=740&q=80" alt="" />
                </div>
            </div>

            {/* WHY JOIN */}
            <div className="market-section light-bg">
                <h2>Why Join EduAitor Marketplace?</h2>

                <div className="market-grid-3">
                    <div className="market-card">
                        <h4>Verified Ecosystem</h4>
                        <p>
                            Every partner is carefully reviewed to ensure quality,
                            reliability, and trust.
                        </p>
                    </div>

                    <div className="market-card">
                        <h4>Faster Growth</h4>
                        <p>
                            Expand your reach across schools and institutions
                            through a connected network.
                        </p>
                    </div>

                    <div className="market-card">
                        <h4>Secure Transactions</h4>
                        <p>
                            Integrated systems ensure secure payments, data privacy,
                            and smooth communication.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="market-cta">
                <h2>Start Exploring the EduAitor Marketplace Today</h2>
                <button>Become a Partner</button>
            </div>

            <FaqSection faqs={faqs}/>
        </section>
    );
};

export default Marketplace;
