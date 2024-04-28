import React from 'react';
import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';

const FootTravelLeg = ({ leg, isFirst, isLast }) => {
  return (
    <div className={`travelplaner-leg-child ${isFirst ? 'travelplaner-leg-child-start' : ''} ${isLast ? 'travelplaner-leg-child-end' : ''}`}>
      <div className="travelplaner-trip-details-icon-container">
        <div className="travelplaner-line-name-container">
          <div className={`travelplaner-details-line-number travelplaner-details-line-number-${leg.mode}`}>
            <img className="travelplaner-trip-details-icon" src={`./images/modes/${leg.mode}-white.png`} alt={leg.mode} />
          </div>
          <p className="travelplaner-trip-details-walk">Gå {Math.round(leg.distance)} m til {leg.toPlace.name}</p>
        </div>
      </div>
      <div className={`leg-indicator leg-indicator-mode-${leg.mode}${isFirst ? ' leg-indicator-dot-start' : ''}${isLast ? ' leg-indicator-dot-end' : ''}`}></div>
      <div className="leg-time-container">
        <p className={isFirst ? 'travelplaner-trip-details-left-time-start' : 'travelplaner-trip-details-left-time'}>
          {leg.expectedStartTime ? format(parseISO(leg.expectedStartTime), 'p', { locale: nb }) : ''}
        </p>
      </div>
    </div>
  );
};

export default FootTravelLeg;
