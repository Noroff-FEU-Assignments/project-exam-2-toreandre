import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';

const SearchModifyForm = ({ searchData, onFormSearch }) => {
    const [fromPlace, setFromPlace] = useState('');
    const [toPlace, setToPlace] = useState('');
    const [searchDate, setSearchDate] = useState(new Date());
    const [searchTime, setSearchTime] = useState('');
    // Flag to track user-initiated changes
    const [userInitiatedChange, setUserInitiatedChange] = useState(false);

    useEffect(() => {
        if (searchData) {
            // Update state without setting the user-initiated change flag
            setFromPlace(searchData.from_stop.id);
            setToPlace(searchData.to_stop.id);
            setSearchDate(parseISO(searchData.searchDate));
            setSearchTime(searchData.searchTime);
        }
    }, [searchData]);

    useEffect(() => {
        // Ensure to only trigger the search for user-initiated changes
        if (!userInitiatedChange) return;

        const fromPlaceOption = searchData.geocoder.fromStop.suggestions.find(s => s.id === fromPlace) || searchData.from_stop;
        const toPlaceOption = searchData.geocoder.toStop.suggestions.find(s => s.id === toPlace) || searchData.to_stop;

        const payload = {
            fromPlace: fromPlaceOption?.name,
            fromPlaceId: fromPlace,
            toPlace: toPlaceOption?.name,
            toPlaceId: toPlace,
            searchDate: format(searchDate, 'yyyy-MM-dd'),
            searchTime,
        };

        onFormSearch(payload);
        
        // Reset flag after search
        setUserInitiatedChange(false); 
    }, [fromPlace, toPlace, searchDate, searchTime, userInitiatedChange, searchData, onFormSearch]);

    // Update handlers to set user-initiated flag
    const handleFromPlaceChange = (e) => {
        setFromPlace(e.target.value);
        setUserInitiatedChange(true);
    };

    const handleToPlaceChange = (e) => {
        setToPlace(e.target.value);
        setUserInitiatedChange(true);
    };

    const handleDateChange = (date) => {
        setSearchDate(date);
        setUserInitiatedChange(true);
    };

    const handleTimeChange = (e) => {
        setSearchTime(e.target.value);
        setUserInitiatedChange(true);
    };

    return (
        <div className="userQuery">
            <div className="user-search-form user-search-form-from-and-to">
                <div className="user-search-form user-search-form-from">
                    <label>Fra</label>
                    <select value={fromPlace} onChange={handleFromPlaceChange}>
                        <option key={searchData.from_stop.id} value={searchData.from_stop.id}>{searchData.from_stop.name}</option>
                        {searchData.geocoder.fromStop.suggestions.map(suggestion => (
                            <option key={suggestion.id} value={suggestion.id}>{suggestion.name}</option>
                        ))}
                    </select>
                </div>
                <div className="user-search-form user-search-form-to">
                    <label>Til</label>
                    <select value={toPlace} onChange={handleToPlaceChange}>
                        <option key={searchData.to_stop.id} value={searchData.to_stop.id}>{searchData.to_stop.name}</option>
                        {searchData.geocoder.toStop.suggestions.map(suggestion => (
                            <option key={suggestion.id} value={suggestion.id}>{suggestion.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="user-search-form user-search-form-date-and-time">
                <div className="user-search-form user-search-form-date">
                    <label>Når</label>
                    <DatePicker
                        selected={searchDate}
                        onChange={handleDateChange}
                        dateFormat="dd.MM.yyyy"
                    />
                </div>
                <div className="user-search-form user-search-form-time">
                    <label>Kl</label>
                    <input
                        type="time"
                        value={searchTime}
                        onChange={handleTimeChange}
                    />
                </div>
            </div>
        </div>
     
    );
};

export default SearchModifyForm;
