import React from 'react';
import Header from '../components/common/Header';
import TravelPlanner from '../components/travelplanner/TravelPlanner';

const TravelPlannerPage = () => {

  return (
    	<div> 
			<Header />
			<div className="travel-planner-page"> 
				<h1>Reiseplanlegger</h1>

				<p id="travel-planner-body-text" className="tp-ai-description">En ai-drevet reiseplanlegger utviklet og trent på norske data av movai.<br/>
				Ai-modellene er spesialtrent til å utføre handlinger og hente sanntidsdata bassert på ditt søk.</p>

				<TravelPlanner />
			</div>
	</div>
	);
};

export default TravelPlannerPage;
