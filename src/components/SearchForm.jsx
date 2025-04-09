import React, { useEffect, useRef, useState } from 'react';

/**
 *  * SearchForm component for searching meals
 * * @component
 * @param {Object} props - The component props
 * * @param {string} props.search - The search query
 * * @param {function} props.setSearch - Function to update the search query
 * * @param {function} props.handleSearch - Function to handle the search action
 * @returns 
 */
export default function SearchForm({ search, setSearch, handleSearch }) {
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set new timer to debounce search
    debounceTimerRef.current = setTimeout(() => {
      handleSearch(value);
    }, 500); // 500ms debounce time
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Cleanup debounce timer
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <form onSubmit={onSearch} className="flex flex-col sm:flex-row justify-center items-center sm:space-x-2">
      <input
        type="text"
        name='search'
        ref={inputRef}
        value={search}
        onChange={handleInputChange}
        placeholder="Search meals..."
        className="p-2 border border-gray-300 rounded w-full sm:w-64 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="w-full sm:w-auto p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 cursor-pointer mt-2 sm:mt-0 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
