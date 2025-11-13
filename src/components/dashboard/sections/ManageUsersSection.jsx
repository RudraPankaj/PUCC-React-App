import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';

export default function ManageUsersSection() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ username: '', email: '', role: 'member' });

  const add = (e) => {
    e.preventDefault();
    // Handle form submission logic
    setForm({ username: '', email: '', role: 'member' });
  };

  const inputStyles = `p-2 text-sm border rounded-md focus:outline-none focus:ring-2 ${
    theme === 'dark'
      ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500'
      : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-[#0067b6] focus:border-[#0067b6]'
  }`;

  return (
    <section>
      <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
        Manage Users
      </h2>

      <form onSubmit={add} className="flex gap-2 mb-4 flex-wrap">
        <input 
          value={form.username} 
          onChange={e => setForm({ ...form, username: e.target.value })} 
          className={inputStyles} 
          placeholder="Username" 
        />
        <input 
          value={form.email} 
          onChange={e => setForm({ ...form, email: e.target.value })} 
          className={inputStyles} 
          placeholder="Email" 
        />
        <select 
          value={form.role} 
          onChange={e => setForm({ ...form, role: e.target.value })} 
          className={inputStyles}
        >
          <option value="member">Member</option>
          <option value="instructor">Instructor</option>
          <option value="executive">Executive</option>
        </select>
        <button 
          className={`px-4 py-2 text-white rounded font-semibold transition-colors ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-[#0067b6] hover:bg-[#005a9c]'
          }`}
        >
          Find
        </button>
      </form>
    </section>
  );
}
