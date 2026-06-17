"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const steps = [
  {
    number: 1,
    title: "Discover",
    description:
      "We take the time to understand your business, identify inefficiencies, and uncover the highest-impact opportunities for AI and automation.",
  },
  {
    number: 2,
    title: "Build",
    description:
      "We design and implement a custom automation system tailored to your workflows, integrating seamlessly with the tools your team already uses.",
  },
  {
    number: 3,
    title: "Scale",
    description:
      "Once deployed, your automation runs around the clock. We continuously monitor, refine, and expand the system as your business grows.",
  },
];

export default function OurProcess() {
  const router = useRouter();
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleStep = (num: number) => {
    setOpenStep((prev) => (prev === num ? null : num));
  };

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#f9fafb" }}
      className="our-process-section"
    >
      <div
        className={`our-process-container ${visible ? "our-process-visible" : ""}`}
      >
        {/* Left column */}
        <div className="our-process-left">
          <h2 className="our-process-heading">
            How we&apos;ll get you to a working{" "}
            <span className="our-process-accent">AI solution</span>
          </h2>
          <div className="our-process-cta">
            <Button
              text="Book a Strategy Call"
              onClick={() => router.push("/contact")}
            />
          </div>
        </div>

        {/* Right column — accordion steps */}
        <div className="our-process-right">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`our-process-step ${visible ? "our-process-step-visible" : ""}`}
              style={{ transitionDelay: visible ? `${0.2 + i * 0.12}s` : "0s" }}
            >
              <button
                className="our-process-step-header"
                onClick={() => toggleStep(step.number)}
                aria-expanded={openStep === step.number}
              >
                <span className="our-process-step-number">{step.number}</span>
                <span className="our-process-step-title">{step.title}</span>
                <span
                  className={`our-process-chevron ${openStep === step.number ? "our-process-chevron-open" : ""}`}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              <div
                className="our-process-step-body"
                style={{
                  maxHeight: openStep === step.number ? "200px" : "0px",
                }}
              >
                <p className="our-process-step-description">
                  {step.description}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="our-process-divider" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .our-process-section {
          width: 100%;
          padding: 100px 0;
          display: flex;
          justify-content: center;
        }

        .our-process-container {
          width: 80%;
          max-width: 1200px;
          display: flex;
          align-items: flex-start;
          gap: 80px;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }

        .our-process-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Left */
        .our-process-left {
          flex: 0 0 38%;
          display: flex;
          flex-direction: column;
          gap: 36px;
          padding-top: 6px;
        }

        .our-process-heading {
          font-size: clamp(2rem, 3.2vw, 2.8rem);
          font-weight: 700;
          line-height: 1.18;
          color: #111827;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .our-process-accent {
          color: #4a7fa5;
        }

        .our-process-cta {
          display: flex;
        }

        /* Right */
        .our-process-right {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Step */
        .our-process-step {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .our-process-step-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .our-process-step-header {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 24px 0;
          text-align: left;
        }

        .our-process-step-header:focus-visible {
          outline: 2px solid #4a7fa5;
          outline-offset: 4px;
          border-radius: 4px;
        }

        .our-process-step-number {
          font-size: 1.05rem;
          font-weight: 600;
          color: #4a7fa5;
          min-width: 20px;
          line-height: 1;
        }

        .our-process-step-title {
          flex: 1;
          font-size: 1.15rem;
          font-weight: 600;
          color: #111827;
          letter-spacing: -0.01em;
        }

        .our-process-chevron {
          color: #9ca3af;
          display: flex;
          align-items: center;
          transition: transform 0.3s ease, color 0.2s ease;
        }

        .our-process-chevron-open {
          transform: rotate(180deg);
          color: #4dd9ac;
        }

        /* Dropdown body */
        .our-process-step-body {
          overflow: hidden;
          transition: max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .our-process-step-description {
          padding: 0 0 24px 40px;
          margin: 0;
          font-size: 0.975rem;
          line-height: 1.7;
          color: #4b5563;
        }

        .our-process-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 0;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .our-process-section {
            padding: 72px 0;
          }

          .our-process-container {
            width: 88%;
            flex-direction: column;
            gap: 48px;
          }

          .our-process-left {
            flex: none;
            width: 100%;
            gap: 28px;
          }

          .our-process-heading {
            font-size: clamp(1.75rem, 6vw, 2.2rem);
          }

          .our-process-step-description {
            padding: 0 0 20px 36px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .our-process-container,
          .our-process-step,
          .our-process-chevron {
            transition: none;
          }
          .our-process-step-body {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}