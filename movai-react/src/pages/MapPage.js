import React from 'react';
import MapContainer from '../components/map/MapContainer';
import Header from '../components/common/Header';
import './../styles/map/Map.css';

const MapPage = () => {
	return (
		<>
			<Header />
			<MapContainer />
		</>
	);
};

export default MapPage;
