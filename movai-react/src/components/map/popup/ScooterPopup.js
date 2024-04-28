// components/ScooterPopup.js
import React from 'react';
import { isAndroid, isIOS } from './../../utils/deviceUtils';

const ScooterPopup = ({ feature, isDesktop }) => {
  const { operator, price, rate, androidurl, iosurl } = feature.properties;
  const startPrice = price; 
  const minutePrice = rate;

  // Determine which logo to show based on the user's device
  const getAppLogo = () => {
    if (isAndroid()) {
      return (
        <a href={androidurl}>
          <img src="./images/android-logo.png" alt="Android logo" />
        </a>
      );
    } else if (isIOS()) {
      return (
        <a href={iosurl}>
          <img src="./images/apple-logo1.png" alt="iOS logo" />
        </a>
      );
    } else {
      // Fallback or default content for non-Android and non-iOS devices
      return <div>Last ned appen for tilgang.</div>;
    }
  };

  return (
    <div className="cr-popup-content">
      <div className="cr-popup-header">
        <h3>{operator}</h3>
        <p className="cr-popup-meta">Elektrisk sparkesykkel</p>
      </div>
      <div className="cr-popup-status">
        <p className="cr-available-text">Ledig</p>
      </div>
      <div className="cr-popup-body">
        <p><b>Priser</b></p>
        <p>{startPrice} kr for å låse opp.</p>
        <p>{minutePrice} kr per minutt.</p>
      </div>
      <p style={{margin: '0 1rem'}}><b>Åpne</b></p>
      <div className="pop-up-logos">
        {getAppLogo()}
      </div>
    </div>
  );
};

export default ScooterPopup;
