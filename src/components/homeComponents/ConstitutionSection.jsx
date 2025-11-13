import React from "react";
import { useTheme } from '../../hooks/useTheme';

const ConstitutionSection = () => {
    const { theme } = useTheme();
    return (
        <section className={`py-20 px-8 md:px-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'}`}>
            <div className="max-w-4xl mx-auto text-center">
                <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#0067b6]'}`}>
                    Club Constitution
                </h2>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    PUCC operates under a well-defined constitution to ensure transparency, fairness, and inclusivity. Learn about our rules, regulations, and structure.
                </p>
                <a
                    href="/constitution.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-3 rounded-xl shadow-lg transition transform hover:scale-105 duration-200 text-white ${
                        theme === 'dark' 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-[#0067b6] hover:bg-blue-700'
                    }`}
                >
                    View Full Constitution
                </a>
            </div>
        </section>
    );
};

export default ConstitutionSection;
