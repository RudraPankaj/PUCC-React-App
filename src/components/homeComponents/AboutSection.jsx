import React from "react";
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme.jsx';

const AboutSection = () => {
    const { theme } = useTheme();
    return (
        <section className={`flex flex-col md:flex-row items-center justify-center py-24 px-6 md:px-32 rounded-3xl shadow-lg mx-4 my-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-bg-primary'}`}>
            <div className="md:w-1/2 flex justify-center">
                <img
                    src="/images/about-image.jpg"
                    alt="PUCC"
                    className={`w-80 h-80 object-cover rounded-2xl shadow-xl border-4 ${theme === 'dark' ? 'border-gray-700' : 'border-border-color'}`}
                />
            </div>
            <div className="md:w-1/2 md:pl-16 mt-10 md:mt-0 flex flex-col items-start">
                <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg ${theme === 'dark' ? 'text-white' : 'text-text-primary'}`}>
                    About PUCC
                </h2>
                <p className={`mb-8 text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-text-secondary'}`}>
                    PUCC (Premier University Computer Club) brings together passionate
                    learners to excel in competitive programming, software engineering,
                    networking, and deep neural research.
                </p>
                <Link to="/about">
                    <button className={`px-8 py-3 font-semibold rounded-xl shadow-lg hover:scale-105 duration-200 ${theme === 'dark' ? 'bg-primary text-white hover:bg-primary-darker' : 'bg-primary text-white hover:bg-primary-darker'}`}>
                        Learn More
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default AboutSection;