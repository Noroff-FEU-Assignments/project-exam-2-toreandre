import React from 'react';

const MessageDisplay = ({ noTripsFound }) => {
  return (
    <div>
        {console.log("message display" + noTripsFound.errors)}
      {noTripsFound?.errors && noTripsFound.errors.map((error, index) => (
        <p key={index} className="error-message">{error}</p>
      ))}
      {noTripsFound?.errors && <p className="notice-message">{noTripsFound.notice}</p>}
      {noTripsFound && !noTripsFound.errors && !noTripsFound.notice && <p>Fant ingen reiser.</p>}
    </div>
  );
};

export default MessageDisplay;
