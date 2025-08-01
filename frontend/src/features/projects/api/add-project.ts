import { api } from '@/shared/api/axios';
import type { Project } from '../model/types';

/**
 * Створює проєкт за GitHub шляхом `owner/repo`.
 * Сервер витягує всі дані з GitHub API.
 */
export async function addProject(path: string): Promise<Project> {
	const response = await api.post<Project>('/projects', { path });
	return response.data;
}
