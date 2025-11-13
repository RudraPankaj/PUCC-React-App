import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import { login as apiLogin } from '../utils/api.js';
import { parseApiError, setToken } from '../utils/helpers.js';
import { useTheme } from '../hooks/useTheme.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, login, userRole } = useContext(AuthContext);
  const { addNotification } = useNotification();
  const { theme } = useTheme();
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

      <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-[#e6f1fa] to-[#b3d8f4]'}`}>
        <div className={`w-full max-w-md rounded-2xl shadow-xl p-8 mt-20 mb-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-white' : 'text-[#0067b6]'}`}>Club Login</h2>

          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="flex justify-center gap-3 mb-8">
              {['executive', 'member', 'instructor'].map((role) => (
                <label key={role}>
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    className="peer sr-only"
                    checked={formData.role === role}
                    onChange={handleChange}
                  />
                  <span
                    className={`px-4 py-2 rounded-lg border font-medium cursor-pointer peer-checked:text-white transition
                      ${theme === 'dark' ? 'border-blue-500 bg-gray-700 text-white peer-checked:bg-blue-600' : 'border-[#0076b6] bg-[#f1f9ff] text-[#0067b6] peer-checked:bg-[#0067b6]'}`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            <div>
              <label className={`block font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                required
                autoComplete="off"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100'}`}
              />
            </div>
            <div>
              <label className={`block font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="new-password"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100'}`}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#0067b6] text-white font-semibold rounded-lg hover:bg-[#0057b6] transition focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
            >
              Login
            </button>
          </form>

          <div className={`mt-6 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            New to PUCC?{' '}
            <Link to="/register" className={`${theme === 'dark' ? 'text-blue-400' : 'text-[#0076b6]'}`}>
              Register here
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
