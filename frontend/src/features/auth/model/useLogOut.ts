import { useNavigate } from "react-router-dom";

export function useLogout() {
	const navigate = useNavigate();
	
	return () => {
		localStorage.removeItem('access_token');
		navigate('/sign-in', { replace: true });
	};
}
