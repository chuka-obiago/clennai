"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const NAV_LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Our Process", href: "/our-process" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // "idle" → not yet decided | "animate" → play intro | "visible" → skip intro
  const [animState, setAnimState] = useState<"idle" | "animate" | "visible">("idle");
  const router = useRouter(); 

  useEffect(() => {
    // sessionStorage is wiped on every full page reload, so absence of the
    // flag means this is a genuine reload / first visit → play the animation.
    // On soft client-side navigation the Navbar never unmounts, so this effect
    // never re-runs and the animation never re-triggers mid-session.
    const already = sessionStorage.getItem("nav-animated");
    if (!already) {
      sessionStorage.setItem("nav-animated", "1");
      const t = setTimeout(() => setAnimState("animate"), 60);
      return () => clearTimeout(t);
    } else {
      setAnimState("visible");
    }
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 15);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navigate = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  // Hard reload: clears the sessionStorage flag so the animation plays again,
  // scrolls to top, and does a full page reload to "/".
  const handleLogoClick = () => {
    setMenuOpen(false);
    sessionStorage.removeItem("nav-animated");
    window.location.href = "/";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500&display=swap');

        @keyframes nav-drop {
          from {
            opacity: 0;
            transform: translateY(-18px);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        @keyframes nav-fade {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nav-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 18px 0;
          border-bottom: 1px solid transparent;
          opacity: 0;
          transition:
            padding 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            background 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            backdrop-filter 0.45s ease,
            box-shadow 0.45s ease,
            border-color 0.45s ease;
        }

        /* animate = play the drop-in sequence */
        .nav-root.animate {
          animation: nav-drop 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
        }

        /* no-animate = just make it visible instantly, no keyframes */
        .nav-root.no-animate {
          opacity: 1;
        }

        .nav-root.scrolled {
          padding: 12px 0;
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        }

        .nav-bar {
          width: 80%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          cursor: pointer;
          text-decoration: none;
          user-select: none;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .nav-root.animate .nav-logo {
          animation: nav-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }

        .nav-root.no-animate .nav-logo {
          opacity: 1;
        }

        .nav-logo:hover { opacity: 0.8 !important; }

        /* Desktop links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 6px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link-item { opacity: 0; }

        .nav-root.animate .nav-link-item:nth-child(1) {
          animation: nav-fade 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s both;
        }
        .nav-root.animate .nav-link-item:nth-child(2) {
          animation: nav-fade 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.46s both;
        }
        .nav-root.animate .nav-link-item:nth-child(3) {
          animation: nav-fade 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.54s both;
        }

        .nav-root.no-animate .nav-link-item { opacity: 1; }

        .nav-link {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.82);
          text-decoration: none;
          padding: 7px 16px;
          border-radius: 100px;
          cursor: pointer;
          transition: color 0.25s ease, background 0.25s ease;
          white-space: nowrap;
          display: block;
        }
        .nav-link:hover {
          color: #ffffff;
          background: rgba(0, 0, 0, 0.3);
        }

        /* CTA */
        .nav-cta {
          flex-shrink: 0;
          opacity: 0;
        }

        .nav-root.animate .nav-cta {
          animation: nav-fade 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.62s both;
        }

        .nav-root.no-animate .nav-cta { opacity: 1; }

        /* Hamburger */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 44px;
          height: 44px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          gap: 5px;
          flex-shrink: 0;
          position: relative;
          z-index: 1002;
          opacity: 0;
        }

        .nav-root.animate .nav-hamburger {
          animation: nav-fade 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s both;
        }

        .nav-root.no-animate .nav-hamburger { opacity: 1; }

        .nav-hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #ffffff;
          border-radius: 2px;
          transform-origin: center;
          transition:
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.3s ease,
            width 0.3s ease;
        }

        .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile overlay */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 1001;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(18, 36, 40, 0.96);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition:
            opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .mobile-menu-top {
          width: 80%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
          flex-shrink: 0;
        }

        .mobile-close-btn {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 44px;
          height: 44px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          gap: 5px;
        }

        .mobile-close-btn span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #ffffff;
          border-radius: 2px;
          transform-origin: center;
        }

        .mobile-close-btn span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .mobile-close-btn span:nth-child(2) { opacity: 0; }
        .mobile-close-btn span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .mobile-nav-links {
          width: 80%;
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 32px;
        }

        .mobile-nav-link {
          font-family: 'Syne', sans-serif;
          font-size: clamp(18px, 4.5vw, 26px);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          cursor: pointer;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          letter-spacing: -0.02em;
          opacity: 0;
          transform: translateX(-16px);
          transition:
            color 0.25s ease,
            padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu.open .mobile-nav-link:nth-child(1) { opacity: 1; transform: translateX(0); transition-delay: 0.08s; }
        .mobile-menu.open .mobile-nav-link:nth-child(2) { opacity: 1; transform: translateX(0); transition-delay: 0.14s; }
        .mobile-menu.open .mobile-nav-link:nth-child(3) { opacity: 1; transform: translateX(0); transition-delay: 0.20s; }

        .mobile-nav-link:hover {
          color: #ffffff;
          padding-left: 8px;
        }

        .mobile-cta {
          margin-top: auto;
          margin-bottom: 52px;
          display: flex;
          justify-content: center;
          width: 100%;
          opacity: 0;
          transform: translateY(10px);
          transition:
            opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.28s,
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.28s;
        }

        .mobile-menu.open .mobile-cta {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav
        className={[
          "nav-root",
          scrolled ? "scrolled" : "",
          animState === "animate" ? "animate" : "",
          animState === "visible" ? "no-animate" : "",
        ].filter(Boolean).join(" ")}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-bar">
          <a
            className="nav-logo"
            onClick={handleLogoClick}
            role="link"
            aria-label="ClennAI home"
            style={{ cursor: "pointer" }}
          >
            ClennAI
          </a>

          <ul className="nav-links" role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="nav-link-item" role="none">
                <span
                  className="nav-link"
                  role="menuitem"
                  onClick={() => navigate(link.href)}
                >
                  {link.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <Button
              text="Book a Strategy Call"
              onClick={() => navigate("/contact")}
            />
          </div>

          <button
            className={`nav-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-menu-top">
          <a
            className="nav-logo"
            onClick={handleLogoClick}
            role="link"
            aria-label="ClennAI home"
            style={{ opacity: 1, cursor: "pointer" }}
          >
            ClennAI
          </a>
          <button
            className="mobile-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <span
              key={link.href}
              className="mobile-nav-link"
              onClick={() => navigate(link.href)}
              role="link"
            >
              {link.label}
            </span>
          ))}
        </nav>

        <div className="mobile-cta">
          <Button
            text="Book a Strategy Call"
            onClick={() => navigate("/contact")}
          />
        </div>
      </div>
    </>
  );
}