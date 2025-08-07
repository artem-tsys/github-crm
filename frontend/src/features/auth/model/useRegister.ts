import { useAuthSubmit } from './useAuthSubmit';
import { register } from '../api/register';
import type { RegisterDto, User } from './types';

export const useRegister = () =>
  useAuthSubmit<RegisterDto, User>(register, '/projects');
