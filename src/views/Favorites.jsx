import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SkeletonLoader from '../components/SkeletonLoader';
import MealCard from '../components/MealCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { fetchWithCache } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const { user } = useAuth();
  const [mealsWithDetails, setMealsWithDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    const fetchMealDetails = async () => {
      if (!user || favorites.length === 0) {
        setMealsWithDetails([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);

        if (!apiBaseUrl) {
          throw new Error("API base URL is not defined. Check your .env configuration.");
        }

        // Fetch full details for each favorite meal
        const detailedMeals = await Promise.all(
          favorites.map(async (favMeal) => {
            try {
              const mealData = await fetchWithCache(
                `${apiBaseUrl}lookup.php?i=${favMeal.idMeal}`
              );
              
              if (mealData && mealData.meals && mealData.meals[0]) {
                return {
                  ...mealData.meals[0],
                  dateAdded: favMeal.dateAdded // Keep the date it was added to favorites
                };
              }
              return favMeal;
            } catch (err) {
              console.warn(`Couldn't fetch details for meal: ${favMeal.strMeal}`, err);
              return favMeal;
            }
          })
        );
        
        setMealsWithDetails(detailedMeals);
      } catch (error) {
        console.error("Error fetching favorite meals details:", error);
        setError(`Failed to load favorite meals: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealDetails();
  }, [favorites, user]);

  const sortedMeals = () => {
    if (!mealsWithDetails.length) return [];
    
    const meals = [...mealsWithDetails];
    
    switch(sortBy) {
      case 'name-asc':
        return meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
      case 'name-desc':
        return meals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
      case 'date-asc':
        return meals.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      case 'date-desc':
        return meals.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      default:
        return meals;
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-32">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"}}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-lg mx-auto text-center bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 rounded-lg shadow-2xl">
              <svg className="w-20 h-20 text-indigo-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
              </svg>
              <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
              <p className="text-gray-300 mb-8 text-lg">Please log in to view and manage your favorite meals</p>
              <Link 
                to="/login" 
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Login Now
              </Link>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              My Favorite Meals
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Your personal collection of delicious recipes
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
          <SkeletonLoader type="grid" count={favorites.length || 4} />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 max-w-6xl mx-auto">
              <p className="text-gray-400 mb-4 sm:mb-0 text-lg">
                {mealsWithDetails.length > 0 
                  ? `You have ${mealsWithDetails.length} favorite ${mealsWithDetails.length === 1 ? 'meal' : 'meals'}`
                  : 'You have no favorite meals yet'}
              </p>
              
              {mealsWithDetails.length > 0 && (
                <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <span className="px-4 py-2 text-gray-300">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white rounded-r-lg px-4 py-2 border-l border-gray-600 focus:outline-none cursor-pointer"
                  >
                    <option value="date-desc">Date Added (Newest)</option>
                    <option value="date-asc">Date Added (Oldest)</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                  </select>
                </div>
              )}
            </div>

            {mealsWithDetails.length > 0 ? (
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedMeals().map(meal => (
                  <div key={meal.idMeal} className="relative transform transition-all duration-300 hover:-translate-y-2">
                    <button 
                      onClick={() => removeFavorite(meal.idMeal)}
                      className="absolute top-3 right-3 z-10 bg-gray-800 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200"
                      aria-label="Remove from favorites"
                    >
                      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                      </svg>
                    </button>
                    <MealCard meal={meal} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800 rounded-lg shadow-lg max-w-xl mx-auto">
                <svg className="w-20 h-20 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <p className="text-gray-300 text-xl mb-6">You haven't added any favorites yet</p>
                <Link 
                  to="/" 
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Discover Meals
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
