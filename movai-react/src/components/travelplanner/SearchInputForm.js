import React, { useState } from 'react';

const SearchInputForm = ({ setQuery }) => {
    const [localQuery, setLocalQuery] = useState('');

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(localQuery); // Pass the query up to the parent component
    };

    return (
        <div className='input-top'>
            <form onSubmit={handleSubmit}>
                <input
                    id="user-query"
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    placeholder="Reise fra Kristiansand til Oslo i morgen"
                />
                <button type="submit">Søk</button>
            </form>
        </div>
    );
};

export default SearchInputForm;
