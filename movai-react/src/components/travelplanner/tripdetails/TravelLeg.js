import React from 'react';
import GeneralTravelLeg from './GeneralTravelLeg';
import FootTravelLeg from './FootTravelLeg';
import DetailedGeneralLeg from './DetailedGeneralLeg';
import DetailedFootLeg from './DetailedFootLeg';

const TravelLeg = ({ leg, isFirst, isLast, onlyLeg, detailed, handleStopClick, handleLineClick, formatDuration }) => {
  if (detailed) {
    return leg.mode === 'foot' ? (
      <DetailedFootLeg leg={leg} isFirst={isFirst} isLast={isLast} onlyLeg={onlyLeg} />
    ) : (
      <DetailedGeneralLeg 
        leg={leg} 
        isFirst={isFirst} 
        isLast={isLast} 
        onlyLeg={onlyLeg} 
        handleStopClick={handleStopClick} 
        handleLineClick={handleLineClick} 
        formatDuration={formatDuration}
      />
    );
  } else {
    return leg.mode === 'foot' ? (
      <FootTravelLeg leg={leg} isFirst={isFirst} isLast={isLast} onlyLeg={onlyLeg} />
    ) : (
      <GeneralTravelLeg leg={leg} isFirst={isFirst} isLast={isLast} onlyLeg={onlyLeg} />
    );
  }
};

export default TravelLeg;
