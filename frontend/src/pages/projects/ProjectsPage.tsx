import { useProjects } from "../../features/projects/model/useProjects";
import { AddProjectForm } from "../../features/projects/ui/Add-project-form";
import { ProjectsTable } from "../../features/projects/ui/Projects-table";
import { Typography, Card, Alert, Spin } from 'antd';
import styles from "./project-page.module.scss";

const { Title } = Typography;

export const ProjectsPage = () => {
	const { projects, loading, error, deleteOne, refreshOne, refetch } = useProjects();
	
	return (
		<div className={styles.page}>
			<Card className={styles.card} bordered={false}>
				<Title level={2}>Your GitHub Projects</Title>
				
				<AddProjectForm onSuccess={refetch} />
				
				{loading && (
					<div className={styles.centered}>
						<Spin size="large" />
					</div>
				)}
				
				{error && (
					<Alert
						type="error"
						message="Failed to load projects"
						description={error}
						showIcon
						className={styles.alert}
					/>
				)}
				
				{!loading && !error && (
					<ProjectsTable
						projects={projects}
						onDelete={deleteOne}
						onRefresh={refreshOne}
					/>
				)}
			</Card>
		</div>
	);
};
