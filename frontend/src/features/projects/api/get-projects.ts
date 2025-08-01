import { api } from '@/shared/api/axios';
import type { Project } from '../model/types';

export async function getProjects(): Promise<Project[]> {
	const res = await api.get('/projects');
	return res.data;
}
