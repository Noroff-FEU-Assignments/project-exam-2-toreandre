import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import SuggestionBox from './SuggestionBox';

// The form used to create a new departure board
const DepartureBoardForm = ({ onSubmit }) => {
	const [formValues, setFormValues] = useState({
		stopPlace: '',
		stopPlaceId: '',
		departureCount: '7',
		theme: 'light',
		loadMore: false,
		showOptions: false,
		showSuggestions: true
	});

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormValues((prevValues) => ({
		...prevValues,
		[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleSuggestionSelect = (stopPlaceId, stopPlaceName, area) => {
		setFormValues((prevValues) => ({
		...prevValues,
		stopPlace: `${stopPlaceName} (${area})`,
		stopPlaceId: stopPlaceId.replace('NSR:StopPlace:', ''),
		showSuggestions: false
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if(!formValues.stopPlaceId) {
			alert('Please select a valid stop before proceeding.');
			return;
		}

		const queryParams = new URLSearchParams({
			stopPlace: formValues.stopPlaceId,
			departures: formValues.departureCount,
			theme: formValues.theme,
			loadmore: formValues.loadMore ? 'false' : 'true',
		}).toString();
		
		window.location.href = `./avganger?${queryParams}`;
	};

	const toggleOptions = () => {
		setFormValues(prevValues => ({
		...prevValues,
		showOptions: !prevValues.showOptions
		}));
	};

  const url = `https://movai.no/avganger?stopPlace=${formValues.stopPlaceId}&departures=${formValues.departureCount}&theme=${formValues.theme}&loadmore=${formValues.loadMore ? 'false' : 'true'}`;

  return (
    <div className="db-create-form-container">
		<form onSubmit={handleSubmit} className="db-create-form">
		
				<div className="db-form-group-child">
					<label htmlFor="stopPlace">Velg holdeplass</label>
					<input
						type="text"
						id="stopPlace"
						name="stopPlace"
						className="form-control"
						placeholder="Søk etter busstopp"
						value={formValues.stopPlace}
						onChange={handleChange}
					/>
					{formValues.showSuggestions && (
						<SuggestionBox inputValue={formValues.stopPlace} onSuggestionSelect={handleSuggestionSelect} />
					)}
				</div>
			

			<button type="button" className="btn btn-secondary" onClick={toggleOptions}>
				Vis flere valg
			</button>

        {formValues.showOptions && (
          	<div>
				<div className="db-form-group-child">
					<label htmlFor="departureCount">Antall avganger</label>
					<select id="departureCount" name="departureCount" className="form-control" value={formValues.departureCount} onChange={handleChange}>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">Standard (7)</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="15">15</option>
						<option value="20">20</option>
					</select>
				</div>

				<div className="db-form-group-child">
					<ThemeSelector selectedTheme={formValues.theme} onChange={(value) => setFormValues(prev => ({ ...prev, theme: value }))} />
				</div>

				<div className="form-check">
					<input
						type="checkbox"
						id="loadMore"
						name="loadMore"
						className="form-check-input"
						checked={formValues.loadMore}
						onChange={handleChange} />
					<label className="form-check-label" htmlFor="loadMore">Skjul knapp for å laste inn flere avganger.</label>
				</div>
        	</div>
        )}

		<div className="db-form-group-child">
			<label htmlFor="url">Nettadresse som du kan lagre om du vil</label>
			<input type="text" value={url} className="form-control" disabled />
		</div>

        <button type="submit" className="btn-green">Åpne avgangsskilt</button>

      	</form>
    </div>
  );
};

export default DepartureBoardForm;
