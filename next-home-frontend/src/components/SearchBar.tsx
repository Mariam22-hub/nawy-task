'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSearch(searchTerm);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    const params = new URLSearchParams()

    if (query) params.set("query", query);
    else params.delete("query"); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-100 p-3 rounded-lg flex items-center flex-1 max-w-xl mx-4"
      >
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-full text-black"
        // value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button type="submit" className="ml-2">
        <FaSearch className="text-black" />
      </button>
    </form>
  );
};

export default SearchBar;
