import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function NotFound() {
  const { userRole } = useContext(AuthContext);

  return (
    <>
      
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
        <h1 style={{ fontSize: '6rem', color: '#ff6f61' }}>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" style={{ color: '#1976d2', textDecoration: 'underline' }}>Go to Home</Link>
        { /* link to /{userRole.tolowercase()/dashboard} */ }
        {userRole && <>
          <p>or</p> <Link to={`/dashboard/${userRole.toLowerCase()}`} style={{ color: '#1976d2', textDecoration: 'underline' }}>Go to Dashboard</Link>
          </>
        }
    </div>

    </>
  )
}

export default NotFound