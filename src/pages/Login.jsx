import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext.jsx'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  
  const navigate = useNavigate();
  const { isLoggedIn, login, userRole } = useContext(AuthContext); // Load the login context function
  const [formData, setFormData] = useState({ email: '', password: '', role: 'member' });
  const [error, setError] = useState('');

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
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, formData);

      // store token and also let AuthContext know about the logged in user
      localStorage.setItem('token', res.data.token);

      // backend returns { token, isLoggedIn, user }
      const authPayload = {
        user: res.data.user,
        role: res.data.user?.role,
        token: res.data.token,
      };
      login(authPayload); // set isLoggedIn, userRole, userData and persist userAuthData
      navigate('/dashboard/'+ authPayload.role); // redirect to user dashboard
    } catch (err) {
      setError(err.response?.data?.msg || err.message || "Database connection failed");
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#e6f1fa] to-[#b3d8f4]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mt-20 mb-10">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6dfff] bg-[#efefef]"
                placeholder="Enter your email"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6dfff] bg-[#efefef]"
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