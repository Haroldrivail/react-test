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
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    handleSearch(search);
    
    // Show searching state briefly for better feedback
    setTimeout(() => setIsSearching(false), 300);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    if (value) {
      setIsSearching(true);
    }
    
    // Set new timer to debounce search
    debounceTimerRef.current = setTimeout(() => {
      handleSearch(value);
      setIsSearching(false);
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
    <form onSubmit={onSearch} className="flex flex-col sm:flex-row justify-center items-center sm:space-x-2 w-full sm:w-auto">
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          name='search'
          ref={inputRef}
          value={search}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search meals..."
          className={`p-2 pl-10 border ${isFocused ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-600'} rounded w-full bg-gray-700 text-white focus:outline-none transition-all duration-200`}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className={`w-4 h-4 ${isSearching ? 'text-indigo-400 animate-pulse' : 'text-gray-400'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      <button
        type="submit"
        className={`w-full sm:w-auto p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 cursor-pointer mt-2 sm:mt-0 transition-all duration-200 ${isSearching ? 'opacity-75' : ''} flex items-center justify-center`}
        disabled={isSearching}
      >
        {isSearching ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching...
          </>
        ) : (
          'Search'
        )}
      </button>
    </form>
  );
}
