import React from 'react';
import SearchForm from './SearchForm';

export default function SearchAndDebug({ 
  search, 
  setSearch, 
  handleSearch, 
  debugMode, 
  // setDebugMode, 
  apiCallInfo, 
  mealsCount, 
  heading, 
  error, 
  isLoading 
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center my-4 w-auto">
        <SearchForm search={search} setSearch={setSearch} handleSearch={handleSearch} />
        {/* <button 
          className={`px-3 w-max py-2 rounded mt-2 sm:mt-0 sm:ml-2 ${debugMode ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setDebugMode(!debugMode)}
        >
          {debugMode ? 'Debug: ON' : 'Debug'}
        </button> */}
      </div>

      {debugMode && (
        <div className="container mx-auto p-4 mb-4 border border-orange-500 rounded bg-blue-300">
          <h2 className="text-xl font-bold mb-2">Debug Information</h2>
          <div className="grid grid-cols-2 gap-2">
            <div><strong>Search Term:</strong> "{search}"</div>
            <div><strong>Meals Count:</strong> {mealsCount}</div>
            <div><strong>Last API Call:</strong> {apiCallInfo.lastCall}</div>
            <div><strong>API Duration:</strong> {apiCallInfo.duration}ms</div>
            <div><strong>Heading:</strong> {heading}</div>
            <div><strong>Error:</strong> {error || 'None'}</div>
            <div><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</div>
          </div>
        </div>
      )}
    </>
  );
}
