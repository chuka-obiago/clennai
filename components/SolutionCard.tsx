"use client";

import { useEffect, useRef, useState } from "react";

const FLOW_STEPS = [
  { id: "lead",      label: "New Lead",        sublabel: "Form submitted"          },
  { id: "ai",        label: "AI Qualification", sublabel: "Scoring & enrichment"    },
  { id: "booked",    label: "Meeting Booked",   sublabel: "Calendar invite sent"    },
  { id: "crm",       label: "CRM Updated",      sublabel: "Deal created in HubSpot" },
];

const FEATURES_DESKTOP = [
  "AI lead qualification",
  "Automatic booking",
  "CRM synchronization",
  "Instant notifications",
];

const STEP_DURATION = 1000;
const LINE_DURATION = 450;

export default function SolutionCard() {
  const [activeStep, setActiveStep]   = useState(0);
  const [lineActive, setLineActive]   = useState<number | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const cardRef  = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setCardVisible(true), 80);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Flow animation loop
  useEffect(() => {
    let step = 0;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      setActiveStep(step);
      setLineActive(null);

      timerRef.current = setTimeout(() => {
        if (cancelled) return;
        const next = (step + 1) % FLOW_STEPS.length;

        if (next !== 0) {
          setLineActive(step);
          timerRef.current = setTimeout(() => {
            if (cancelled) return;
            step = next;
            run();
          }, LINE_DURATION);
        } else {
          setLineActive(null);
          timerRef.current = setTimeout(() => {
            if (cancelled) return;
            step = 0;
            run();
          }, 400);
        }
      }, STEP_DURATION);
    };

    run();
    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .sc-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0 0 80px;
          background-color: #f9fafb;
        }

        .sc-card {
          width: 80%;
          max-width: 1200px;
          background: transparent;
          border-radius: 24px;
          display: grid;
          grid-template-columns: 40% 60%;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(74, 127, 165, 0.08);
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sc-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── LEFT ── */
        .sc-left {
          padding: 40px 48px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(74, 127, 165, 0.1);
          border-right: none;
          border-radius: 24px 0 0 24px;
        }

        .sc-label {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4a7fa5;
          margin-bottom: 12px;
        }

        .sc-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(20px, 2.2vw, 30px);
          font-weight: 700;
          color: #0f1923;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0 0 16px;
        }

        .sc-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: #5a6475;
          line-height: 1.7;
          margin: 0 0 28px;
        }

        .sc-features {
          list-style: none;
          margin: 0 0 36px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sc-feature {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sc-feature-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(74, 127, 165, 0.08);
          border: 1px solid rgba(74, 127, 165, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 9px;
          color: #4a7fa5;
        }

        .sc-features { display: flex; }

        .sc-cta {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #4a7fa5;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.01em;
          transition: gap 0.2s ease, opacity 0.2s ease;
          width: fit-content;
        }

        .sc-cta:hover { gap: 10px; opacity: 0.75; }

        /* ── RIGHT ── */
        .sc-right {
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-left: none;
          border-radius: 0 24px 24px 0;
          position: relative;
          overflow: hidden;
        }

        .sc-right::before {
          content: '';
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(74, 127, 165, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .sc-statusbar {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          max-width: 300px;
          margin-bottom: 14px;
          position: relative;
          z-index: 2;
        }

        .sc-statusbar-badge {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: #4a7fa5;
          background: rgba(74, 127, 165, 0.1);
          border: 1px solid rgba(74, 127, 165, 0.22);
          border-radius: 100px;
          padding: 3px 9px;
          letter-spacing: 0.06em;
        }

        .sc-flow {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 300px;
          position: relative;
          z-index: 1;
        }

        .sc-connector {
          width: 2px;
          height: 28px;
          background: rgba(74, 127, 165, 0.15);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .sc-connector-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background: linear-gradient(to bottom, #4a7fa5, rgba(74, 127, 165, 0.3));
          border-radius: 2px;
        }

        .sc-connector-fill.glowing {
          animation: line-fill var(--line-dur, 450ms) cubic-bezier(0.25, 0, 0.5, 1) forwards;
        }

        @keyframes line-fill {
          0%   { height: 0%;   opacity: 1; }
          100% { height: 100%; opacity: 1; }
        }

        .sc-flow-step {
          width: 100%;
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(74, 127, 165, 0.1);
          border-radius: 12px;
          padding: 13px 18px;
          display: flex;
          align-items: center;
          gap: 13px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition:
            border-color 0.45s ease,
            box-shadow 0.45s ease,
            background 0.45s ease;
        }

        .sc-flow-step.active {
          border-color: rgba(74, 127, 165, 0.45);
          background: rgba(255, 255, 255, 0.97);
          box-shadow:
            0 0 0 3px rgba(74, 127, 165, 0.06),
            0 4px 16px rgba(74, 127, 165, 0.12);
        }

        .sc-step-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(74, 127, 165, 0.2);
          flex-shrink: 0;
          transition: background 0.45s ease, box-shadow 0.45s ease;
        }

        .sc-flow-step.active .sc-step-dot {
          background: #4a7fa5;
          box-shadow: 0 0 7px rgba(74, 127, 165, 0.5);
        }

        .sc-step-text { display: flex; flex-direction: column; gap: 2px; }

        .sc-step-name {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #a0aab8;
          letter-spacing: 0.01em;
          transition: color 0.45s ease;
        }

        .sc-flow-step.active .sc-step-name { color: #0f1923; }

        .sc-step-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: #c8d0da;
          transition: color 0.45s ease;
        }

        .sc-flow-step.active .sc-step-sub { color: #6b7a8d; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .sc-wrap { padding: 0 0 60px; }

          .sc-card {
            width: 90%;
            grid-template-columns: 1fr;
            border-radius: 20px;
            box-shadow: 0 6px 24px rgba(74, 127, 165, 0.08);
          }

          .sc-left {
            padding: 32px 28px 28px;
            border-right: 1px solid rgba(74, 127, 165, 0.1);
            border-bottom: none;
            border-radius: 20px 20px 0 0;
          }

          .sc-right {
            border-left: 1px solid rgba(74, 127, 165, 0.12);
            border-top: none;
            border-radius: 0 0 20px 20px;
            padding: 28px 28px 36px;
            min-height: 340px;
          }

          .sc-features { display: none; }
          .sc-desc { margin-bottom: 12px; }
        }
      `}</style>

      <div className="sc-wrap">
        <div ref={cardRef} className={`sc-card${cardVisible ? " visible" : ""}`}>

          {/* ── LEFT ── */}
          <div className="sc-left">
            <p className="sc-label">Solution</p>
            <h2 className="sc-title">AI Lead Qualification &amp; Booking System</h2>
            <p className="sc-desc">
              Automatically qualify inbound leads, schedule meetings, and sync customer data to your CRM.
            </p>

            <ul className="sc-features">
              {FEATURES_DESKTOP.map((f) => (
                <li key={f} className="sc-feature">
                  <span className="sc-feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a href="#contact" className="sc-cta">
              Talk to us <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* ── RIGHT ── */}
          <div className="sc-right">
            <div className="sc-statusbar">
              <span className="sc-statusbar-badge">AUTO</span>
            </div>

            <div className="sc-flow">
              {FLOW_STEPS.map((step, i) => (
                <div key={step.id} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {i > 0 && (
                    <div className="sc-connector">
                      <div
                        className={`sc-connector-fill${lineActive === i - 1 ? " glowing" : ""}`}
                        style={{ "--line-dur": `${LINE_DURATION}ms` } as React.CSSProperties}
                      />
                    </div>
                  )}
                  <div className={`sc-flow-step${activeStep === i ? " active" : ""}`}>
                    <span className="sc-step-dot" />
                    <div className="sc-step-text">
                      <span className="sc-step-name">{step.label}</span>
                      <span className="sc-step-sub">{step.sublabel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}