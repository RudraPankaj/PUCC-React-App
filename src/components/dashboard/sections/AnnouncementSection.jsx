import React, { useState, useContext, useEffect } from 'react';
import { getAnnouncements, createAnnouncement, deleteAnnouncement, getEvents } from '../../../utils/api.js';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { useNotification } from '../../../context/NotificationContext.jsx';
import { useTheme } from '../../../hooks/useTheme.jsx';
import AnnouncementEditSection from './AnnouncementEditSection.jsx';
import AnnouncementCard from '../../AnnouncementCard.jsx';
import AnnouncementCardSkeleton from '../../AnnouncementCardSkeleton.jsx';

export default function AnnouncementSection() {
  const { userData } = useContext(AuthContext);
  const { addNotification } = useNotification();
  const { theme } = useTheme();
  const isExecutive = (userData?.role || '').toLowerCase() === 'executive';

  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState({
    announcement: '',
    hexcolor: '#FFFFFF',
    eventid: '',
  });

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getAnnouncements().then((res) => setAnnouncements(res.announcements || res || [])),
      getEvents().then((res) => setEvents(res.events || res || [])),
    ])
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const change = (k, v) => setForm({ ...form, [k]: v });

  const publish = async (e) => {
    e.preventDefault();
    setPublishing(true);
    try {
      const payload = {
        ...form,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      };
      if (!payload.eventid) {
        delete payload.eventid;
      }
      const res = await createAnnouncement(payload);
      if (res) {
        setAnnouncements((prev) => [res, ...prev]);
        setForm({
          announcement: '',
          hexcolor: '#FFFFFF',
          eventid: '',
        });
        setShowCreateForm(false);
        addNotification('Announcement published successfully!', 'success');
      }
    } catch (err) {
      console.error(err);
      addNotification('Failed to publish announcement.', 'error');
    } finally {
      setPublishing(false);
    }
  };

  const handleEditClick = (announcement) => {
    setEditingAnnouncement(announcement);
    setShowEditModal(true);
  };

  const handleAnnouncementUpdated = (updatedAnnouncement) => {
    setAnnouncements((prev) =>
      prev.map((a) =>
        a._id === updatedAnnouncement._id ? updatedAnnouncement : a
      )
    );
    setShowEditModal(false);
    setEditingAnnouncement(null);
  };

  const handleDeleteClick = async (announcementToDelete) => {
    if (window.confirm(`Are you sure you want to delete this announcement?`)) {
      try {
        const announcementId = announcementToDelete._id;
        await deleteAnnouncement(announcementId);
        setAnnouncements((prev) => prev.filter((a) => a._id !== announcementId));
        addNotification('Announcement deleted successfully!', 'success');
      } catch (err) {
        console.error("Failed to delete announcement:", err);
        addNotification('Failed to delete announcement.', 'error');
      }
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Announcements</h2>
        <div className="flex items-center gap-3">
          {isExecutive && (
            <button
              type="button"
              onClick={() => setShowCreateForm((s) => !s)}
              className="px-3 py-1.5 text-sm bg-[#0067b6] text-white rounded-md shadow hover:bg-[#005a9c] transition"
            >
              {showCreateForm ? 'Close' : 'New Announcement'}
            </button>
          )}
        </div>
      </div>

      {isExecutive && showCreateForm && (
        <form
          onSubmit={publish}
          className={`border rounded-xl shadow-sm p-6 mb-8 space-y-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}
        >
          <div className="flex flex-col">
            <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Announcement *</label>
            <textarea
              value={form.announcement}
              onChange={(e) => change('announcement', e.target.value)}
              placeholder="What's the announcement?"
              className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              rows={3}
              required
              maxLength={400}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Color</label>
              <input
                type="color"
                value={form.hexcolor}
                onChange={(e) => change('hexcolor', e.target.value)}
                className={`w-full p-1 h-10 text-sm border rounded-md ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
              />
            </div>
            <div className="flex flex-col">
              <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Related Event (Optional)</label>
              <select
                value={form.eventid}
                onChange={(e) => change('eventid', e.target.value)}
                className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              >
                <option value="">Select an event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              disabled={publishing}
              className="px-4 py-2 text-sm bg-[#0067b6] text-white rounded-md shadow hover:bg-[#005a9c] transition-colors cursor-pointer disabled:opacity-60"
            >
              {publishing ? 'Publishing...' : 'Publish Announcement'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <>
            <AnnouncementCardSkeleton />
            <AnnouncementCardSkeleton />
          </>
        ) : (
          announcements.map((a) => (
            <AnnouncementCard
              key={a._id}
              announcement={a}
              isExecutive={isExecutive}
              onDeleteClick={handleDeleteClick}
              onEditClick={handleEditClick}
            />
          ))
        )}
      </div>

      <AnnouncementEditSection
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingAnnouncement(null);
        }}
        announcementData={editingAnnouncement}
        onAnnouncementUpdate={handleAnnouncementUpdated}
        events={events}
      />
    </section>
  );
}