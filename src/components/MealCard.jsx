import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

export default function MealCard({ meal, highlightText }) {
    const navigate = useNavigate();
    const CHARACTER_LIMIT = 100;

    const handleMealClick = () => {
        navigate(`/meal/${meal.idMeal}`);
    };

    // Function to check if the highlighted ingredient is in the meal title
    const highlightIngredientInTitle = (title) => {
        if (!highlightText || !title.toLowerCase().includes(highlightText.toLowerCase())) {
            return title;
        }

        const regex = new RegExp(`(${highlightText})`, 'gi');
        const parts = title.split(regex);

        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlightText.toLowerCase() ?
                        <span key={i} className="text-indigo-400">{part}</span> :
                        part
                )}
            </>
        );
    };

    return (
        <div
            className="max-w-sm w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden mx-auto cursor-pointer transition-transform hover:scale-105 m-4"
            onClick={handleMealClick}
        >
            <div className="relative">
                <img
                    className="w-full h-60 object-cover rounded-t-lg"
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                    {meal.strYoutube && (
                        <a
                            href={meal.strYoutube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="w-4 h-4"
                            >
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                        </a>
                    )}
                    <FavoriteButton meal={meal} className="bg-gray-800 bg-opacity-70" />
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-white">
                    {highlightText ? highlightIngredientInTitle(meal.strMeal) : meal.strMeal}
                </h2>
                <p className="mt-2 text-gray-400">
                    {meal.strInstructions
                        ? `${meal.strInstructions.slice(0, CHARACTER_LIMIT)}${meal.strInstructions.length > CHARACTER_LIMIT ? '...' : ''}`
                        : "No instructions available."}
                </p>
            </div>
        </div>
    );
}
