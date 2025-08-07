import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth-context";

export function useAuthCheck() {
  const navigate = useNavigate();
	const { user, loading } = useAuth();
	
	useEffect(() => {
		if (!loading && user) {
			navigate('/projects');
		}
	}, [user, loading, navigate]);
}
