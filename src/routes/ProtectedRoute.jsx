import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { isLoggedIn, userRole, isAuthLoading } = useContext(AuthContext);
    const allowed = allowedRoles || null;
    console.log("ProtectedRoute: isLoggedIn:", isLoggedIn, "userRole:", userRole, "allowedRoles:", allowedRoles);

    // while we are checking token / loading user, don't redirect — show a loader
    if (isAuthLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
                <div className="flex flex-col items-center">
                    <i className="bi bi-arrow-repeat animate-spin text-4xl text-white mb-4"></i>
                    <span className="text-white text-lg font-medium">Authorizing ...</span>
                </div>
            </div>
        );
    }

    if(!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if(allowed && userRole && !allowed.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children ?? <Outlet />
}

export default ProtectedRoute