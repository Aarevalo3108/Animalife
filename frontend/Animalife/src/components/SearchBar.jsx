import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-center my-[50px] w-56">
      <input 
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={handleSearch}
        className="border rounded-full py-2 px-4 w-full max-w-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}

export default SearchBar;
