import { api } from '@/shared/api/axios';
import type { RegisterDto, User } from '../model/types';

export async function register(dto: RegisterDto): Promise<User> {
	const res = await api.post('/auth/register', dto);
	return res.data;
}
