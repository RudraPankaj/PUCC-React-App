import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <>
      <AuthProvider>
        
        <Outlet />

      </AuthProvider>
    </>
  )
}