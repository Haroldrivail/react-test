import MealCard from '../components/MealCard';
import MainLayout from '../layouts/MainLayout';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchAndDebug from '../components/SearchAndDebug';
import { useState, useEffect } from 'react';
import { fetchWithCache } from '../utils/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState("Discover random meals");
  const [debugMode, setDebugMode] = useState(false);
  const [apiCallInfo, setApiCallInfo] = useState({ lastCall: "", duration: 0 });
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to handle random fetching with cache
  const fetchRandomMeals = async (count) => {
    try {
      setError(null);
      setIsLoading(true);
      const startTime = performance.now();
      setApiCallInfo(prev => ({ ...prev, lastCall: `Fetching ${count} random meals` }));
      
      if (!apiBaseUrl) {
        throw new Error("API base URL is not defined. Check your .env configuration.");
      }
      
      const mealPromises = [];
      const uniqueIds = new Set();
      
      // Create unique meal promises to avoid duplicate meals
      for (let i = 0; i < count; i++) {
        const fetchMeal = async () => {
          // Add forceRefresh parameter to prevent caching for random meals
          const data = await fetchWithCache(`${apiBaseUrl}/random.php`, true);
          const meal = data.meals[0];
          
          // Ensure we don't add duplicate meals
          if (uniqueIds.has(meal.idMeal)) {
            // Try again to get a unique meal
            return fetchMeal();
          }
          
          uniqueIds.add(meal.idMeal);
          return meal;
        };
        
        mealPromises.push(fetchMeal());
      }
      
      const randomMeals = await Promise.all(mealPromises);
      const endTime = performance.now();
      setApiCallInfo({
        lastCall: `Fetched ${count} random meals`,
        duration: (endTime - startTime).toFixed(2)
      });
      setMeals(randomMeals);
    } catch (error) {
      console.error("Error fetching random meals:", error);
      setError(`Error fetching random meals: ${error.message}`);
      setApiCallInfo(prev => ({ ...prev, lastCall: "Error in fetchRandomMeals" }));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRandomMeals(12);
  }, []);

  // Function to handle search with cache
  const handleSearch = (query) => {
    console.log("Search query:", query);

    try {
      setError(null); // Clear any previous errors
      setMeals([]); // Clear previous meals
      setIsLoading(true);
      const startTime = performance.now();
      setApiCallInfo(prev => ({ ...prev, lastCall: `Searching for: "${query}"` }));
      
      if (!apiBaseUrl) {
        throw new Error("API base URL is not defined. Check your .env configuration.");
      }
      
      const url = `${apiBaseUrl}/search.php?s=${query}`;
      
      fetchWithCache(url)
        .then(data => {
          if (!query.trim()) {
            setHeading("Discover random meals");
            fetchRandomMeals(12);
            setMeals([]);
          } else if (data.meals === null) {
            setHeading(`No results found for "${query}"`);
            setMeals([]);
          } else {
            setHeading(`Results for "${query}"`);
            setMeals(data.meals || []);
          }
          const endTime = performance.now();
          setApiCallInfo({
            lastCall: `Searched for: ${query}`,
            duration: (endTime - startTime).toFixed(2)
          });
        })
        .catch(error => {
          console.error("Error fetching meals:", error);
          setError(`Failed to search for meals: ${error.message}`);
          setApiCallInfo(prev => ({ ...prev, lastCall: "Error in search fetch" }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error fetching meals:", error);
      setError(`An unexpected error occurred: ${error.message}`);
      setApiCallInfo(prev => ({ ...prev, lastCall: "Error in handleSearch" }));
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"}}
        ></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Discover Delicious Recipes from Around the World
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-10">
              Explore thousands of recipes, save your favorites, and learn new cooking techniques.
              Your culinary adventure starts here!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <SearchAndDebug
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
                debugMode={debugMode}
                setDebugMode={setDebugMode}
                apiCallInfo={apiCallInfo}
                mealsCount={meals.length}
                heading={heading}
                error={error}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#111827" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Explore Our Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-white">Search Recipes</h3>
              <p className="text-gray-300 text-center">
                Search through our collection of thousands of recipes from around the world.
                Find something delicious for any occasion.
              </p>
              <div className="mt-4 text-center">
                <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Start Searching →
                </Link>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-white">Browse Categories</h3>
              <p className="text-gray-300 text-center">
                Explore recipes by categories like Breakfast, Vegetarian, Desserts and more. 
                Discover new dishes by cuisine or ingredient.
              </p>
              <div className="mt-4 text-center">
                <Link to="/categories" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  View Categories →
                </Link>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-white">Save Favorites</h3>
              <p className="text-gray-300 text-center">
                Create your personal collection of favorite recipes.
                {!user ? "Sign up to save recipes you love." : "Your favorites are just a click away."}
              </p>
              <div className="mt-4 text-center">
                <Link to={user ? "/favorites" : "/login"} className="text-indigo-400 hover:text-indigo-300 font-medium">
                  {user ? "View Favorites →" : "Login to Save →"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Explore Cuisines Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-white">Explore Global Cuisines</h2>
              <p className="text-gray-300 mb-6">
                Take a culinary trip around the world with our diverse collection of recipes from different cuisines.
                From Italian pasta to Thai curries, Indian masalas to Mexican tacos - discover authentic dishes from every corner of the globe.
              </p>
              <Link 
                to="/cuisines" 
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
              >
                Browse Cuisines
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Mediterranean cuisine" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Asian cuisine" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="European cuisine" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1464500840579-4afbfb740962?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="American cuisine" 
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meal Results Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            {search ? heading : "Popular Recipes"}
          </h2>
          
          {error && (
            <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
              {error}
            </div>
          )}

          {!search && (
            <p className="text-center text-gray-400 mb-8">
              Discover delicious recipes from our collection. Each day brings new inspiration for your kitchen!
            </p>
          )}

          {isLoading ? (
            <SkeletonLoader type="grid" count={12} />
          ) : (
            <>
              {meals.length > 0 && (
                <p className="text-center text-gray-400 mb-6">Found {meals.length} meals</p>
              )}
              
              {meals.length === 0 && !isLoading && search && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-gray-400 text-lg">No meals found matching your search</p>
                  <button 
                    onClick={() => fetchRandomMeals(12)} 
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Show Random Meals
                  </button>
                </div>
              )}
              
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {meals.map((meal) => (
                  <MealCard key={meal.idMeal} meal={meal}/>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMTQuMzc0IDE1LjI0MkwwIDEwLjUzNnYxOC45MjhsMTQuMzc0LTQuNzA2VjE1LjI0MnptMTEuMjUyLjcwNEwxNC4zNzQgMTAuNTM2aDE1LjI1MmwtNCA1LjQxdi4wMDR6TTQuMDYgNS40MWwxMC4zMTQgNS4xMjZWMEg0LjA2djUuNDF6bTE1LjI1MiA1LjEyNkwyOS42MjYgNS40MVYwaC0xMC4zMXYxMC41MzZ6IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')",
            backgroundSize: "40px 40px"
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Start Your Culinary Adventure?
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Join thousands of food enthusiasts who explore, cook, and share amazing recipes every day.
              {!user ? " Create an account now to save your favorites!" : " Start exploring new recipes today!"}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {!user ? (
                <>
                  <Link to="/login" className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    Login Now
                  </Link>
                  <Link to="/" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
                    Explore Recipes
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/favorites" className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    View Favorites
                  </Link>
                  <Link to="/categories" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
                    Browse Categories
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
