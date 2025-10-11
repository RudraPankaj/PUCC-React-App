import React, { useState } from 'react'
import DashboardNavbar from './DashboardNavbar'
import Sidebar from './Sidebar'

export default function DashboardLayout({ role = 'member', children }) {
  const [active, setActive] = useState('profile')
  const [mobileOpen, setMobileOpen] = useState(false)

  const mainPaddingClasses = 'md:pl-64'

  return (
    <>
      <DashboardNavbar setMobileOpen={setMobileOpen} />

      {/* mobile overlay when sidebar is open - place under sidebar (lower z) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        role={role}
        active={active}
        setActive={(id) => { setActive(id); if (mobileOpen) setMobileOpen(false) }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className={`bg-[#efefef] pt-20 pb-12 transition-all ${mainPaddingClasses}`}>
        <div className="max-w-6xl mx-auto px-4">
          {children({ active, setActive })}
        </div>
      </main>
    </>
  )
}