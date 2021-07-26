import React, { useEffect } from 'react';

const SearchInput = ({ value, onChangeText }) => {
    useEffect(() => {
        let input = document.querySelector('input');
        input.addEventListener('input', onChangeText);
        return input.removeEventListener('input', onChangeText);
    }, [onChangeText]);

    return (
        <div className="search-container">
            <input
                type="text"
                value={value}
                onChange={onChangeText}
                placeholder="Search"
            />
        </div>
    );
};
export default SearchInput;