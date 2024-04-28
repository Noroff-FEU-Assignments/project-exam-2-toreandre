import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TripDetails from './TripDetails';
import SearchModifyForm from './SearchModifyForm';
import './../../styles/TravelPlanner.css';
import SearchInputForm from './SearchInputForm';
import LoadingIndicator from '../common/LoadingIndicator';
import TravelPlannerMessage from './TravelPlannerMessage';

const TravelPlanner = () => {
    const [query, setQuery] = useState('');
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [notice, setNotice] = useState('');

    // Handles the search from the user query form
    const handleUserQuerySearch = async (query) => {
        setLoading(true);
        setNotice('');
        try {
            const response = await axios.post('https://movai.no/plan-journey.php', { query });
            updateSearchData(response.data.data);
        } catch (error) {
            console.error('Error fetching travel details:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handles the search from the modify form, including pagination
    const handleModifyFormSearch = async (formData, pageCursor = null) => {
        setLoading(true);
        setNotice('');
        // Construct fullFormData including pageCursor if it's provided
        const fullFormData = {
            ...formData,
            ...(pageCursor && { pageCursor })
        };
        try {
            const response = await axios.post('https://movai.no/update_journey.php', fullFormData);
            updateSearchData(response.data.data);
        } catch (error) {
            console.error('Error fetching travel details:', error);
        } finally {
            setLoading(false);
        }
    };

    // Updates the state based on search results
    const updateSearchData = (data) => {

        if (data.trip.tripPatterns.length > 0) {
            setNotice('');
        } else {
            setNotice('Ingen reiser funnet, forsøk å endre søket ditt.');
        }
        setTrips(data.trip?.tripPatterns || []);
        setSearchData(data.searchData);
    };

    // Trigger user query search on query change
    useEffect(() => {
        if (query) handleUserQuerySearch(query);
    }, [query]); 

    // Extracting formData from searchData
    const formData = searchData ? {
        fromPlace: searchData.from_stop.name,
        fromPlaceId: searchData.from_stop.id,
        toPlace: searchData.to_stop.name,
        toPlaceId: searchData.to_stop.id,
        searchDate: searchData.searchDate,
        searchTime: searchData.searchTime
    } : {};

    return (
        <div className="travel-planner-main">
            <SearchInputForm setQuery={setQuery} />
            <div className="travel-planner-output">
                {searchData && (
                    <SearchModifyForm
                        searchData={searchData}
                        onFormSearch={(formData) => handleModifyFormSearch(formData)}
                    />
                )}
                {notice && (<TravelPlannerMessage messageContent={notice}/>)} 
                <LoadingIndicator isLoading={loading} loadingText="Søker etter reiser..." />
                {trips.nextPageCursor && (
                    <>
                        <button onClick={() => handleModifyFormSearch(formData, trips.previousPageCursor)}>
                            Forrige
                        </button>
                        <button onClick={() => handleModifyFormSearch(formData, trips.nextPageCursor)}>
                            Neste
                        </button>
                    </>
                )}
                {trips.map((trip, index) => (
                    <TripDetails key={index} trip={trip} />
                ))}
            </div>
        </div>
    );
};

export default TravelPlanner;
