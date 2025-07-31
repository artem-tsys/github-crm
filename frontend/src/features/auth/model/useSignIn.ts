import { useAuthSubmit } from './useAuthSubmit';
import { signIn } from '../api/sign-in';
import type { SignInDto, AuthResponseDto } from './types';

export const useSignIn = () =>
  useAuthSubmit<SignInDto, AuthResponseDto>(signIn, '/projects');
