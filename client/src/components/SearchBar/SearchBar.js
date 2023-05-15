import React, { useState } from 'react';
import './SearchBar.scss';

function SearchBar(props) {
  const [searchText, setSearchText] = useState('');

  function handleSearch(event) {
    event.preventDefault();
    props.onSearch(searchText);
  }

  function handleChange(event) {
    setSearchText(event.target.value);
  }

  return (
    <form onSubmit={handleSearch} className="search-bar-container">
      <input type="text" value={searchText} onChange={handleChange} id="search"/>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;