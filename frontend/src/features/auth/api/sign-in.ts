import { api } from '@/shared/api/axios';
import type { SignInDto, User } from '../model/types';

export async function signIn(dto: SignInDto): Promise<User> {
	const res = await api.post('/auth/sign-in', dto);
	return res.data;
}
