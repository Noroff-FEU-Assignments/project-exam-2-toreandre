import React from 'react';

const Popup = ({ title, bodyText, technicalErrorMessage, showReportIssue, onClose, onReportIssue }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <p>{bodyText}</p>
        {technicalErrorMessage && (
          <div className="technical-error">
            <p><strong>Error Details:</strong> {technicalErrorMessage}</p>
          </div>
        )}
        <button onClick={onClose}>Close</button>
        {showReportIssue && <button onClick={onReportIssue}>Report Issue</button>}
      </div>
    </div>
  );
};

export default Popup;
