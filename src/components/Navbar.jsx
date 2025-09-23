import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["Home", "News", "Contact", "About"];

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-6 py-3 bg-gradient-to-r from-[#00aae4] to-[#0067b6] shadow-lg">
        {/* Logo + Desktop Nav */}
        <div className="flex flex-row gap-8 items-center">
          <Link to="/">
            <div className="text-3xl text-white font-extrabold tracking-wide mr-2 select-none drop-shadow-lg">
              PUCC
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-row gap-2">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group"
              >
                <span className="px-4 py-2 rounded-sm text-white font-medium transition-all duration-200 group-hover:bg-white group-hover:text-[#00aae4] group-hover:shadow-md">
                  {item}
                </span>
                <span className="absolute left-0 -bottom-1.5 w-0 h-1 bg-white rounded transition-all duration-300 group-hover:w-full"></span>
              </a>
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

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 mt-10 bg-gradient-to-b from-[#00aae4] to-[#0067b6] shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 space-y-6 text-white text-lg">
          {/* Close Button */}
          <button className="self-end mb-4" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>

          {/* Nav Links */}
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:text-[#00aae4] px-4 py-2 rounded transition-all"
            >
              {item}
            </a>
          ))}

          <hr className="border-white/40" />

          {/* Auth Links */}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-md border border-white hover:bg-white hover:text-[#00aae4] transition-all"
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
    </>
  );
}

export default Navbar;