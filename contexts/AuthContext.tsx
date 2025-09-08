import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

const AUTH_KEY = 'masuvo_auth';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        try {
            const storedAuth = localStorage.getItem(AUTH_KEY);
            if (storedAuth) {
                setIsAuthenticated(JSON.parse(storedAuth));
            }
        } catch (error) {
            console.error('Failed to load auth state from localStorage', error);
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(AUTH_KEY, JSON.stringify(isAuthenticated));
        } catch (error) {
            console.error('Failed to save auth state to localStorage', error);
        }
    }, [isAuthenticated]);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
