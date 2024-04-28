import React from 'react';

const ThemeSelector = ({ selectedTheme, onChange }) => {
	const themes = [
		{ value: 'light', label: 'Lyst', imgSrc: './images/departureBoard/themes/theme-light.png' },
		{ value: 'dark', label: 'Mørkt', imgSrc: './images/departureBoard/themes/theme-dark.png' },
	];

	return (
		<div className="btn-group btn-group-toggle" data-toggle="buttons">
			{themes.map((theme) => (
				<label className={`btn btn-secondary ${selectedTheme === theme.value ? 'active' : ''}`} key={theme.value}>
				<input
					type="radio"
					name="theme"
					value={theme.value}
					checked={selectedTheme === theme.value}
					onChange={(e) => onChange(e.target.value)}
				/> 
				<img src={theme.imgSrc} alt={`${theme.label} tema`} />
				{theme.label}
				</label>
			))}
		</div>
	);
};

export default ThemeSelector;
