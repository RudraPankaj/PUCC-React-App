import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ role = 'member', active, setActive, mobileOpen, setMobileOpen }) {
  const base = [
    { id: 'profile', label: 'My Profile', icon: 'bi-person' },
    { id: 'events', label: 'Events Timeline', icon: 'bi-calendar-event' },
    { id: 'announcements', label: 'Announcements', icon: 'bi-megaphone' },
    { id: 'resources', label: 'Resources', icon: 'bi-folder2-open' },
  ];

  const admin = [
    { id: 'manage-users', label: 'Manage Users', icon: 'bi-people' },
    { id: 'reports', label: 'Reports', icon: 'bi-graph-up' },
  ];

  const items = [...base, ...(role === 'executive' ? admin : [])];


  return (
    <>
      <aside
        className={
          `bg-white border-r border-[#aaa] shadow-right fixed top-14 bottom-0 left-0 overflow-y-auto transition-transform
           w-64 md:w-64
           md:translate-x-0
           ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
           md:block z-50 pointer-events-auto`
        }
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-3 py-2 bb-[#ddd]">
          <span className="text-sm font-semibold">Navigation</span>

          {/* mobile close button (visible only on small screens) */}
          <button
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="md:hidden p-1 rounded hover:bg-gray-100"
            aria-label="close sidebar"
            title="Close"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="mt-4 px-2">
          {items.map(it => (
            <button
              key={it.id}
              onClick={() => { setActive(it.id); if (mobileOpen) setMobileOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-1 rounded-md hover:bg-[#f1f8ff] transition mb-1 ${active === it.id ? 'bg-[#e8f6ff] font-semibold' : ''}`}
            >
              <i className={`bi ${it.icon} text-lg`} />
              <span>{it.label}</span>
            </button>
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