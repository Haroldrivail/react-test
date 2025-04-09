// Helper function to retry failed fetch requests
export const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.warn(`Fetch attempt ${i + 1} failed. Retrying in ${delay}ms...`, error);
      lastError = error;
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      // Increase delay for next retry (exponential backoff)
      delay *= 2;
    }
  }
  
  // If all retries fail, throw the last error
  throw lastError;
};

// Add a simple in-memory cache for API requests
const apiCache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export const fetchWithCache = async (url, forceRefresh = false) => {
  const now = Date.now();
  const cacheKey = url;
  
  // Return cached data if available and not expired
  if (!forceRefresh && apiCache.has(cacheKey)) {
    const cachedData = apiCache.get(cacheKey);
    if (now - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }
  }
  
  // If not in cache or cache expired, fetch new data
  const data = await fetchWithRetry(url);
  
  // Store in cache
  apiCache.set(cacheKey, {
    data,
    timestamp: now
  });
  
  return data;
};

// Get full ingredient details including description
export const getIngredientDetails = async (ingredientName, apiBaseUrl) => {
  try {
    // First, get the list of all ingredients to find the matching one with full details
    const data = await fetchWithCache(`${apiBaseUrl}list.php?i=list`);
    
    if (data?.meals) {
      // Find the ingredient with matching name (case-insensitive)
      const matchedIngredient = data.meals.find(
        item => item.strIngredient.toLowerCase() === ingredientName.toLowerCase()
      );
      
      if (matchedIngredient) {
        // We have found a match, try to fetch additional details if available
        // For TheMealDB, we can use the lookup endpoint
        try {
          // The API doesn't have a direct ingredient lookup, so we'll enhance the matched ingredient
          return {
            ...matchedIngredient,
            strDescription: matchedIngredient.strDescription || 
              `${matchedIngredient.strIngredient} is a common ingredient used in various cuisines.`
          };
        } catch (lookupError) {
          console.warn("Could not fetch additional ingredient details:", lookupError);
          return matchedIngredient;
        }
      }
    }
    
    // If no match is found, return a basic object with the ingredient name
    return {
      strIngredient: ingredientName,
      strDescription: `${ingredientName} is a culinary ingredient used in various recipes.`
    };
  } catch (error) {
    console.error("Error fetching ingredient details:", error);
    // Return basic info if we can't fetch details
    return {
      strIngredient: ingredientName,
      strDescription: `${ingredientName} is a culinary ingredient.`
    };
  }
};
