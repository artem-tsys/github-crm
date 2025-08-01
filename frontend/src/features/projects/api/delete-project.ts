import { api } from '@/shared/api/axios';

export async function deleteProject(id: string): Promise<void> {
	await api.delete(`/projects/${id}`);
}
