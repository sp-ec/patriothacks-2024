import React, { useState } from 'react';

const Dropdown = ({ onStatusChange }) => {
    const [selectedOption, setSelectedOption] = useState('available');

    const handleSelect = (color) => {
        setSelectedOption(color);
        onStatusChange(color);
    };

    return (
        <div className="dropdown">
            <select
                value={selectedOption}
                onChange={(e) => handleSelect(e.target.value)}
                className='bg-neutral-700 rounded-bl-lg rounded-tr-lg outline outline-1 outline-neutral-500 outline-offset-2'
            >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Unavailable">Unavailable</option>
                <option value="Not Working">Not Working</option>
            </select>
        </div >
    );
};

export default Dropdown;
