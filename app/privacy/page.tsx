'use client';

import React, { useEffect, useState } from 'react';
import Footer from "@/sections/Footer";

export default function PrivacyPolicy() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <div 
        className="min-h-screen px-6 py-16 md:py-24 antialiased transition-colors duration-700"
        style={{ backgroundColor: 'rgb(21, 24, 29)', color: '#ffffff' }}
      >
        <div 
          className={`max-w-3xl mx-auto space-y-8 transition-all duration-1000 ease-out transform ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          
          {/* Header Section */}
          <header className="border-b border-gray-8xl pb-6">
            <p className="text-sm tracking-wide uppercase text-gray-400 mb-2 mt-15">
              Updated: June 25, 2026
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
          </header>

          {/* Content Section */}
          <main className="space-y-8 text-gray-300 leading-relaxed">
            
            <p className="text-lg text-gray-200">
              We respect your privacy and are committed to protecting any information shared through our website.
            </p>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Information We Collect
              </h2>
              <p>
                We may collect information you provide voluntarily, such as your name, email address, company details, or any other information submitted through contact forms, booking forms, or direct communication.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                How We Use Information
              </h2>
              <p>
                Information collected is used to respond to inquiries, provide requested services, communicate with you, and improve our website and services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Website Analytics
              </h2>
              <p>
                We use privacy-friendly analytics to understand how visitors interact with our website and improve the user experience. Analytics data may include general usage information such as pages visited, referral sources, and device information. This data is collected anonymously and is not used to identify individual visitors.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Data Sharing
              </h2>
              <p>
                We do not sell, rent, or share your personal information with third parties for advertising purposes. Information may only be shared when required to provide a service or comply with legal obligations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Contact
              </h2>
              <p>
                If you have questions about this Privacy Policy or how your information is handled, please contact us.
              </p>
            </section>

          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}