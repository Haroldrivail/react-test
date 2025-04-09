import React, { useState } from 'react';

// Full Ingredient detail card
export default function FullIngredientCard({ ingredient }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const CHARACTER_LIMIT = 250;
  
  const hasLongDescription = ingredient.strDescription && 
    ingredient.strDescription.length > CHARACTER_LIMIT;
  
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  
  const getDisplayDescription = () => {
    if (!ingredient.strDescription) return "No description available for this ingredient.";
    
    if (hasLongDescription && !isExpanded) {
      return `${ingredient.strDescription.substring(0, CHARACTER_LIMIT)}...`;
    }
    
    return ingredient.strDescription;
  };
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 max-w-4xl mx-auto">
      <div className="md:flex items-center">
        <div className="md:w-1/3">
          <img
            className="w-full h-auto object-contain rounded"
            src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
            alt={ingredient.strIngredient}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = 'https://www.themealdb.com/images/ingredients/placeholder.png';
            }}
          />
        </div>
        <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold text-white mb-2">{ingredient.strIngredient}</h2>

          <div className="mt-3">
            <p className="text-gray-400 leading-relaxed">
              {getDisplayDescription()}
            </p>
            {hasLongDescription && (
              <button 
                onClick={toggleDescription} 
                className="mt-2 text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                {isExpanded ? 'See less' : 'See more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
