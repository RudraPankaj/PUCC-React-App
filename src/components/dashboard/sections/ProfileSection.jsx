import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import ProfileEditSection from "./ProfileEditSection.jsx";
import { useTheme } from "../../../hooks/useTheme.jsx";

export default function ProfileCV() {
  const { userData, setUserData, isAuthLoading } = useContext(AuthContext);
  const [openEdit, setOpenEdit] = useState(false);
  const { theme } = useTheme();

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-lg text-gray-600">Loading Profile...</p>
      </div>
    );
  }

  // Defensive check for userData
  if (!userData) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-lg text-red-600">Profile data not available. Please try again later.</p>
      </div>
    );
  }

  // Fallback avatar
  const avatar =
    userData.profileimgurl ||
    "https://i.postimg.cc/2yzC5x68/avatar-male.jpg";

  return (
    <section className={`relative max-w-5xl mx-auto p-8 rounded-2xl shadow-lg border-t-4 border-[#00aae4] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`flex flex-col md:flex-row justify-between items-center border-b pb-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
        <div className="flex items-center flex-col md:flex-row gap-6">
          <img
            src={avatar}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-[#00aae4] shadow"
          />
          <div className="text-center md:text-left">
            <h1 className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              {userData?.username || "Member"}
            </h1>
            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}>
              {userData.department || "Computer Science & Engineering"} Student
            </p>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {userData.bio || "No bio available."}
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
      <div className={`mt-8 rounded-xl shadow-sm p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
        <h2 className={`text-xl font-semibold border-b pb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200 border-gray-600' : 'text-gray-800 border-gray-200'}`}>
          <i className={`bi bi-mortarboard ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`} /> Education
        </h2>
        <p className={`font-medium mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {userData.department || "Computer Science & Engineering"}
        </p>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {userData.school || "Premier University"}
        </p>
      </div>

      <div className={`mt-8 rounded-xl shadow-sm p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
        <h2 className={`text-xl font-semibold border-b pb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200 border-gray-600' : 'text-gray-800 border-gray-200'}`}>
          <i className={`bi bi-lightning-charge ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`} /> Skills
        </h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {userData.skills ? (
            userData.skills.split(",").map((skill, i) => (
              <span
                key={i}
                className={`px-3 py-1 font-medium rounded-full border border-[#00aae4]/40 text-sm ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-[#00aae4]/10 text-[#0067b6]'}`}
              >
                {skill.trim()}
              </span>
            ))
          ) : (
            <p className={`italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No skills added</p>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className={`mt-8 rounded-xl shadow-sm p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
        <h2 className={`text-xl font-semibold border-b pb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200 border-gray-600' : 'text-gray-800 border-gray-200'}`}>
          <i className={`bi bi-envelope ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`} /> Contact
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <p>
            <span className="font-medium">
              <i className="bi bi-mailbox" /> Email:
            </span>{" "}
            {userData.email || "Not set"}
          </p>
          <p>
            <span className="font-medium">
              <i className="bi bi-phone" /> Phone:
            </span>{" "}
            {userData.contact || userData.phone || "No contact info"}
          </p>
          <p>
            <span className="font-medium">
              <i className="bi bi-github" /> GitHub:
            </span>{" "}
            {userData.github || "No github link"}
          </p>
          <p>
            <span className="font-medium">
              <i className="bi bi-linkedin" /> LinkedIn:
            </span>{" "}
            {userData.linkedin || "No linkedin link"}
          </p>
        </div>
      </div>

      {/* Modal: ProfileEditSection as child */}
      {userData && (
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
      )}
    </section>
  );
}