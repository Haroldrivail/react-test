import { useNavigate } from 'react-router-dom';

// Ingredient Card component
export default function IngredientCard({ ingredient }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/ingredient/${encodeURIComponent(ingredient.strIngredient)}`);
  };

  return (
    <div 
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <img
          className="w-full h-48 object-contain transform transition-transform duration-500 group-hover:scale-110"
          src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
          alt={ingredient.strIngredient}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = 'https://www.themealdb.com/images/ingredients/placeholder.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
          {ingredient.strIngredient}
        </h2>
        <div className="mt-3 flex items-center text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>View recipes</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}