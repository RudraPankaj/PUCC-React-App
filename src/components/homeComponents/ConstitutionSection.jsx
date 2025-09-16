import React from "react";

const ConstitutionSection = () => {
  return (
    <section className="py-20 px-8 md:px-20 bg-blue-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-[#0067b6]">
          Club Constitution
        </h2>
        <p className="text-gray-700 mb-6">
          PUCC operates under a well-defined constitution to ensure transparency, fairness, and inclusivity. Learn about our rules, regulations, and structure.
        </p>
        <a
          href="/constitution.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-[#0067b6] text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          View Full Constitution
        </a>
      </div>
    </section>
  );
};

export default ConstitutionSection;