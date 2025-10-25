import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import ProfileEditSection from "./ProfileEditSection.jsx";

export default function ProfileCV() {
  const { userData, setUserData } = useContext(AuthContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [viewData, setViewData] = useState({
    username: "",
    email: "",
    profileimgurl: "",
    contact: "",
    phone: "",
    gender: "",
    school: "",
    bio: "",
    department: "",
    skills: "",
    github: "",
    linkedin: ""
  });

  // Sync local view data whenever userData changes
  useEffect(() => {
    if (userData) setViewData({ ...userData });
  }, [userData]);

  // Fallback avatar
  const avatar =
    viewData.profileimgurl ||
    "https://static.vecteezy.com/system/resources/previews/024/183/513/original/male-avatar-portrait-of-a-young-brunette-male-illustration-of-male-character-in-modern-color-style-vector.jpg";

  return (
    <section className="relative max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#00aae4]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b pb-6">
        <div className="flex items-center flex-col md:flex-row gap-6">
          <img
            src={avatar}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-[#00aae4] shadow"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-800">
              {viewData.username || "Member"}
            </h1>
            <p className="text-lg text-[#0067b6] font-medium">
              Computer Science & Engineering Student
            </p>
            <p className="text-gray-600 mt-2">
              {viewData.bio || "No bio available."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpenEdit(true)}
          className="mt-4 md:mt-0 bg-[#0067b6] text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#005999] transition"
        >
          <i className="bi bi-pencil-square" /> Edit Profile
        </button>
      </div>

      {/* Education */}
      <div className="mt-8 bg-gray-50 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
          <i className="bi bi-mortarboard text-[#0067b6]" /> Education
        </h2>
        <p className="font-medium text-gray-700 mt-3">
          {viewData.department || "Computer Science & Engineering"}
        </p>
        <p className="text-gray-600">
          {viewData.school || "Premier University"}
        </p>
      </div>

      {/* Skills */}
      <div className="mt-8 bg-gray-50 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
          <i className="bi bi-lightning-charge text-[#0067b6]" /> Skills
        </h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {viewData.skills ? (
            viewData.skills.split(",").map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#00aae4]/10 text-[#0067b6] font-medium rounded-full border border-[#00aae4]/40 text-sm"
              >
                {skill.trim()}
              </span>
            ))
          ) : (
            <p className="text-gray-600 italic">No skills added</p>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className="mt-8 bg-gray-50 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
          <i className="bi bi-envelope text-[#0067b6]" /> Contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-gray-700">
          <p>
            <span className="font-medium">
              <i className="bi bi-mailbox" /> Email:
            </span>{" "}
            {viewData.email || "Not set"}
          </p>
          <p>
            <span className="font-medium">
              <i className="bi bi-phone" /> Phone:
            </span>{" "}
            {viewData.contact || viewData.phone || "No contact info"}
          </p>
          <p>
            <span className="font-medium">
              <i className="bi bi-github" /> GitHub:
            </span>{" "}
            {viewData.github || "No github link"}
          </p>
          <p>
            <span className="font-medium">
              <i className="bi bi-linkedin" /> LinkedIn:
            </span>{" "}
            {viewData.linkedin || "No linkedin link"}
          </p>
        </div>
      </div>

      {/* Modal: ProfileEditSection as child */}
      <ProfileEditSection
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        initialData={userData}
        onSaved={(updatedUser) => {
          // Update global context so the whole app reflects changes
          if (updatedUser) {
            setUserData(updatedUser);
          }
          setOpenEdit(false);
        }}
      />
    </section>
  );
}