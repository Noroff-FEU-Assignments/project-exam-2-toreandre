import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const navigate = useNavigate();
    
    const login = async (username, password) => {
        try {
            const response = await fetch('https://rosander.no/akkuratda/backend/wp-json/jwt-auth/v1/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                throw new Error('Innlogging feilet, kontroller at brukernavn og passord er korrekt.');
            }
    
            const data = await response.json();
            localStorage.setItem('jwtToken', data.token);
            setToken(data.token);

            return Promise.resolve();
        } catch (error) {
            console.error('An error occurred during login:', error);
            return Promise.reject(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
        navigate('/');
    };

    const value = {
        token,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);