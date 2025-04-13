import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';

export default function Sitemap() {
  const { user } = useAuth();
  
  // Icons for different sections
  const icons = {
    home: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    category: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    cuisine: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    ingredient: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
      </svg>
    ),
    favorites: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    user: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    meal: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    arrow: (
      <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    ),
  };

  // Site map links with descriptions
  const sitemapSections = [
    {
      title: "Main Navigation",
      links: [
        {
          icon: icons.home,
          name: "Home",
          path: "/",
          description: "Landing page with search functionality and featured recipes",
          protected: false
        },
      ]
    },
    {
      title: "Browse By Category",
      links: [
        {
          icon: icons.category,
          name: "All Categories",
          path: "/categories",
          description: "Browse all meal categories (Breakfast, Dessert, etc.)",
          protected: false
        },
        {
          icon: icons.category,
          name: "Category Details",
          path: "/category/:category",
          description: "View recipes in a specific category",
          example: "/category/Dessert",
          protected: false
        },
      ]
    },
    {
      title: "Browse By Cuisine",
      links: [
        {
          icon: icons.cuisine,
          name: "All Cuisines",
          path: "/cuisines",
          description: "Browse recipes from different countries and regions",
          protected: false
        },
        {
          icon: icons.cuisine,
          name: "Cuisine Details",
          path: "/area/:area",
          description: "View recipes from a specific cuisine",
          example: "/area/Italian",
          protected: false
        },
      ]
    },
    {
      title: "Browse By Ingredient",
      links: [
        {
          icon: icons.ingredient,
          name: "All Ingredients",
          path: "/ingredients",
          description: "Browse recipes by ingredients",
          protected: false
        },
        {
          icon: icons.ingredient,
          name: "Ingredient Details",
          path: "/ingredient/:ingredient",
          description: "View recipes using a specific ingredient",
          example: "/ingredient/Chicken",
          protected: false
        },
      ]
    },
    {
      title: "User Features",
      links: [
        {
          icon: icons.user,
          name: "Login",
          path: "/login",
          description: "User authentication page",
          protected: false
        },
        {
          icon: icons.favorites,
          name: "My Favorites",
          path: "/favorites",
          description: "Your saved favorite recipes",
          protected: true
        },
      ]
    },
    {
      title: "Recipe Details",
      links: [
        {
          icon: icons.meal,
          name: "Meal Details",
          path: "/meal/:id",
          description: "Detailed recipe information, ingredients, and instructions",
          example: "/meal/52772",
          protected: true
        },
      ]
    },
  ];

  // List of popular categories
  const popularCategories = [
    { name: "Breakfast", path: "/category/Breakfast" },
    { name: "Dessert", path: "/category/Dessert" },
    { name: "Vegetarian", path: "/category/Vegetarian" },
    { name: "Seafood", path: "/category/Seafood" },
    { name: "Pasta", path: "/category/Pasta" },
  ];

  return (
    <MainLayout>
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Site Map
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              A complete overview of our website's pages and structure
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#111827" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      <div className="container mx-auto p-4 py-12 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Welcome to the MealSearch Site Map</h2>
            <p className="text-gray-300 mb-4">
              This page provides a complete overview of all pages and sections available on our website.
              Use this map to quickly navigate to any area of interest.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">🔍 Search recipes</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">🌍 Browse by cuisine</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">📋 View by category</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">🥕 Filter by ingredient</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">❤️ Save favorites</span>
            </div>
          </div>

          {/* Site Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {sitemapSections.map((section, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-700 p-4">
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-6">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">{link.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              {link.protected ? (
                                <span 
                                  title="Login required"
                                  className="text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-md"
                                >
                                  Protected
                                </span>
                              ) : null}
                            </div>
                            
                            <h4 className="font-bold text-white flex items-center">
                              {link.path.includes(':') ? (
                                <span className="text-gray-300">{link.name}</span>
                              ) : (
                                <Link to={link.path} className="text-indigo-400 hover:text-indigo-300 transition-colors group flex items-center">
                                  {link.name}
                                  {icons.arrow}
                                </Link>
                              )}
                            </h4>
                            
                            <p className="text-sm text-gray-400 mt-1">
                              {link.description}
                            </p>
                            
                            {link.example && (
                              <p className="text-xs text-gray-500 mt-1">
                                Example: <Link to={link.example} className="text-indigo-400 hover:text-indigo-300 transition-colors">{link.example}</Link>
                              </p>
                            )}
                            
                            {link.protected && !user && (
                              <p className="text-xs text-amber-500 mt-1 italic">
                                Login required to access
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Categories */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-12">
            <div className="bg-gray-700 p-4">
              <h3 className="text-xl font-bold text-white">Popular Categories</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                {popularCategories.map((category, index) => (
                  <Link 
                    key={index}
                    to={category.path} 
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="bg-gray-700 p-4">
              <h3 className="text-xl font-bold text-white">Footer Links</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Quick Links</h4>
                  <ul className="space-y-1">
                    <li><Link to="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">Home</Link></li>
                    <li><Link to="/categories" className="text-indigo-400 hover:text-indigo-300 transition-colors">Categories</Link></li>
                    <li><Link to="/cuisines" className="text-indigo-400 hover:text-indigo-300 transition-colors">Cuisines</Link></li>
                    <li><Link to="/ingredients" className="text-indigo-400 hover:text-indigo-300 transition-colors">Ingredients</Link></li>
                    <li>
                      <Link 
                        to={user ? "/favorites" : "/login"} 
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        {user ? "My Favorites" : "Login"}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Popular Categories</h4>
                  <ul className="space-y-1">
                    <li><Link to="/category/Breakfast" className="text-indigo-400 hover:text-indigo-300 transition-colors">Breakfast</Link></li>
                    <li><Link to="/category/Dessert" className="text-indigo-400 hover:text-indigo-300 transition-colors">Desserts</Link></li>
                    <li><Link to="/category/Vegetarian" className="text-indigo-400 hover:text-indigo-300 transition-colors">Vegetarian</Link></li>
                    <li><Link to="/category/Seafood" className="text-indigo-400 hover:text-indigo-300 transition-colors">Seafood</Link></li>
                    <li><Link to="/category/Pasta" className="text-indigo-400 hover:text-indigo-300 transition-colors">Pasta</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Legal</h4>
                  <ul className="space-y-1">
                    <li><Link to="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">Privacy Policy</Link></li>
                    <li><Link to="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">Terms of Service</Link></li>
                    <li><Link to="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">Sitemap</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}