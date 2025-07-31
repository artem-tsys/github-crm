import { api } from '@/shared/api/axios';
import type { RegisterDto, AuthResponseDto } from '../model/types';

export async function register(dto: RegisterDto): Promise<AuthResponseDto> {
	const res = await api.post<AuthResponseDto>('/auth/register', dto);
	return res.data;
}
