import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "News", to: "/news" },
    { label: "Contact", to: "/contact" },
    { label: "About", to: "/about" },
  ];

  // Height of navbar for sidebar offset
  const NAVBAR_HEIGHT = 56; // px (adjust if your navbar height changes)

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
              <Link
                key={item.label}
                to={item.to}
                className="relative group"
              >
                <span className="px-4 py-2 rounded-sm text-white font-medium transition-all duration-200 group-hover:bg-white group-hover:text-[#00aae4] group-hover:shadow-md">
                  {item.label}
                </span>
                <span className="absolute left-0 -bottom-1.5 w-0 h-1 bg-white rounded transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex flex-row items-center gap-4">
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
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay and Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? "" : "pointer-events-none"
        }`}
      >
        {/* Blurred overlay */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#00aae4] to-[#0067b6] shadow-lg z-50 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ paddingTop: NAVBAR_HEIGHT }}
        >
          <div className="flex flex-col px-6 py-4 space-y-2 text-white text-lg">
            {/* Nav Links */}
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

            {/* Auth Links */}
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
          </div>
        </div>

        {/* Body displacement */}
        <div
          className={`fixed top-0 left-0 w-full h-full z-30 transition-transform duration-300 ${
            isOpen ? "translate-x-64" : ""
          }`}
          style={{ pointerEvents: "none" }}
        />
      </div>

      {/* Main content wrapper */}
      <div
        className={`transition-transform duration-300 ${
          isOpen ? "translate-x-64" : ""
        }`}
      >
        {/* Place your main content here or wrap your App's content with this div */}
      </div>
    </>
  );
}

export default React.memo(Navbar);
