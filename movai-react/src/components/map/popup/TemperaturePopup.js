import React from 'react';

const TemperaturePopup = ({ feature }) => {
  const { locationName, temperature, time } = feature.properties;

  const calculateTimeDifference = () => {
    const tempTime = new Date(time);
    const now = new Date();
    const diff = now - tempTime;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days >= 1) {
      return `${days} ${days === 1 ? 'dag' : 'dager'} siden`;
    } else if (hours > 0) {
      return `${hours} timer siden`;
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes > 0 ? `${minutes} minutter siden` : `${Math.floor(diff / 1000)} sekunder siden`;
    }
  };

  const formattedTemperature = temperature.toFixed(1);
  const updatedTime = calculateTimeDifference();

  return (
    <div className="cr-popup-content">
      <div className="cr-popup-header">
        <h3>{locationName}</h3>
      </div>
      <div className="cr-popup-body-temp">
        <h3 className="cr-temp-text">{formattedTemperature}&deg;C</h3>
        <p style={{ textAlign: 'center' }}>Badetemperaturer<br/>levert av Yr</p>
      </div>
      <div className="cr-popup-footer">
        <p>Oppdatert: {updatedTime}</p>
      </div>
    </div>
  );
};

export default TemperaturePopup;
