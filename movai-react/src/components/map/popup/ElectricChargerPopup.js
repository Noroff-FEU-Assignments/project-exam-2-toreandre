import React from 'react';

const ElectricCarChargerPopup = ({ feature }) => {
  const { name, operator, address, chargepoints, usercomment, contactinfo } = feature.properties;
  let chargePoints = JSON.parse(chargepoints);
  let availableChargers = chargePoints.length;

  // Process user comments and contact information
  const processedUserComment = usercomment !== null && usercomment !== "undefined" ? usercomment : "Ingen";
  const processedContactInfo = contactinfo !== null && contactinfo !== "undefined" ? contactinfo : "Ingen kontaktinformasjon tilgjengelig";

  // Collect unique charger modes and connectors
  const uniqueModes = [...new Set(chargePoints.map(cp => cp.charge_mode))].filter(mode => mode !== null && mode !== "undefined");
  const uniqueConnectors = [...new Set(chargePoints.map(cp => cp.connector))].filter(connector => connector !== null && connector !== "undefined");

  return (
    <div className="cr-popup-content">
      <div className="cr-popup-header">
        <h3>{name}</h3>
        <p className="cr-popup-meta">Ladestasjon</p>
      </div>
      <div className="cr-popup-status">
        <p className="cr-available-text">{availableChargers} ladepunkter</p>
      </div>
      <div className="cr-popup-body">
        {address && <p><b>Adresse:</b> {address}</p>}
        <p><b>Fra brukersted:</b> {processedUserComment}</p>
        {uniqueConnectors.length > 0 && (
          <>
            <p><b>Ladekontakter:</b></p>
            {uniqueConnectors.map((connector, index) => <p key={index}>{connector}</p>)}
          </>
        )}
        {uniqueModes.length > 0 && (
          <>
            <p><b>Lademåter:</b></p>
            {uniqueModes.map((mode, index) => <p key={index}>{mode}</p>)}
          </>
        )}
        <p><b>Kontaktinformasjon:</b> {processedContactInfo}</p>
      </div>
      <div className="cr-popup-footer">
        <p className="cr-popup-meta">Drives av {operator}</p>
      </div>
    </div>
  );
};

export default ElectricCarChargerPopup;
