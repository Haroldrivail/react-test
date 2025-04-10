import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900 min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1556909114-44e3e70034e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"}}
        ></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden p-8 transform transition-all duration-300 hover:shadow-indigo-500/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-300">Sign in to access your favorite recipes</p>
              
              <div className="flex items-center justify-center my-6">
                <div className="h-px bg-gray-700 w-full"></div>
                <div className="text-gray-400 px-4">MealSearch</div>
                <div className="h-px bg-gray-700 w-full"></div>
              </div>
            </div>
            
            {contextMessage && (
              <div className="mb-6 p-4 bg-indigo-500 bg-opacity-20 border border-indigo-500 rounded-lg text-white text-center animate-pulse">
                {contextMessage}
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-center animate-shake">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none input-focus-animation transition-all duration-200 
                    ${focusedField === 'username' 
                      ? 'border-indigo-500 ring-2 ring-indigo-300 ring-opacity-50' 
                      : 'border-gray-600 hover:border-gray-500'}`}
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none input-focus-animation transition-all duration-200 
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
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium focus:outline-none button-press transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
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

              <div className="text-center mt-4">
                <Link to="/" className="text-indigo-400 hover:text-indigo-300 text-sm">
                  Forgot your password?
                </Link>
              </div>
            </form>
            
            <div className="mt-8 text-center text-gray-400 border-t border-gray-700 pt-6">
              <p>This is a demonstration. Use any username and password to login.</p>
              <p className="mt-4 text-sm">
                Don't have an account? <Link to="/" className="text-indigo-400 hover:text-indigo-300">Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
