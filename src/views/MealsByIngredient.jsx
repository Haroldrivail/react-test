import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SkeletonLoader from '../components/SkeletonLoader';
import DetailedSkeletonLoader from '../components/DetailedSkeletonLoader';
import MealCard from '../components/MealCard';
import FullIngredientCard from '../components/FullIngredientCard';
import { fetchWithRetry, getIngredientDetails } from '../utils/api';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function MealsByIngredient() {
  const { ingredient } = useParams();
  const [ingredientDetails, setIngredientDetails] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('default'); // New state for sorting

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setIsLoading(true);
        
        if (!apiBaseUrl) {
          throw new Error("API base URL is not defined. Check your .env configuration.");
        }
        
        // Fetch accurate ingredient details including description
        const detailedIngredient = await getIngredientDetails(ingredient, apiBaseUrl);
        setIngredientDetails(detailedIngredient);
        
        // Fetch meals by ingredient using the proper URL format
        const apiUrl = `${apiBaseUrl}filter.php?i=${encodeURIComponent(ingredient)}`;
        console.log("Preparing to fetch from:", apiUrl);
        
        const mealsData = await fetchWithRetry(apiUrl);
        console.log("Meals data received:", mealsData);
        
        if (mealsData && mealsData.meals) {
          // For each meal we need to fetch the full details to get instructions
          const mealsWithDetails = await Promise.all(
            mealsData.meals.map(async (meal) => {
              try {
                // Fetch full meal details by ID
                const mealDetailsData = await fetchWithRetry(
                  `${apiBaseUrl}lookup.php?i=${meal.idMeal}`
                );
                
                if (mealDetailsData && mealDetailsData.meals && mealDetailsData.meals[0]) {
                  // Return meal with full details
                  return mealDetailsData.meals[0];
                }
                // If we couldn't get details, return the original meal
                return meal;
              } catch (err) {
                console.warn(`Couldn't fetch details for meal: ${meal.strMeal}`, err);
                return meal;
              }
            })
          );
          
          setMeals(mealsWithDetails);
          
          // If we have meals, we can verify this is a valid ingredient
          if (!detailedIngredient.strDescription || detailedIngredient.strDescription.includes("is a culinary ingredient")) {
            // The description is generic, so we may not have proper details
            // We could enhance the description by mentioning what meals it's used in
            const mealsList = mealsWithDetails.slice(0, 3).map(meal => meal.strMeal).join(", ");
            setIngredientDetails({
              ...detailedIngredient,
              strDescription: `${detailedIngredient.strIngredient} is used in various recipes including ${mealsList}${mealsWithDetails.length > 3 ? " and more" : ""}.`,
            });
          }
        } else {
          console.log("No meals found in response");
          setMeals([]);
        }
      } catch (error) {
        console.error("Error fetching ingredient data:", error);
        setError(`Failed to load ingredient information: ${error.message}`);
        setMeals([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ingredient]);

  // New function to sort meals
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
        <h1 className="text-3xl font-bold text-center mb-6">
          {isLoading ? "Loading..." : `${ingredientDetails?.strIngredient || ingredient} Details`}
        </h1>
        
        {error && (
          <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
            {error}
          </div>
        )}

        {isLoading ? (
          <>
            <div className="mb-8">
              <DetailedSkeletonLoader type="ingredient" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Meals with this ingredient
            </h2>
            <SkeletonLoader type="grid" count={8} />
          </>
        ) : (
          <>
            {ingredientDetails && (
              <div className="mb-8">
                <FullIngredientCard ingredient={ingredientDetails} />
              </div>
            )}

            <h2 className="text-2xl font-bold text-center mb-4">
              Meals with {ingredientDetails?.strIngredient || ingredient}
            </h2>
            
            {meals.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-400">
                    Found {meals.length} meals using {ingredientDetails?.strIngredient || ingredient}
                  </p>
                  
                  {/* Add sort controls */}
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
                
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sortedMeals().map(meal => (
                    <MealCard 
                      key={meal.idMeal} 
                      meal={meal} 
                      highlightText={ingredientDetails?.strIngredient}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">
                No meals found with this ingredient. Try searching for a different ingredient.
              </p>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
