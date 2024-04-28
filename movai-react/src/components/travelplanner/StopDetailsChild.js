import React from 'react';

const StopDetailsComponent = ({ stopDetails }) => {
  return (
    <div className="stop-details-card">
      <div className="stop-details-card-header">
        <img src={`./images/modes/stop-white.png`} alt="Stop" />
        <h3>{stopDetails.name}</h3>
      </div>
      <div className="stop-details-card-content">
        <div className="stop-details-card-meta">
          <p>Tilrettelagt for rullestol: {stopDetails.wheelchairAccessible ? 'Ja' : 'Nei'}</p>
        </div>
 
        
        <h4>Avviksmeldinger</h4>
        <p className={stopDetails.situations ? 'stop-details-card-notice-text-show' : 'stop-details-card-notice-text-hide'}>
          {stopDetails.situations && stopDetails.situations.length > 0 ? '' : 'Ingen meldinger registrert.'}
        </p>
        <ul>
          {stopDetails.situations && stopDetails.situations.map((situation, index) => (
            <li key={index}>
              <strong>{situation.summary.value}</strong>
              <p>{situation.description.value}</p>
            </li>
          ))}
        </ul>
        </div>
  
    </div>
  );
};

export default StopDetailsComponent;
