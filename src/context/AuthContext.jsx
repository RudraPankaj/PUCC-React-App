import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);

    // Login function
    const login = (data) => {
        setIsLoggedIn(true);
        setUserRole(data.role);
        setUserData(data.user);
        localStorage.setItem('userAuthData', JSON.stringify(data));
    }

    // Logout function
    const logout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserData(null);
        localStorage.removeItem('userAuthData');
    }

    useEffect(() => {
        const storedData = localStorage.getItem('userAuthData');
        if(storedData) {
            const data = JSON.parse(storedData);
            login(data);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };