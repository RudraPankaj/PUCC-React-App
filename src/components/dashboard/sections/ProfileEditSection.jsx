import React, { useEffect, useState } from "react";
import { updateProfile } from "../../../utils/api.js";
import { useNotification } from '../../../context/NotificationContext';

export default function ProfileEditSection({ open, onClose, initialData, onSaved }) {
  const [formData, setFormData] = useState(initialData || {});
  const [saving, setSaving] = useState(false);

  const { addNotification } = useNotification();

  // Update formData when modal opens OR when initialData changes
  useEffect(() => {
    if (open && initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const allowed = [
      "username","studentId","profileimgurl","contact","gender","school",
      "bio","department","skills","phone","github","linkedin"
    ];
    const payload = Object.fromEntries(
      Object.entries(formData).filter(([k]) => allowed.includes(k))
    );

    try {
      const res = await updateProfile(payload); // expects { msg, user }
      if (res?.user) {
        addNotification('Profile updated successfully!', 'success');
        onSaved?.(res.user);
        onClose?.();
      }
    } catch (err) {
      addNotification('Failed to update profile. Please try again.', 'error');
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-[95%] max-w-2xl rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <i className="bi bi-x-lg text-lg" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image preview + URL */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Image URL</label>
              <input
                type="text"
                name="profileimgurl"
                value={formData.profileimgurl || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                placeholder="Image URL"
              />
            </div>
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500">
              <img
                src={formData.profileimgurl || "https://i.postimg.cc/2yzC5x68/avatar-male.jpg"}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Basic fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Username</label>
              <input type="text" name="username" value={formData.username || ""} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Contact</label>
              <input type="text" name="contact" value={formData.contact || ""} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600" />
            </div>
          </div>

          {/* School / Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">School</label>
              <input type="text" name="school" value={formData.school || ""} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Department</label>
              <input type="text" name="department" value={formData.department || ""} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Bio</label>
            <textarea name="bio" rows="3" value={formData.bio || ""} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600" />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Skills (comma separated)</label>
            <input type="text" name="skills" value={formData.skills || ""} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600" />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">GitHub</label>
              <input type="text" name="github" value={formData.github || ""} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">LinkedIn</label>
              <input type="text" name="linkedin" value={formData.linkedin || ""} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Cancel</button>
            <button type="submit" disabled={saving} className={`px-5 py-2 rounded-md text-white font-semibold ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0067b6] hover:bg-[#005999]'}`}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}