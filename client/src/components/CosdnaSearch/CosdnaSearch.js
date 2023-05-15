import React, { useState } from 'react';
import axios from 'axios';

function CosdnaSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://cosdna.com/ajax.php?q=${query}`)
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search Cosdna.com:
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      {results.map((result) => (
        <div key={result.id}>
          <h2>{result.name}</h2>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CosdnaSearch;
