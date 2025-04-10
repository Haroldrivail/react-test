import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SkeletonLoader from '../components/SkeletonLoader';
import DetailedSkeletonLoader from '../components/DetailedSkeletonLoader';
import MealCard from '../components/MealCard';
import { fetchWithRetry, fetchWithCache } from '../utils/api';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CategoryMeals() {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!apiBaseUrl) {
          throw new Error("API base URL is not defined. Check your .env configuration.");
        }

        // Fetch category details to get description
        const categoryData = await fetchWithCache(
          `${apiBaseUrl}categories.php`
        );
        
        if (categoryData && categoryData.categories) {
          const foundCategory = categoryData.categories.find(
            c => c.strCategory.toLowerCase() === category.toLowerCase()
          );
          if (foundCategory) {
            setCategoryDetails(foundCategory);
          }
        }

        // Fetch meals by category
        const mealsData = await fetchWithRetry(
          `${apiBaseUrl}filter.php?c=${encodeURIComponent(category)}`
        );

        if (mealsData && mealsData.meals) {
          // For each meal we need to fetch the full details to get instructions
          const mealsWithDetails = await Promise.all(
            mealsData.meals.map(async (meal) => {
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
        console.error("Error fetching meals by category:", error);
        setError(`Failed to load meals: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-4">{category} Meals</h1>
        </div>
        
        {error && (
          <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
            {error}
          </div>
        )}

        {isLoading ? (
          <>
            {/* Show category skeleton first */}
            <div className="mb-8">
              <DetailedSkeletonLoader type="category" />
            </div>
            {/* Then show meal skeletons */}
            <h2 className="text-2xl font-bold text-center mb-4">Meals in this category</h2>
            <SkeletonLoader type="grid" count={8} />
          </>
        ) : (
          <>
            {/* Category description card */}
            {categoryDetails && (
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8">
                <div className="relative">
                  <img 
                    src={categoryDetails.strCategoryThumb} 
                    alt={categoryDetails.strCategory} 
                    className="w-full h-48 object-cover"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = 'https://via.placeholder.com/400x300?text=Category+Image+Not+Available';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="p-4">
                      <h2 className="text-2xl font-bold text-white">{categoryDetails.strCategory}</h2>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={categoryDetails.strCategoryThumb}
                      alt={`${categoryDetails.strCategory} icon`}
                      className="w-12 h-12 object-contain rounded mr-4"
                      onError={({ currentTarget }) => {
                        currentTarget.style.display = 'none';
                      }}
                    />
                    <h3 className="text-xl font-semibold text-white">About {categoryDetails.strCategory}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{categoryDetails.strCategoryDescription}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">Found {meals.length} {category} meals</p>
              
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
                No meals found in this category.
              </p>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
