import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Footer() {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto py-12 px-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-indigo-400 mr-1">Meal</span>
              <span>Search</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Discover delicious recipes from around the world.
              Search, save your favorites, and explore new cuisines with our easy-to-use platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-indigo-400 transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/cuisines" className="text-gray-400 hover:text-indigo-400 transition-colors">Cuisines</Link>
              </li>
              <li>
                <Link to="/ingredients" className="text-gray-400 hover:text-indigo-400 transition-colors">Ingredients</Link>
              </li>
              <li>
                <Link to={user ? "/favorites" : "/login"} className="text-gray-400 hover:text-indigo-400 transition-colors">
                  {user ? "My Favorites" : "Login"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Popular Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/Breakfast" className="text-gray-400 hover:text-indigo-400 transition-colors">Breakfast</Link>
              </li>
              <li>
                <Link to="/category/Dessert" className="text-gray-400 hover:text-indigo-400 transition-colors">Desserts</Link>
              </li>
              <li>
                <Link to="/category/Vegetarian" className="text-gray-400 hover:text-indigo-400 transition-colors">Vegetarian</Link>
              </li>
              <li>
                <Link to="/category/Seafood" className="text-gray-400 hover:text-indigo-400 transition-colors">Seafood</Link>
              </li>
              <li>
                <Link to="/category/Pasta" className="text-gray-400 hover:text-indigo-400 transition-colors">Pasta</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-gray-400">support@mealsearch.demo</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-gray-400">+237 653 149 884</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-400">Bepanda "3 Bahams", Douala V</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} MealSearch. All rights reserved. Data provided by TheMealDB.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Privacy Policy</Link>
              <Link to="/" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Terms of Service</Link>
              <Link to="/" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Sitemap</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-500 text-xs">
            <p>Developed by Harold Dongmo</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
