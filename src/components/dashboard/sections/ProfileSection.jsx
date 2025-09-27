import React, { useContext } from "react";
import { AuthContext } from "/src/context/AuthContext.jsx";

export default function ProfileCV() {
  const { userData } = useContext(AuthContext);

  return (
    <section className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
        <img
          src={userData.profileimgurl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">{userData.username}</h1>
          <p className="text-lg text-blue-600 font-medium">
            Computer Science & Engineering Student
          </p>
          <p className="text-gray-600 mt-2">{userData.bio || "<No bio added>"}</p>
        </div>
      </div>

      {/* Education */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Education</h2>
        <p className="font-medium text-gray-700">{userData.degree || "B.Sc. in Computer Science & Engineering"}</p>
        <p className="text-gray-600">{userData.institution || "Premier University"} — {userData.batch || "<No session added>"}</p>
      </div>

      {/* Skills */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {(userData.skills || "<No skills added>" )}
        </div>
      </div>

      {/* Projects */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Projects</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {userData.projects || "<No project added>" }
        </ul>
      </div>

      {/* Contact */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-medium"><i className="bi bi-mailbox" /> Email:</span> {userData.email}<i>(private)</i></p>
          <p><span className="font-medium"><i className="bi bi-phone" /> Phone:</span> {userData.contact || "<No contact info added>"}</p>
          <p><span className="font-medium"><i className="bi bi-github" /> GitHub:</span> {userData.github || "<Add github link>"}</p>
          <p><span className="font-medium"><i className="bi bi-linkedin" /> LinkedIn:</span> {userData.linkedin || "<Add linkedin link>"}</p>
        </div>
      </div>
    </section>
  );
}