import React from 'react';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';
import TravelPlannerStopDetails from './TravelPlannerStopDetails';
import TravelPlannerLineDetails from './TravelPlannerLineDetails';
import TextToSpeechButton from '../map/TextToSpeechButton';
import TravelLeg from './tripdetails/TravelLeg';

const TripDetails = ({ trip }) => {
    const [selectedDetail, setSelectedDetail] = useState({ type: null, id: null });
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    let detailsDivCounter = 1;
    
    // Toggle function for the travel details visibility for each search result
    const toggleDetailsVisibility = () => {
        setIsDetailsVisible(prevState => !prevState);
    };

    // Helper function to format duration from seconds to readable format
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min`;
    };

    const handleStopClick = (nsrId) => {
        setSelectedDetail({ type: 'stop', id: nsrId });
    };

    // Function to handle click on line name
    const handleLineClick = (lineId) => {
        console.log(lineId)
        setSelectedDetail({ type: 'line', id: lineId });
    };

    // Text to speech text
    const ttsText = `Reisen starter fra ${trip.legs[0].fromPlace.name} klokken ${format(parseISO(trip.expectedStartTime), 'p', { locale: nb })} og avsluttes ved ${trip.legs[trip.legs.length - 1].toPlace.name} klokken ${format(parseISO(trip.legs[trip.legs.length - 1].expectedEndTime), 'p', { locale: nb })}`;

    // Extract the last leg for ease of access
    const lastLeg = trip.legs[trip.legs.length - 1];

    return (
        <div className="trip-detail travelplaner-row">
            <div className="travelplaner-meta-container">
                <div className="travelplaner-from-container">
                    <div className="'travelplaner-from">
                        <p className="travelplaner-from-label">Fra </p>
                        <p className="travelplaner-from">{trip.legs[0].fromPlace.name}</p>
                    </div>

                    <div className="travelplaner-from-time">
                        <p className="travelplaner-start-label">Start </p>
                        <p className="travelplaner-start">{format(parseISO(trip.expectedStartTime), 'p', { locale: nb })}</p>
                    </div>
                </div>

                <div className="travelplaner-to-container">
                    <div className="travelplaner-to">
                        <p className="travelplaner-to-label">Til </p>
                        <p className="travelplaner-to">{lastLeg.toPlace.name}</p>
                    </div>
                    <div className="travelplaner-to-time">
                        <p className="travelplaner-end-label">Slutt </p>
                        <p className="travelplaner-end">{format(parseISO(lastLeg.expectedEndTime), 'p', { locale: nb })}</p>
                    </div>
                    <div className="travelplaner-speech-btn">
                        <TextToSpeechButton text={ttsText}></TextToSpeechButton>
                     
                    </div>
                </div>
            </div>

            <div className="travelplaner-all-container">
                <div className="travelplaner-legs-container">
                    {trip.legs.map((leg, index) => (
                        <TravelLeg
                            key={index}
                            leg={leg}
                            isFirst={index === 0}
                            isLast={index === trip.legs.length - 1}
                            onlyLeg={trip.legs.length === 1}
                            detailed={false} // or false based on where you use it
                            handleStopClick={handleStopClick}
                            handleLineClick={handleLineClick}
                            formatDuration={formatDuration}
                        />
                    ))}
                </div>

                <button className="travelplaner-meta-details-top" onClick={toggleDetailsVisibility} tabIndex={0}>
                        Åpne detaljer
                </button>

                {isDetailsVisible && (
                    <div id={`travel-details-${detailsDivCounter}`} className="travelplaner-details-container">
                        <div className="travelplaner-trip-details">
                            {trip.legs.map((leg, index) => (
                                <TravelLeg
                                    key={index}
                                    leg={leg}
                                    isFirst={index === 0}
                                    isLast={index === trip.legs.length - 1}
                                    onlyLeg={trip.legs.length === 1}
                                    detailed={true} // or false based on where you use it
                                    handleStopClick={handleStopClick}
                                    handleLineClick={handleLineClick}
                                    formatDuration={formatDuration}
                                />
                            ))}
                        </div>

                        <div id="meta-details" className="travelplaner-meta-details">
                            {selectedDetail.type === 'stop' && <TravelPlannerStopDetails nsrId={selectedDetail.id} />}
                            {selectedDetail.type === 'line' && <TravelPlannerLineDetails lineId={selectedDetail.id} />}
                        </div>
                    </div>
                )}
        </div>
    </div>
    );
};

export default TripDetails;
