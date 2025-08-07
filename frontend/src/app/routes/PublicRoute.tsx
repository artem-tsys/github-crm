import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from "../../features/auth/context/auth-context";

interface PublicRouteProps {
	children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
	const { user, loading } = useAuth();
	if (loading) return null;

	if (user) {
		return <Navigate to="/projects" replace />;
	}
	return <>{children}</>;
};
