"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

interface FormFields {
  name: string;
  email: string;
  companyName: string;
  companyWebsite: string;
  challenge: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  companyName?: string;
  challenge?: string;
}

const ACCENT = "#4a7fa5";

function RequiredMark() {
  return <span style={{ color: ACCENT, marginLeft: 2 }}>*</span>;
}

export default function ContactForm() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    challenge: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormFields, boolean>>
  >({});

  // Scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Sticky left column positioning
  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    if (!section || !left) return;

    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect();
      const leftRect = left.getBoundingClientRect();
      const isDesktop = window.innerWidth > 768;

      if (!isDesktop) {
        left.style.position = "";
        left.style.top = "";
        left.style.width = "";
        return;
      }

      if (sectionRect.top <= 80 && sectionRect.bottom >= leftRect.height + 80) {
        left.style.position = "sticky";
        left.style.top = "80px";
      } else {
        left.style.position = "";
        left.style.top = "";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validate = (f: FormFields): FormErrors => {
    const errs: FormErrors = {};
    if (!f.name.trim()) errs.name = "Please enter your first name.";
    if (!f.email.trim()) {
      errs.email = "Please enter your business email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!f.companyName.trim())
      errs.companyName = "Please enter your company name.";
    if (!f.challenge.trim())
      errs.challenge = "Please describe your current challenge.";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...fields, [name]: value };
    setFields(updated);
    if (touched[name as keyof FormFields]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(fields));
  };

  const handleSubmit = async () => {
    // Prevent duplicate triggers if submissions are already mid-flight
    if (submitting) return;

    if (honeypot.trim() !== "") {
      return;
    }

    const allTouched = {
      name: true,
      email: true,
      companyName: true,
      challenge: true,
    };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitError("");
    setSubmitting(true);

    try {
      const payload = {
        name: fields.name,
        email: fields.email,
        company: fields.companyName,
        website: fields.companyWebsite.trim() || "n/a",
        message: fields.challenge,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Submission failed");
      }

      router.push("/success");
    } catch (err) {
      setSubmitError(
        "Something went wrong sending your message. Please try again."
      );
      setSubmitting(false); // Re-enable the form only on explicit runtime errors
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="cf-section">
      <div className={`cf-container ${visible ? "cf-visible" : ""}`}>
        <div className="cf-left" ref={leftRef}>
          <h2 className="cf-heading">
            Ready for your <span className="cf-accent">AI Solution?</span>
          </h2>
          <p className="cf-sub">
            Let&apos;s find the money your business is leaving on the table.
          </p>
        </div>

        <div className="cf-card">
          <div className="cf-field-group">
            <div className="cf-honeypot" aria-hidden="true">
              <label htmlFor="company_role">Company Role</label>
              <input
                id="company_role"
                type="text"
                name="company_role"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="cf-field">
              <label className="cf-label">
                Name<RequiredMark />
              </label>
              <input
                className={`cf-input ${
                  errors.name && touched.name ? "cf-input-error" : ""
                }`}
                type="text"
                name="name"
                placeholder="Your first name"
                value={fields.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="given-name"
                disabled={submitting}
              />
              {errors.name && touched.name && (
                <span className="cf-error">{errors.name}</span>
              )}
            </div>

            <div className="cf-field">
              <label className="cf-label">
                Email<RequiredMark />
              </label>
              <input
                className={`cf-input ${
                  errors.email && touched.email ? "cf-input-error" : ""
                }`}
                type="email"
                name="email"
                placeholder="Your business email"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                disabled={submitting}
              />
              {errors.email && touched.email && (
                <span className="cf-error">{errors.email}</span>
              )}
            </div>

            <div className="cf-field">
              <label className="cf-label">
                Company Name<RequiredMark />
              </label>
              <input
                className={`cf-input ${
                  errors.companyName && touched.companyName
                    ? "cf-input-error"
                    : ""
                }`}
                type="text"
                name="companyName"
                placeholder="Your company name"
                value={fields.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="organization"
                disabled={submitting}
              />
              {errors.companyName && touched.companyName && (
                <span className="cf-error">{errors.companyName}</span>
              )}
            </div>

            <div className="cf-field">
              <label className="cf-label">Company Website</label>
              <input
                className="cf-input"
                type="text"
                name="companyWebsite"
                placeholder="example.com"
                value={fields.companyWebsite}
                onChange={handleChange}
                autoComplete="url"
                disabled={submitting}
              />
            </div>

            <div className="cf-field">
              <label className="cf-label">
                Tell us about your current challenge?<RequiredMark />
              </label>
              <textarea
                className={`cf-textarea ${
                  errors.challenge && touched.challenge ? "cf-input-error" : ""
                }`}
                name="challenge"
                placeholder="Share details about your specific obstacles or pain points"
                value={fields.challenge}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                disabled={submitting}
              />
              {errors.challenge && touched.challenge && (
                <span className="cf-error">{errors.challenge}</span>
              )}
            </div>
          </div>

          {submitError && (
            <p className="cf-submit-error" role="alert">
              {submitError}
            </p>
          )}

          <div className="cf-submit-wrap">
            <Button
              text={submitting ? "Sending…" : "Get Started"}
              onClick={handleSubmit}
              disabled={submitting}
              textColor="#ffffff"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .cf-section {
          width: 100%;
          background: rgb(21, 24, 29);
          padding: 100px 0;
          display: flex;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
        }

        .cf-container {
          width: 80%;
          max-width: 1160px;
          display: flex;
          align-items: flex-start;
          gap: 72px;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .cf-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cf-left {
          flex: 0 0 38%;
          align-self: flex-start;
          padding-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cf-heading {
          font-size: clamp(2rem, 3.4vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .cf-accent {
          color: #4a7fa5;
        }

        .cf-sub {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #9ca3af;
          margin: 0;
        }

        .cf-card {
          flex: 1;
          background: #161a20;
          border: 1px solid #262b33;
          border-radius: 16px;
          padding: 36px 32px 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .cf-field-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cf-honeypot {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          left: -9999px;
        }

        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .cf-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #e5e7eb;
          letter-spacing: 0.01em;
        }

        .cf-input,
        .cf-textarea {
          background: #1e232b;
          border: 1.5px solid #2e3440;
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 0.95rem;
          font-family: 'Outfit', sans-serif;
          color: #f3f4f6;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          resize: none;
          width: 100%;
          box-sizing: border-box;
        }

        .cf-input::placeholder,
        .cf-textarea::placeholder {
          color: #4b5563;
        }

        .cf-input:focus,
        .cf-textarea:focus {
          border-color: ${ACCENT};
          box-shadow: 0 0 0 3px ${ACCENT}22;
        }

        .cf-input-error {
          border-color: #ef4444 !important;
        }

        .cf-input-error:focus {
          box-shadow: 0 0 0 3px #ef444422 !important;
        }

        .cf-error {
          font-size: 0.8rem;
          color: #ef4444;
          margin-top: 2px;
        }

        .cf-submit-error {
          font-size: 0.875rem;
          color: #ef4444;
          margin: 0;
          text-align: center;
        }

        .cf-submit-wrap {
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .cf-section {
            padding: 72px 0;
          }

          .cf-container {
            width: 88%;
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .cf-left {
            flex: none;
            width: 100%;
            position: static !important;
            top: auto !important;
          }

          .cf-heading {
            font-size: clamp(1.8rem, 7vw, 2.4rem);
          }

          .cf-card {
            width: 100%;
            padding: 28px 20px 24px;
          }

          .cf-submit-wrap {
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cf-container {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}