import React from 'react';
import { Navigate } from 'react-router-dom';
// Update the import path below if your AuthContext is located elsewhere
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Optionally show a loading spinner while checking auth
    return <div>Loading...</div>;
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;