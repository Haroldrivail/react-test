# MealSearch

![MealSearch Logo](public/vite.svg)

## 🍽️ About The Project

MealSearch is a React-based web application that allows users to discover and explore recipes from all around the world. The application provides an intuitive interface for searching recipes, browsing by categories, cuisines, or ingredients, and saving your favorite meals.

### ✨ Features

- **Recipe Search**: Search through thousands of recipes based on meal names
- **Browse Categories**: Explore recipes by categories (breakfast, dessert, vegetarian, etc.)
- **Global Cuisines**: Discover authentic dishes from different countries and regions
- **Ingredient Explorer**: Find recipes based on specific ingredients
- **User Authentication**: Create an account to access personalized features
- **Favorites Collection**: Save your favorite recipes for quick access
- **Responsive Design**: Enjoy a seamless experience across all device sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Haroldrivail/react-test.git
   cd react-test
   ```

2. Install dependencies
   ```sh
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   VITE_API_BASE_URL=https://www.themealdb.com/api/json/v1/1
   ```

4. Start the development server
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- [React](https://reactjs.org/) - UI library
- [React Router](https://reactrouter.com/) - Routing
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TheMealDB API](https://www.themealdb.com/api.php) - Recipe data

## 📱 Screenshots

*Coming soon*

## 📚 Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── contexts/       # React context providers
  ├── layouts/        # Layout components 
  ├── utils/          # Utility functions
  ├── views/          # Page components
  ├── App.jsx         # Main application component
  └── main.jsx        # Application entry point
```

## 🔄 API Integration

This project uses TheMealDB API to fetch recipe data. The API provides:
- Random meals
- Search by name
- Filter by category
- Filter by area (cuisine)
- Filter by ingredients
- Lookup full meal details by ID

## 🚧 Roadmap

- [ ] Implement recipe rating system
- [ ] Add meal planning functionality
- [ ] Enable social sharing

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Harold Dongmo - [harold.dongmo@example.com](mailto:dongrold@gmail.com)

Project Link: [https://github.com/Haroldrivail/react-test](https://github.com/Haroldrivail/react-test)

---

<sub>This project is powered by [TheMealDB](https://www.themealdb.com/), an open, crowd-sourced database of recipes from around the world.</sub>
