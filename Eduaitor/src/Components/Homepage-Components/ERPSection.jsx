import { useState, useRef, useEffect } from "react";
import StudentInfo from "./StudentInfo";
import FeeManagement from "./FeeManagement";
import Analytics from "./Analytics";
import "./erp.css";

const tabs = [
  {
    id: "student",
    label: "Student Information",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: "fee",
    label: "Fee Management",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics & Insights",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export default function ERPSection() {
  const [activeTab, setActiveTab] = useState("student");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="erp" ref={ref}>
      <div className="erp__bg-shape" aria-hidden="true" />

      <div className="erp__inner">
        <div className={`erp__header ${visible ? "erp__header--show" : ""}`}>
          <span className="erp__label">What We Offer</span>
          <h2 className="erp__h2">
            One ERP. Every Function.<br />
            <span>Zero Compromise.</span>
          </h2>
          <p className="erp__sub">
            EduAitor's ERP modules are purpose-built for educational institutions — not retrofitted from
            generic business software. Every screen, every workflow, designed for how schools actually operate.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="erp__tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`erp__tab ${activeTab === t.id ? "erp__tab--active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="erp__tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="erp__panel">
          {activeTab === "student" && <StudentInfo />}
          {activeTab === "fee" && <FeeManagement />}
          {activeTab === "analytics" && <Analytics />}
        </div>
      </div>
    </section>
  );
}