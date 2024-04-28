import React, { useContext, useState } from 'react';
import './../styles/popupcontainer.css'; // Path to your CSS file

const PopupContextBusStop = React.createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [popupContent, setPopupContent] = useState(null);

  const showPopup = (content) => setPopupContent(content);
  const hidePopup = () => setPopupContent(null);

  return (
    <PopupContextBusStop.Provider value={{ showPopup, hidePopup }}>
      {children}
      {popupContent && (
        <div className="popup-overlay" onClick={hidePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            {popupContent}
          </div>
        </div>
      )}
    </PopupContextBusStop.Provider>
  );
};