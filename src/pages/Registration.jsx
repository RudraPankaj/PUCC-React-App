import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as apiRegister } from '../utils/api.js'
import { parseApiError } from '../utils/helpers.js'
import { AuthContext } from '../context/AuthContext.jsx'
import { useNotification } from '../context/NotificationContext.jsx'
import { useTheme } from '../hooks/useTheme.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    studentId: '',
    email: '',
    contact: '',
    gender: 'male',
    password: '',
    confirmPassword: '',
    role: 'member'
  });
  const { addNotification } = useNotification();
  const { theme } = useTheme();

  // redirect to dashboard if user is already logged in
  const { isLoggedIn, userRole } = useContext(AuthContext); // Load the login context function
  useEffect(() => {
    if(isLoggedIn) {
      navigate('/dashboard/'+userRole, { replace: true });
    }
  }, [isLoggedIn, userRole, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addNotification("Passwords do not match", 'error');
      return;
    }
    try {
      const data = await apiRegister(formData);
      addNotification(data.msg || 'Registered successfully', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      addNotification(parseApiError(err), 'error');
    }
  }

  return (
    <>
      <Navbar />

      <div className={`flex flex-col items-center justify-center min-h-screen py-12 px-4 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-[#f0f8ff] to-[#cce6ff]'}`}>
        <div className={`w-full max-w-md rounded-2xl shadow-lg p-8 mt-20 mb-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl font-bold text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#0067b6]'}`}>Join PUCC</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Role Selection */}
            <div className="flex justify-between mb-4">
              {['executive','member','instructor'].map(role => (
                <label key={role} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    className="accent-[#0067b6]"
                  />
                  <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-[#0067b6]'}`}>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </label>
              ))}
            </div>

            {/* Username */}
            <div>
              <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100'}`}
                required
              />
            </div>

            {/* Student ID */}
            <div>
              <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your student ID"
                 className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100'}`}
                required
              />
            </div>

            {/* User Email */}
            <div>
              <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter e-mail address"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100'}`}
                required
              />
            </div>

            <div>
               <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Contact</label>
               <input
                 type="text"
                 name="contact"
                 value={formData.contact}
                 onChange={handleChange}
                 placeholder="Phone or contact number"
                 className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100'}`}
               />
             </div>
 
             <div>
               <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Gender</label>
               <select
                 name="gender"
                 value={formData.gender}
                 onChange={handleChange}
                 className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100'}`}
               >
                 <option value="male">Male</option>
                 <option value="female">Female</option>
               </select>
             </div>

            {/* Password */}
            <div>
              <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100'}`}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`block mb-1 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100'}`}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-[#0067b6] text-white font-semibold rounded-lg hover:bg-[#0057b6] transition"
            >
              Register
            </button>
          </form>

          <p className={`mt-6 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Already have an account? <Link to="/login" className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-[#0076b6]'}`}>Login here</Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Registration
