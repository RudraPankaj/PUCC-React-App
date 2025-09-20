import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '/src/App.jsx'
import HomePage from '/src/pages/Home.jsx'
import LoginPage from '/src/pages/Login.jsx'
import RegistrationPage from '/src/pages/Registration.jsx'
import NotFound from '/src/pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegistrationPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router