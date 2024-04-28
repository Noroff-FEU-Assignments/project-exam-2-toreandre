import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="App-header">
			<h1>movai</h1>
			<nav>
				<ul>
					<li><Link to="/kart">Kart</Link></li>
					<li><Link to="/">Reise</Link></li>
					<li><Link to="/avgangsskilt">Avgang</Link></li>
					<li><Link to="/om-movai">Om</Link></li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
