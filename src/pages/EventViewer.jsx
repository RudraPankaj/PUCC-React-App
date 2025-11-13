import React, { useEffect, useMemo, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { getEvents, deleteEvent } from '../utils/api.js';
import { AuthContext } from '../context/AuthContext.jsx';
import { useTheme } from '../hooks/useTheme.jsx';
import EventEditSection from '../components/dashboard/sections/EventEditSection.jsx';


export default function EventViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { userData } = useContext(AuthContext);
  const isExecutive = (userData?.role || '').toLowerCase() === 'executive';

  const [loading, setLoading] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getEvents()
      .then((res) => {
        if (!mounted) return;
        setEventList(res.events || []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setError('Failed to load event.');
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const eventData = useMemo(() => {
    if (!id) return null;
    return eventList.find((e) => (e._id || e.id) === id) || null;
  }, [eventList, id]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return eventList
      .filter((e) => {
        const eventDate = e.date ? new Date(e.date) : null;
        return eventDate && eventDate > now && (e._id || e.id) !== id;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  }, [eventList, id]);

  const relatedEvents = useMemo(() => {
    if (!eventData?.wing) return [];
    return eventList
      .filter((e) => 
        e.wing === eventData.wing && 
        (e._id || e.id) !== id
      )
      .slice(0, 3);
  }, [eventList, eventData, id]);

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '—');
  const cover =
    eventData?.image ||
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1400&auto=format&fit=crop';

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      await deleteEvent(eventData._id || eventData.id);
      navigate('/events');
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert('Failed to delete event. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleEventUpdated = (updatedEvent) => {
    setEventList((prev) =>
      prev.map((ev) =>
        (ev._id || ev.id) === (updatedEvent._id || updatedEvent.id)
          ? updatedEvent
          : ev
      )
    );
    setShowEditModal(false);
  };

  return (
    <>
      <Navbar />

      <div className={`min-h-screen font-sans pb-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Heading section with shadow image viewer */}
        <section className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Main Event Content */}
            <div className="lg:col-span-2">
              {/* Image frame */}
              <div className="relative">
                <div className={`mx-auto w-full rounded-2xl p-3 md:p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)] ${theme === 'dark' ? 'bg-gray-800 ring-1 ring-white/10' : 'bg-white ring-1 ring-black/5'}`}>
                  <img
                    src={cover}
                    alt={eventData?.title || 'Event cover'}
                    className="block w-full h-auto object-contain max-h-[40vh] md:max-h-[65vh] bg-transparent rounded-xl"
                  />
                </div>
              </div>

              {/* Title + actions */}
              <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1">
                  {!loading && eventData?.wing && (
                    <span className={`mb-2 inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                      {eventData.wing}
                    </span>
                  )}
                  <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {loading ? 'Loading...' : eventData?.title || 'Untitled Event'}
                  </h1>
                  {!loading && (
                    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Full details, important dates, and publisher information.
                    </p>
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    to="/events"
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition ${theme === 'dark' ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <i className="bi bi-arrow-left" />
                    All Events
                  </Link>
                  
                  {isExecutive && eventData && (
                    <>
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md hover:from-blue-600 hover:to-cyan-600 transition shadow-sm"
                      >
                        <i className="bi bi-pencil-fill" />
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-md hover:from-red-600 hover:to-pink-600 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i className="bi bi-trash-fill" />
                        {deleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Main content */}
              <div className="mt-8">
                {loading && (
                  <div className={`rounded-2xl p-6 shadow-sm ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="animate-pulse space-y-4">
                      <div className={`h-6 rounded w-2/3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className={`h-4 rounded w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className={`h-4 rounded w-5/6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className={`h-4 rounded w-4/6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    </div>
                  </div>
                )}

                {!loading && (!eventData || error) && (
                  <div className={`rounded-2xl p-8 shadow-sm text-center ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      Event not found
                    </h2>
                    <p className={`mb-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      The event may have been removed or the link is incorrect.
                    </p>
                    <button
                      onClick={() => navigate(-1)}
                      className={`inline-flex items-center gap-2 px-4 py-2 text-white rounded-md transition ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0067b6] hover:bg-[#005a9c]'}`}
                    >
                      <i className="bi bi-arrow-left" /> Go Back
                    </button>
                  </div>
                )}

                {!loading && eventData && (
                  <>
                    <div className={`rounded-2xl shadow-sm p-6 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                      <h2 className={`text-2xl font-bold border-b pb-3 mb-4 ${theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-800'}`}>
                        Event Details
                      </h2>
                      {eventData.summary ? (
                        <p className={`leading-relaxed whitespace-pre-line ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {eventData.summary}
                        </p>
                      ) : (
                        <p className={`italic ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          No description provided for this event.
                        </p>
                      )}
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <MetaCard
                        icon="bi bi-calendar-event"
                        label="Event Date"
                        value={formatDate(eventData.date)}
                        gradient="from-blue-500 to-cyan-500"
                      />
                      <MetaCard
                        icon="bi bi-clock"
                        label="Last Registration"
                        value={formatDate(eventData.lastRegistrationDate)}
                        gradient="from-orange-500 to-red-500"
                      />
                      <MetaCard
                        icon="bi bi-person"
                        label="Published By"
                        value={eventData.publishedBy || '—'}
                        gradient="from-purple-500 to-pink-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right side - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {upcomingEvents.length > 0 && (
                <div className={`rounded-2xl shadow-sm p-5 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                  <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    <i className="bi bi-calendar-check text-blue-500" />
                    Upcoming Events
                  </h3>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <EventPreviewCard key={event._id || event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}

              {relatedEvents.length > 0 && (
                <div className={`rounded-2xl shadow-sm p-5 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                  <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    <i className="bi bi-grid-3x3-gap text-purple-500" />
                    More Events
                    {eventData?.wing && (
                      <span className={`text-xs font-normal ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ({eventData.wing})
                      </span>
                    )}
                  </h3>
                  <div className="space-y-3">
                    {relatedEvents.map((event) => (
                      <EventPreviewCard key={event._id || event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className={`rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-800 to-gray-800' : 'bg-gradient-to-br from-[#00aae4] to-[#0067b6]'}`}>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Explore More Events
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  Stay engaged with upcoming seminars, contests, and workshops.
                </p>
                <Link
                  to="/events"
                  className={`inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition text-sm ${theme === 'dark' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-white text-[#0067b6] hover:bg-gray-100'}`}
                >
                  Browse All Events
                  <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {isExecutive && (
        <EventEditSection
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          eventData={eventData}
          onSaved={handleEventUpdated}
        />
      )}
    </>
  );
}

function MetaCard({ icon, label, value, gradient }) {
  const { theme } = useTheme();
  return (
    <div className={`rounded-xl shadow-md p-4 flex items-start gap-3 hover:shadow-lg transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
      <div className={`bg-gradient-to-br ${gradient} p-2.5 rounded-lg shadow-sm flex-shrink-0`}>
        <i className={`${icon} text-white text-xl`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {label}
        </div>
        <div className={`font-bold text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

function EventPreviewCard({ event }) {
  const { theme } = useTheme();
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '—');
  const eventId = event._id || event.id;

  return (
    <Link
      to={`/eventdetails/${eventId}`}
      className="block group"
    >
      <div className={`flex gap-3 p-3 rounded-lg transition-colors border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-20 h-20 object-cover rounded-md flex-shrink-0 bg-gray-700"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm line-clamp-2 transition ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-[#0067b6]'}`}>
            {event.title}
          </h4>
          <p className={`text-xs mt-1 flex items-center gap-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <i className="bi bi-calendar-event" />
            {formatDate(event.date)}
          </p>
        </div>
      </div>
    </Link>
  );
}