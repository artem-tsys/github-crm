import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from "../../features/auth/context/auth-context";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { user, loading } = useAuth();
	if (loading) return null;

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return <>{children}</>;
};
