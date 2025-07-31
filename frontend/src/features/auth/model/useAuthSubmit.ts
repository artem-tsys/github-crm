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
      // Якщо є токен — зберігаємо
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
