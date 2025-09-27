import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import App from '../App'

// lazy load pages to reduce initial bundle
const HomePage = React.lazy(() => import('/src/pages/Home.jsx'))
const LoginPage = React.lazy(() => import('/src/pages/Login.jsx'))
const RegistrationPage = React.lazy(() => import('/src/pages/Registration.jsx'))
const AboutPage = React.lazy(() => import('/src/pages/About.jsx'))
const NotFound = React.lazy(() => import('/src/pages/NotFound.jsx'))
const ExecutiveDashboard = React.lazy(() => import('/src/pages/dashboard/ExecutiveDashboard'))
const MemberDashboard = React.lazy(() => import('/src/pages/dashboard/MemberDashboard'))
const InstructorDashboard = React.lazy(() => import('/src/pages/dashboard/InstructorDashboard'))
const UnAuthorized = React.lazy(() => import('/src/pages/UnAuthorized'))

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