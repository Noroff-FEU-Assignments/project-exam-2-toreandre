import React, { useState } from 'react';
import { useAuth } from './../../auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './../../styles/Login.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const { from } = location.state || { from: { pathname: "/dashboard" } }; // default to dashboard after login

    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(username, password);
            navigate(from.pathname, { replace: true }); // use replace to avoid navigation history stack buildup
        } catch (error) {
            setError('Failed to login: Incorrect username or password.');
        }
    };
    
    
    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            {error && <div className="error">{error}</div>}
            <button type="submit">Login</button>
        </form>
    );
    
};

export default LoginForm;
