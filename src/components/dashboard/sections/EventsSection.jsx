import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getEvents, createEvent } from '../../../utils/api.js'
import { AuthContext } from '../../../context/AuthContext.jsx'

function EventCard({ e }) {
  const fmt = (d) => d ? new Date(d).toLocaleDateString() : '-';

  // limit summary length
  const truncate = (text, length = 80) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
      {e.image && (
        <div className="relative mb-3">
          <img 
            src={e.image} 
            alt={e.title} 
            className="w-full h-46 object-cover rounded-md" 
          />
          {/* Wing tag overlay */}
          <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 bg-blue-600 text-white rounded-md shadow">
            {e.wing || 'All'}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="font-semibold text-base leading-tight mb-2">{e.title}</h3>

      {/* Meta Info */}
      <p className="flex items-center gap-1 text-xs text-[#0067b6] font-semibold">
        <i className="bi bi-calendar-event mr-1"></i> {fmt(e.date)}
      </p>
      <p className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
        <i className="bi bi-person mr-1"></i> {e.publishedBy}
      </p>
      {e.lastRegistrationDate && (
        <p className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
          <i className="bi bi-clock mr-1"></i> Last reg: {fmt(e.lastRegistrationDate)}
        </p>
      )}

      {/* Summary */}
      <p className="mt-2 text-sm text-gray-700">
        {truncate(e.summary)}{' '}
        <Link 
          to={`/eventdetails/${e._id}`} 
          className="text-[#0067b6] hover:underline text-xs"
        >
          ...See more
        </Link>
      </p>
    </div>
  )
}


export default function EventsSection() {
  const { userData } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    publishedBy: userData?.username || '',
    summary: '',
    image: '',
    lastRegistrationDate: '',
    wing: 'All'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // load events from backend
    getEvents()
      .then(res => setEvents(res.events || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    // keep publishedBy in sync with logged-in user
    setForm(f => ({ ...f, publishedBy: userData?.username || '' }))
  }, [userData?.username]);

  const change = (k, v) => setForm({ ...form, [k]: v });

  const add = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createEvent(form);
      if (res?.event) {
        setEvents(prev => [res.event, ...prev]);
        setForm({ title: '', date: '', publishedBy: userData?.username || '', summary: '', image: '', lastRegistrationDate: '', wing: 'All' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Events Timeline</h2>
        <span className="text-sm text-gray-500">{events.length} events</span>
      </div>

      {userData.role === "executive" && 
        <form 
          onSubmit={add} 
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8 space-y-4"
        >
          {/* Title + Event Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Event Title *</label>
              <input 
                value={form.title} 
                onChange={e => change('title', e.target.value)} 
                placeholder="Enter event name" 
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]" 
                required 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Event Date</label>
              <input 
                value={form.date} 
                onChange={e => change('date', e.target.value)} 
                type="date" 
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]" 
              />
            </div>
          </div>

          {/* Published By + Wing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Published By</label>
              <input 
                value={form.publishedBy} 
                onChange={e => change('publishedBy', e.target.value)} 
                placeholder="Your name or username" 
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]" 
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Wing</label>
              <select 
                value={form.wing} 
                onChange={e => change('wing', e.target.value)} 
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]"
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
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Last Registration Date</label>
              <input 
                value={form.lastRegistrationDate} 
                onChange={e => change('lastRegistrationDate', e.target.value)} 
                type="date" 
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]" 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Image URL (optional)</label>
              <input 
                value={form.image} 
                onChange={e => change('image', e.target.value)} 
                placeholder="https://example.com/banner.jpg" 
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]" 
              />
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Description</label>
            <textarea 
              value={form.summary} 
              onChange={e => change('summary', e.target.value)} 
              placeholder="Write a short event summary..." 
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]" 
              rows={3}
            />
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button 
              disabled={loading} 
              className="px-4 py-2 text-sm bg-[#0067b6] text-white rounded-md shadow hover:bg-[#005a9c] transition-colors cursor-pointer disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Add Event'}
            </button>
          </div>
        </form>
      }

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events.map(ev => <EventCard key={ev._id || ev.id} e={ev} />)}
      </div>
    </section>
  )
}