'use client';

import React, { useEffect, useState } from 'react';
import Footer from "@/sections/Footer";

export default function CookiePolicy() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col justify-between antialiased transition-colors duration-700"
      style={{ backgroundColor: 'rgb(21, 24, 29)', color: '#ffffff' }}
    >
      {/* Main Content Container */}
      <div className="px-6 py-16 md:py-24 flex-grow">
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
              Cookie Policy
            </h1>
          </header>

          {/* Content Section */}
          <main className="space-y-8 text-gray-300 leading-relaxed">
            
            <p className="text-lg text-gray-200">
              This website uses technologies that help us understand how visitors interact with our website and improve the overall experience.
            </p>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                What Are Cookies?
              </h2>
              <p>
                Cookies are small data files stored on your device when you visit a website. They are commonly used to remember preferences, improve functionality, and analyze website usage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                How We Use Cookies
              </h2>
              <p>
                We use privacy-friendly analytics tools to understand website traffic and user behavior. These tools may collect anonymous information such as pages visited, device type, and general usage patterns to help us improve our website and services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Third-Party Cookies
              </h2>
              <p>
                Some third-party services integrated into our website may use cookies or similar technologies to provide their services. These services operate according to their own privacy policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Managing Cookies
              </h2>
              <p>
                You can control or disable cookies through your browser settings. However, disabling certain technologies may affect how some websites and services function.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our website, services, or legal requirements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Contact
              </h2>
              <p>
                If you have questions about this Cookie Policy or how we use cookies, please contact us.
              </p>
            </section>

          </main>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}