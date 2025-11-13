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
                style={
                    theme === 'dark'
                        ? {
                            background: `url('/images/img2.jpg') center center/cover no-repeat`
                        }
                        : {
                            background: `
                                linear-gradient(
                                    to top,
                                    rgba(17,17,17,0.7) 0%,
                                    rgba(17,17,17,0.3) 40%,
                                    rgba(17,17,17,0.7) 100%
                                ),
                                url('/images/img2.jpg') center center/cover no-repeat
                            `
                        }
                }
            />
            {/* Overlay for text visibility */}
            <div
                className={`absolute inset-0 z-[2] ${theme === 'dark' ? 'bg-black/60' : 'bg-black/30'}`}
            />
            {/* Text Content */}
            <div className="relative z-[3] flex flex-col items-center justify-center h-full w-full text-center px-4 max-w-2xl mx-auto">
                <h1
                    className="text-4xl md:text-6xl font-extrabold mb-6 text-[#ededed]"
                    style={
                        theme === 'dark'
                            ? {
                                textShadow: 
                                  '0 0 8px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.3)'
                              }
                            : {
                                textShadow: '0 4px 24px rgba(0,0,0,0.7), 0 1.5px 0 #222'
                              }
                    }
                >
                    Welcome to the PUCC Family
                </h1>
                <p
                    className="text-lg md:text-2xl text-white drop-shadow-md"
                    style={
                        theme === 'dark'
                            ? {
                                textShadow: '0 0 6px rgba(255,255,255,0.5)'
                              }
                            : {}
                    }
                >
                    Celebrating unity, learning, and innovation. Together, we grow stronger as a community of passionate minds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link
                        to="/about"
                        className={
                            theme === 'dark'
                                ? 'font-semibold px-8 py-3 rounded-full shadow-md transition transform hover:scale-105 duration-200 bg-gray-800/90 text-white hover:bg-gray-700'
                                : 'bg-white/90 text-[#111] font-semibold px-8 py-3 rounded-full shadow hover:bg-white transition'
                        }
                    >
                        Learn More
                    </Link>
                    <Link
                        to="/register"
                        className={
                            theme === 'dark'
                                ? 'font-semibold px-8 py-3 rounded-full border shadow-md transition transform hover:scale-105 duration-200 bg-gray-700/80 text-white border-gray-600 hover:bg-gray-600'
                                : 'bg-[#111]/80 text-white font-semibold px-8 py-3 rounded-full border border-white/40 hover:bg-[#222] transition'
                        }
                    >
                        Join Us
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
