'use client';

import React, { useEffect, useState } from 'react';
import Footer from "@/sections/Footer";

export default function TermsOfService() {
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
              Updated: June 18, 2026
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Terms of Service
            </h1>
          </header>

          {/* Content Section */}
          <main className="space-y-8 text-gray-300 leading-relaxed">
            
            <p className="text-lg text-gray-200">
              By accessing or using our website and services, you agree to these Terms of Service. Please read them carefully before using our services.
            </p>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Services
              </h2>
              <p>
                We provide AI-powered automation solutions, business systems, and related digital services designed to help businesses improve their workflows, operations, and growth processes. The scope of any service provided will be defined through agreed project details or service agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Use of Website
              </h2>
              <p>
                You agree to use this website for lawful purposes only and not to engage in any activity that may harm, disrupt, or misuse the website or its content.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Client Responsibilities
              </h2>
              <p>
                Clients are responsible for providing accurate information, access, and resources required to deliver requested services. Delays caused by missing information or approvals may affect project timelines.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Payments & Agreements
              </h2>
              <p>
                Any pricing, payment terms, deliverables, and timelines will be agreed upon before work begins. Additional requirements outside the agreed scope may require further discussion and approval.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Intellectual Property
              </h2>
              <p>
                Any materials, systems, designs, or deliverables provided as part of a service remain subject to the terms agreed upon between both parties. Unauthorized use or distribution of our materials is not permitted.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Limitation of Liability
              </h2>
              <p>
                While we strive to provide reliable solutions, we do not guarantee that all results, improvements, or outcomes will meet specific business expectations. We are not responsible for losses resulting from misuse of our services or reliance on website information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Changes to These Terms
              </h2>
              <p>
                We may update these Terms of Service from time to time. Continued use of our website after updates means you accept the revised terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Contact
              </h2>
              <p>
                If you have any questions regarding these Terms of Service, please contact us.
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