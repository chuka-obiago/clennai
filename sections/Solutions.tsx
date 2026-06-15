"use client";

import { useEffect, useRef } from "react";
import SolutionCard from "@/components/SolutionCard";
import SolutionCard2 from "@/components/SolutionCard2";

export default function Solutions() {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [headlineRef.current].filter(Boolean) as HTMLElement[];

    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "none";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            setTimeout(() => {
              el.style.transition = `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)`;
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, 60);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500&display=swap');

        .sol-section {
          width: 100%;
          display: flex;
          justify-content: center;
          background-color: #f9fafb;
          padding: 80px 0 70px;
        }

        .sol-inner {
          width: 80%;
          display: flex;
          flex-direction: column;
          gap: 64px;
        }

        /* ── Top headline block ── */
        .sol-headline-block {
          display: flex;
          flex-direction: column;
          gap: 28px;
          max-width: 720px;
        }

        .sol-hero-text {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(16px, 5vw, 48px);
          font-weight: 500;
          color: #0f1923;
          letter-spacing: -0.03em;
          line-height: 1.25;
          margin: 0;
        }

        .sol-hero-text em {
          font-style: normal;
          color: #4a7fa5;
        }

        .sol-hero-line {
          display: block;
          white-space: nowrap;
        }

        .sol-sub-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sol-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9ba8bb;
          margin: 0;
        }

        .sol-subheadline {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(11px, 3.2vw, 18px);
          font-weight: 400;
          color: #5a6475;
          line-height: 1.6;
          margin: 0;
          white-space: nowrap;
        }

        /* ── Divider ── */
        .sol-rule {
          width: 40px;
          height: 2px;
          background: #4a7fa5;
          border: none;
          margin: 0;
          border-radius: 2px;
        }

        /* ── Cards grid ── */
        .sol-grid,
        .sol-card,
        .sol-card-tag,
        .sol-card-headline,
        .sol-card-body { display: none; }

        @media (max-width: 768px) {
          .sol-section {
            padding: 60px 0 50px;  
          }

          .sol-inner {
            width: 90%;
            gap: 48px;
          }

          .sol-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .sol-card {
            padding: 28px 24px;
          }
        }
      `}</style>

      <section className="sol-section" aria-label="Solutions">
        <div className="sol-inner">
          <div ref={headlineRef} className="sol-headline-block">
            <h2 className="sol-hero-text">
              <span className="sol-hero-line">
                AI can do more for your business.
              </span>
              <span className="sol-hero-line">
                <em>You know it,</em> and we know it too.
              </span>
              <span className="sol-hero-line">Let&rsquo;s bridge the gap.</span>
            </h2>

            <hr className="sol-rule" />

            <div className="sol-sub-block">
              <p className="sol-eyebrow">How we can help</p>
              <p className="sol-subheadline">
                Explore our AI solutions designed for every stage of growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SolutionCard />

      <div style={{ backgroundColor: "#f9fafb" }}>
        <div style={{ marginBottom: "32px" }}>
          <SolutionCard2
            title="AI Lead Generation System"
            description="We build a fully automated pipeline that finds and qualifies your ideal customers."
            highlights={[
              { text: "Runs 24/7" },
              { text: "Targets only your ideal customer profile" },
              { text: "Plugs into your existing CRM or inbox" },
            ]}
            ctaHref="#contact"
            backgroundImage="/aiAbstract2.webp"
          />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <SolutionCard2
            title="AI Lead Generation System"
            description="We build a fully automated pipeline that finds and qualifies your ideal customers."
            highlights={[
              { text: "Runs 24/7" },
              { text: "Targets only your ideal customer profile" },
              { text: "Plugs into your existing CRM or inbox" },
            ]}
            ctaHref="#contact"
            backgroundImage="/aiAbstract1.webp"
          />
        </div>

        <SolutionCard2
          title="Custom Solutions"
          description="We build a fully automated pipeline that finds and qualifies your ideal customers."
          highlights={[
            { text: "Runs 24/7" },
            { text: "Targets only your ideal customer profile" },
            { text: "Plugs into your existing CRM or inbox" },
          ]}
          ctaHref="#contact"
          
        />
      </div>
      

    </>
  );
}
