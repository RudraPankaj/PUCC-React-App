import React from "react";

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
    return (
        <section className="py-20 px-8 md:px-20 bg-white">
            <h2 className="text-4xl font-bold text-center mb-12 text-[#0067b6]">
                Our Wings
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
                {wings.map((wing, i) => (
                    <div
                        key={i}
                        className="p-8 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4"
                        style={{ borderTopColor: "#0067b6" }}
                    >
                        <div className="flex justify-center mb-5">
                            <i
                                className={`bi ${wing.icon} ${wing.color}`}
                                style={{ fontSize: "3rem" }}
                                aria-label={wing.name}
                            ></i>
                        </div>
                        <h3 className="text-2xl font-semibold text-center mb-3 text-[#0067b6]">
                            {wing.name}
                        </h3>
                        <p className="text-gray-600 text-center text-lg min-h-30">{wing.description}</p>
                        <div className="flex justify-center mt-6">
                            <a
                                href="#"
                                className="text-[#0067b6] hover:underline font-medium flex items-center gap-1"
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