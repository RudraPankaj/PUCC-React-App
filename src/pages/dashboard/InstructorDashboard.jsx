import React from 'react'
import DashboardLayout from '/src/components/dashboard/DashboardLayout'
import ProfileSection from '/src/components/dashboard/sections/ProfileSection'
import EventsSection from '/src/components/dashboard/sections/EventsSection'

function InstructorDashboard() {
  return (
    <DashboardLayout role="instructor">
      {({ active }) => (
        <>
          {active === 'profile' && <ProfileSection />}
          {active === 'events' && <EventsSection />}
          {active === 'announcements' && <div><h2>Instructor Announcements</h2></div>}
          {active === 'resources' && <div><h2>Instructor Resources</h2></div>}
        </>
      )}
    </DashboardLayout>
  )
}

export default InstructorDashboard