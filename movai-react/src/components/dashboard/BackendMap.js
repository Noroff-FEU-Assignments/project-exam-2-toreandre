import React from 'react';
import { useState, useRef } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

// Initialize the map component with your Mapbox access token
const Map = ReactMapboxGl({
  	accessToken: 'pk.eyJ1Ijoicm9zYW5kZXIiLCJhIjoiY2x1OWZuNmhiMDl1dDJsbW01aGc3Ynh3MyJ9.3Ip3cN8u5ysppMZ2cQlxUg'
});
 
const BackendMapContainer = () => {
	const mapRef = useRef(null);
	const [buses, setBuses] = useState([]);

	// Convert time from API data to minutes
	function parseDurationToMinutes(duration) {
		const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
		const parts = regex.exec(duration);
		const hours = parts[1] ? parseInt(parts[1]) * 60 : 0;
		const minutes = parts[2] ? parseInt(parts[2]) : 0;
		const seconds = parts[3] ? parseInt(parts[3]) / 60 : 0;

		return hours + minutes + seconds;
	}

	// Preprocess GeoJSON data
	function preprocessGeoJSON(data) {
		data.features = data.features.map(feature => {
			const delayDuration = feature.properties.CurrentDelay;
			const delayInMinutes = parseDurationToMinutes(delayDuration);
			feature.properties.delayMinutes = Math.round(delayInMinutes);
			return feature;
		});
		return data;
	}

	const onStyleLoad = (map) => {
		mapRef.current = map;

		// Locations to animate the map between
		const locations = [
			{ center: [7.128975, 58.227906], zoom: 8, bearing: 0, speed: 0.1 },
			{ center: [8.024974, 58.127029], zoom: 10, bearing: 0, speed: 0.1 },
			{ center: [8.857539, 58.610059], zoom: 8, bearing: 0, speed: 0.1 }
		];

		let currentIndex = 0;

		const animateMap = () => {
			const location = locations[currentIndex];
			map.flyTo(location);
			currentIndex = (currentIndex + 1) % locations.length; 
			setTimeout(animateMap, 30000);
		};
		
		animateMap();
		console.log('Map style loaded:', map.getStyle());

		// THe source for the data layer
		const dataUrl = './../cr-data/AKT.geojson';

		fetch(dataUrl)
			.then(response => response.json())
			.then(data => {
				const processedData = preprocessGeoJSON(data);
				setBuses(processedData.features);
				map.addSource('AKT', {
					type: 'geojson',
					data: processedData
				});

				// Add the heatmap layer
				map.addLayer({
					id: 'AKT-heatmap',
					type: 'heatmap',
					source: 'AKT',
					maxzoom: 15,
					paint: {
						'heatmap-weight': [
							'interpolate',
							['linear'],
							['get', 'delayMinutes'],
							0, 0.3,
							10, 0.1
						],
						'heatmap-intensity': [
							'interpolate',
							['linear'],
							['zoom'],
							0, 1,
							15, 3
						],
						'heatmap-color': [
							'interpolate',
							['linear'],
							['heatmap-density'],
							0, 'rgba(33,102,172,0)',
							0.1, 'green',
							0.7, 'yellow',
							0.8, 'orange',
							0.9, 'red'
						],
						'heatmap-radius': [
							'interpolate',
							['linear'],
							['zoom'],
							0, 2,
							15, 20
						],
						'heatmap-opacity': [
							'interpolate',
							['linear'],
							['zoom'],
							7, 1,
							8, 0
						]
					}
				});

            // Add the circle layer to display when zooming in
            map.addLayer({
                id: "AKT-layer",
                type: 'circle',
                source: "AKT",
                minzoom: 7,
                paint: {
                    'circle-radius': 5,
                    'circle-color': [
                        'step',
                        ['get', 'delayMinutes'],
                        'green',
                        3, 'yellow',
                        5, 'orange',
                        10, 'red'
                    ],
                    'circle-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        7, 0,
                        8, 0.5,
                        8.5, 1
                    ]
                }
            });
        })
        .catch(error => console.error('Error loading the GeoJSON data:', error));
	};

	// Fly to the selected bus on the map
	const flyToBus = (bus) => {
		mapRef.current.flyTo({
			center: bus.geometry.coordinates,
			zoom: 14
		});
	};

    return (
        <div className="backend-map-container">
			<Map
				style="mapbox://styles/rosander/cl6ivx528000t14oefuzj2qlo"
				containerStyle={{
					height: '300px',
					width: '650px'
				}} 
				center={[7.801197, 58.383038]}
				zoom={[6]}
                pitch={[50]}
				onStyleLoad={onStyleLoad}
			>
			</Map>

            <div className="backend-sidebar">
				<h3 className="backend-sidebar-title">Forsinkelser</h3>
        		{buses.map(bus => (
					<div key={bus.properties.id} onClick={() => flyToBus(bus)} className="backend-sidebar-item bus-list-item">
						<p className="backend-sidebar-body-text">{bus.properties.DestinationName} {bus.properties.delayMinutes} min.</p>
					</div>
				))}
			</div>
    	</div>
  	);
};

export default BackendMapContainer;