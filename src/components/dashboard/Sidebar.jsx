import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';

export default function Sidebar({ active, mobileOpen, setMobileOpen, isFolded, toggleFold }) {
  const { userData } = useContext(AuthContext);
  const { theme } = useTheme();
  const role = userData?.role || 'member';

  const [openSections, setOpenSections] = useState({
    general: true,
    management: true,
    learning: true
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (isFolded) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isFolded) {
      setIsHovered(false);
    }
  };

  const isEffectivelyFolded = isFolded && !isHovered;

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Shared links (visible to all)
  const general = [
    { id: 'profile', label: 'My Profile', icon: 'bi-person' },
    { id: 'global-chat', label: 'Global Chat', icon: 'bi-chat' },
    { id: 'events', label: 'Events Timeline', icon: 'bi-calendar-event' },
    { id: 'announcements', label: 'Announcements', icon: 'bi-megaphone' },
  ];

  // Executive-specific links
  const executiveManagement = [
    { id: 'manage-users', label: 'Manage Users', icon: 'bi-people' },
    { id: 'manage-courses', label: 'Manage Courses', icon: 'bi-journal-code' },
    { id: 'manage-wings', label: 'Manage Wings', icon: 'bi-diagram-3' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'bi-graph-up' },
  ];

  // Instructor links
  const instructorManagement = [
    { id: 'manage-courses', label: 'Manage Courses', icon: 'bi-journal-code' },
    { id: 'manage-students', label: 'Manage Students', icon: 'bi-person-lines-fill' },
    { id: 'grade-assignment', label: 'Grade Assignment', icon: 'bi-clipboard-check' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'bi-graph-up' },
  ];

  // Member-only links
  const memberLearning = [
    { id: 'enrolled-courses', label: 'Enrolled Courses', icon: 'bi-book-half' },
    { id: 'assignments', label: 'Assignments', icon: 'bi-pencil-square' },
    { id: 'grades', label: 'Grades & Reports', icon: 'bi-bar-chart' },
  ];

  let management = [];
  let learning = [];

  if (role === 'executive') {
    management = executiveManagement;
  } else if (role === 'instructor') {
    management = instructorManagement;
  } else if (role === 'member') {
    learning = memberLearning;
  }

  const sectionItems = [
    { key: 'general', title: 'GENERAL', links: general },
    ...(management.length ? [{ key: 'management', title: 'MANAGEMENT', links: management }] : []),
    ...(learning.length ? [{ key: 'learning', title: 'LEARNING & REPORTS', links: learning }] : []),
  ];

  return (
    <aside
      className={`border-r shadow-right fixed top-14 bottom-0 left-0 overflow-y-auto transition-all duration-300 ease-in-out md:translate-x-0 md:block z-50 pointer-events-auto
        ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300'}
        ${isEffectivelyFolded ? 'w-20' : 'w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex items-center justify-between px-3 py-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        {!isEffectivelyFolded && <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Navigation</span>}
        <button
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className={`md:hidden p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          <i className={`bi bi-x-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`} />
        </button>
        <button
          onClick={toggleFold}
          className={`hidden md:block p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          <i className={`bi ${isFolded ? 'bi-arrows-angle-expand' : 'bi-arrows-angle-contract'} ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`} />
        </button>
      </div>

      <nav className={`mt-3 px-2 pb-10`}>
        {sectionItems.map(section => (
          <div key={section.key} className="mb-3">
            <button
              onClick={() => toggleSection(section.key)}
              className={`flex justify-between items-center w-full px-3 py-2 text-xs font-bold uppercase tracking-wider rounded ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {!isEffectivelyFolded && section.title}
              <i className={`bi ${openSections[section.key] ? 'bi-chevron-down' : 'bi-chevron-right'} text-sm ${isEffectivelyFolded ? 'mx-auto' : ''} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>

            {openSections[section.key] && (
              <div className="mt-1">
                {section.links.map(it => (
                  <Link
                    key={it.id}
                    to={`/dashboard/${role}/${it.id}`}
                    onClick={() => { if (mobileOpen) setMobileOpen(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-1 rounded-md transition mb-1 ${isEffectivelyFolded ? 'justify-center' : ''} 
                      ${active === it.id 
                        ? (theme === 'dark' ? 'bg-blue-900/30 font-semibold text-blue-400' : 'bg-[#e8f6ff] font-semibold text-blue-700') 
                        : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-[#f1f8ff]')
                      }`}
                  >
                    <i className={`bi ${it.icon} text-lg`} />
                    {!isEffectivelyFolded && <span>{it.label}</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className={`absolute bottom-6 w-full px-3 ${isEffectivelyFolded ? 'flex justify-center' : ''}`}>
        <Link to={`/dashboard/${role}/settings`} className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
          <i className="bi bi-gear" />
          {!isEffectivelyFolded && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
