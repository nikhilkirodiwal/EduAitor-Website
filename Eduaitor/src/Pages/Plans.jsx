import React from "react";
import "./Plans.css";
import { DiGoogleAnalytics } from "react-icons/di";
import { TbSettingsAutomation } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";


import PricingFAQ from "../Components/PlansPage-Components/PricingFAQ";
import { NavLink } from "react-router-dom";

const plansData = [
  {
    id: 1,
    name: "Base",
    short: "Streamline essentials and manage core operations.",
    features: [
      "Enquiry / Admission",
      "Student Information Management",
      "Fee Management (Online / Offline)",
      "Analytics Dashboard",
      "SMS Integration",
      "Student Attendance"
    ],
    highlight: false
  },
  {
    id: 2,
    name: "Standard",
    short: "Unlock academic tools and financial management.",
    features: [
      "Everything in Base",
      "Online Exams",
      "Timetable with Substitution",
      "Library Management",
      "Expense Management",
      "Unlimited Custom Reports"
    ],
    highlight: true
  },
  {
    id: 3,
    name: "Premium",
    short: "Advanced integrations and multi-branch control.",
    features: [
      "Everything in Standard",
      "Online Classes with Recording",
      "Student Wallet",
      "Vendor Management",
      "Website Management",
      "Rest API Access"
    ],
    highlight: false
  }
];

const faqData = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes, we provide a demo and limited trial so you can explore all features before committing."
  },
  {
    question: "Can I upgrade anytime?",
    answer:
      "Yes, you can upgrade or switch plans anytime as your institution grows."
  },
  {
    question: "Is training included?",
    answer:
      "We provide complete onboarding and training for administrators and staff."
  },
  {
    question: "Do you provide onboarding?",
    answer:
      "Yes, our team helps with setup, migration, and implementation support."
  },
  {
    question: "Is data secure?",
    answer:
      "We use enterprise-level encryption and secure cloud infrastructure to protect your institutional data."
  },
  {
    question: "Can I customize features?",
    answer:
      "Customization and API integrations are available in higher-tier plans."
  }
];

const Plans = () => {
  return (
    <div className="pricing-page">

      {/* TOP HEADING */}
      <section className="pricing-header">
        <h1> <span>  Flexible  </span>Plans for Every Institution</h1>
        <p>Choose the right solution to digitize and scale your institution.</p>
      </section>

      {/* PLAN CARDS */}
      <section className="plans-section">
        {plansData.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${plan.highlight ? "highlighted" : ""}`}
          >
            <h2>{plan.name}</h2>
            <p className="plan-desc">{plan.short}</p>

           <NavLink to="/bookademo"> <button className="demo-btn">
              Request Demo
              </button>
              </NavLink> 

            <div className="feature-box">
              <h4>All Features</h4>
              <ul>
                {plan.features.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* FEATURES SECTION */}
<section className="feature-highlight">
  <div className="feature-container">
    <h2>Powerful Features That Drive Growth</h2>
    <p className="feature-sub">
      Built to simplify operations and improve institutional performance.
    </p>

    <div className="feature-grid">
      <div className="feature-card">
        <div className="feature-icon-title">
        <div className="icon-circle">
          <DiGoogleAnalytics />
          </div>
        <h3>Smart Analytics</h3>
        </div>
        <p>Track performance with real-time dashboards and detailed insights.</p>
      </div>

      <div className="feature-card">
         <div className="feature-icon-title">
        <div className="icon-circle">
          <TbSettingsAutomation />
          </div>
        <h3>Automation</h3>
        </div>
        <p>Reduce manual work using automated workflows and smart triggers.</p>
      </div>

      <div className="feature-card">
         <div className="feature-icon-title">
        <div className="icon-circle">
        <RiSecurePaymentLine />
        </div>
        <h3>Secure Data</h3>
        </div>
        <p>Enterprise-grade security ensures student data protection.</p>
      </div>
    </div>
  </div>
</section>


      {/* COMPARISON */}
<section className="comparison-section">
  <div className="comparison-container">
    <h2>Compare Plans</h2>
    <p className="comparison-sub">
      See which plan fits your institution best.
    </p>

    <div className="comparison-table">
      <div className="row header">
        <div>Features</div>
        <div>Base</div>
        <div>Standard</div>
        <div>Premium</div>
      </div>

      <div className="row">
        <div>Online Exams</div>
        <div>❌</div>
        <div className="check">✔</div>
        <div className="check">✔</div>
      </div>

      <div className="row">
        <div>Library Management</div>
        <div>❌</div>
        <div className="check">✔</div>
        <div className="check">✔</div>
      </div>

      <div className="row">
        <div>Website Management</div>
        <div>❌</div>
        <div>❌</div>
        <div className="check">✔</div>
      </div>
    </div>
  </div>
</section>

        <PricingFAQ faqs={faqData}/>

    </div>
  );
};

export default Plans;
