import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import LoadingIndicator from '../components/LoadingIndicator'
import IngredientCard from '../components/IngredientCard';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Helper function to retry failed fetch requests
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.warn(`Fetch attempt ${i + 1} failed. Retrying in ${delay}ms...`);
      lastError = error;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
  
  throw lastError;
};

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [alphabetFilter, setAlphabetFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setError(null);
        setIsLoading(true);
        
        if (!apiBaseUrl) {
          throw new Error("API base URL is not defined. Check your .env configuration.");
        }
        
        const data = await fetchWithRetry(`${apiBaseUrl}/list.php?i=list`);
        
        if (data.meals) {
          setIngredients(data.meals);
          setFilteredIngredients(data.meals);
        } else {
          throw new Error("No ingredients found");
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        setError(`Failed to load ingredients: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    let filtered = [...ingredients];
    
    if (filterText.trim()) {
      filtered = filtered.filter(ingredient => 
        ingredient.strIngredient.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    
    if (alphabetFilter) {
      filtered = filtered.filter(ingredient => 
        ingredient.strIngredient.toLowerCase().startsWith(alphabetFilter.toLowerCase())
      );
    }
    
    setFilteredIngredients(filtered);
  }, [filterText, alphabetFilter, ingredients]);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleAlphabetFilter = (letter) => {
    setAlphabetFilter(current => current === letter ? '' : letter);
  };

  const clearFilters = () => {
    setFilterText('');
    setAlphabetFilter('');
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Ingredients</h1>
        
        {error && (
          <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            {ingredients.length > 0 ? (
              <>
                <p className="text-center text-gray-400 mb-6">
                  Browse our collection of ingredients used in various recipes
                </p>
                
                <div className="max-w-md mx-auto mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={filterText}
                      onChange={handleFilterChange}
                      placeholder="Filter ingredients..."
                      className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                    {(filterText || alphabetFilter) && (
                      <button 
                        onClick={clearFilters} 
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-1 mb-6">
                  <button 
                    onClick={() => setAlphabetFilter('')}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      alphabetFilter === '' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  {alphabet.map(letter => (
                    <button 
                      key={letter} 
                      onClick={() => handleAlphabetFilter(letter)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        alphabetFilter === letter 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                
                <div className="text-center text-gray-400 mb-4">
                  Showing {filteredIngredients.length} of {ingredients.length} ingredients
                  {filterText && <span> for text "{filterText}"</span>}
                  {alphabetFilter && <span> starting with "{alphabetFilter}"</span>}
                </div>
                
                {filteredIngredients.length > 0 ? (
                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredIngredients.map((ingredient, index) => (
                      <IngredientCard key={index} ingredient={ingredient} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-xl">No ingredients match your filters</p>
                    <button 
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500">No ingredients found</p>
            )}
          </>
        )}
      </div>
    </MainLayout>
  )
}
