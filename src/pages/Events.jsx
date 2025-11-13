import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { getEvents } from '../utils/api.js';
import { useTheme } from '../hooks/useTheme.jsx';

export default function Events() {
  const { theme } = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { label: 'All', icon: 'bi-grid-3x3-gap' },
    { label: 'Upcoming', icon: 'bi-calendar-check' },
    { label: 'Competitive Programming', icon: 'bi-trophy' },
    { label: 'Software Engineering', icon: 'bi-code-slash' },
    { label: 'Linux Networking', icon: 'bi-hdd-network' },
    { label: 'Deep Neural Research', icon: 'bi-cpu' },
  ];

  useEffect(() => {
    setLoading(true);
    getEvents()
      .then((res) => {
        setEvents(res.events || []);
      })
      .catch((err) => {
        console.error('Failed to load events:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    if (activeFilter === 'All') return true;
    
    if (activeFilter === 'Upcoming') {
      const eventDate = event.date ? new Date(event.date) : null;
      return eventDate && eventDate > new Date();
    }
    
    return event.wing === activeFilter;
  });

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '—');

  return (
    <>
      <Navbar />

      <div className={`min-h-screen font-sans pb-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header Section */}
        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Events Timeline
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Explore upcoming seminars, contests, workshops, and wing activities
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeFilter === filter.label
                    ? `text-white shadow-md scale-105 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-[#00aae4] to-[#0067b6]'}`
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-blue-500 hover:text-blue-500 hover:shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0067b6] hover:text-[#0067b6] hover:shadow-sm'}`
                }`}
              >
                <i className={`${filter.icon}`} />
                {filter.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {loading ? (
                'Loading events...'
              ) : (
                <>
                  Showing <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{filteredEvents.length}</span> event
                  {filteredEvents.length !== 1 ? 's' : ''}
                </>
              )}
            </p>
          </div>
        </section>

        {/* Events List */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            {loading ? (
              // Skeleton Loading
              <>
                {[1, 2].map((i) => (
                  <EventSkeleton key={i} />
                ))}
              </>
            ) : filteredEvents.length > 0 ? (
              // Event Cards
              filteredEvents.map((event) => (
                <EventBanner key={event._id || event.id} event={event} formatDate={formatDate} />
              ))
            ) : (
              // Empty State
              <div className={`p-12 text-center rounded-2xl shadow-sm ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <i className={`bi bi-calendar-x text-6xl mb-4 block ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>No events found</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activeFilter === 'All'
                    ? 'No events are currently available.'
                    : `No events found in "${activeFilter}" category.`}
                </p>
                {activeFilter !== 'All' && (
                  <button
                    onClick={() => setActiveFilter('All')}
                    className={`mt-4 px-4 py-2 text-white rounded-lg transition ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0067b6] hover:bg-[#005a9c]'}`}
                  >
                    View All Events
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

/* Event Banner Component */
function EventBanner({ event, formatDate }) {
  const { theme } = useTheme();
  const eventId = event._id || event.id;
  const eventDate = event.date ? new Date(event.date) : null;
  const isUpcoming = eventDate && eventDate > new Date();

  return (
    <Link to={`/eventdetails/${eventId}`} className="block group">
      <div className={`rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border border-gray-700 group-hover:border-blue-500' : 'bg-white border border-gray-200 group-hover:border-[#0067b6]'}`}>
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className={`md:w-2/5 relative overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <img
              src={
                event.image ||
                'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1400&auto=format&fit=crop'
              }
              alt={event.title}
              className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Wing Badge */}
            {event.wing && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
                  {event.wing}
                </span>
              </div>
            )}
            {/* Upcoming Badge */}
            {isUpcoming && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-lg flex items-center gap-1">
                  <i className="bi bi-calendar-check" />
                  Upcoming
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold mb-3 transition-colors line-clamp-2 ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-[#0067b6]'}`}>
                {event.title}
              </h2>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                    <i className={`bi bi-calendar-event ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Event Date</p>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{formatDate(event.date)}</p>
                  </div>
                </div>

                {event.lastRegistrationDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-orange-900/50' : 'bg-orange-100'}`}>
                      <i className={`bi bi-clock ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Registration Deadline</p>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{formatDate(event.lastRegistrationDate)}</p>
                    </div>
                  </div>
                )}

                {event.publishedBy && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
                      <i className={`bi bi-person ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Published By</p>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{event.publishedBy}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary */}
              {event.summary && (
                <p className={`leading-relaxed line-clamp-3 mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {event.summary}
                </p>
              )}
            </div>

            {/* View Details Button */}
            <div className={`flex items-center justify-between mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <span className={`text-sm font-medium group-hover:underline flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}>
                View Full Details
                <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* Skeleton Loading Component */
function EventSkeleton() {
  const { theme } = useTheme();
  return (
    <div className={`rounded-2xl shadow-md overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
      <div className="flex flex-col md:flex-row animate-pulse">
        {/* Image Skeleton */}
        <div className={`md:w-2/5 h-64 md:h-80 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />

        {/* Content Skeleton */}
        <div className="md:w-3/5 p-6 md:p-8 space-y-4">
          {/* Title */}
          <div className={`h-8 rounded w-3/4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />

          {/* Meta Info */}
          <div className="flex gap-4">
            <div className={`h-16 rounded w-32 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-16 rounded w-32 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-16 rounded w-32 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <div className={`h-4 rounded w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-4 rounded w-5/6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-4 rounded w-4/6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
          </div>

          {/* Button */}
          <div className={`h-10 rounded w-40 mt-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
      </div>
    </div>
  );
}