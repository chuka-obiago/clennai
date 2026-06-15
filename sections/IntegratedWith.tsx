"use client";

import { useEffect, useRef } from "react";

const COMPANIES = [
  "n8n",
  "OpenAI",
  "Apollo",
  "HubSpot",
  "Airtable",
  "Google Sheets",
  "WhatsApp",
];

export default function IntegratedWith() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";

    el.getBoundingClientRect(); // force reflow

    const t = setTimeout(() => {
      el.style.transition =
        "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.65s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.65s";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);

    return () => clearTimeout(t);
  }, []);

  const padded = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];
  const track = [...padded, ...padded];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap');

        .trusted-section {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 36px 0;
          will-change: opacity, transform;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.5) 100%
          );
        }

        .trusted-inner {
          width: 80%;
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .trusted-label {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #d4dbeb;
          white-space: nowrap;
          flex-shrink: 0;
          user-select: none;
        }

        .trusted-divider {
          width: 1px;
          height: 28px;
          background: rgba(255, 251, 251, 0.2);
          flex-shrink: 0;
        }

        .trusted-marquee-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
          min-width: 0;
        }

        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .trusted-track {
          display: flex;
          align-items: center;
          gap: 72px;
          width: max-content;
          animation: marquee-scroll 50s linear infinite;
        }

        .trusted-track:hover {
          animation-play-state: paused;
        }

        .trusted-company-name {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          color: #5f6369;
          flex-shrink: 0;
          cursor: default;
          user-select: none;
          opacity: 0.7;
          transition: opacity 0.25s ease;
        }

        .trusted-company-name:hover {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .trusted-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            width: 90%;
          }

          .trusted-section {
            padding: 28px 0;
          }

          .trusted-divider { display: none; }

          .trusted-marquee-wrap {
            width: 100%;
          }

          .trusted-track {
            gap: 52px;
            animation-duration: 50s;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="trusted-section"
        aria-label="Integrated with"
        style={{ opacity: 0 }}
      >
        <div className="trusted-inner">
          <span className="trusted-label">Integrated with</span>
          <div className="trusted-divider" aria-hidden="true" />

          <div className="trusted-marquee-wrap" aria-hidden="true">
            <div className="trusted-track">
              {track.map((name, i) => (
                <span key={i} className="trusted-company-name">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}