import React from 'react';
import Header from '../components/common/Header';
import DepartureBoardForm from '../components/departureBoard/CreateDepartureBoard';

const DepartureBoardPage = () => {

	return (
		<div className="db-main-container"> 
			<Header />
			
				<div className="db-content">
					<h1>Avgangsskilt</h1>
					<p>Her kan du se avganger i sanntid fra alle holdeplasser i Norge.</p>
					<p>Du kan lage ditt helt eget avgansskilt for bruk på smartskjermer eller andre enheter.</p>
					<DepartureBoardForm />
				</div>
			</div>

		);
};

export default DepartureBoardPage;
