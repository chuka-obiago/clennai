"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Footer from "@/sections/Footer";

/**
 * Lightweight scroll-reveal hook.
 * Adds a "is-visible" class once an element crosses into the viewport,
 * then leaves it alone (no re-triggering on scroll back up).
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const outcomes = [
  "Generate more qualified opportunities",
  "Reduce time spent on repetitive tasks",
  "Improve customer response and engagement",
  "Increase operational efficiency",
  "Scale processes without unnecessary overhead",
];

function Checkmark() {
  return (
    <svg
      className="outcome-check"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#4a7fa5" />
      <path
        d="M6 10.2L8.6 12.8L14 7"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  const intro = useReveal<HTMLDivElement>();
  const founder = useReveal<HTMLDivElement>();
  const outcomesSection = useReveal<HTMLDivElement>();
  const approach = useReveal<HTMLDivElement>();

  return (
    <main className="about-page">
      {/* Image Hero */}
      <section className="image-hero" aria-label="About ClennAI">
        <Image
          src="/about_hero.webp"
          alt=""
          fill
          priority
          className="image-hero-bg"
        />
        <div className="image-hero-overlay" />
        <div className="image-hero-content">
          <h1 className="image-hero-text">About ClennAI</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="about-section intro-section">
        <div className="about-inner">
          <div
            ref={intro.ref}
            className={`intro-headline-block reveal ${intro.visible ? "is-visible" : ""}`}
          >
            <h2 className="intro-text">
              Helping Businesses <em>Scale with AI</em>
            </h2>

            <hr className="about-rule" />

            <div className="sub-block">
              <p className="eyebrow">Who we are</p>
              <p className="subheadline">
                ClennAI helps businesses eliminate repetitive work, improve
                efficiency, and unlock growth through practical AI automation
                solutions.
              </p>
              <p className="subheadline">
                We build intelligent systems that connect tools, streamline
                processes, and help teams spend less time on manual tasks and
                more time on high-value work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="about-section founder-section" aria-label="Founder">
        <div className="about-inner">
          <div
            ref={founder.ref}
            className={`founder-grid reveal ${founder.visible ? "is-visible" : ""}`}
          >
            <div className="founder-image-col">
              <div className="founder-image-wrap">
                <Image
                  src="/black_suit_nobg.png"
                  alt="Founder of ClennAI"
                  width={640}
                  height={800}
                  className="founder-image"
                  priority
                />
              </div>
              <p className="founder-name">Chukwuka Obiago</p>
              <p className="founder-title">Founder</p>
            </div>

            <div className="founder-text-col">
              <p className="founder-quote">
                &ldquo;Built on a simple belief: AI should work for the
                business, not the other way around.
                <br />
                ClennAI was founded with the mission of helping businesses
                adopt AI in a practical and meaningful way.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="about-section outcomes-section" aria-label="What We Help Businesses Achieve">
        <div className="about-inner">
          <div
            ref={outcomesSection.ref}
            className={`outcomes-content reveal ${
              outcomesSection.visible ? "is-visible" : ""
            }`}
          >
            <div className="centered-head">
              <p className="eyebrow">Outcomes</p>
              <h2 className="section-heading">What We Help Businesses Achieve</h2>
              <hr className="about-rule" />
            </div>

            <ul className="outcomes-list">
              {outcomes.map((item, i) => (
                <li
                  className="outcome-row"
                  key={item}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <Checkmark />
                  <span className="outcome-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="about-section approach-section" aria-label="Our Approach">
        <div className="about-inner">
          <div
            ref={approach.ref}
            className={`approach-content reveal ${
              approach.visible ? "is-visible" : ""
            }`}
          >
            <p className="eyebrow centered">Our Approach</p>
            <h2 className="approach-heading">
              We believe AI should be practical, not complicated.
            </h2>
            <hr className="about-rule centered" />
            <p className="approach-body">
              Every solution is designed around real business challenges,
              integrating with existing processes to create systems that are
              reliable, scalable, and built for long-term impact.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .about-page {
          background-color: #f9fafb;
          color: #0f1923;
          font-family: "Outfit", sans-serif;
          overflow-x: hidden;
        }

        /* Image Hero */
        .image-hero {
          position: relative;
          width: 100%;
          // height: clamp(280px, 30vw, 350px);
          height: 40dvh;
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .image-hero-bg {
          object-fit: cover;
          z-index: 0;
        }

        .image-hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 14, 18, 0.55);
          z-index: 1;
        }

        .image-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 24px;
        }

        .image-hero-text {
          font-family: "Outfit", sans-serif;
          font-size: clamp(28px, 4.5vw, 44px);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
        }

        .about-section {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 48px 0;
        }

        .about-inner {
          width: 80%;
          max-width: 1100px;
        }

        /* Shared reveal mechanics */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* Shared headline primitives */
        .eyebrow {
          font-family: "Outfit", sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9ba8bb;
          margin: 0;
        }

        .eyebrow.centered {
          text-align: center;
        }

        .about-rule {
          width: 40px;
          height: 2px;
          background: #4a7fa5;
          border: none;
          margin: 0;
          border-radius: 2px;
        }

        .about-rule.centered {
          margin: 0 auto;
        }

        .section-heading {
          font-family: "Outfit", sans-serif;
          font-size: clamp(24px, 3.4vw, 34px);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.25;
          color: #0f1923;
          margin: 0;
        }

        /* Intro */
        .intro-section {
          padding-top: 56px;
        }

        .intro-headline-block {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 720px;
        }

        .intro-text {
          font-family: "Outfit", sans-serif;
          font-size: clamp(26px, 4.2vw, 40px);
          font-weight: 500;
          color: #0f1923;
          letter-spacing: -0.03em;
          line-height: 1.25;
          margin: 0;
        }

        .intro-text em {
          font-style: normal;
          color: #4a7fa5;
        }

        .sub-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .subheadline {
          font-family: "Outfit", sans-serif;
          font-size: clamp(15px, 2vw, 18px);
          font-weight: 400;
          color: #5a6475;
          line-height: 1.6;
          margin: 0;
        }

        /* Founder */
        .founder-grid {
          display: grid;
          grid-template-columns: 0.7fr 1fr;
          align-items: center;
          gap: 56px;
        }

        .founder-image-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .founder-name {
          font-family: "Outfit", sans-serif;
          font-size: 17px;
          font-weight: 500;
          color: #0f1923;
          margin: 0;
          margin-top: -4px;
        }

        .founder-image-wrap {
          position: relative;
          width: 100%;
          max-width: 220px;
          height: 220px;
          overflow: hidden;
          border-radius: 12px;
        }

        .founder-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: top center;
        }

        .founder-title {
          font-family: "Outfit", sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #5a6475;
          margin: 0;
          margin-top: -8px;
        }

        .founder-text-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .founder-quote {
          font-family: "Outfit", sans-serif;
          font-size: clamp(17px, 2.2vw, 21px);
          font-weight: 400;
          line-height: 1.6;
          color: #0f1923;
          margin: 0;
        }

        /* Outcomes */
        .outcomes-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .centered-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }

        .outcomes-list {
          list-style: none;
          padding: 0;
          margin: 24px 0 0;
          max-width: 640px;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .outcome-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 4px;
          border-bottom: 1px solid rgba(15, 25, 35, 0.08);
          opacity: 0;
          transform: translateX(-12px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .outcomes-content.is-visible .outcome-row {
          opacity: 1;
          transform: translateX(0);
        }

        .outcome-row:first-child {
          border-top: 1px solid rgba(15, 25, 35, 0.08);
        }

        .outcome-check {
          flex-shrink: 0;
        }

        .outcome-text {
          font-family: "Outfit", sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: #0f1923;
        }

        /* Approach */
        .approach-section {
          padding-bottom: 140px;
        }

        .approach-content {
          max-width: 640px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }

        .approach-heading {
          font-family: "Outfit", sans-serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: #0f1923;
          margin: 0;
        }

        .approach-body {
          font-family: "Outfit", sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.7;
          color: #5a6475;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 860px) {
          .founder-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            text-align: center;
          }

          .founder-text-col {
            align-items: center;
          }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 36px 0;
          }

          .intro-section {
            padding-top: 40px;
          }

          .approach-section {
            padding-bottom: 96px;
          }

          .about-inner {
            width: 90%;
          }
        }
      `}</style>
    </main>
  );
}