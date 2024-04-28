import React from 'react';
import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';

const DetailedFootLeg = ({ leg, isFirst, isLast }) => {
    return (
        <div className="travelplaner-trip-details-item">
            <div className="travelplaner-details-time-container">
                {/* Since it's walking mode, times are not displayed per your design. Including for completeness if needed. */}
                {/* Uncomment below lines if time should be shown for walking legs */}
                {/* <p className="travelplaner-details-left-time">{format(parseISO(leg.expectedStartTime), 'p', { locale: nb })}</p>*/}
                {isLast && <p className="travelplaner-details-right-time">{format(parseISO(leg.expectedEndTime), 'p', { locale: nb })}</p>} 
            </div>

            <div className={`details-lineinfo-line ${isFirst ? 'details-lineinfo-line-first' : ''} ${isLast ? 'details-lineinfo-line-last' : ''}`}>
            {isLast && <span className={`details-lineinfo-line-dot-end ${isLast ? 'details-lineinfo-line-dot-end-last' : ''}`}></span> }

            </div>
            <div className="travelplaner-trip-details-icon-container-walk">
            <div className="travelplaner-hidden-details-mode-container">
                <div className="travelplaner-hidden-line-name-container">
                    <div className={`travelplaner-hidden-details-line-number travelplaner-details-line-number-${leg.mode}`}>
                        <img className="travelplaner-trip-details-icon" src={`./images/modes/${leg.mode}-white.png`} alt={`${leg.mode} mode icon`} />
                       </div> 
                       <p className="travelplaner-trip-details-walk">Gå {Math.round(leg.distance)} m til {leg.toPlace.name}</p>
                    
                </div>
                </div>
            </div>

        </div>
    );
};

export default DetailedFootLeg;
