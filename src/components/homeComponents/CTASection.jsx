import React from "react";
import { Link } from "react-router-dom"
import { useTheme } from '../../hooks/useTheme';

const CTASection = () => {
  const { theme } = useTheme();
  return (
    <section className={`py-20 text-center shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-primary text-white'}`}>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Join PUCC Today
      </h2>
      <p className={`text-lg md:text-xl mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-white'}`}>
        Be part of a thriving tech community, improve your skills, and work on exciting projects.
      </p>
      <Link to="/register">
        <button className={`px-8 py-3 font-semibold rounded-xl shadow-lg transition transform hover:scale-105 duration-200 cursor-pointer ${theme === 'dark' ? 'bg-primary text-white hover:bg-primary-darker' : 'bg-white text-primary hover:bg-brand-blue-hover-light'}`}>
          Become a Member
        </button>
      </Link>
    </section>
  );
};

export default CTASection;