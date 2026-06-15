import React, { useEffect, useRef, useState } from "react";

interface Highlight {
  text: string;
}

interface SolutionCard2Props {
  title?: string;
  description?: string;
  highlights?: Highlight[];
  ctaHref?: string;
  backgroundImage?: string;
}

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ flexShrink: 0, marginTop: "2px" }}
  >
    <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.12)" />
    <path
      d="M4.5 8.25L6.75 10.5L11.5 5.5"
      stroke="#4ecdc4"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SolutionCard2: React.FC<SolutionCard2Props> = ({
  title = "AI Lead Generation System",
  description = "We build a fully automated pipeline that finds, qualifies, and reaches your ideal customers — running around the clock without your team lifting a finger.",
  highlights = [
    { text: "Runs 24/7 without human input" },
    { text: "Targets only your ideal customer profile" },
    { text: "Plugs into your existing CRM or inbox" },
  ],
  ctaHref = "#contact",
  backgroundImage,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate once, then stop watching
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        .sc2-card {
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          width: 80vw;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
          position: relative;
          margin: 0 auto;
          background-color: #6a7076;

          /* Scroll-in: start hidden */
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc2-card.sc2-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger the left-pane children */
        .sc2-card .sc2-eyebrow,
        .sc2-card .sc2-title,
        .sc2-card .sc2-description,
        .sc2-card .sc2-cta {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc2-card.sc2-visible .sc2-eyebrow  { opacity: 1; transform: none; transition-delay: 0.1s; }
        .sc2-card.sc2-visible .sc2-title     { opacity: 1; transform: none; transition-delay: 0.2s; }
        .sc2-card.sc2-visible .sc2-description { opacity: 1; transform: none; transition-delay: 0.3s; }
        .sc2-card.sc2-visible .sc2-cta       { opacity: 1; transform: none; transition-delay: 0.4s; }

        /* Stagger the highlight items */
        .sc2-card .sc2-highlight-label,
        .sc2-card .sc2-highlight-item {
          opacity: 0;
          transform: translateX(12px);
          transition:
            opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc2-card.sc2-visible .sc2-highlight-label          { opacity: 1; transform: none; transition-delay: 0.25s; }
        .sc2-card.sc2-visible .sc2-highlight-item:nth-child(1) { opacity: 1; transform: none; transition-delay: 0.35s; }
        .sc2-card.sc2-visible .sc2-highlight-item:nth-child(2) { opacity: 1; transform: none; transition-delay: 0.45s; }
        .sc2-card.sc2-visible .sc2-highlight-item:nth-child(3) { opacity: 1; transform: none; transition-delay: 0.55s; }

        /* Zoom layer */
        .sc2-bg {
          position: absolute;
          inset: 0;
          background-color: #6a7076;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
          z-index: 0;
        }

        .sc2-card:hover .sc2-bg {
          transform: scale(1.05);
        }

        /* Overlay */
        .sc2-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6));
          z-index: 1;
          pointer-events: none;
        }

        /* Content layers */
        .sc2-main,
        .sc2-divider,
        .sc2-highlight {
          position: relative;
          z-index: 2;
        }

        /* Left pane */
        .sc2-main {
          flex: 1 1 55%;
          padding: 40px 44px 40px 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sc2-eyebrow {
          margin: 0;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9fbcd0;
        }

        .sc2-title {
          margin: 0;
          font-size: 1.7rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .sc2-description {
          margin: 0;
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.6;
          max-width: 420px;
        }

        .sc2-cta {
          margin-top: 8px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #ffffff;
          font-size: 0.9375rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }

        .sc2-cta:hover { opacity: 0.75; }

        .sc2-cta-arrow {
          font-size: 1rem;
          transition: transform 0.15s ease;
        }

        .sc2-cta:hover .sc2-cta-arrow { transform: translateX(3px); }

        /* Divider */
        .sc2-divider {
          width: 1px;
          background: rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
          margin: 28px 0;
        }

        /* Right pane */
        .sc2-highlight {
          flex: 0 0 auto;
          width: 260px;
          padding: 40px 36px 40px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
        }

        .sc2-highlight-label {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }

        .sc2-highlight-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sc2-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.45;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .sc2-card {
            flex-direction: column;
            width: 90vw;
          }

          .sc2-title {
            font-size: 1.3rem;
            font-weight: 600;
          }

          .sc2-divider {
            width: auto;
            height: 1px;
            margin: 0 28px;
          }

          .sc2-highlight {
            width: auto;
            padding: 28px 28px 36px;
          }

          .sc2-main {
            padding: 32px 28px 28px;
          }
        }

        /* Respect reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .sc2-card,
          .sc2-card .sc2-eyebrow,
          .sc2-card .sc2-title,
          .sc2-card .sc2-description,
          .sc2-card .sc2-cta,
          .sc2-card .sc2-highlight-label,
          .sc2-card .sc2-highlight-item {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div
        ref={cardRef}
        className={`sc2-card${visible ? " sc2-visible" : ""}`}
      >
        {/* Background zoom layer */}
        <div
          className="sc2-bg"
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        />
        {backgroundImage && <div className="sc2-bg-overlay" />}

        {/* Left: Main content */}
        <div className="sc2-main">
          <p className="sc2-eyebrow">Solution</p>
          <h2 className="sc2-title">{title}</h2>
          <p className="sc2-description">{description}</p>
          <a href={ctaHref} className="sc2-cta">
            Talk to us <span className="sc2-cta-arrow">→</span>
          </a>
        </div>

        {/* Vertical divider */}
        <div className="sc2-divider" aria-hidden="true" />

        {/* Right: Highlights */}
        <div className="sc2-highlight">
          <span className="sc2-highlight-label">Highlights</span>
          <ul className="sc2-highlight-list">
            {highlights.map((item, idx) => (
              <li key={idx} className="sc2-highlight-item">
                <CheckIcon />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SolutionCard2;