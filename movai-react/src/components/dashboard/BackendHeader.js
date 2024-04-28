import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../../auth/AuthContext';

const BackendHeader = () => {
	const { token, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	setInterval(() => {
		const date = new Date();
		const time = date.toLocaleTimeString();
		document.querySelector('.backend-header-clock').textContent = time;
	}, 1000);

	return (
		<header className="backend-header">
			<Link to="/"><h1 className="header-logo-text">movai</h1></Link>
			<p className="backend-header-clock"></p>
			<nav>
				{token ? (
					<button className="btn-login" onClick={handleLogout}>Logg ut</button>
				) : (
					<Link to="/login">Logg inn</Link>
				)}
			</nav>
		</header>
	);
};

export default BackendHeader;
