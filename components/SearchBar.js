/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  console.warn(searchInput);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Members"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
}
