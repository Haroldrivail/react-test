import MealCard from '../components/MealCard';
import MainLayout from '../layouts/MainLayout';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchAndDebug from '../components/SearchAndDebug';
import { useState, useEffect } from 'react';
import { fetchWithCache } from '../utils/api';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  
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

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Meal Search</h1>
        {error && (
          <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
            {error}
          </div>
        )}
        <p className="text-center text-gray-500 mb-4">
          {heading}
        </p>

        {isLoading ? (
          <SkeletonLoader type="grid" count={12} />
        ) : (
          <>
            {meals.length > 0 && <p className="text-center text-gray-500 mb-2">Found {meals.length} meals</p>}
            {meals.length === 0 && <p className="text-center text-gray-500 mb-2">No meals found</p>}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal}/>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
