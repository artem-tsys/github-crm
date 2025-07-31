import { useAuthSubmit } from './useAuthSubmit';
import { signIn } from '../api/sign-in';
import type { SignInDto, AuthResponseDto } from './types';

/**
 * useSignIn hook
 *
 * Handles user sign-in logic:
 * - Calls signIn API and processes response
 * - On success, stores JWT token in localStorage and redirects to /projects
 * - Returns submit handler, error state, and loading state for UI integration
 * - Errors are mapped for Ant Design forms via useAuthSubmit
 * - No global auth context is used; token is managed locally for simplicity
 * - Designed for use in LoginForm and similar authentication flows
 */

export const useSignIn = () =>
  useAuthSubmit<SignInDto, AuthResponseDto>(signIn, '/projects');
