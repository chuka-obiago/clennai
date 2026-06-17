"use client";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  textColor?: string;
}

export default function Button({
  text,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  textColor = "#162e31",
}: ButtonProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`premium-btn ${className}`}
      >
        <span className="btn-text">{text}</span>
        <span className="btn-shine" aria-hidden="true" />
      </button>

      <style jsx>{`
        .premium-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 44px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.55);
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(220, 222, 228, 0.3) 50%,
            rgba(200, 203, 212, 0.35) 100%
          );
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow:
            0 1px 0 0 rgba(255, 255, 255, 0.8) inset,
            0 -1px 0 0 rgba(0, 0, 0, 0.06) inset,
            0 4px 16px rgba(0, 0, 0, 0.07),
            0 1px 3px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          overflow: hidden;
          transition:
            box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            border-color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          outline: none;
          -webkit-font-smoothing: antialiased;
        }

        .btn-text {
          position: relative;
          z-index: 1;
          font-family: -apple-system, "SF Pro Display", "Helvetica Neue",
            sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: ${textColor};
          transition: color 0.4s ease;
          user-select: none;
        }

        /* Shine sweep layer */
        .btn-shine {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 80%
          );
          transform: translateX(-100%);
          transition: transform 0s;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Hover ── */
        .premium-btn:hover {
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(230, 232, 240, 0.45) 50%,
            rgba(210, 213, 224, 0.5) 100%
          );
          border-color: rgba(255, 255, 255, 0.75);
          box-shadow:
            0 1px 0 0 rgba(255, 255, 255, 0.95) inset,
            0 -1px 0 0 rgba(0, 0, 0, 0.05) inset,
            0 8px 28px rgba(0, 0, 0, 0.1),
            0 2px 6px rgba(0, 0, 0, 0.07);
          transform: translateY(-1px);
        }

        .premium-btn:hover .btn-shine {
          transform: translateX(100%);
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── Active / Press ── */
        .premium-btn:active {
          transform: translateY(0px);
          box-shadow:
            0 1px 0 0 rgba(255, 255, 255, 0.75) inset,
            0 -1px 0 0 rgba(0, 0, 0, 0.06) inset,
            0 2px 8px rgba(0, 0, 0, 0.07),
            0 1px 2px rgba(0, 0, 0, 0.05);
          transition:
            box-shadow 0.1s ease,
            transform 0.1s ease;
        }

        /* ── Focus visible (accessibility) ── */
        .premium-btn:focus-visible {
          outline: 2px solid rgba(26, 31, 46, 0.35);
          outline-offset: 3px;
        }

        /* ── Disabled ── */
        .premium-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .premium-btn:disabled:hover {
          box-shadow:
            0 1px 0 0 rgba(255, 255, 255, 0.8) inset,
            0 -1px 0 0 rgba(0, 0, 0, 0.06) inset,
            0 4px 16px rgba(0, 0, 0, 0.07),
            0 1px 3px rgba(0, 0, 0, 0.06);
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(220, 222, 228, 0.3) 50%,
            rgba(200, 203, 212, 0.35) 100%
          );
          border-color: rgba(255, 255, 255, 0.55);
        }
      `}</style>
    </>
  );
}