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
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Favorites</h1>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-gray-300 mb-6">Please log in to view your favorite meals</p>
            <Link 
              to="/login" 
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">My Favorite Meals</h1>
        
        {error && (
          <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
            {error}
          </div>
        )}

        {isLoading ? (
          <SkeletonLoader type="grid" count={favorites.length || 4} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                {mealsWithDetails.length > 0 
                  ? `You have ${mealsWithDetails.length} favorite meals`
                  : 'You have no favorite meals yet'}
              </p>
              
              {mealsWithDetails.length > 0 && (
                <div className="flex items-center">
                  <span className="mr-2 text-gray-400">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white rounded px-2 py-1 border border-gray-600"
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
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedMeals().map(meal => (
                  <div key={meal.idMeal} className="relative">
                    <button 
                      onClick={() => removeFavorite(meal.idMeal)}
                      className="absolute top-2 right-2 z-10 bg-gray-800 bg-opacity-70 rounded-full p-1"
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
              <div className="text-center py-10">
                <p className="text-gray-400 text-lg mb-4">You haven't added any favorites yet</p>
                <Link 
                  to="/" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
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
