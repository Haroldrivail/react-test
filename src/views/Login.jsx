import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import MainLayout from '../layouts/MainLayout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  
  // Get the page the user was trying to visit and any context message
  const from = location.state?.from?.pathname || '/';
  const contextMessage = location.state?.message;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      toast.error('Username and password are required');
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate network delay for better UX
    setTimeout(() => {
      // Attempt to login
      const success = login(username, password);
      
      if (success) {
        toast.success(`Welcome back, ${username}!`);
        // Redirect to the page they were trying to visit
        navigate(from, { replace: true });
      } else {
        setError('Invalid login credentials');
        toast.error('Invalid login credentials');
        setIsLoading(false);
      }
    }, 800);
  };
  
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl overflow-hidden p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Login to MealSearch</h2>
          
          {contextMessage && (
            <div className="mb-4 p-3 bg-indigo-500 bg-opacity-20 border border-indigo-500 rounded text-white text-center">
              {contextMessage}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-500 text-center animate-shake">
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
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none input-focus-animation transition-all duration-200 
                  ${focusedField === 'username' 
                    ? 'border-indigo-500 ring-2 ring-indigo-300 ring-opacity-50' 
                    : 'border-gray-600 hover:border-gray-500'}`}
                placeholder="Enter your username"
                disabled={isLoading}
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
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none input-focus-animation transition-all duration-200 
                  ${focusedField === 'password' 
                    ? 'border-indigo-500 ring-2 ring-indigo-300 ring-opacity-50' 
                    : 'border-gray-600 hover:border-gray-500'}`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none button-press transition-all duration-200 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
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
