import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useTheme } from "../hooks/useTheme.jsx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userData, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const ddRef = useRef();

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "News", to: "/news" },
    { label: "Events", to: "/events" },
    { label: "Contact", to: "/contact" },
    { label: "About", to: "/about" },
  ];

  const getDashboardLink = () => {
    const role = userData?.role || "guest";
    if (role === "member") return "/dashboard/member";
    if (role === "executive") return "/dashboard/executive";
    if (role === "instructor") return "/dashboard/instructor";
    return "/home";
  };

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ddRef.current?.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <div className={`fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-6 py-3 shadow-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-[#00aae4] to-[#0067b6] text-white'}`}>
        {/* Logo + Desktop Nav */}
        <div className="flex flex-row gap-8 items-center">
          <div className={`text-3xl font-extrabold tracking-wide mr-2 select-none drop-shadow-lg ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
            PUCC
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-row gap-2">
            {menuItems.map((item) => (
              <Link key={item.label} to={item.to} className="relative group">
                <span className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 group-hover:shadow-md ${theme === 'dark' ? 'text-gray-300 group-hover:bg-gray-700 group-hover:text-white' : 'text-white group-hover:bg-white group-hover:text-[#00aae4]'}`}>
                  {item.label}
                </span>
                <span className={`absolute left-0 -bottom-1.5 w-0 h-1 rounded transition-all duration-300 group-hover:w-full ${theme === 'dark' ? 'bg-white' : 'bg-white'}`}></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Auth / Dashboard + Profile Dropdown */}
        <div
          className="hidden md:flex flex-row items-center gap-4 relative"
          ref={ddRef}
        >
          <button
            onClick={toggleTheme}
            className="py-2 px-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            title="Toggle theme"
          >
            <i
              className={`bi ${
                theme === "light" ? "bi-moon-fill" : "bi-sun-fill"
              } text-lg`}
            />
          </button>
          {userData ? (
            <>
              <Link
                to={getDashboardLink()}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 shadow ${
                  theme === "dark"
                    ? "bg-bg-secondary text-text-primary hover:bg-gray-600"
                    : "bg-primary text-white hover:bg-primary-darker"
                }`}
              >
                Go to Dashboard
              </Link>

              {/* User avatar with dropdown */}
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow focus:outline-none"
              >
                <img
                  src={userData.profileimgurl || "/icons/pucc.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-12 w-48 rounded shadow-lg ring-1 ring-black/10 overflow-hidden ${theme === 'dark' ? 'bg-gray-800 text-text-primary ring-gray-600' : 'bg-white text-black ring-black/10'}`}
                >
                  <Link
                    to="/dashboard/settings"
                    className={`block px-4 py-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={doLogout}
                    className={`w-full text-left px-4 py-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md border font-semibold transition-all duration-200 shadow ${
                  theme === "dark"
                    ? "border-border-color text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                    : "text-white border-white hover:bg-white/20 hover:text-white"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 shadow ${
                  theme === "dark"
                    ? "bg-primary text-white hover:bg-primary-darker"
                    : "bg-white text-[#00aae4] hover:bg-[#caf0f8]"
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay & Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          } ${theme === "dark" ? "bg-black/50" : "bg-black/30"}`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`fixed top-0 left-0 h-full w-64 shadow-lg z-50 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-gradient-to-r from-[#00aae4] to-[#0067b6] text-white"
          } pt-14`}
        >
          <div className="flex flex-col px-6 py-4 space-y-2 text-lg">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded transition-all ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-brand-blue-hover-dark"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <hr
              className={`my-2 ${
                theme === "dark" ? "border-gray-600" : "border-white/40"
              }`}
            />

            <button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                theme === "dark" ? "hover:bg-bg-secondary" : "hover:bg-brand-blue-hover-dark"
              }`}
            >
              <i
                className={`bi ${
                  theme === "light" ? "bi-moon-fill" : "bi-sun-fill"
                } text-lg`}
              />
              <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </button>

            {userData ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-md transition-all ${
                    theme === "dark"
                      ? "bg-primary text-white hover:bg-primary-darker"
                      : "bg-white text-primary hover:bg-[#caf0f8]"
                  }`}
                >
                  Go to Dashboard
                </Link>
                <div className="flex items-center gap-3 pt-3">
                  <div
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 shadow ${
                      theme === "dark" ? "border-border-color" : "border-white"
                    }`}
                  >
                    <img
                      src={userData.profileimgurl || "/icons/pucc.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {userData.username}
                  </span>
                </div>
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 mt-3 rounded-md text-sm ${
                    theme === "dark"
                      ? "bg-primary text-white hover:bg-primary-darker"
                      : "bg-white text-primary hover:bg-[#caf0f8]"
                  }`}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    doLogout();
                    setIsOpen(false);
                  }}
                  className={`block px-4 py-2 rounded-md text-sm ${
                    theme === "dark"
                      ? "bg-error text-white hover:bg-red-700"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-md border transition-all ${
                    theme === "dark"
                      ? "border-border-color hover:bg-bg-secondary"
                      : "border-white hover:bg-white/20"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-md border transition-all ${
                    theme === "dark"
                      ? "bg-primary text-white hover:bg-primary-darker"
                      : "bg-white text-[#00aae4] hover:bg-[#caf0f8]"
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Navbar);