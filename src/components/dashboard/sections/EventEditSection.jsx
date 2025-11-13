import React, { useEffect, useState } from "react";
import { updateEvent } from "../../../utils/api.js";
import { useNotification } from '../../../context/NotificationContext';
import { useTheme } from '../../../hooks/useTheme.jsx';

export default function EventEditSection({ open, onClose, eventData, onSaved }) {
  const [formData, setFormData] = useState(eventData || {});
  const [saving, setSaving] = useState(false);
  const { addNotification } = useNotification();
  const { theme } = useTheme();

  useEffect(() => {
    setFormData(eventData || {});
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const eventId = formData._id || formData.id;
      const res = await updateEvent(eventId, formData);
      if (res?.event) {
        addNotification('Event updated successfully!', 'success');
        onSaved?.(res.event);
        onClose?.();
      }
    } catch (err) {
      addNotification('Failed to update event. Please try again.', 'error');
      console.error("Failed to update event:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-3xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`sticky top-0 border-b px-6 py-4 rounded-t-2xl flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-2xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            <i className="bi bi-pencil-square text-[#0067b6]" />
            Edit Event
          </h2>
          <button 
            onClick={onClose} 
            className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <i className="bi bi-x-lg text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image Preview + URL */}
          {formData.image && (
            <div className="mb-4">
              <img
                src={formData.image}
                alt="Event preview"
                className={`w-full h-48 object-cover rounded-lg border-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          {/* Title + Event Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="Enter event name"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Event Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>

          {/* Published By + Wing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Published By
              </label>
              <input
                type="text"
                name="publishedBy"
                value={formData.publishedBy || ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                readOnly
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Wing
              </label>
              <select
                name="wing"
                value={formData.wing || "All"}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option>All</option>
                <option>Competitive Programming</option>
                <option>Software Engineering</option>
                <option>Linux Networking</option>
                <option>Deep Neural Research</option>
              </select>
            </div>
          </div>

          {/* Registration Date + Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Last Registration Date
              </label>
              <input
                type="date"
                name="lastRegistrationDate"
                value={formData.lastRegistrationDate ? new Date(formData.lastRegistrationDate).toISOString().split('T')[0] : ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              name="summary"
              rows="5"
              value={formData.summary || ""}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] transition resize-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="Write a detailed event summary..."
            />
          </div>

          {/* Action Buttons */}
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