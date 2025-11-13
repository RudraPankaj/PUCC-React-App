import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'
import { useTheme } from '../../hooks/useTheme.jsx'

export default function DashboardNavbar({ setMobileOpen }) {
  const { userData, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ddRef = useRef()
  const { theme, toggleTheme } = useTheme()

  const UserRole = userData.role.charAt(0).toUpperCase() + userData.role.slice(1)

  useEffect(() => {
    const onDoc = (e) => {
      if (!ddRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const doLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <div
        className={`flex items-center justify-between px-4 md:px-6 h-14 fixed top-0 left-0 right-0 z-50 shadow ${
          theme === 'light'
            ? 'bg-gradient-to-r from-[#00aae4] to-[#0067b6] text-white'
            : 'bg-gray-900 text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          {/* mobile: show hamburger/list to open sidebar; md+: hidden */}
          <button
            onClick={() => setMobileOpen && setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded hover:bg-white/10 transition"
            aria-label="open sidebar"
          >
            <i className="bi bi-list text-lg" />
          </button>

          <Link to="/" className="text-2xl font-extrabold select-none">
            PUCC
          </Link>
        </div>

        <div
          role="region"
          aria-label="Welcome banner"
          className="animate-slide rounded px-2 py-1 max-w-xl mx-auto text-center ml-10 lg:ml-42 shadow-md"
        >
          <p className="font-semibold tracking-tight text-sm text-white">
            Welcome, {UserRole}
          </p>
        </div>

        <div className="flex items-center gap-3 relative" ref={ddRef}>
          <div className="hidden sm:flex items-center gap-2 pr-2">
            <i className="bi bi-person-circle text-2xl" aria-hidden="true" />
            <span className="max-w-[140px] truncate font-medium">{userData?.username || 'User'}</span>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="user menu"
            className="p-2 rounded hover:bg-white/10 transition"
          >
            <i className="bi bi-caret-down-fill" />
          </button>

          <button
            onClick={toggleTheme}
            className="ml-3 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'} text-lg`} />
          </button>

          {open && (
            <div
              className={`absolute right-0 mt-12 w-48 rounded shadow-lg ring-1 ring-black/10 overflow-hidden bg-white text-black dark:bg-gray-800 dark:text-text-primary dark:ring-gray-600`}
            >
              <Link
                to="/dashboard/settings"
                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700`}
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={doLogout}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}