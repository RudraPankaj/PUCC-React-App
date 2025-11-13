import React, { useEffect, useState } from "react";
import { updateAnnouncement } from "../../../utils/api.js";
import { useNotification } from '../../../context/NotificationContext';
import { useTheme } from '../../../hooks/useTheme.jsx';

export default function AnnouncementEditSection({ open, onClose, announcementData, onAnnouncementUpdate, events }) {
  const [formData, setFormData] = useState(announcementData || {});
  const [saving, setSaving] = useState(false);
  const { addNotification } = useNotification();
  const { theme } = useTheme();

  useEffect(() => {
    setFormData(announcementData || {});
  }, [announcementData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const announcementId = formData._id;
      
      const updatedFormData = {
        ...formData,
        eventid: formData.eventid === "" ? null : formData.eventid,
      };

      const res = await updateAnnouncement(announcementId, updatedFormData);
      if (res) {
        addNotification('Announcement updated successfully!', 'success');
        onAnnouncementUpdate?.(res);
        onClose?.();
      }
    } catch (err) {
      console.error("Failed to update announcement:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`sticky top-0 border-b px-6 py-4 rounded-t-2xl flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-2xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            <i className="bi bi-pencil-square text-[#0067b6]" />
            Edit Announcement
          </h2>
          <button 
            onClick={onClose} 
            className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <i className="bi bi-x-lg text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Announcement <span className="text-red-500">*</span>
            </label>
            <textarea
              name="announcement"
              rows="4"
              value={formData.announcement || ""}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="Enter announcement text"
              required
              maxLength={400}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Color
              </label>
              <input
                type="color"
                name="hexcolor"
                value={formData.hexcolor || "#FFFFFF"}
                onChange={handleChange}
                className={`w-full p-1 h-12 border rounded-lg ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Related Event (Optional)
              </label>
              <select
                name="eventid"
                value={formData.eventid || ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="">Select an event</option>
                {events && events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={`flex justify-end gap-3 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2.5 rounded-lg transition font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2.5 rounded-lg text-white font-semibold transition flex items-center gap-2 ${
                saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0067b6] hover:bg-[#005a9c]'
              }`}
            >
              {saving ? (
                <>
                  <i className="bi bi-hourglass-split animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}