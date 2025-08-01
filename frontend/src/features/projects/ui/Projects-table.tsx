import { Table } from 'antd';
import { useState } from "react";
import type { Project } from '../model/types';
import { getProjectColumns } from "./table-columns";

interface Props {
	projects: Project[];
	onDelete: (id: string) => void;
	onRefresh: (id: string) => void;
}

export const ProjectsTable = ({ projects, onDelete, onRefresh }: Props) => {
	const [loadingId, setLoadingId] = useState<string | null>(null);
	
	const handleRefresh = async (id: string) => {
		setLoadingId(id);
		try {
			await onRefresh(id);
		} catch (e) {
			console.error(e);
		} finally {
			setLoadingId(null);
		}
	};
	
	const handleDelete = async (id: string) => {
		setLoadingId(id);
		try {
			await onDelete(id);
		} catch (e) {
			console.error(e);
		} finally {
			setLoadingId(null);
		}
	};
	
	const columns = getProjectColumns({
		onDelete: handleDelete,
		onRefresh: handleRefresh,
		loadingId,
	});
	
	return <Table rowKey="id" dataSource={projects} columns={columns} />;
};
