'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from './SearchBar';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-slate-200 shadow-md p-2">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Nawy Real Estate Logo"
            className="h-8 sm:h-12 object-contain"
          />
          <span className="sr-only">Nawy Real Estate</span>
        </Link>

        <SearchBar />

        <ul className="hidden md:flex gap-4">
          <li>
            <Link href="/" className="text-slate-700 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-slate-700 hover:underline">
              About
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden p-2 text-slate-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-slate-100 shadow-md">
          <ul className="flex flex-col p-4 space-y-3">
            <li>
              <Link
                href="/"
                className="block text-slate-700 hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block text-slate-700 hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
