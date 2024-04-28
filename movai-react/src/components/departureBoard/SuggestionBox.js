import React, { useState, useEffect } from 'react';

// Entur geocoder suggestions for departure board stop place
const SuggestionBox = ({ onSuggestionSelect, inputValue }) => {
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		const fetchSuggestions = async () => {
			if(inputValue.trim()) {
				const apiURL = `https://api.entur.io/geocoder/v1/autocomplete?text=${encodeURIComponent(inputValue)}&categories=NO_FILTER&size=10&layers=venue`;
				
				try {
					const response = await fetch(apiURL, {
						method: 'GET',
						headers: {
						'ET-Client-Name': 'movai-node-03',
						},
					});
					const data = await response.json();
					setSuggestions(data.features || []);
				} catch (error) {
					console.error('Error fetching data from geocoder API:', error);
					setSuggestions([]);
				}
			} else {
				setSuggestions([]);
			}
		};

		const delayDebounceFn = setTimeout(() => {
			fetchSuggestions();
		}, 400);

		return () => clearTimeout(delayDebounceFn);
	}, [inputValue]);

	return (
		<div id="stopPlaceSuggestions">
			{suggestions.map((suggestion) => (
				<div
					key={suggestion.properties.id}
					className="suggestion"
					onClick={() => onSuggestionSelect(suggestion.properties.id, suggestion.properties.name, suggestion.properties.locality)} >
					{suggestion.properties.name} ({suggestion.properties.locality})
				</div>
			))}
		</div>
	);
};

export default SuggestionBox;
