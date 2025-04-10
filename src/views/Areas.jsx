import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchWithRetry } from '../utils/api';

// Access the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Map of areas to their flag emoji or related icon
const areaFlags = {
  'American': '🇺🇸',
  'British': '🇬🇧',
  'Canadian': '🇨🇦',
  'Chinese': '🇨🇳',
  'Dutch': '🇳🇱',
  'Egyptian': '🇪🇬',
  'French': '🇫🇷',
  'Greek': '🇬🇷',
  'Indian': '🇮🇳',
  'Irish': '🇮🇪',
  'Italian': '🇮🇹',
  'Jamaican': '🇯🇲',
  'Japanese': '🇯🇵',
  'Kenyan': '🇰🇪',
  'Malaysian': '🇲🇾',
  'Mexican': '🇲🇽',
  'Moroccan': '🇲🇦',
  'Polish': '🇵🇱',
  'Portuguese': '🇵🇹',
  'Russian': '🇷🇺',
  'Spanish': '🇪🇸',
  'Thai': '🇹🇭',
  'Tunisian': '🇹🇳',
  'Turkish': '🇹🇷',
  'Vietnamese': '🇻🇳',
  // Default for others
  'Unknown': '🌍'
};

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!apiBaseUrl) {
          throw new Error("API base URL is not defined. Check your .env configuration.");
        }

        const data = await fetchWithRetry(`${apiBaseUrl}list.php?a=list`);

        if (data && data.meals) {
          setAreas(data.meals.map(area => area.strArea));
        } else {
          throw new Error("Areas not found");
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
        setError(`Failed to load cuisine areas: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Global Cuisines
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Explore traditional dishes from around the world
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
          <>
            <div className="text-center mb-12">
              <p className="text-gray-400 text-lg mb-8">
                Discover authentic recipes from different countries and regions around the world.
                Each cuisine offers unique flavors, ingredients and cooking traditions.
              </p>
              <div className="h-1 w-24 bg-indigo-600 mx-auto rounded"></div>
            </div>
          
            <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {areas.map((area) => (
                <Link 
                  to={`/area/${encodeURIComponent(area)}`}
                  key={area}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="text-5xl mb-3 transform transition-transform hover:scale-125 duration-300">
                    {areaFlags[area] || areaFlags['Unknown']}
                  </div>
                  <h2 className="text-lg font-bold text-white">{area}</h2>
                  <div className="mt-3 w-12 h-1 bg-indigo-600 mx-auto rounded opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
