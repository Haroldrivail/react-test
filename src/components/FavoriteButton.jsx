import React, { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

export default function FavoriteButton({ meal, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isMealFavorite = isFavorite(meal.idMeal);
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    
    // Add animation regardless of login state
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    if (!user) {
      // Enhanced toast with login action button
      toast.info('Please log in to save favorites', {
        duration: 5000,
        action: {
          text: 'Login Now',
          onClick: () => navigate('/login', { state: { from: location } })
        }
      });
      return;
    }
    
    const success = toggleFavorite(meal);
    
    if (success) {
      if (isMealFavorite) {
        toast.success(`Removed ${meal.strMeal} from favorites`, { duration: 2000 });
      } else {
        toast.success(`Added ${meal.strMeal} to favorites`, { duration: 2000 });
      }
    }
  };
  
  return (
    <button 
      className={`p-2 rounded-full cursor-pointer focus:outline-none ${className} transition-transform ${isAnimating ? 'scale-125' : ''}`}
      onClick={handleFavoriteClick}
      aria-label={isMealFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isMealFavorite ? (
        <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors duration-200" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>
      )}
    </button>
  );
}
