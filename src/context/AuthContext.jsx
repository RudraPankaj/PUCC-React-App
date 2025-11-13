import { createContext, useState, useEffect } from "react";
import { getMe } from '../utils/api.js';
import { clearAuth } from '../utils/helpers.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // Login function
    const login = (data) => {
        setIsLoggedIn(true);
        const role = data.role?.toString().toLowerCase() ?? null;
        setUserRole(role);
        setUserData(data.user);
        localStorage.setItem('userAuthData', JSON.stringify(data));
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        console.log("AuthContext: User logged in.");
    };

    // Logout function
    const logout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserData(null);
        localStorage.removeItem('userAuthData');
        localStorage.removeItem('token');
        console.log("AuthContext: User logged out.");
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthLoading(true);

        if (token) {
            getMe()
                .then(res => {
                    const roleFromMe = res.user.role?.toString().toLowerCase();
                    const data = { user: res.user, role: roleFromMe, token };
                    login(data);
                    console.log("AuthContext: getMe resolved. User role:", roleFromMe);
                })
                .catch(() => {
                    // invalid/expired Token: clear stored auth
                    clearAuth();
                    console.log("AuthContext: getMe failed or token invalid. Clearing auth.");
                })
                .finally(() => {
                    setIsAuthLoading(false);
                    console.log("AuthContext: isAuthLoading set to false after getMe.");
                });
            return;
        }

        setIsAuthLoading(false);
        console.log("AuthContext: No token found. Not logged in. isAuthLoading set to false.");
    }, []);

    console.log("AuthContext: Rendering provider. isLoggedIn:", isLoggedIn, "userRole:", userRole, "isAuthLoading:", isAuthLoading, "userData:", userData);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, userData, setUserData, login, logout, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };