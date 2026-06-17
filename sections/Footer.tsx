"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const router = useRouter();
  const pathname = usePathname();

  const navigate = (href: string) => {
    // Normal pages
    if (!href.includes("#")) {
      if (pathname === href) {
        // Already on this page → scroll to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      router.push(href);
      return;
    }

    const section = href.split("#")[1];

    // Already on homepage
    if (pathname === "/") {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // Different page with hash
    router.push(href);
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Logo & Statement */}
          <div className="footer-brand-col">
            <span className="footer-logo">ClennAI</span>
            <p className="footer-description">
              Empowering next-generation digital experiences with intelligent, adaptive solutions.
            </p>
          </div>

          {/* Core Navigation Column */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-list">
              <li>
                <span
                  className="footer-link"
                  onClick={() => navigate("/#solutions")}
                  role="link"
                >
                  Solutions
                </span>
              </li>

              <li>
                <span
                  className="footer-link"
                  onClick={() => navigate("/#our-process")}
                  role="link"
                >
                  Our Process
                </span>
              </li>

              <li>
                <span
                  className="footer-link"
                  onClick={() => navigate("/about")}
                  role="link"
                >
                  About Us
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Connect Column */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-list">
              <li><a href="mailto:info@clennai.com" className="footer-link">Email Us</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="footer-divider" />

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} ClennAI. All rights reserved.
          </p>
          
          {/* Legal Links (Bottom Right) */}
          <div className="footer-legal">
            <a href="/privacy" className="legal-link">Privacy Policy</a>
            <a href="/terms" className="legal-link">Terms of Service</a>
            <a href="/cookies" className="legal-link">Cookies</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: #0d0f12;
          color: rgba(248, 250, 252, 0.8);
          font-family: 'Outfit', sans-serif;
          padding: 80px 24px 40px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.02em;
        }

        .footer-description {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(148, 163, 184, 1);
          max-width: 320px;
        }

        .footer-links-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-heading {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #f1f5f9;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link {
          font-size: 15px;
          color: rgba(148, 163, 184, 1);
          text-decoration: none;
          transition: color 0.25s ease, transform 0.25s ease;
          display: inline-block;
          cursor: pointer;
        }

        .footer-link:hover {
          color: #f8fafc;
          transform: translateX(2px);
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .footer-copyright {
          font-size: 14px;
          color: rgba(148, 163, 184, 0.6);
        }

        .footer-legal {
          display: flex;
          gap: 24px;
        }

        .legal-link {
          font-size: 14px;
          color: rgba(148, 163, 184, 0.6);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .legal-link:hover {
          color: #f8fafc;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .footer-brand-col {
            margin-bottom: 12px;
          }

          .footer-bottom {
            flex-direction: column-reverse;
            align-items: center;
            gap: 16px;
          }
        }
      `}</style>
    </footer>
  );
}