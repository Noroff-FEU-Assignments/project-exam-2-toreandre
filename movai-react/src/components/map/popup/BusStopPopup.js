const BusStopPopup = ({ fetchedData }) => {


    if (!fetchedData) {
        return <div>Laster data...</div>;
    }

    return (
        <div className="cr-popup-content">
      <div className="cr-popup-header">
        <h3></h3>
        <p className="cr-popup-meta">Holdeplass</p>
      </div>
      
      <div className="cr-popup-body"><h3>Avganger</h3>
      <div className="cr-popup-departure-container">
                
                {fetchedData.estimatedCalls.map(estimatedCall => (
                <div key={estimatedCall.serviceJourney.id} className="cr-popup-departure-row">
                    <div className="cr-popup-departure-line">
                        <p>{estimatedCall.serviceJourney.line.publicCode}</p>
                        </div>
                        <div className="cr-popup-departure-line-name">
                        <p>{estimatedCall.serviceJourney.line.name}</p>
                        </div>
                        <div className={`cr-popup-departure-time ${estimatedCall.realtime ? 'cr-popup-departure-realtime' : ''}`}>
                        
                        <p>{new Date(estimatedCall.expectedDepartureTime).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })}</p>

                        </div>
                     </div>
                ))}
               
            </div>
      </div>
      
    </div>
    );
};

export default BusStopPopup;