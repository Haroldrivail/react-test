import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { hasFavorites } = useFavorites();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Close menu when clicking outside or when route changes
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');
      
      if (
        menuOpen && 
        mobileMenu && 
        !mobileMenu.contains(event.target) && 
        menuButton && 
        !menuButton.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };
  
  return (
    <nav className="py-3 px-4 md:px-6 bg-gray-800 flex items-center justify-between text-white shadow-md relative z-20">
      <Link to="/" className="text-2xl font-semibold">MealSearch</Link>
      
      {/* Mobile menu button */}
      <button 
        id="menu-button"
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-700 transition-colors focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Desktop navigation */}
      <div 
        id="mobile-menu"
        className={`md:flex md:items-center md:space-x-1 ${
          menuOpen 
            ? 'absolute top-full right-0 left-0 flex flex-col bg-gray-800 shadow-xl border-t border-gray-700 z-20 animate-fade-in-down'
            : 'hidden'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive 
                ? 'text-indigo-400 py-3 px-4 border-b border-gray-700 md:border-none'
                : 'text-white hover:bg-gray-700 py-3 px-4 border-b border-gray-700 md:border-none md:hover:bg-transparent md:hover:text-indigo-400 transition-colors'
            }
            onClick={() => setMenuOpen(false)} 
          >
            Home
          </NavLink>
          <NavLink 
            to="/categories" 
            className={({isActive}) => 
              isActive 
                ? 'text-indigo-400 py-3 px-4 border-b border-gray-700 md:border-none'
                : 'text-white hover:bg-gray-700 py-3 px-4 border-b border-gray-700 md:border-none md:hover:bg-transparent md:hover:text-indigo-400 transition-colors'
            } 
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </NavLink>
          <NavLink 
            to="/cuisines" 
            className={({isActive}) => 
              isActive 
                ? 'text-indigo-400 py-3 px-4 border-b border-gray-700 md:border-none'
                : 'text-white hover:bg-gray-700 py-3 px-4 border-b border-gray-700 md:border-none md:hover:bg-transparent md:hover:text-indigo-400 transition-colors'
            } 
            onClick={() => setMenuOpen(false)}
          >
            Cuisines
          </NavLink>
          <NavLink 
            to="/ingredients" 
            className={({isActive}) => 
              isActive 
                ? 'text-indigo-400 py-3 px-4 border-b border-gray-700 md:border-none'
                : 'text-white hover:bg-gray-700 py-3 px-4 border-b border-gray-700 md:border-none md:hover:bg-transparent md:hover:text-indigo-400 transition-colors'
            } 
            onClick={() => setMenuOpen(false)}
          >
            Ingredients
          </NavLink>
        </div>
        
        <div className="md:ml-4 md:border-l md:border-gray-600 md:pl-4">
          {isAuthenticated ? (
            <>
              <NavLink 
                to="/favorites" 
                className={({isActive}) => 
                  `flex items-center justify-between py-3 px-4 ${
                    isActive 
                      ? 'text-indigo-400' 
                      : 'text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-indigo-400'
                  } ${!menuOpen && 'md:px-3 md:py-1'} transition-colors`
                }
                onClick={() => setMenuOpen(false)}
              >
                <span>Favorites</span>
                {hasFavorites && (
                  <svg className="w-5 h-5 text-red-500 fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                )}
              </NavLink>
              
              <div className="flex items-center justify-between py-3 px-4 border-t border-gray-700 md:border-none">
                <span className="text-gray-300 mr-2">Hi, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <NavLink 
              to="/login"
              className={({isActive}) => 
                isActive 
                  ? 'block py-3 px-4 text-center bg-indigo-600 text-white md:px-3 md:py-1 md:rounded' 
                  : 'block py-3 px-4 text-center bg-indigo-500 hover:bg-indigo-600 text-white md:px-3 md:py-1 md:rounded transition-colors'
              }
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
