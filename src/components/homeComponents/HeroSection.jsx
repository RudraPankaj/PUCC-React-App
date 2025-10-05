import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
    return (
        <div className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-[#111]">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: `
                        linear-gradient(
                            to bottom,
                            rgba(17,17,17,0.7) 0%,
                            rgba(17,17,17,0.3) 40%,
                            rgba(17,17,17,0.7) 100%
                        ),
                        url('/images/img2.jpg') center center/cover no-repeat
                    `,
                }}
            />
            {/* Optional: Subtle overlay for better text visibility */}
            <div className="absolute inset-0 z-[2] bg-black/30" />
            {/* Text Content */}
            <div className="relative z-[3] flex flex-col items-center justify-center h-full w-full text-center px-4">
                <h1
                    className="text-4xl md:text-6xl font-extrabold text-white mb-6"
                    style={{
                        textShadow: '0 4px 24px rgba(0,0,0,0.7), 0 1.5px 0 #222'
                    }}
                >
                    Welcome to the PUCC Family
                </h1>
                <p className="text-lg md:text-2xl text-white max-w-2xl mx-auto drop-shadow-md mb-8">
                    Celebrating unity, learning, and innovation. Together, we grow stronger as a community of passionate minds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/about"
                        className="bg-white/90 text-[#111] font-semibold px-8 py-3 rounded-full shadow hover:bg-white transition"
                    >
                        Learn More
                    </Link>
                    <Link
                        to="/register"
                        className="bg-[#111]/80 text-white font-semibold px-8 py-3 rounded-full border border-white/40 hover:bg-[#222] transition"
                    >
                        Join Us
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;