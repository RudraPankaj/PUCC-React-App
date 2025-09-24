import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '/src/components/Navbar'
import Footer from '/src/components/Footer'
import axios from 'axios'
import { AuthContext } from '/src/context/AuthContext.jsx'

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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // redirect to dashboard if user is already logged in
  const { isLoggedIn, userRole } = useContext(AuthContext); // Load the login context function
  if(isLoggedIn) {
    navigate('/dashboard/'+userRole);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setSuccess(res.data.msg);
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Database connection failed!");
      setSuccess('');
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f0f8ff] to-[#cce6ff] py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mt-20 mb-20">
          <h2 className="text-3xl font-bold text-center text-[#0067b6] mb-6">Join PUCC</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

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
                  <span className="font-medium text-[#0067b6]">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </label>
              ))}
            </div>

            {/* Username */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] bg-[#efefef]"
                required
              />
            </div>

            {/* Student ID */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter Student ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] bg-[#efefef]"
                required
              />
            </div>

            {/* User Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter e-mail address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] bg-[#efefef]"
                required
              />
            </div>

            <div>
               <label className="block mb-1 font-medium text-gray-700">Contact</label>
               <input
                 type="text"
                 name="contact"
                 value={formData.contact}
                 onChange={handleChange}
                 placeholder="Phone or contact number"
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] bg-[#efefef]"
               />
             </div>
 
             <div>
               <label className="block mb-1 font-medium text-gray-700">Gender</label>
               <select
                 name="gender"
                 value={formData.gender}
                 onChange={handleChange}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] bg-[#efefef]"
               >
                 <option value="male">Male</option>
                 <option value="female">Female</option>
               </select>
             </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] bg-[#efefef]"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] bg-[#efefef]"
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

          <p className="mt-6 text-center text-gray-700">
            Already have an account? <Link to="/login" className="text-[#0076b6] font-semibold">Login here</Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Registration