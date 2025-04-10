import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchWithCache } from '../utils/api';
import FavoriteButton from '../components/FavoriteButton';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Create a custom skeleton just for meal details
function MealDetailSkeleton() {
    return (
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden animate-pulse">
            {/* Header image skeleton */}
            <div className="w-full h-96 bg-gray-700"></div>
            
            {/* Content area */}
            <div className="p-6">
                {/* Tags section */}
                <div className="mb-6">
                    <div className="h-6 bg-gray-700 w-24 rounded mb-3"></div>
                    <div className="flex flex-wrap gap-2">
                        <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                        <div className="h-6 w-24 bg-gray-700 rounded-full"></div>
                        <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                    </div>
                </div>
                
                {/* Instructions section */}
                <div className="mb-6">
                    <div className="h-6 bg-gray-700 w-32 rounded mb-3"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-700 rounded w-4/5"></div>
                    </div>
                </div>
                
                {/* Ingredients section */}
                <div>
                    <div className="h-6 bg-gray-700 w-28 rounded mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-gray-700 p-3 h-20 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MealDetails() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const toast = useToast();

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (!apiBaseUrl) {
                    throw new Error("API base URL is not defined. Check your .env configuration.");
                }

                const data = await fetchWithCache(`${apiBaseUrl}lookup.php?i=${id}`);

                if (data && data.meals && data.meals[0]) {
                    setMeal(data.meals[0]);
                } else {
                    throw new Error("Meal not found");
                }
            } catch (error) {
                console.error("Error fetching meal details:", error);
                setError(`Failed to load meal details: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMealDetails();
    }, [id]);

    // Extract ingredients and measurements
    const getIngredientsWithMeasures = (meal) => {
        if (!meal) return [];

        const ingredients = [];

        // The MealDB API stores ingredients as strIngredient1, strIngredient2, etc.
        // and measurements as strMeasure1, strMeasure2, etc.
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    name: ingredient.trim(),
                    measure: measure ? measure.trim() : ''
                });
            }
        }

        return ingredients;
    };

    return (
        <MainLayout>
            <div className="container mx-auto p-4">
                {isLoading ? (
                    <MealDetailSkeleton />
                ) : error ? (
                    <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
                        {error}
                    </div>
                ) : meal ? (
                    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                        {/* Meal Header */}
                        <div className="relative">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-4xl font-bold text-white">{meal.strMeal}</h1>
                                    <FavoriteButton meal={meal} className="bg-gray-800 bg-opacity-70" />
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {meal.strCategory && (
                                        <span className="px-2 py-1 bg-indigo-600 text-white rounded-full text-sm">
                                            Category: {meal.strCategory}
                                        </span>
                                    )}
                                    {meal.strArea && (
                                        <span className="px-2 py-1 bg-purple-600 text-white rounded-full text-sm">
                                            Cuisine: {meal.strArea}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="p-6">
                            {/* Tags */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Tags</h2>
                                {meal.strTags && meal.strTags.trim() ? (
                                    <div className="flex flex-wrap gap-2">
                                        {meal.strTags.split(',').map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">No tags available for this recipe</p>
                                )}
                            </div>

                            {/* Instructions */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Instructions</h2>
                                <div className="text-gray-300">
                                    {meal.strInstructions.split('\r\n').map((paragraph, index) => (
                                        paragraph.trim() ? (
                                            <p key={index} className="mb-4">{paragraph}</p>
                                        ) : null
                                    ))}
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-4">Ingredients</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {getIngredientsWithMeasures(meal).map((item, index) => (
                                        <div key={index} className="bg-gray-700 p-3 rounded-lg flex items-center">
                                            <img
                                                src={`https://www.themealdb.com/images/ingredients/${item.name}.png`}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover mr-3"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = 'https://www.themealdb.com/images/ingredients/placeholder.png';
                                                }}
                                            />
                                            <div>
                                                <p className="text-white font-medium">{item.name}</p>
                                                {item.measure ? (
                                                    <p className="text-gray-400 text-sm">{item.measure}</p>
                                                ) : (
                                                    <p className="text-gray-500 text-sm italic">Quantity as needed</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Video link if available */}
                            {meal.strYoutube && (
                                <div className="mt-8">
                                    <h2 className="text-xl font-semibold text-white mb-2">Video Tutorial</h2>
                                    <a
                                        href={meal.strYoutube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-fit px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 items-center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="white"
                                            className="w-4 h-4 mr-2"
                                        >
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                        </svg>
                                        Watch on YouTube
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Meal not found</p>
                )}
            </div>
        </MainLayout>
    );
}
