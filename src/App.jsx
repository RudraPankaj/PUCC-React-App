import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import NotificationContainer from './components/NotificationContainer'

export default function App() {
  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          <NotificationContainer />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Wait a moment...</div>}>
            <Outlet />
          </Suspense>
        </NotificationProvider>
      </AuthProvider>
    </>
  )
}