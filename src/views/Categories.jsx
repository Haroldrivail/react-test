import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import LoadingIndicator from '../components/LoadingIndicator';
import { Link } from 'react-router-dom';
import { fetchWithRetry } from '../utils/api';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!apiBaseUrl) {
          throw new Error("API base URL is not defined. Check your .env configuration.");
        }

        const data = await fetchWithRetry(`${apiBaseUrl}categories.php`);

        if (data && data.categories) {
          setCategories(data.categories);
        } else {
          throw new Error("Categories not found");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(`Failed to load categories: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Recipe Categories
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Explore meals organized by categories to find the perfect recipe for any occasion
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
        {error && (
          <div className="text-center text-red-500 font-bold mb-8 p-4 rounded border border-red-300 bg-red-50 bg-opacity-10 max-w-3xl mx-auto">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gray-400 text-lg mb-8">
                Choose from our diverse selection of meal categories to find recipes that match your cravings or dietary needs.
              </p>
              <div className="h-1 w-24 bg-indigo-600 mx-auto rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link 
                  to={`/category/${encodeURIComponent(category.strCategory)}`}
                  key={category.idCategory}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl group hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70"></div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{category.strCategory}</h2>
                    <p className="text-gray-400 line-clamp-3 mb-4">{category.strCategoryDescription}</p>
                    <div className="flex items-center text-indigo-400 font-medium">
                      <span>Explore recipes</span>
                      <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
