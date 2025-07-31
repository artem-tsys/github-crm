import { useAuthSubmit } from './useAuthSubmit';
import { register } from '../api/register';
import type { RegisterDto, AuthResponseDto } from './types';

export const useRegister = () =>
  useAuthSubmit<RegisterDto, AuthResponseDto>(register, '/projects');
