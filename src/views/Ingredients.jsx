import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import LoadingIndicator from '../components/LoadingIndicator'
import IngredientCard from '../components/IngredientCard';
import { fetchWithRetry } from '../utils/api'

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Cooking Ingredients
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Discover recipes by ingredients and learn about their culinary uses
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#111827" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      <div className="container mx-auto p-4 py-12 bg-gray-900">
        {error && (
          <div className="text-center text-red-500 font-bold mb-8 p-4 rounded border border-red-300 bg-red-50 bg-opacity-10 max-w-3xl mx-auto">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            {ingredients.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <p className="text-gray-400 text-lg mb-8">
                    Browse our collection of ingredients used in various recipes. Find inspiration for your next meal!
                  </p>
                  <div className="h-1 w-24 bg-indigo-600 mx-auto rounded"></div>
                </div>
                
                <div className="max-w-md mx-auto mb-10">
                  <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={filterText}
                      onChange={handleFilterChange}
                      placeholder="Filter ingredients..."
                      className="w-full p-4 pl-10 pr-10 bg-gray-800 border border-gray-700 focus:border-indigo-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-30 transition-all duration-200"
                    />
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
                
                <div className="flex flex-wrap justify-center gap-2 mb-10 p-4 bg-gray-800 rounded-lg max-w-4xl mx-auto shadow-lg">
                  <button 
                    onClick={() => setAlphabetFilter('')}
                    className={`w-9 h-9 flex items-center justify-center rounded-full ${
                      alphabetFilter === '' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    } transition-all duration-200`}
                  >
                    All
                  </button>
                  {alphabet.map(letter => (
                    <button 
                      key={letter} 
                      onClick={() => handleAlphabetFilter(letter)}
                      className={`w-9 h-9 flex items-center justify-center rounded-full ${
                        alphabetFilter === letter 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      } transition-all duration-200`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                
                <div className="text-center text-gray-400 mb-8 p-2 bg-gray-800 bg-opacity-50 rounded-lg inline-block mx-auto">
                  Showing {filteredIngredients.length} of {ingredients.length} ingredients
                  {filterText && <span> for text "{filterText}"</span>}
                  {alphabetFilter && <span> starting with "{alphabetFilter}"</span>}
                </div>
                
                {filteredIngredients.length > 0 ? (
                  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredIngredients.map((ingredient, index) => (
                      <IngredientCard key={index} ingredient={ingredient} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-800 rounded-lg max-w-xl mx-auto shadow-lg">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-gray-400 text-xl mb-6">No ingredients match your filters</p>
                    <button 
                      onClick={clearFilters}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors transform hover:scale-105"
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
  );
}
