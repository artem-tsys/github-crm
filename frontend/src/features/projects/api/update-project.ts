import { api } from '@/shared/api/axios';
import type { Project } from '../model/types';

export async function updateProject(id: string): Promise<Project> {
	const res = await api.get(`/projects/${id}/refresh`);
	return res.data;
}
