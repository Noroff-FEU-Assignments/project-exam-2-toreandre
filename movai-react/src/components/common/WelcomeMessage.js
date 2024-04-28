import React from 'react';
import { useMap } from '../../contexts/MapContext';

const WelcomeMessage = () => {
    const { appData, setAppData } = useMap();

    if (!appData.welcomeMessageSeen) {
        return (
            <div className="message-overlay">
                <div className="message">
                    <h2>Welcome to CityRide!</h2>
                    <p>Welcome to our platform for smart and sustainable urban mobility.</p>
                    <button onClick={() => {
                        setAppData({ ...appData, welcomeMessageSeen: true });
                        localStorage.setItem("appData", JSON.stringify({ ...appData, welcomeMessageSeen: true }));
                    }}>Got it!</button>
                </div>
            </div>
        );
    }
    return null;
};

export default WelcomeMessage;
