import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function FavoriteButton({ meal, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const isMealFavorite = isFavorite(meal.idMeal);
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    
    toggleFavorite(meal);
  };
  
  return (
    <button 
      className={`p-2 rounded-full cursor-pointer focus:outline-none ${className}`}
      onClick={handleFavoriteClick}
      aria-label={isMealFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isMealFavorite ? (
        <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-400 hover:text-red-500" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>
      )}
    </button>
  );
}
