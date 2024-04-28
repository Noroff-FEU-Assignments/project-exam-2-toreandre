import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TripDetails from './TripDetails';
import SearchModifyForm from './SearchModifyForm';
import './../../styles/TravelPlanner.css';
import SearchInputForm from './SearchInputForm';
import LoadingIndicator from '../common/LoadingIndicator';

const TravelPlanner = () => {
    const [query, setQuery] = useState('');
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState(null);

    // Handles the search from the user query form
    const handleUserQuerySearch = async (query) => {
        setLoading(true);
        try {
            const response = await axios.post('http://192.168.0.107:8000/movai-alpha-travel-node-01', { query });
            updateSearchData(response.data.data);
        } catch (error) {
            console.error('Error fetching travel details:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handles the search from the modify form
    const handleModifyFormSearch = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post('http://192.168.0.107:8000/travel-details-json', formData);
            updateSearchData(response.data.data);
        } catch (error) {
            console.error('Error fetching travel details:', error);
        } finally {
            setLoading(false);
        }
    };

    // Updates the state based on search results
    const updateSearchData = (data) => {
        setTrips(data.trip?.tripPatterns || []);
        setSearchData(data.searchData);
    };

    // Trigger user query search on query change
    useEffect(() => {
        if (query) handleUserQuerySearch(query);
    }, [query]); 

    return (
        <div className="travel-planner-main">
            <SearchInputForm setQuery={setQuery} />
            <div className="travel-planner-output">
                {searchData && (
                    <SearchModifyForm
                        searchData={searchData}
                        onFormSearch={handleModifyFormSearch}
                    />
                )}
                <LoadingIndicator isLoading={loading} loadingText="Søker etter reiser..." /> 
                {trips.map((trip, index) => (
                    <TripDetails key={index} trip={trip} />
                ))}
            </div>
        </div>
    );
};

export default TravelPlanner;
