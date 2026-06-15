export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        
        <h2 className="text-3xl font-bold mb-12">
          Case Studies
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Case Study Card */}
          <div className="bg-white p-6 border rounded-lg">
            <div className="h-40 bg-gray-200 mb-4 rounded" />
            <h3 className="text-xl font-semibold">
              AI Lead Generation System
            </h3>
            <p className="text-gray-600 mt-2">
              Automated outreach system that increased qualified leads by 3x.
            </p>
          </div>

          {/* Case Study Card */}
          <div className="bg-white p-6 border rounded-lg">
            <div className="h-40 bg-gray-200 mb-4 rounded" />
            <h3 className="text-xl font-semibold">
              Customer Support Automation
            </h3>
            <p className="text-gray-600 mt-2">
              AI chatbot reduced response time by 80% and handled 65% of queries.
            </p>
          </div>

          {/* Case Study Card */}
          <div className="bg-white p-6 border rounded-lg">
            <div className="h-40 bg-gray-200 mb-4 rounded" />
            <h3 className="text-xl font-semibold">
              Workflow Automation System
            </h3>
            <p className="text-gray-600 mt-2">
              End-to-end automation of internal operations saving 20+ hours/week.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}