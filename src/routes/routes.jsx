import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from '/src/routes/ProtectedRoute.jsx'

import App from '/src/App.jsx'
import HomePage from '/src/pages/Home.jsx'
import LoginPage from '/src/pages/Login.jsx'
import RegistrationPage from '/src/pages/Registration.jsx'
import AboutPage from '/src/pages/About.jsx'
import NotFound from '/src/pages/NotFound.jsx'
import ExecutiveDashboard from '/src/pages/dashboard/ExecutiveDashboard'
import MemberDashboard from '/src/pages/dashboard/MemberDashboard'
import InstructorDashboard from '/src/pages/dashboard/InstructorDashboard'
import UnAuthorized from '/src/pages/UnAuthorized'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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