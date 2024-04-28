import React from 'react';
import { useState } from 'react';
import './../../styles/map/SideFilter.css';

// Group operators by type in the sidebar
const groupByType = (operators) => {
    return operators.reduce((acc, operator) => {
      const { type } = operator;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(operator);
      return acc;
    }, {});
  };

const SideFilter = ({ operators, onToggle }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const operatorsByType = groupByType(operators);
  
    const handleCategoryClick = (type) => {
      	setExpandedCategory(expandedCategory === type ? null : type);
    };
  
    return (
		<div className="map-side-filter-container">
			{Object.entries(operatorsByType).map(([type, ops]) => (
				<div className="map-side-filter-operator" key={type}>
					<div className="map-side-filter-category" onClick={() => handleCategoryClick(type)}>
						<img className="map-side-filter-icon" src={`./images/icons/${type}-white.png`} alt={type} />
					</div>
					{expandedCategory === type && (
					<div className={`map-side-filter-slide ${expandedCategory === type ? "map-side-filter-slide-active" : ""}`}>
						{ops.map((operator) => (
						<div className="map-side-filter-item" key={operator.id} style={{ marginBottom: '10px', padding: '10px' }}>
							<img className="map-side-filter-operator-icon" src={`./images/${operator.icon}.png`} alt={operator.shortname} />
							<label className='side-filter-label'>
							<input type="checkbox" checked={operator.active} onChange={() => onToggle(operator.id)} className="map-side-filter-checkbox" />
							{operator.shortname}
							</label>
						</div>
						))}
					</div>
					)}
				</div>
			))}
		</div>
    );
};
  
export default SideFilter;