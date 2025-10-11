import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <>
      <AuthProvider>
        
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Wait a moment...</div>}>
          <Outlet />
        </Suspense>

      </AuthProvider>
    </>
  )
}