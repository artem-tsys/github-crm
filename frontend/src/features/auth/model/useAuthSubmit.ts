import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@/shared/api/handleApiError';
import type { FieldError } from '@/shared/api/handleApiError';

interface UseAuthSubmitResult<TDto, TResponse> {
  submit: (dto: TDto) => Promise<void>;
  data: TResponse | null;
  errors: FieldError[] | null;
  isSubmitting: boolean;
}

/**
 * useAuthSubmit
 *
 * Universal hook for handling authentication form submission (login/register).
 *
 * Features:
 * - Accepts API function and redirect path as arguments for flexibility.
 * - Manages loading state, error state, and response data.
 * - Maps server-side errors for Ant Design forms via handleApiError.
 * - Stores JWT token in localStorage if present in response (note: XSS risk).
 * - Automatically redirects on success.
 * - Errors are reset on new submit for better UX.
 * - Designed for use in LoginForm, RegisterForm, and similar flows.
 *
 * @template TDto - DTO type for API call
 * @template TResponse - Response type from API
 * @param apiFn - API function to call (login/register)
 * @param redirectPath - Path to redirect on success
 * @returns Object with submit handler, data, errors, and loading state
 */
export function useAuthSubmit<TDto, TResponse>(
  apiFn: (dto: TDto) => Promise<TResponse>,
  redirectPath: string
): UseAuthSubmitResult<TDto, TResponse> {
  const navigate = useNavigate();
  const [data, setData] = useState<TResponse | null>(null);
  const [errors, setErrors] = useState<FieldError[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(async (dto: TDto) => {
    setIsSubmitting(true);
    setErrors(null);
    try {
      const response = await apiFn(dto);
      setData(response);
      // Store JWT token if present in response
      if ((response as any).access_token) {
        localStorage.setItem('access_token', (response as any).access_token);
      }
      navigate(redirectPath);
    } catch (e) {
      const err = handleApiError(e, 'Auth failed');
      setErrors(err);
    } finally {
      setIsSubmitting(false);
    }
  }, [apiFn, redirectPath, navigate]);

  return { submit, data, errors, isSubmitting };
}
