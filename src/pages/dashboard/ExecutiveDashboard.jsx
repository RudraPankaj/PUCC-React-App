import React from 'react'
import DashboardLayout from '/src/components/dashboard/DashboardLayout'
import ProfileSection from '/src/components/dashboard/sections/ProfileSection'
import EventsSection from '/src/components/dashboard/sections/EventsSection'
import ManageUsersSection from '/src/components/dashboard/sections/ManageUsersSection'

function ExecutiveDashboard() {
  return (
    <DashboardLayout role="executive">
      {({ active }) => (
        <>
          {active === 'profile' && <ProfileSection />}
          {active === 'events' && <EventsSection />}
          {active === 'manage-users' && <ManageUsersSection />}
          {active === 'reports' && <div><h2>Reports & Analytics</h2></div>}
        </>
      )}
    </DashboardLayout>
  )
}

export default ExecutiveDashboard