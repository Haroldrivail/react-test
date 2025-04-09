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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Meal Categories</h1>
        
        {error && (
          <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                to={`/category/${encodeURIComponent(category.strCategory)}`}
                key={category.idCategory}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white mb-2">{category.strCategory}</h2>
                  <p className="text-gray-400 line-clamp-3">{category.strCategoryDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
