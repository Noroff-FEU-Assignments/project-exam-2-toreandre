import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl from 'react-mapbox-gl';
import operators from './DefaultOperators';
import SideFilter from './SideFilter';
import CarPopup from './popup/CarPopup';
import ScooterPopup from './popup/ScooterPopup';
import BikePopup from './popup/BikeStationPopup';
import BusStopPopup from './popup/BusStopPopup';
import ElectricCarChargerPopup from './popup/ElectricChargerPopup';
import BikeStationPopup from './popup/BikeStationPopup';
import TemperaturePopup from './popup/TemperaturePopup';
import LocalStorageManager from './../common/LocalStorageManager';
import './../../styles/MapMarkerPopup.css';


async function fetchMiniDepartureDetails(nsrId) {
    try {
        const response = await fetch('https://api.entur.io/journey-planner/v3/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ET-Client-Name': 'movai-alpha-node-07',
            },
            body: JSON.stringify({
                query: `
                {quay(id: "${nsrId}") {
                    id
                    estimatedCalls {
                        realtime
                        actualDepartureTime
                        aimedDepartureTime
                        expectedDepartureTime
                        serviceJourney {
                            id
                            publicCode
                            line {
                                publicCode
                                name
                            }
                        }
                    }
                }
                }
                `,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.data.quay;
    } catch (error) {
        console.error('Error fetching stop details:', error);
        return null;
    }
}

// Seperate function to display bus stop popup, to be able to update with departure data.
const onBusStopClick = async (feature, coordinates, map) => {
    let loadingPopup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML("<div>Laster data...</div>")
        .addTo(map);

    try {
        const fetchedData = await fetchMiniDepartureDetails(feature.properties.stopId);
        const popupContent = ReactDOMServer.renderToString(<BusStopPopup fetchedData={fetchedData} />);
        loadingPopup.setHTML(popupContent);
    } catch (error) {
        console.error('Error fetching bus stop details:', error);
        loadingPopup.setHTML("<div>Det oppstod en feil. Forsøk å laste inn siden på nytt.</div>");
    }
};


// Helper function to get the popup component based on the operator type
const getPopupComponent = (feature, type) => {
    switch (type) {
        case 'car':
            return <CarPopup feature={feature} />;
        case 'scooter':
            return <ScooterPopup feature={feature} />;
        case 'bike':
            return <BikePopup feature={feature} />;
        case 'elbillader':
            return <ElectricCarChargerPopup feature={feature} />;
        case 'bikestation':
            return <BikeStationPopup feature={feature} />;
        case 'badetemperatur':
            return <TemperaturePopup feature={feature} />;
        default:
            return <div>Ooopps.. Noe galt har skjedd..</div>;
    }
}


const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1Ijoicm9zYW5kZXIiLCJhIjoiY2x1OWZuNmhiMDl1dDJsbW01aGc3Ynh3MyJ9.3Ip3cN8u5ysppMZ2cQlxUg'
});


const setupOperator = (map, operator) => {
    // Check if the image already exists before attempting to load and add it
if (!map.hasImage(operator.icon)) {
    map.loadImage(`./images/${operator.icon}.png`, (error, image) => {
        if (error) {
            console.error(`Failed to load image ${operator.icon}:`, error);
            return;
        }
        if (!map.hasImage(operator.icon)) {  // Double check to avoid race conditions
            map.addImage(operator.icon, image);
        }
    });
}

    if (!map.getSource(operator.sourceFile)) {
        map.addSource(operator.sourceFile, {
            type: 'geojson',
            data: `./../cr-data/${operator.sourceFile}.json`
        });
    }

    if (!map.getLayer(operator.id)) {
        map.addLayer({
            id: operator.id,
            type: 'symbol',
            source: operator.sourceFile,
            layout: {
                'visibility': operator.active ? 'visible' : 'none',
                'icon-image': operator.icon,
                'icon-size': 0.4,
                'icon-allow-overlap': false,
                'icon-anchor': 'bottom',
            }
        });
    }

    map.on('click', operator.id, (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        // Determine which popup component to render based on the operator type
        if (operator.type === 'busStop') {
            onBusStopClick(e.features[0], coordinates, map);
        } else {
            const popupContent = ReactDOMServer.renderToString(getPopupComponent(e.features[0], operator.type));
            new mapboxgl.Popup().setLngLat(coordinates).setHTML(popupContent).addTo(map);
        }
    });
};

const MapContainer = () => {
    const mapRef = useRef(null);
    const location = useLocation();
    const [currentOperators, setCurrentOperators] = useState(LocalStorageManager.loadOperators(operators));

    useEffect(() => {
		if (!mapRef.current) return;
        const path = '/kart';
        if (location.pathname === path) {
            const updatedOperators = LocalStorageManager.loadOperators(operators);
            setCurrentOperators(updatedOperators);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!mapRef.current) return;
        currentOperators.forEach(operator => {
            if (mapRef.current.getLayer(operator.id)) {
                mapRef.current.setLayoutProperty(operator.id, 'visibility', operator.active ? 'visible' : 'none');
            }
        });
    }, [currentOperators]);

    const toggleLayerVisibility = (id) => {
        const updatedOperators = currentOperators.map(operator => ({
            ...operator,
            active: operator.id === id ? !operator.active : operator.active
        }));
		LocalStorageManager.saveOperators(updatedOperators);
        setCurrentOperators(updatedOperators);
    };

    const onStyleLoad = (map) => {
        mapRef.current = map;
        currentOperators.forEach(operator => {
            setupOperator(map, operator);
        });
    };



	/* The code editor will give a warning about the prop value having to be an object, but it should be ignored */

    return (
        <>	
            <Map
                style="mapbox://styles/rosander/cl6qdzki9000r14pe9iu1iwfl"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
                center={[10.7461, 59.9127]}
                zoom={[5]}
                onStyleLoad={onStyleLoad}
            />
            <SideFilter operators={currentOperators} onToggle={toggleLayerVisibility} />
        </>
    );
};

export default MapContainer;
