import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { getEvents } from '../utils/api.js'; // swap to getEventById if available

export default function EventViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [error, setError] = useState('');

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

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '—');
  const cover =
    eventData?.image ||
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1400&auto=format&fit=crop';

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Heading section with shadow image viewer */}
        <section className="pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Image frame */}
          <div className="relative">
            <div className="mx-auto w-full bg-white rounded-2xl p-3 md:p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
              {/* Keep aspect ratio without cropping */}
              <img
                src={cover}
                alt={eventData?.title || 'Event cover'}
                className="block w-full h-auto object-contain max-h-[65vh] bg-white rounded-xl"
              />
            </div>

            {/* Optional corner badge on the image frame */}
            {!loading && eventData?.wing && (
              <div className="absolute -bottom-3 left-5">
                <span className="px-2 py-1 text-xs bg-white text-gray-800 border border-gray-200 rounded-md shadow-sm">
                  {eventData.wing}
                </span>
              </div>
            )}
          </div>

          {/* Title + actions */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {loading ? 'Loading...' : eventData?.title || 'Untitled Event'}
              </h1>
              {!loading && (
                <p className="mt-2 text-gray-600">
                  Full details, important dates, and publisher information.
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <i className="bi bi-arrow-left" />
                All Events
              </Link>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-10 px-6 max-w-6xl mx-auto">
          {/* Loading or Error */}
          {loading && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
            </div>
          )}

          {!loading && (!eventData || error) && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Event not found
              </h2>
              <p className="text-gray-600 mb-5">
                The event may have been removed or the link is incorrect.
              </p>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0067b6] text-white rounded-md hover:bg-[#005a9c] transition"
              >
                <i className="bi bi-arrow-left" /> Go Back
              </button>
            </div>
          )}

          {/* Details + Meta */}
          {!loading && eventData && (
            <>
              {/* Details Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
                  Event Details
                </h2>
                {eventData.summary ? (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {eventData.summary}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    No description provided for this event.
                  </p>
                )}
              </div>

              {/* Meta cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetaCard
                  icon="bi bi-calendar-event"
                  label="Event Date"
                  value={formatDate(eventData.date)}
                />
                <MetaCard
                  icon="bi bi-clock"
                  label="Last Registration"
                  value={formatDate(eventData.lastRegistrationDate)}
                />
                <MetaCard
                  icon="bi bi-person"
                  label="Published By"
                  value={eventData.publishedBy || '—'}
                />
              </div>

              {/* Footer actions */}
              <div className="mt-10 flex items-center justify-between">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 text-[#0067b6] hover:underline"
                >
                  <i className="bi bi-arrow-left" /> All Events
                </Link>
                {(eventData._id || eventData.id) && (
                  <Link
                    to={`/eventdetails/${eventData._id || eventData.id}`}
                    className="inline-flex items-center gap-2 text-sm border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50"
                  >
                    Open details view
                  </Link>
                )}
              </div>
            </>
          )}
        </section>

        {/* (Optional) CTA */}
        <section className="py-16 px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Interested in more events?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Stay engaged with upcoming seminars, contests, workshops and wing activities.
          </p>
          <Link
            to="/events"
            className="bg-[#00aae4] hover:bg-[#0067b6] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors duration-300"
          >
            Browse All Events
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}

/* Compact meta card */
function MetaCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
      <i className={`${icon} text-[#0067b6] text-xl`} />
      <div className="text-sm">
        <div className="text-gray-500">{label}</div>
        <div className="font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}