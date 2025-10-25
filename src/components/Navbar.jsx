import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userData, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const ddRef = useRef();

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "News", to: "/news" },
    { label: "Contact", to: "/contact" },
    { label: "About", to: "/about" },
  ];

  const NAVBAR_HEIGHT = 56;

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
      <div className="fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-6 py-3 bg-gradient-to-r from-[#00aae4] to-[#0067b6] shadow-lg">
        {/* Logo + Desktop Nav */}
        <div className="flex flex-row gap-8 items-center">
          <div className="text-3xl text-white font-extrabold tracking-wide mr-2 select-none drop-shadow-lg">
            PUCC
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-row gap-2">
            {menuItems.map((item) => (
              <Link key={item.label} to={item.to} className="relative group">
                <span className="px-4 py-2 rounded-sm text-white font-medium transition-all duration-200 group-hover:bg-white group-hover:text-[#00aae4] group-hover:shadow-md">
                  {item.label}
                </span>
                <span className="absolute left-0 -bottom-1.5 w-0 h-1 bg-white rounded transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Auth / Dashboard + Profile Dropdown */}
        <div className="hidden md:flex flex-row items-center gap-4 relative" ref={ddRef}>
          {userData ? (
            <>
              <Link
                to={getDashboardLink()}
                className="px-4 py-2 rounded-md bg-white text-[#00aae4] font-semibold hover:bg-[#caf0f8] transition-all duration-200 shadow"
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
                <div className="absolute right-0 top-14 w-44 bg-white text-black rounded shadow-lg ring-1 ring-black/10 overflow-hidden z-50">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={doLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
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
                className="px-4 py-2 rounded-md text-white border border-white hover:bg-white hover:text-[#00aae4] font-semibold transition-all duration-200 shadow"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md bg-white text-[#00aae4] font-semibold hover:bg-[#caf0f8] transition-all duration-200 shadow"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
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
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#00aae4] to-[#0067b6] shadow-lg z-50 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ paddingTop: NAVBAR_HEIGHT }}
        >
          <div className="flex flex-col px-6 py-4 space-y-2 text-white text-lg">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="hover:bg-[#005080] px-4 py-2 rounded transition-all"
              >
                {item.label}
              </Link>
            ))}

            <hr className="border-white/40 my-2" />

            {userData ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md bg-white text-[#00aae4] hover:bg-[#caf0f8] transition-all"
                >
                  Go to Dashboard
                </Link>
                <div className="flex items-center gap-3 pt-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow">
                    <img
                      src={userData.profileimgurl || "/icons/pucc.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{userData.username}</span>
                </div>
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 mt-3 bg-white text-[#00aae4] rounded-md hover:bg-[#caf0f8] text-sm"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    doLogout();
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md border border-white hover:bg-[#005080] transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md bg-white text-[#00aae4] hover:bg-[#caf0f8] transition-all"
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