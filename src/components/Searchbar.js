import React from 'react';

const Searchbar =(props) =>{
    return (
        <div className="search-bar">
            <div>
                <input type="search" placeholder="Search" aria-label="Search"></input>
            </div>
        </div>
    );
};

export default Searchbar;