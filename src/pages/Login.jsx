import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import { login as apiLogin } from '../utils/api.js';
import { parseApiError, setToken } from '../utils/helpers.js';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, login, userRole } = useContext(AuthContext);
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'member' });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard/' + userRole + '/profile', { replace: true });
    }
  }, [isLoggedIn, userRole, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiLogin(formData);
      setToken(data.token);
      const normalizedRole = (data.user?.role || '').toString().toLowerCase() || 'member';
      const authPayload = {
        user: data.user,
        role: normalizedRole,
        token: data.token,
      };

      login(authPayload);
      addNotification('Logged in successfully!', 'success');
    } catch (err) {
      const message = parseApiError(err);
      addNotification(message, 'error');
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#e6f1fa] to-[#b3d8f4]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mt-20 mb-10">
          <h2 className="text-2xl font-bold text-center text-[#0067b6] mb-8">Club Login</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-8">
              {['executive', 'member', 'instructor'].map(role => (
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
              className="w-full py-2 bg-brand-blue-dark text-white font-semibold rounded-lg hover:bg-brand-blue-hover-dark transition cursor-pointer"
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
  );
}

export default Login;