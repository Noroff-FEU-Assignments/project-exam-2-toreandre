import React from 'react';
import { useMap } from '../../contexts/MapContext';
import { changeLog } from '../../cr-data/system/appData'; // Adjust the path as necessary

const UpdateMessage = () => {
  const { appData, setAppData } = useMap();

  if (!appData.updateMessageSeen) {
    // Fetch change log details based on appData.version
    const changeLogDetails = changeLog.find(log => log.version === appData.version);

    return (
      <div className="message-overlay">
        <div className="message">
          <h2>What's New?</h2>
          {changeLogDetails ? (
            <ul>
              {changeLogDetails.changes.map((change, index) => (
                <li key={index}>{change}</li>
              ))}
            </ul>
          ) : <p>New updates have been made to improve your experience.</p>}
          <button onClick={() => {
            setAppData({ ...appData, updateMessageSeen: true });
            localStorage.setItem("appData", JSON.stringify({ ...appData, updateMessageSeen: true }));
          }}>Great!</button>
        </div>
      </div>
    );
  }
  return null;
};

export default UpdateMessage;
