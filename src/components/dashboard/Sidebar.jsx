import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ role = 'member', active, setActive, mobileOpen, setMobileOpen }) {
  const [openSections, setOpenSections] = useState({
    general: true,
    management: true,
    learning: true
  });

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
    <>
      <aside
        className={
          `bg-white border-r border-gray-300 shadow-right fixed top-14 bottom-0 left-0 overflow-y-auto transition-transform
           w-64 md:w-64
           md:translate-x-0
           ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
           md:block z-50 pointer-events-auto`
        }
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
          <span className="text-sm font-semibold">Navigation</span>
          <button
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="md:hidden p-1 rounded hover:bg-gray-100"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="mt-3 px-2 pb-10">
          {sectionItems.map(section => (
            <div key={section.key} className="mb-3">
              <button
                onClick={() => toggleSection(section.key)}
                className="flex justify-between items-center w-full px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 rounded"
              >
                {section.title}
                <i className={`bi ${openSections[section.key] ? 'bi-chevron-down' : 'bi-chevron-right'} text-sm`} />
              </button>

              {openSections[section.key] && (
                <div className="mt-1">
                  {section.links.map(it => (
                    <button
                      key={it.id}
                      onClick={() => { setActive(it.id); if (mobileOpen) setMobileOpen(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-1 rounded-md hover:bg-[#f1f8ff] transition mb-1 ${active === it.id ? 'bg-[#e8f6ff] font-semibold text-blue-700' : ''}`}
                    >
                      <i className={`bi ${it.icon} text-lg`} />
                      <span>{it.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-6 w-full px-3">
          <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
            <i className="bi bi-gear" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  )
}