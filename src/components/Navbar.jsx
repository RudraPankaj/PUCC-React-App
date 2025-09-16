import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-6 py-3 bg-gradient-to-r from-[#00aae4] to-[#0067b6] shadow-lg">
        <div className="flex flex-row gap-8 items-center">
          <Link to="/">
            <div className="text-3xl text-white font-extrabold tracking-wide mr-2 select-none drop-shadow-lg">
              PUCC
            </div>
          </Link>
          <nav className="flex flex-row gap-2">
            {["Home", "News", "Contact", "About"].map((item) => (
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
        <div className="flex flex-row items-center gap-4">
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
      </div>
    </>
  )
}

export default Navbar