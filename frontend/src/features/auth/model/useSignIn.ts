import { useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { useAuthSubmit } from './useAuthSubmit';
import { signIn } from '../api/sign-in';
import type { SignInDto, User } from './types';

/**
 * useSignIn hook
 *
 * Handles user sign-in logic:
 * - Calls the signIn API and processes the response
 * - On successful login, calls refetchUser() from AuthContext to update the global user state
 * - Automatically redirects to /projects after login
 * - Returns the submit handler, error state, and loading state for UI integration (e.g. with Ant Design forms)
 * - Server-side validation errors are mapped via handleApiError
 * - All logic is encapsulated in the hook to ensure separation of concerns
 *
 * Intended for use in login forms such as LoginForm
 */
export const useSignIn = () => {
	const { refetchUser } = useAuth();
	
	const submitState = useAuthSubmit<SignInDto, User>(signIn, '/projects');
	
	useEffect(() => {
		if (submitState.data) {
			refetchUser(); // ⬅️ викликаємо, коли login вдався
		}
	}, [submitState.data, refetchUser]);
	
	return submitState;
};
