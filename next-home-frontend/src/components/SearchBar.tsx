'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("search", query);
      params.set("page", "1");
    }
    else params.delete("search");

    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <form
      className="bg-slate-100 p-3 rounded-lg flex items-center flex-1 max-w-xl mx-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchTerm);
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-full text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="ml-2">
        <FaSearch className="text-black" />
      </button>
    </form>
  );
};

export default SearchBar;
