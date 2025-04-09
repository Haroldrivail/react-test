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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Cuisines of the World</h1>
        
        {error && (
          <div className="text-center text-red-500 font-bold mb-4 p-2 rounded border border-red-300 bg-red-50">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {areas.map((area) => (
              <Link 
                to={`/area/${encodeURIComponent(area)}`}
                key={area}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 text-center transition-transform hover:scale-105"
              >
                <div className="text-4xl mb-2">
                  {areaFlags[area] || areaFlags['Unknown']}
                </div>
                <h2 className="text-xl font-bold text-white">{area}</h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
