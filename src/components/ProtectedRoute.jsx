import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingIndicator from './LoadingIndicator';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <LoadingIndicator />;
  }
  
  if (!user) {
    // Redirect to the login page, but save the current location they were
    // trying to go to when they were redirected
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}
