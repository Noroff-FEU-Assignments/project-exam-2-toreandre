import React from 'react';
import CarStationPopup from './DefaultCarPopup';

// Specific components for each operator could go here
import HertzPopupContent from './HertzPopupContent';
// import MoveAboutPopupContent from './MoveAboutPopupContent'; // Example for another operator

const DefaultCarPopupContent = ({ feature }) => {
  // Implement a default popup layout for car sharing operators
  // Similar structure to HertzPopupContent but with generic handling
  return <div>Default Car Popup</div>;
};

const CarPopup = ({ feature }) => {
    const operator = feature.properties.operator;

    // Determine which component to render based on the operator
    switch (operator) {
        case "Hertz":
            return <HertzPopupContent feature={feature} />;
        // case "moveabout":
        //     return <MoveAboutPopupContent feature={feature} />;
        default:
            return <CarStationPopup feature={feature} />;
    }
};

export default CarPopup;
