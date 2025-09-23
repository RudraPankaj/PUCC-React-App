import React from "react";
import { Link } from "react-router-dom"

const CTASection = () => {
  return (
    <section className="bg-[#0067b6] text-white py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Join PUCC Today
      </h2>
      <p className="text-lg md:text-xl mb-6">
        Be part of a thriving tech community, improve your skills, and work on exciting projects.
      </p>
      <Link to="/register">
        <button className="px-8 py-3 bg-white text-[#0067b6] font-semibold rounded-lg shadow hover:bg-gray-100 transition cursor-pointer">
          Become a Member
        </button>
      </Link>
    </section>
  );
};

export default CTASection;