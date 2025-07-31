import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }
  return <>{children}</>;
};
