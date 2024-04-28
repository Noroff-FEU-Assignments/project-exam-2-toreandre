import React from 'react';

const TravelPlannerMessage = ({ messageContent }) => {
  return (
    <div className="travel-planner-notice">
        <p>{messageContent}</p>
    </div>
  );
};

export default TravelPlannerMessage;
