import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '/src/context/AuthContext.jsx'

const ProtectedRoute = ({ allowedRoles, allowedRole, children }) => {
    const {isLoggedIn, userRole} = useContext(AuthContext);
    const allowed = allowedRoles || allowedRole || null;

    if(!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if(allowed && !allowed.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children ?? <Outlet />
}

export default ProtectedRoute