import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme.jsx';

function HeroSection() {
    const { theme } = useTheme();
    return (
    <section className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: `url('/images/img2.jpg') center center/cover no-repeat`,
                }}
            />
            {/* Optional: Subtle overlay for better text visibility */}
            <div className={`absolute inset-0 z-[2] ${theme === 'dark' ? 'bg-black/60' : 'bg-gradient-to-t from-blue-400/60 to-blue-600/60'}`} />
            {/* Text Content */}
            <div className="relative z-[3] flex flex-col items-center justify-center h-full w-full text-center px-4">
                <h1
                    className={`text-4xl md:text-6xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-white'}`}
                >
                    Welcome to the PUCC Family
                </h1>
                <p className={`text-lg md:text-2xl max-w-2xl mx-auto drop-shadow-md mb-8 ${theme === 'dark' ? 'text-gray-200' : 'text-white'}`}>
                    Celebrating unity, learning, and innovation. Together, we grow stronger as a community of passionate minds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/about"
                        className={`font-semibold px-8 py-3 rounded-full shadow-md transition transform hover:scale-105 duration-200 ${theme === 'dark' ? 'bg-gray-800/90 text-white hover:bg-gray-700' : 'bg-primary text-white hover:bg-primary-darker'}`}
                    >
                        Learn More
                    </Link>
                    <Link
                        to="/register"
                        className={`font-semibold px-8 py-3 rounded-full border shadow-md transition transform hover:scale-105 duration-200 ${theme === 'dark' ? 'bg-gray-700/80 text-white border-gray-600 hover:bg-gray-600' : 'border-white text-white hover:bg-white hover:text-primary'}`}
                    >
                        Join Us
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;