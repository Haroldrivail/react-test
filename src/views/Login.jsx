import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page the user was trying to visit
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }
    
    // Attempt to login
    const success = login(username, password);
    
    if (success) {
      // Redirect to the page they were trying to visit
      navigate(from, { replace: true });
    } else {
      setError('Invalid login credentials');
    }
  };
  
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl overflow-hidden p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Login to MealSearch</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-500 text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                placeholder="Enter your username"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Sign In
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-gray-400">
            <p>This is a simulation. Use any username and password to login.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
