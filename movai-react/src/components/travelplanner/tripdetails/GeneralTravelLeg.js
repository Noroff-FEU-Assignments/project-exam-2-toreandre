import React from 'react';
import { parseISO, format } from 'date-fns';
import { nb } from 'date-fns/locale';

const GeneralTravelLeg = ({ leg, isFirst, isLast }) => {
  return (
    <div className={`travelplaner-leg-child ${isFirst ? 'travelplaner-leg-child-start' : ''} ${isLast ? 'travelplaner-leg-child-end' : ''}`}>
      <div className="travelplaner-trip-details-icon-container">
        <div className="travelplaner-line-name-container">
          <div className={`travelplaner-details-line-number travelplaner-details-line-number-${leg.mode}`}>
            <img className="travelplaner-trip-details-icon" src={`./images/modes/${leg.mode}-white.png`} alt={leg.mode} />
            <p>{leg.line.publicCode}</p>
          </div>
          <p className="travelplaner-details-line-name">{leg.line.name}</p>
        </div>
      </div>
      <div className={`leg-indicator leg-indicator-mode-${leg.mode}${isFirst ? ' leg-indicator-dot-start' : ''}${isLast ? ' leg-indicator-dot-end' : ''}`}></div>
      <div className="leg-time-container">
        <p className={isFirst ? 'travelplaner-trip-details-left-time-start' : 'travelplaner-trip-details-left-time'}>
          {format(parseISO(leg.expectedStartTime), 'p', { locale: nb })}
        </p>
        {isLast && (
          <p className="travelplaner-trip-details-right-time">
            {format(parseISO(leg.expectedEndTime), 'p', { locale: nb })}
          </p>
        )}
      </div>
    </div>
  );
};

export default GeneralTravelLeg;
