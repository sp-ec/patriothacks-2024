import React, { useState } from 'react';

const Dropdown = () => {
    const [selectedOption, setSelectedOption] = useState('available');

    const handleSelect = (color) => {
        setSelectedOption(color);
    };

    return (
        <div className="dropdown">
            <select
                value={selectedOption}
                onChange={(e) => handleSelect(e.target.value)}
                className='bg-neutral-700 rounded'
            >
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="unavailable">Unavailable</option>

            </select>
        </div >
    );
};

export default Dropdown;
