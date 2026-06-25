"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import IntegratedWith from "@/sections/IntegratedWith";

export default function Hero2() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const runAnimation = useCallback(() => {
    const items = [
      { el: badgeRef.current, delay: 0.1 },
      { el: headingRef.current, delay: 0.25 },
      { el: subRef.current, delay: 0.4 },
      { el: ctaRef.current, delay: 0.55 },
    ];

    items.forEach(({ el }) => {
      if (!el) return;
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.filter = "blur(16px)";
      el.style.transform = "translateY(12px)";
    });

    items.forEach(({ el }) => el && el.getBoundingClientRect());

    items.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.transition = `
        opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
        filter 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
        transform 1.0s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
      `;
      el.style.opacity = "1";
      el.style.filter = "blur(0px)";
      el.style.transform = "translateY(0)";
    });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(runAnimation));
    const handleVisibility = () => {
      if (document.visibilityState === "visible") runAnimation();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [runAnimation]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Outfit:wght@300;400;500;600&display=swap');

        .reveal-item {
          opacity: 0;
          filter: blur(16px);
          transform: translateY(12px);
          will-change: opacity, filter, transform;
        }

        .hero-section {
          position: relative;
          width: 100%;
          // height: clamp(750px, 85vw, 780px);
          height : 100dvh;
          min-height: 650px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
          padding: 0 24px;
          text-align: center;
          background-image: url('/ChatGPTImageWebsiteBG.webp');
          background-size: cover;
          background-position: center 60%;
          background-repeat: no-repeat;
          background-color: #1b373b; 
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 40%, transparent 20%, rgba(27, 55, 59, 0.9) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge-text {
          font-size: clamp(11px, 1.5vw, 13px);
          font-weight: 500;
          color: #c3e6e1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.9;
          margin-bottom: 24px;
        }

        .hero-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 6.5vw, 70px);
          font-weight: 500;
          line-height: 1.12;
          color: #f0eeee;
          margin: 0 0 28px;
          letter-spacing: -0.02em;
          max-width: 840px;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
        }

        .hero-heading-line {
          display: block;
          white-space: nowrap;
        }

        .hero-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(15px, 2vw, 18px);
          font-weight: 300;
          line-height: 1.65;
          color: #e9efee;
          max-width: 500px;
          margin: 0 0 44px;
          letter-spacing: 0.01em;
          opacity: 0.95;
        }

        .hero-trusted {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 10;
        }

        @media (max-width: 640px) {
          .hero-section { padding: 0 20px; }
          .hero-sub { padding: 0 20px; }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-content">
          <div ref={badgeRef} className="hero-badge-text reveal-item">
            Harnessing AI
          </div>

          <h1 ref={headingRef} className="hero-heading reveal-item">
            <span className="hero-heading-line">AI-Powered Systems</span>
            <span className="hero-heading-line">Built for Scale</span>
          </h1>

          <p ref={subRef} className="hero-sub reveal-item">
            We help businesses automate lead generation, outreach and sales pipelines to scale using AI
          </p>

          <div ref={ctaRef} className="reveal-item">
            <Button
              text="Book a Strategy Call"
              onClick={() => window.open("https://calendly.com/chukaobiago/30min", "_blank", "noopener,noreferrer")}
            />
          </div>
        </div>

        <div className="hero-trusted">
          {/* <TrustedBy /> */}
          <IntegratedWith />
        </div>
        
      </section>
    </>
  );
}