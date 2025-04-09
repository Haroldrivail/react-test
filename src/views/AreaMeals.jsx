import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoadingIndicator from '../components/LoadingIndicator';
import MealCard from '../components/MealCard';
import { fetchWithRetry } from '../utils/api';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function AreaMeals() {
  const { area } = useParams();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchMealsByArea = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!apiBaseUrl) {
          throw new Error("API base URL is not defined. Check your .env configuration.");
        }

        const data = await fetchWithRetry(
          `${apiBaseUrl}filter.php?a=${encodeURIComponent(area)}`
        );

        if (data && data.meals) {
          // For each meal we need to fetch the full details to get instructions
          const mealsWithDetails = await Promise.all(
            data.meals.map(async (meal) => {
              try {
                const mealDetailsData = await fetchWithRetry(
                  `${apiBaseUrl}lookup.php?i=${meal.idMeal}`
                );
                
                if (mealDetailsData && mealDetailsData.meals && mealDetailsData.meals[0]) {
                  return mealDetailsData.meals[0];
                }
                return meal;
              } catch (err) {
                console.warn(`Couldn't fetch details for meal: ${meal.strMeal}`, err);
                return meal;
              }
            })
          );
          
          setMeals(mealsWithDetails);
        } else {
          setMeals([]);
        }
      } catch (error) {
        console.error("Error fetching meals by area:", error);
        setError(`Failed to load meals: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealsByArea();
  }, [area]);

  const sortedMeals = () => {
    switch(sortBy) {
      case 'name-asc':
        return [...meals].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
      case 'name-desc':
        return [...meals].sort((a, b) => b.strMeal.localeCompare(a.strMeal));
      default:
        return meals;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">{area} Cuisine</h1>
        
        {error && (
          <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">Found {meals.length} {area} recipes</p>
              
              <div className="flex items-center">
                <span className="mr-2 text-gray-400">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 text-white rounded px-2 py-1 border border-gray-600"
                >
                  <option value="default">Default</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>
            </div>

            {meals.length > 0 ? (
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedMeals().map(meal => (
                  <MealCard key={meal.idMeal} meal={meal} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No meals found for this cuisine.
              </p>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
