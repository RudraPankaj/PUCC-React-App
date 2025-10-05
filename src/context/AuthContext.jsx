import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // Login function
    const login = (data) => {
        setIsLoggedIn(true);
        setUserRole(data.role);
        setUserData(data.user);
        localStorage.setItem('userAuthData', JSON.stringify(data));
        if(data.token) localStorage.setItem('token', data.token);
    }

    // Logout function
    const logout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserData(null);
        localStorage.removeItem('userAuthData');
        localStorage.removeItem('token');
    }

    useEffect(() => {
        const storedData = localStorage.getItem('userAuthData');
        const token = localStorage.getItem('token');
        setIsAuthLoading(true);

        if (token) {
            axios.get(`${API_BASE_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                const data = { user: res.data.user, role: res.data.user.role, token };
                login(data);
            })
            .catch(() => {
                // invalid/expired Token: clear stored auth
                localStorage.removeItem('token');
                localStorage.removeItem('userAuthData');
            })
            .finally(() => setIsAuthLoading(false));
            return;
        }
        
        // No token: fall back to storedData if present (best-effort)
        if (storedData) {
            try{
                login(JSON.parse(storedData));
            } catch {
                localStorage.removeItem('userAuthData');
            }
        }
        setIsAuthLoading(false);
     }, []
    );

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, userData, login, logout, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };