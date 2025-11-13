import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEvents, createEvent, deleteEvent } from '../../../utils/api.js';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { useNotification } from '../../../context/NotificationContext.jsx';
import { useTheme } from '../../../hooks/useTheme.jsx';
import EventEditSection from './EventEditSection.jsx';
import EventCardSkeleton from '../../EventCardSkeleton.jsx';

function EventCard({ e, isExecutive, onEditClick, onDeleteClick }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const format_date = (d) => (d ? new Date(d).toLocaleDateString() : '-');
  const truncate = (text, length = 80) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  const goDetails = () => {
    const id = e._id || e.id;
    if (id) navigate(`/eventdetails/${id}`);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    onEditClick(e);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    onDeleteClick(e);
  };

  return (
    <div
      role="button"
      onClick={goDetails}
      className={`rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer group relative ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
    >
      {/* Edit and Delete buttons for executives */}
      {isExecutive && (
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className={`p-2 rounded-full shadow-md transition-all ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-blue-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-[#0067b6]'}`}
            title="Edit event"
          >
            <i className="bi bi-pencil-fill text-sm" />
          </button>
          <button
            onClick={handleDelete}
            className={`p-2 rounded-full shadow-md transition-all ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-red-500' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-red-600'}`}
            title="Delete event"
          >
            <i className="bi bi-trash-fill text-sm" />
          </button>
        </div>
      )}

      {e.image && (
        <div className="relative mb-3">
          <img
            src={e.image}
            alt={e.title}
            className="w-full h-46 object-cover rounded-md"
          />
          <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 bg-blue-600 text-white rounded-md shadow">
            {e.wing || 'All'}
          </span>
        </div>
      )}

      <h3 className={`font-semibold text-base leading-tight mb-2 ${theme === 'dark' ? 'text-gray-200 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-[#005a9c]'}`}>
        {e.title}
      </h3>

      <p className={`flex items-center gap-1 text-xs font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}>
        <i className="bi bi-calendar-event mr-1" /> {format_date(e.date)}
      </p>
      <p className={`flex items-center gap-1 text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        <i className="bi bi-person mr-1" /> {e.publishedBy}
      </p>
      {e.lastRegistrationDate && (
        <p className={`flex items-center gap-1 text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <i className="bi bi-clock mr-1" /> Last reg: {format_date(e.lastRegistrationDate)}
        </p>
      )}

      <p className={`mt-2 text-sm whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        {truncate(e.summary)}
        <span className={`text-xs ml-1 underline-offset-2 group-hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}>
          See details
        </span>
      </p>
    </div>
  );
}

export default function EventsSection() {
  const { userData } = useContext(AuthContext);
  const { addNotification } = useNotification();
  const { theme } = useTheme();
  const isExecutive = (userData?.role || '').toLowerCase() === 'executive';

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    date: '',
    publishedBy: userData?.username || '',
    summary: '',
    image: '',
    lastRegistrationDate: '',
    wing: 'All',
  });

  useEffect(() => {
    setIsLoading(true);
    getEvents()
      .then((res) => setEvents(res.events || []))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setForm((f) => ({ ...f, publishedBy: userData?.username || '' }));
  }, [userData?.username]);

  const change = (k, v) => setForm({ ...form, [k]: v });

  const publish = async (e) => {
    e.preventDefault();
    setPublishing(true);
    try {
      const res = await createEvent(form);
      if (res?.event) {
        setEvents((prev) => [res.event, ...prev]);
        setForm({
          title: '',
          date: '',
          publishedBy: userData?.username || '',
          summary: '',
          image: '',
          lastRegistrationDate: '',
          wing: 'All',
        });
        setShowCreateForm(false);
        addNotification('Event published successfully!', 'success');
      }
    } catch (err) {
      console.error(err);
      addNotification('Failed to publish event.', 'error');
    } finally {
      setPublishing(false);
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setShowEditModal(true);
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((ev) => 
        (ev._id || ev.id) === (updatedEvent._id || updatedEvent.id) 
          ? updatedEvent 
          : ev
      )
    );
    setShowEditModal(false);
    setEditingEvent(null);
    addNotification('Event updated successfully!', 'success');
  };

  const handleDeleteClick = async (eventToDelete) => {
    if (window.confirm(`Are you sure you want to delete the event "${eventToDelete.title}"?`)) {
      try {
        const eventId = eventToDelete._id || eventToDelete.id;
        await deleteEvent(eventId);
        setEvents((prev) => prev.filter((ev) => (ev._id || ev.id) !== eventId));
        addNotification('Event deleted successfully!', 'success');
      } catch (err) {
        console.error("Failed to delete event:", err);
        addNotification('Failed to delete event.', 'error');
      }
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Events Timeline</h2>
        <div className="flex items-center gap-3">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{events.length} events</span>
          {isExecutive && (
            <button
              type="button"
              onClick={() => setShowCreateForm((s) => !s)}
              className="px-3 py-1.5 text-sm bg-[#0067b6] text-white rounded-md shadow hover:bg-[#005a9c] transition"
            >
              {showCreateForm ? 'Close' : 'Create New Event'}
            </button>
          )}
        </div>
      </div>

      {isExecutive && showCreateForm && (
        <form
          onSubmit={publish}
          className={`border rounded-xl shadow-sm p-6 mb-8 space-y-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}
        >
          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Event Title *</label>
              <input
                value={form.title}
                onChange={(e) => change('title', e.target.value)}
                placeholder="Enter event name"
                className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Event Date</label>
              <input
                value={form.date}
                onChange={(e) => change('date', e.target.value)}
                type="date"
                className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Published By</label>
              <input
                value={form.publishedBy}
                onChange={(e) => change('publishedBy', e.target.value)}
                placeholder="Your name or username"
                className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Wing</label>
              <select
                value={form.wing}
                onChange={(e) => change('wing', e.target.value)}
                className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              >
                <option>All</option>
                <option>Competitive Programming</option>
                <option>Software Engineering</option>
                <option>Linux Networking</option>
                <option>Deep Neural Research</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Last Registration Date</label>
              <input
                value={form.lastRegistrationDate}
                onChange={(e) => change('lastRegistrationDate', e.target.value)}
                type="date"
                className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              />
            </div>
            <div className="flex flex-col">
              <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Image URL (optional)</label>
              <input
                value={form.image}
                onChange={(e) => change('image', e.target.value)}
                placeholder="https://example.com/banner.jpg"
                className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Description</label>
            <textarea
              value={form.summary}
              onChange={(e) => change('summary', e.target.value)}
              placeholder="Write a short event summary..."
              className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus.border-[#0067b6] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={publishing}
              className="px-4 py-2 text-sm bg-[#0067b6] text-white rounded-md shadow hover:bg-[#005a9c] transition-colors cursor-pointer disabled:opacity-60"
            >
              {publishing ? 'Publishing...' : 'Publish Event'}
            </button>
          </div>
        </form>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        ) : (
          events.map((ev) => (
            <EventCard 
              key={ev._id || ev.id} 
              e={ev} 
              isExecutive={isExecutive}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))
        )}
      </div>

      {/* Edit Modal */}
      <EventEditSection
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingEvent(null);
        }}
        eventData={editingEvent}
        onSaved={handleEventUpdated}
      />
    </section>
  );
}