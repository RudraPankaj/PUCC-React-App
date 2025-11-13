import React from "react";
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme.jsx';

const AboutSection = () => {
    const { theme } = useTheme();
    return (
        <section className={`flex flex-col md:flex-row items-center justify-center py-24 px-6 md:px-32 rounded-3xl mx-4 my-12 shadow-lg 
            ${theme === 'dark' 
                ? 'bg-gray-800' 
                : 'bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-white shadow-xl'}`}>
            <div className="md:w-1/2 flex justify-center">
                <img
                    src="/images/about-image.jpg"
                    alt="PUCC"
                    className={`w-80 h-80 object-cover rounded-2xl shadow-xl border-4 ${theme === 'dark' ? 'border-gray-700' : 'border-white'}`}
                />
            </div>
            <div className="md:w-1/2 md:pl-16 mt-10 md:mt-0 flex flex-col items-start">
                <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg ${
                    theme === 'dark' 
                        ? 'text-white' 
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-[#0067b6] to-[#00b6d6]'
                }`}>
                    About PUCC
                </h2>
                <p className={`${
                    theme === 'dark' 
                        ? 'text-gray-300' 
                        : 'text-gray-700'
                    } mb-8 text-lg leading-relaxed`}>
                    PUCC (Premier University Computer Club) brings together passionate
                    learners to excel in competitive programming, software engineering,
                    networking, and deep neural research.
                </p>
                <Link to="/about">
                    <button className={`px-8 py-3 font-semibold rounded-xl shadow-lg hover:scale-105 text-white transition-all duration-200 ${
                        theme === 'dark' 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-gradient-to-r from-[#0067b6] to-[#00b6d6] hover:from-[#005a9e] hover:to-[#009ec6]'
                    }`}>
                        Learn More
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default AboutSection;

