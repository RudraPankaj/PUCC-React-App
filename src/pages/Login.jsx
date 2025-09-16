import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '/src/components/Navbar'
import Footer from '/src/components/Footer'

function Login() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-16 h-120 bg-gradient-to-br from-[#e6f1fa] to-[#b3d8f4]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-[#0067b6] mb-8">Club Login</h2>
          <form className="space-y-6">
            <div className="flex justify-center gap-3 mb-8">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="executive"
                  className="peer sr-only"
                />
                <span className="px-4 py-2 rounded-lg border border-[#0076b6] bg-[#f1f9ff] text-[#0067b6] font-medium cursor-pointer peer-checked:bg-[#0067b6] peer-checked:text-white transition">
                  Executive
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="member"
                  className="peer sr-only"
                  defaultChecked
                />
                <span className="px-4 py-2 rounded-lg border border-[#0076b6] bg-[#f1f9ff] text-[#0067b6] font-medium cursor-pointer peer-checked:bg-[#0067b6] peer-checked:text-white transition">
                  Member
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  className="peer sr-only"
                />
                <span className="px-4 py-2 rounded-lg border border-[#0076b6] bg-[#f1f9ff] text-[#0067b6] font-medium cursor-pointer peer-checked:bg-[#0067b6] peer-checked:text-white transition">
                  Instructor
                </span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6dfff]"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6dfff]"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#0067b6] text-white font-semibold rounded-lg hover:bg-[#0057b6] transition cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-gray-700">
            New to PUCC? <Link to="/register" className="text-[#0076b6]">Register here</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Login