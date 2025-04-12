import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Ingredients from './views/Ingredients';
import MealsByIngredient from './views/MealsByIngredient';
import MealDetails from './views/MealDetails';
import Login from './views/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ToastProvider } from './contexts/ToastContext';
import Categories from './views/Categories';
import CategoryMeals from './views/CategoryMeals';
import Areas from './views/Areas';
import AreaMeals from './views/AreaMeals';
import Favorites from './views/Favorites';

function App() {
  return (
        <ToastProvider>
          <AuthProvider>
            <FavoritesProvider>
              <div className="min-h-screen">
                <main className="container mx-auto p-4">
                  <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/ingredients" element={<Ingredients/>}/>
                    <Route path="/ingredient/:ingredient" element={<MealsByIngredient/>}/>
                    <Route 
                      path="/meal/:id" 
                      element={
                        <ProtectedRoute>
                          <MealDetails/>
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/categories" element={<Categories/>}/>
                    <Route path="/category/:category" element={<CategoryMeals/>}/>
                    <Route path="/cuisines" element={<Areas/>}/>
                    <Route path="/area/:area" element={<AreaMeals/>}/>
                    <Route 
                      path="/favorites" 
                      element={
                        <ProtectedRoute>
                          <Favorites/>
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>
              </div>
            </FavoritesProvider>
          </AuthProvider>
        </ToastProvider>
  );
}

export default App;
