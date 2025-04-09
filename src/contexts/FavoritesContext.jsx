import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  
  // Load favorites from localStorage when the user changes
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites-${user.id}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
    } else {
      // Clear favorites when user logs out
      setFavorites([]);
    }
  }, [user]);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user && favorites.length > 0) {
      localStorage.setItem(`favorites-${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);
  
  // Check if a meal is in favorites
  const isFavorite = (mealId) => {
    return favorites.some(fav => fav.idMeal === mealId);
  };
  
  // Add a meal to favorites
  const addFavorite = (meal) => {
    if (!user) return false;
    
    if (!isFavorite(meal.idMeal)) {
      setFavorites(prevFavorites => [
        ...prevFavorites, 
        {
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          dateAdded: new Date().toISOString()
        }
      ]);
      return true;
    }
    return false;
  };
  
  // Remove a meal from favorites
  const removeFavorite = (mealId) => {
    if (!user) return false;
    
    setFavorites(prevFavorites => 
      prevFavorites.filter(meal => meal.idMeal !== mealId)
    );
    return true;
  };
  
  // Toggle a meal's favorite status
  const toggleFavorite = (meal) => {
    if (!user) return false;
    
    if (isFavorite(meal.idMeal)) {
      return removeFavorite(meal.idMeal);
    } else {
      return addFavorite(meal);
    }
  };
  
  const value = {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    hasFavorites: favorites.length > 0
  };
  
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

// Custom hook to use the favorites context
export function useFavorites() {
  return useContext(FavoritesContext);
}
