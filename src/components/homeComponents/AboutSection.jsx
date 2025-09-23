import React from "react";

const AboutSection = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-center py-24 px-6 md:px-32 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-white rounded-3xl shadow-xl mx-4 my-12">
            <div className="md:w-1/2 flex justify-center">
                <img
                    src="/images/about-image.jpg"
                    alt="PUCC"
                    className="w-80 h-80 object-cover rounded-2xl shadow-xl border-4 border-white"
                />
            </div>
            <div className="md:w-1/2 md:pl-16 mt-10 md:mt-0 flex flex-col items-start">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0067b6] to-[#00b6d6] drop-shadow-lg">
                    About PUCC
                </h2>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    PUCC (Premier University Computer Club) brings together passionate
                    learners to excel in competitive programming, software engineering,
                    networking, and deep neural research.
                </p>
                <button className="px-8 py-3 bg-gradient-to-r from-[#0067b6] to-[#00b6d6] text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:from-[#005a9e] hover:to-[#009ec6] transition-all duration-200">
                    Learn More
                </button>
            </div>
        </section>
    );
};

export default AboutSection;