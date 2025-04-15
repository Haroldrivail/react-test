import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingIndicator from './LoadingIndicator';
// Removed useToast import since we don't need it anymore

export default function ProtectedRoute({ children, requiresAuth = true }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Keep the getRouteDescription function as it's still used for the redirect message
  const getRouteDescription = () => {
    const path = location.pathname;
    
    // Extract route type from pathname
    if (path.includes('/meal/')) return 'meal details';
    if (path.includes('/favorites')) return 'favorites';
    return 'this content';
  };
  
  // Removed the useEffect that was showing toast messages
  
  if (isLoading) {
    return <LoadingIndicator />;
  }
  
  if (!user && requiresAuth) {
    // Redirect to login page but save the current location
    return <Navigate to="/login" state={{ 
      from: location,
      message: `Please log in to view ${getRouteDescription()}.`
    }} replace />;
  }
  
  return children;
}
