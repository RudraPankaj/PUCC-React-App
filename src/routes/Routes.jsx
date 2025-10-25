import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from '../routes/ProtectedRoute.jsx'
import App from '../App.jsx'

// lazy load pages to reduce initial bundle
const HomePage = React.lazy(() => import('../pages/Home.jsx'))
const LoginPage = React.lazy(() => import('../pages/Login.jsx'))
const RegistrationPage = React.lazy(() => import('../pages/Registration.jsx'))
const AboutPage = React.lazy(() => import('../pages/About.jsx'))
const NotFound = React.lazy(() => import('../pages/NotFound.jsx'))
const ExecutiveDashboard = React.lazy(() => import('../pages/dashboard/ExecutiveDashboard'))
const MemberDashboard = React.lazy(() => import('../pages/dashboard/MemberDashboard'))
const InstructorDashboard = React.lazy(() => import('../pages/dashboard/InstructorDashboard'))
const UnAuthorized = React.lazy(() => import('../pages/UnAuthorized'))
const EventViewerPage = React.lazy(() => import('../pages/EventViewer.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // Public routes
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegistrationPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'unauthorized', element: <UnAuthorized /> },
      { path: 'eventdetails/:id', element: <EventViewerPage /> },

      // Protected routes for specific user roles
      {
        path: 'dashboard/member',
        element: <ProtectedRoute allowedRole={['member']}> <MemberDashboard /> </ProtectedRoute>
      },
      {
        path: 'dashboard/executive',
        element: <ProtectedRoute allowedRole={['executive']}> <ExecutiveDashboard /> </ProtectedRoute>
      },
      {
        path: 'dashboard/instructor',
        element: <ProtectedRoute allowedRole={['instructor']}> <InstructorDashboard /> </ProtectedRoute>
      },


      // Public route for route not found
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router