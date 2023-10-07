import React from 'react';

function SearchBar(props) {
    return (
        <div id="search">
            <input className="search-input" value={props.searchValue} onChange={(event) => props.setSearchValue(event.target.value)}></input>
        </div>
    )
}

export default SearchBar;