import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
        <h1 style={{ fontSize: '6rem', color: '#ff6f61' }}>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" style={{ color: '#1976d2', textDecoration: 'underline' }}>Go to Home</Link>
    </div>

    </>
  )
}

export default NotFound