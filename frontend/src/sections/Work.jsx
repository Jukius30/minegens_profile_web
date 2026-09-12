import React from "react";

const workSteps = [
  {
    number: "01",
    title: "Realms",
    description:
      "Embark on unforgettable journeys across a variety of unique realms, each offering its own challenges, progression systems, and gameplay experiences.",
    features: [
      "Multiple Game Modes",
      "Custom Features",
      "Long-Term Progression",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Events",
    description:
      "Compete in tournaments, building contests, seasonal activities, and exclusive challenges for valuable rewards.",
    features: [
      "Seasonal Activities",
      "Exclusive Rewards",
      "Competitive Events",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Content",
    description:
      "Regular updates, new features, balancing changes, and community-driven improvements keep the server fresh and exciting.",
    features: [
      "Frequent Updates",
      "New Features",
      "Community Feedback",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Development",
    description:
      "Built with custom systems, optimized performance, and unique mechanics designed specifically for the Minegens network.",
    features: [
      "Custom Plugins",
      "Optimized performance",
      "Unique Gameplay Systems",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="22" y1="12" x2="18" y2="12"></line>
        <line x1="6" y1="12" x2="2" y2="12"></line>
        <line x1="12" y1="6" x2="12" y2="2"></line>
        <line x1="12" y1="22" x2="12" y2="18"></line>
      </svg>
    ),
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="py-5 text-white"
      style={{ backgroundColor: "#0b0f17" }}
    >
      <div className="container-xl py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span
            className="small text-uppercase fw-semibold"
            style={{ color: "#2f74ff", letterSpacing: "0.08em" }}
          >
            Server Ecosystem
          </span>
          <h2 className="h2 fw-bold text-white mt-1 mb-2">How Minegens Works</h2>
          <p
            className="text-white-50 small mx-auto mb-0"
            style={{ maxWidth: "560px", lineHeight: "1.6" }}
          >
            Pelajari pilar utama yang menjadikan server Minegens wadah petualangan yang stabil, kompetitif, dan seru.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="row g-4">
          {workSteps.map((step, idx) => (
            <div key={idx} className="col-12 col-md-6 col-xl-3">
              <div
                className="h-100 rounded-4 p-4 d-flex flex-column"
                style={{
                  backgroundColor: "#131823",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(47, 116, 255, 0.35)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px -12px rgba(47, 116, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Header: Icon Box + Number Badge */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "rgba(47, 116, 255, 0.07)",
                      border: "1px solid rgba(47, 116, 255, 0.22)",
                      color: "#2f74ff",
                    }}
                  >
                    {step.icon}
                  </div>

                  <span
                    className="badge rounded-pill px-2 py-1"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "rgba(255, 255, 255, 0.45)",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Judul & Deskripsi */}
                <h3 className="h5 fw-bold text-white mb-3" style={{ fontSize: "19px" }}>
                  {step.title}
                </h3>
                <p
                  className="small mb-4"
                  style={{
                    color: "rgba(255, 255, 255, 0.55)",
                    lineHeight: "1.65",
                    fontSize: "13.5px",
                    minHeight: "88px",
                  }}
                >
                  {step.description}
                </p>

                {/* Checklist Pills */}
                <div className="mt-auto d-flex flex-column gap-2">
                  {step.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {/* Check Icon with Circle Outline */}
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "17px",
                          height: "17px",
                          border: "1px solid rgba(47, 116, 255, 0.5)",
                          color: "#2f74ff",
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>

                      <span
                        className="fw-medium"
                        style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "12.5px" }}
                      >
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}