// components/BikeStationPopup.js
import React from 'react';
import { isAndroid, isIOS } from './../../utils/deviceUtils'; // Assuming you have these utilities from the previous example

const BikeStationPopup = ({ feature }) => {
  const { name, description, num_bikes_available, num_docks_available, capacity, androidurl, iosurl, operator } = feature.properties;

  const getAppLogos = () => {
    if (isAndroid() || isIOS()) {
      return (
        <>
          {isAndroid() && (
            <a href={androidurl}>
              <img src="./images/android-logo.png" alt="Android logo" />
            </a>
          )}
          {isIOS() && (
            <a href={iosurl}>
              <img src="./images/apple-logo1.png" alt="iOS logo" />
            </a>
          )}
        </>
      );
    } else {
      // Default to desktop content
      return (
        <div style={{display: 'flex', flexDirection: 'column', margin: '1rem'}}>
          <p>Last ned app</p>
          <a style={{display: 'flex'}} href="https://play.google.com/store/apps/details?id=com.cityride.webview">
            <img className="android-logo" src="./images/last-ned-app-android.png" width="100%" alt="Android logo" />
          </a>
        </div>
      );
    }
  };

  return (
    <div className="cr-popup-content">
      <div className="cr-popup-header">
        <h3>{name}</h3>
        <p className="cr-popup-meta">{description}</p>
      </div>
      <div className="cr-popup-body">
        <p>Ledige sykkler: {num_bikes_available}</p>
        <p>Ledige plasser: {num_docks_available}</p>
        <p>Total kapasitet: {capacity}</p>
      </div>
      <br />
      <p className="text-align-center"><b>Åpne</b></p>
      <div className="pop-up-logos">
        {getAppLogos()}
      </div>
      <div className="cr-popup-footer">
        <p className="cr-popup-meta">Driftes av {operator}</p>
      </div>
    </div>
  );
};

export default BikeStationPopup;
