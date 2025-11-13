import React from "react";
import { useTheme } from '../../hooks/useTheme';

const committee = [
  { name: "Alice Smith", position: "President", photo: "/images/avatar.jpg" },
  { name: "Bob Johnson", position: "VP", photo: "/images/avatar.jpg" },
  { name: "Carol Lee", position: "Treasurer", photo: "/images/avatar.jpg" },
  { name: "David Kim", position: "Secretary", photo: "/images/avatar-f.jpg" },
];

const CommitteeSection = () => {
  const { theme } = useTheme();
  return (
    <section className={`py-20 px-8 md:px-20 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-white to-blue-50'}`}>
      <h2 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>
        Executive Committee
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {committee.map((member, i) => (
          <div key={i} className={`text-center p-4 rounded-lg shadow-lg hover:scale-105 transition ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white'}`}>
            <img 
              src={member.photo} 
              alt={member.name} 
              loading="lazy"
              width="128" height="128"
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover" 
            />
            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-text-primary'}`}>{member.name}</h4>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-text-secondary'}`}>{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommitteeSection;