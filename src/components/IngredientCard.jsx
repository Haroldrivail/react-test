import { useNavigate } from 'react-router-dom';

// Ingredient Card component
export default function IngredientCard({ ingredient }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/ingredient/${encodeURIComponent(ingredient.strIngredient)}`);
  };

  return (
    <div 
      className="max-w-sm w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden mx-auto cursor-pointer transition-transform hover:scale-105 flex items-center justify-center m-4"
      onClick={handleClick}
    >
      <img
        className="w-full h-30 object-contain rounded-t-lg"
        src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
        alt={ingredient.strIngredient}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = 'https://www.themealdb.com/images/ingredients/placeholder.png';
        }}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white">{ingredient.strIngredient}</h2>
      </div>
    </div>
  )
}