import { message } from 'antd';

export interface FieldError {
  name: string;
  errors: string[];
}

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string | string[];
    };
  };
}

export function handleApiError(e: unknown, defaultMessage: string): FieldError[] | null {
  const err = e as ApiError;
  if (err?.response?.status === 400 && Array.isArray(err?.response?.data?.message)) {
    // validation errors
    return err.response.data?.message.map((msg: string) => {
      const [field] = msg.split(' ');
      return { name: field.toLowerCase(), errors: [msg] };
    });
  }
  message.error(
    typeof err?.response?.data?.message === 'string'
      ? err.response?.data.message
      : defaultMessage
  );
  return null;
}
