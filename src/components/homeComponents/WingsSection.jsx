import React from "react";
import { useTheme } from '../../hooks/useTheme';

// Use Bootstrap Icons class names for each wing
const wings = [
    {
        name: "Competitive Programming",
        icon: "bi-code-slash",
        description: "Sharpen your algorithm and problem-solving skills.",
        color: "text-primary",
    },
    {
        name: "Software Engineering",
        icon: "bi-laptop",
        description: "Build real-world projects and learn best practices.",
        color: "text-success",
    },
    {
        name: "Linux Networking",
        icon: "bi-diagram-3",
        description: "Explore servers, networking, and system management.",
        color: "text-warning",
    },
    {
        name: "Deep Neural Research",
        icon: "bi-cpu",
        description: "Dive into AI, ML, and deep learning research.",
        color: "text-danger",
    },
];

const WingsSection = () => {
    const { theme } = useTheme();
    return (
        <section className={`py-20 px-8 md:px-20 ${theme === 'dark' ? 'bg-gray-950' : 'bg-bg-primary'}`}>
            <h2 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>
                Our Wings
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
                {wings.map((wing, i) => (
                    <div
                        key={i}
                        className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 ${theme === 'dark' ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-bg-primary border-primary'}`}
                    >
                        <div className="flex justify-center mb-5">
                            <i
                                className={`bi ${wing.icon} ${wing.color}`}
                                style={{ fontSize: "3rem" }}
                                aria-label={wing.name}
                            ></i>
                        </div>
                        <h3 className={`text-2xl font-semibold text-center mb-3 ${theme === 'dark' ? 'text-white' : 'text-text-primary'}`}>
                            {wing.name}
                        </h3>
                        <p className={`text-center text-lg min-h-30 ${theme === 'dark' ? 'text-gray-400' : 'text-text-secondary'}`}>{wing.description}</p>
                        <div className="flex justify-center mt-6">
                            <a
                                href="#"
                                className={`hover:underline font-medium flex items-center gap-1 ${theme === 'dark' ? 'text-primary hover:text-primary-darker' : 'text-primary hover:text-primary-darker'}`}
                            >
                                See more
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WingsSection;