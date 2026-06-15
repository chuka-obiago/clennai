"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const LOGOS = [
  { name: "n8n", src: "/logos/vercel.svg" },
  { name: "OpenAI", src: "/logos/vercel.svg" },
  { name: "Apollo", src: "/logos/vercel.svg" },
  { name: "HubSpot", src: "/logos/vercel.svg" },
  { name: "Airtable", src: "/logos/vercel.svg" },
  { name: "Google Sheets", src: "/logos/vercel.svg" },
  { name: "WhatsApp", src: "/logos/vercel.svg" },
];

export default function TrustedBy() {
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

  // Pad each set so it is wide enough to fill any screen,
  // then duplicate exactly once — translateX(-50%) lands on the seam perfectly.
  const padded = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
  const track  = [...padded, ...padded];

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

        .trusted-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          cursor: default;
          user-select: none;
          opacity: 0.7;
          transition: opacity 0.25s ease;
          /* Dark gray tint via CSS filter */
          filter: brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(60%);
        }

        .trusted-logo:hover {
          opacity: 1;
        }

        .trusted-logo-name {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          color: #868e9e;
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
        aria-label="Trusted by"
        style={{ opacity: 0 }}
      >
        <div className="trusted-inner">
          <span className="trusted-label">Integrated with</span>
          <div className="trusted-divider" aria-hidden="true" />

          <div className="trusted-marquee-wrap" aria-hidden="true">
            <div className="trusted-track">
              {track.map((logo, i) => (
                <div key={i} className="trusted-logo">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={80}
                    height={24}
                    style={{ width: "auto", height: "22px", display: "block" }}
                  />
                  <span className="trusted-logo-name">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}