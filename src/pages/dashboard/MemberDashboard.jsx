import React from 'react'
import DashboardLayout from '/src/components/dashboard/DashboardLayout'
import ProfileSection from '/src/components/dashboard/sections/ProfileSection'
import EventsSection from '/src/components/dashboard/sections/EventsSection'

function MemberDashboard() {
  return (
    <DashboardLayout role="member">
      {({ active }) => (
        <>
          {active === 'profile' && <ProfileSection />}
          {active === 'events' && <EventsSection />}
          {active === 'announcements' && <div><h2>Announcements</h2></div>}
          {active === 'resources' && <div><h2>Resources</h2></div>}
        </>
      )}
    </DashboardLayout>
  )
}

export default MemberDashboard