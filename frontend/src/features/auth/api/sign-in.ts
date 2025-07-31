import { api } from '@/shared/api/axios';
import type { SignInDto, AuthResponseDto } from '../model/types';

export async function signIn(dto: SignInDto): Promise<AuthResponseDto> {
	const res = await api.post('/auth/sign-in', dto);
	return res.data;
}
