import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './../../styles/departureBoard/DepartureBoard.css';
import { usePopup } from './../../context/PopupContext';
import DepartureBOardHeader from './DepartureBoardHeader';

const DepartureBoard = () => {
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);

	const initialQuayId = queryParams.get('stopPlace') || '23774';
	const initialLimit = parseInt(queryParams.get('departures'), 10) || 6;
	const initialTheme = queryParams.get('theme') || 'light';

	const [quayId, setQuayId] = useState(initialQuayId);
  	const [stopPlace, setStopPlace] = useState('');
	const [departures, setDepartures] = useState([]);
	const [situations, setSituations] = useState([]);
	const [error, setError] = useState('');
	const [currentLimit, setCurrentLimit] = useState(initialLimit);
	const [theme, setTheme] = useState(initialTheme);
  	const { showPopup } = usePopup();
	
	// Fetch departure board data from Entur API
	useEffect(() => {
		const fetchDepartureBoard = async () => {
		
		// check if quayId is set
		if (!quayId) return;

		const query = `{stopPlace(id: "NSR:StopPlace:${quayId}") {
			name
			latitude
			longitude
			id
			quays {
				id
			}
			estimatedCalls(numberOfDepartures: ${currentLimit}) {
			actualDepartureTime
			aimedDepartureTime
			realtime
			expectedDepartureTime
			destinationDisplay {
				frontText
			}
			quay {
				name
				publicCode
			}
			serviceJourney {
				transportMode
				transportSubmode
				id
				line {
					name
					publicCode
				}
			}
			}
		}}`;

		try {
			const response = await fetch('https://api.entur.io/journey-planner/v3/graphql', {
				method: 'POST',
				headers: {
					'ET-Client-Name': 'movai-departure-node-02',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ query }),
			});

			const apiResponse = await response.json();

			// Set departures and stop place name
			setDepartures(apiResponse.data.stopPlace.estimatedCalls || []);
			setStopPlace(apiResponse.data.stopPlace.name);
			setError('');

			// Fetch situation messages for each quay
			let allSituations = [];

			for (const quay of apiResponse.data.stopPlace.quays) {
				await fetchSituationsForQuay(quay.id, allSituations);
			}

			setSituations(allSituations);

		} catch (error) {
			setError(`Error fetching departures: ${error}`);
			setDepartures([]);
		}
		};

		fetchDepartureBoard();
		const intervalId = setInterval(fetchDepartureBoard, 30000);
		const themeParam = queryParams.get('theme');

		if(themeParam) {
			setTheme(themeParam);
		}
			
		return () => clearInterval(intervalId);

  	}, [quayId, currentLimit]);

	const fetchSituationsForQuay = async (quayId, allSituations) => {
		const quayQuery = `{quay(id: "${quayId}") {
		situations {
			id
			summary {
			language
			value
			}
			advice {
			language
			value
			}
			validityPeriod {
			endTime
			startTime
			}
		}
		}}`;

		const quayResponse = await fetch('https://api.entur.io/journey-planner/v3/graphql', {
			method: 'POST',
			headers: {
				'ET-Client-Name': 'movai-departure-node-02',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query: quayQuery }),
		});

		const quayApiResponse = await quayResponse.json();

		if (quayApiResponse.data.quay.situations.length > 0) {
			allSituations.push(...quayApiResponse.data.quay.situations);
		}
  	};

	const handleLoadMore = () => {
		setCurrentLimit((prevLimit) => prevLimit + 5);
	};

	return (
		<div className={`departure-board-container theme-${theme}`}>
			<DepartureBOardHeader stopPlace={stopPlace} />
			<div className={`departure-board theme-${theme}`}>

				{/* Check if there are any errors */}
				{error && <p className="error">{error}</p>}

				{/* Display situations if any */}
				{situations.length > 0 && (
					<div className="situations">
						{situations.map((situation, index) => (
							<div key={index} className="situation">
								<p>{situation.summary[0].value}</p>
								<p>{situation.advice[0].value}</p>
							</div>
						))}
					</div>
				)}

			<div className="departures">
				<div className="line-item-row-top">
					<div className="realtime-line-small">
						<p className="realtime-line-small-white-text">Linje</p>
					</div>
					<div className="realtime-line-item-top">
						<p className="realtime-line-small-white-text">Destinasjon</p>
					</div>
					<div className="realtime-departure">
						<p className="realtime-line-small-white-text">Avgang</p>
					</div>
				</div>

				{departures.map((call, index) => (
					<div key={index} className="line-item-row">
						<div className="realtime-line-small">
							<p className="realtime-line-small-white-text">{call.serviceJourney.line.publicCode || 'N/A'}</p>
						</div>
						<div className="realtime-line-item">
							<p className="db-destination-text">{call.destinationDisplay.frontText}</p>
						</div>
						<div className="realtime-departure">
							<p className="realtime-line-small-white-text">{realtimeTime(call.expectedDepartureTime)}</p>
						</div>
					</div>
				))}
			</div>
			
			{departures.length > 0 && (
				<button onClick={handleLoadMore} className="load-more">
					Last inn flere avganger
				</button>
			)}
			</div>
		</div>
	);
};

const realtimeTime = (time) => {
	let currentTime = new Date();
	let expireTime = new Date(time);

	let minutes = (expireTime - currentTime) / (1000 * 60);
	let result = Math.floor(minutes);

	if (result === 0) {
		return "Nå";
	} else if (result <= 9) {
		return `${result} min`;
	} else {
		const hours = String(expireTime.getHours()).padStart(2, '0');
		const minutes = String(expireTime.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	}
};

export default DepartureBoard;
