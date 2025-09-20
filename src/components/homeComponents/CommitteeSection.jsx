import React from "react";

const committee = [
  { name: "Alice Smith", position: "President", photo: "./src/assets/images/avatar.jpg" },
  { name: "Bob Johnson", position: "VP", photo: "./src/assets/images/avatar.jpg" },
  { name: "Carol Lee", position: "Treasurer", photo: "./src/assets/images/avatar.jpg" },
  { name: "David Kim", position: "Secretary", photo: "./src/assets/images/avatar-f.jpg" },
];

const CommitteeSection = () => {
  return (
    <section className="py-20 px-8 md:px-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#0067b6]">
        Executive Committee
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {committee.map((member, i) => (
          <div key={i} className="text-center p-4 bg-gray-50 rounded-lg shadow hover:scale-105 transition">
            <img src={member.photo} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
            <h4 className="font-semibold">{member.name}</h4>
            <p className="text-gray-600">{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommitteeSection;