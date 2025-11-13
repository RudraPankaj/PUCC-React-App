import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from '../App.jsx'
import dashboardRoutes from './Dashboard.jsx';

// Directly import pages for testing, remove lazy loading
import HomePage from '../pages/Home.jsx'
import LoginPage from '../pages/Login.jsx'
import RegistrationPage from '../pages/Registration.jsx'
import AboutPage from '../pages/About.jsx'
import NotFound from '../pages/NotFound.jsx'
import UnAuthorized from '../pages/UnAuthorized'
import EventViewerPage from '../pages/EventViewer.jsx'
import EventsPage from '../pages/Events.jsx'

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
      { path: 'events', element: <EventsPage /> },
      { path: 'eventdetails/:id', element: <EventViewerPage /> },

      ...dashboardRoutes,

      // Public route for route not found
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router