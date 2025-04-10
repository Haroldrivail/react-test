import { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  
  // Check for existing user in localStorage on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - in a real app, this would validate credentials with a backend
  const login = (username, password) => {
    // Simulate authentication - in a real app this would be an API call
    if (username && password) {
      // Create a mock user object
      const newUser = {
        id: Date.now().toString(),
        username,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        isAuthenticated: true
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };
  
  // Logout function
  const logout = () => {
    if (user) {
      toast.info(`Goodbye, ${user.name}!`, 2000);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  // Value to be provided by the context
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
