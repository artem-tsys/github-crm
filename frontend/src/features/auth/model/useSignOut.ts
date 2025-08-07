import { useNavigate } from "react-router-dom";
import { signOut } from "../api/sign-out";
import { useAuth } from "../context/auth-context";

export function useSignOut() {
	const navigate = useNavigate();
	const { setUser } = useAuth();
	
	return async () => {
		try {
			await signOut();
		} finally {
			setUser(null);
			navigate('/sign-in', { replace: true });
		}
	};
}
