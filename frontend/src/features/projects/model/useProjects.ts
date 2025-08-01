import { useEffect, useState, useCallback } from 'react';
import { getProjects } from '../api/get-projects';
import { deleteProject } from '../api/delete-project';
import { updateProject } from '../api/update-project';
import type { Project } from '../model/types';

export function useProjects() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	
	const fetchProjects = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getProjects();
			if(Array.isArray(data) && data.length) {
				setProjects(data);
			}
		} catch (e: any) {
			setError(e.message ?? 'Failed to load projects');
		} finally {
			setLoading(false);
		}
	}, []);
	
	const deleteOne = useCallback(async (id: string) => {
		await deleteProject(id);
		setProjects(prev => prev.filter(project => project.id !== id));
	}, [fetchProjects]);
	
	const refreshOne = useCallback(async (id: string) => {
		const newProject = await updateProject(id);
		setProjects(prev => prev.map(project => (project.id === id ? newProject : project)));
	}, [fetchProjects]);
	
	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);
	
	return {
		projects,
		loading,
		error,
		refreshOne,
		deleteOne,
		refetch: fetchProjects,
	};
}
