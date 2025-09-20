import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '/src/components/Navbar'
import Footer from '/src/components/Footer'
import axios from 'axios'

function Login() {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '', role: 'member' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-16 h-160 bg-gradient-to-br from-[#e6f1fa] to-[#b3d8f4]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-[#0067b6] mb-8">Club Login</h2>

          {error && <p className='text-red-500 text-center mb-8'>{error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-8">
              {['executive','member','instructor'].map(role => (
                <label key={role}>
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    className="peer sr-only"
                    checked={formData.role === role}
                    onChange={handleChange}
                  />
                  <span className={`px-4 py-2 rounded-lg border border-[#0076b6] bg-[#f1f9ff] text-[#0067b6] font-medium cursor-pointer peer-checked:bg-[#0067b6] peer-checked:text-white transition`}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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