import React, { useState } from 'react';

const SearchBar = ({ onSearch, criteria, onCriteriaChange }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <select 
          value={criteria} 
          onChange={(e) => onCriteriaChange(e.target.value)}
          className="search-select"
        >
          <option value="department">Department</option>
          <option value="position">Position</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search by ${criteria}...`}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;