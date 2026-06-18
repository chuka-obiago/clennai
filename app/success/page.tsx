"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="success-wrapper">
      <div className="success-card">
        {/* Luminous Premium Checkmark Badge */}
        <div className="icon-badge" aria-hidden="true">
          <span className="checkmark">✓</span>
        </div>

        <h1 className="success-heading">You&apos;re All Set</h1>
        
        <p className="success-text">
          Thanks for taking the first step with ClennAI.
        </p>
        
        <p className="success-subtext">
          We&apos;ve received your details and will review how we can help 
          your business improve efficiency, automate workflows, and scale with AI.
        </p>
        
        <p className="success-footer-text">
          We&apos;ll be in touch shortly.
        </p>

        <div className="btn-wrap">
          <Button
            text="Back to Homepage"
            onClick={() => router.push("/")}
            textColor="#ffffff"
          />
        </div>
      </div>

      <style jsx>{`
        .success-wrapper {
          width: 100%;
          min-height: 100vh;
          background: rgb(21, 24, 29);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          padding: 24px;
          box-sizing: border-box;
        }

        .success-card {
          max-width: 520px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: blurIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .icon-badge {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(74, 127, 165, 0.1);
          border: 1px solid rgba(74, 127, 165, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
          box-shadow: 0 0 30px rgba(74, 127, 165, 0.15);
        }

        .checkmark {
          color: #4a7fa5;
          font-size: 1.75rem;
          font-weight: bold;
          line-height: 1;
        }

        .success-heading {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }

        .success-text {
          font-size: 1.15rem;
          font-weight: 500;
          color: #e5e7eb;
          margin: 0 0 12px 0;
          line-height: 1.5;
        }

        .success-subtext {
          font-size: 0.975rem;
          line-height: 1.7;
          color: #9ca3af;
          margin: 0 0 16px 0;
        }

        .success-footer-text {
          font-size: 0.975rem;
          font-weight: 500;
          color: #4a7fa5;
          margin: 0 0 40px 0;
        }

        .btn-wrap {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        @keyframes blurIn {
          from {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </main>
  );
}