import React, { useState } from 'react'

export default function ManageUsersSection() {
  const [form, setForm] = useState({ username: '', email: '', role: 'member' })

  const add = (e) => {
    e.preventDefault()
    setForm({ username: '', email: '', role: 'member' })
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      <form onSubmit={add} className="flex gap-2 mb-4 flex-wrap">
        <input 
          value={form.username} 
          onChange={e => setForm({ ...form, username: e.target.value })} 
          className="bg-white p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]" 
          placeholder="Username" 
        />
        <input 
          value={form.email} 
          onChange={e => setForm({ ...form, email: e.target.value })} 
          className="bg-white p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]" 
          placeholder="Email" 
        />
        <select 
          value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} 
          className="bg-white p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0067b6] focus:border-[#0067b6]"
        >
          <option value="member">Member</option>
          <option value="instructor">Instructor</option>
          <option value="executive">Executive</option>
        </select>
        <button className="px-4 py-2 bg-[#0067b6] text-white rounded">Find</button>
      </form>
    </section>
  )
}