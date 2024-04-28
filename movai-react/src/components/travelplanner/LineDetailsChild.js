import React from 'react';
import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';

const LineDetailsComponent = ({ lineDetails }) => {
  return (
    <div className="line-details-card">
      <div className={`line-details-card-header line-details-card-header-${lineDetails.serviceJourney.transportMode}`}>
        <img src={`./images/modes/${lineDetails.serviceJourney.transportMode}-white.png`} alt={lineDetails.serviceJourney.transportMode} />
        <h3>{lineDetails.serviceJourney.line.publicCode} {lineDetails.serviceJourney.line.name}</h3>
      </div>
      <div className="line-details-card-meta">
        <p className="line-details-card-meta-text">Kjøres av: {lineDetails.serviceJourney.operator.name}</p>
        <p className="line-details-card-meta-text">Tilrettelagt for rullestol: {lineDetails.serviceJourney.wheelchairAccessible ? 'Ja' : 'Nei'}</p>
      </div>
      <div className="line-details-stop-list-container">
      <h4>Stoppesteder</h4>
        {lineDetails && lineDetails.serviceJourney.estimatedCalls.map((quay, index) => (
          <div className="line-details-quay-container" key={index}>
            <p>{format(parseISO(quay.expectedDepartureTime), 'p', { locale: nb })}</p>
            <div className="quay-name-container">
              <p>{quay.quay.name}</p>
              {quay.quay.publicCode !== 'NULL' && <p className="platform-text">Plattform {quay.quay.publicCode}</p>}
            </div>
          </div>
        )) && <p>Vi har dessverre ingen stoppdata for denne linjen.</p>}
      </div>
    </div>
  );
};

export default LineDetailsComponent;
