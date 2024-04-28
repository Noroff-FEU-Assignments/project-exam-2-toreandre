import React from 'react';
import { parseISO, format } from 'date-fns';
import { nb } from 'date-fns/locale';

const DetailedGeneralLeg = ({ leg, isFirst, isLast, handleStopClick, handleLineClick, formatDuration }) => {
  return (
    <div className="travelplaner-trip-details-item">
      <div className="travelplaner-details-time-container">
        <p className="travelplaner-details-left-time">{format(parseISO(leg.expectedStartTime), 'p', { locale: nb })}</p>
        <p className="travelplaner-details-right-time">{format(parseISO(leg.expectedEndTime), 'p', { locale: nb })}</p>
      </div>

      
      <div className={`details-lineinfo-line ${isFirst ? 'details-lineinfo-line-first' : ''} ${isLast ? 'details-lineinfo-line-last' : ''}`}>
        <span className={`details-lineinfo-line-dot-start ${isFirst ? 'details-lineinfo-line-dot-start-first' : ''} ${isLast ? 'details-lineinfo-line-dot-start-last' : ''}`}></span>
        <span className={`details-lineinfo-line-dot-end ${isFirst ? 'details-lineinfo-line-dot-end-first' : ''} ${isLast ? 'details-lineinfo-line-dot-end-last' : ''}`}></span>
      </div>
      
      <div className="travelplaner-trip-details-icon-container2">
            <div className="travelplaner-details-mode-container travelplaner-details-mode-stop-name-container" onClick={() => handleStopClick(leg.fromPlace.quay.id)}>
        <div className="tripdetails-stop-icon">
          <img className="travelplaner-trip-details-icon" src={`./images/modes/stop-white.png`} alt="Holdeplass ikon" />
        </div>
        <p className="travelplaner-trip-details-text-quay">{leg.fromPlace.name}</p>
      </div>
      
      <div className="travelplaner-hidden-details-mode-container" onClick={() => handleLineClick(leg.serviceJourney.id)}>
        <div className="travelplaner-hidden-line-name-container">
          <div className={`travelplaner-hidden-details-line-number travelplaner-details-line-number-${leg.mode}`}>
            <img className="travelplaner-trip-details-icon" src={`./images/modes/${leg.mode}-white.png`} alt={leg.mode} />
            <p>{leg.line.publicCode}</p>
          </div>
          <div className="travelplaner-hidden-details-line-name-container">
            <p className="travelplaner-hidden-details-line-name">{leg.line.name}</p>
            <p className="travelplaner-hidden-details-leg-duration">Reisetid: {formatDuration(leg.duration)}</p>
          </div>
        </div>
      </div>

      {/* Checking if there's a toPlace for the ending stop of the leg */}
      {leg.toPlace && (
        <div className="travelplaner-details-mode-container travelplaner-details-mode-stop-name-container" onClick={() => handleStopClick(leg.toPlace.quay.id)}>
          <div className="tripdetails-stop-icon">
            <img className="travelplaner-trip-details-icon" src={`./images/modes/stop-white.png`} alt="Holdeplass ikon" />
          </div>
          <p className="travelplaner-trip-details-text-quay">{leg.toPlace.name}</p>
        </div>
      )}</div>
    </div>
  );
};

export default DetailedGeneralLeg;
