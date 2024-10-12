import React, { useState } from 'react';

const Dropdown = ({onStatusChange}) => {
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
                className='bg-neutral-700 rounded-bl-lg rounded-tr-lg border-2 border-neonBlue'
            >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Unavailable">Unavailable</option>

            </select>
        </div >
    );
};

export default Dropdown;
