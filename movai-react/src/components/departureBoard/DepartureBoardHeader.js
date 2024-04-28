import React from 'react';

const DepartureBoardHeader = ({stopPlace}) => {

    setInterval(() => {
        document.querySelector('.db-header-clock').textContent = new Date().toLocaleTimeString();
    }, 1000);

	return (
		<div className="db-header">
			<h1 className="db-header-text">movai</h1>
			<p className="db-header-sub-text">Avganger fra {stopPlace}</p>
			<p className="db-header-clock"></p>
		</div>
	);
};

export default DepartureBoardHeader;
