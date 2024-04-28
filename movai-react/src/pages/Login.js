import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
	const { token } = useAuth();

	// Redirect if already logged in
	if (token) {
		return <Navigate to="/dashboard" replace />;
	}

	return (
		<div className="login-container">
			<h1>movai</h1>
			<p>Logg inn på ditt movai dashboard</p>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
