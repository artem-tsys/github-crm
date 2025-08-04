import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { instanceToPlain } from "class-transformer";
import { User } from "../../user/entities/user.entity";
import { ProjectEntity } from '../entities/project.entity';
import { ProjectMapper } from "../mappers/project.mapper";
import { ProjectRepository } from "../repositories/project.repository";
import { Project } from "../schemas/project.schema";
import { FetchProjectsService } from '../services/fetch-project.service';

/**
 * Service for managing user projects.
 * Add, update, and read information about GitHub projects.
 */
@Injectable()
export class ProjectService {
/**
 * @param projectRepository Project repository
 * @param fetchProjectsService Service for fetching data from GitHub
 */
	constructor(
		private readonly projectRepository: ProjectRepository,
		private readonly fetchProjectsService: FetchProjectsService,
	) {}
	
	/**
	 * Parses input path string like 'owner/repo' into object.
	 * @throws BadRequestException if invalid format
	 */
	private parsePath(path: string): { owner: string; name: string } {
		const [owner, name] = path.split('/');
		if (!owner || !name) {
			throw new BadRequestException('Invalid path format. Expected: owner/repo');
		}
		return { owner, name };
	}
	
	/**
	 * Updates project data (stars, forks, issues...) from GitHub.
	 * @param project Project to update
	 * @returns Updated project
	 * @throws NotFoundException if GitHub repo not found
	 */
	private async updateProject(project: ProjectEntity): Promise<Project> {
		const data = await this.fetchProjectsService.fetchData(project.owner, project.name);
		if (!data) throw new NotFoundException('GitHub repository not found');

		project.url = data.url;
		project.stars = data.stars;
		project.forks = data.forks;
		project.issues = data.issues;
		
		return await this.projectRepository.update(project);
	}
	
	/**
	 * Adds a new project or reuses existing one and links it to the user.
	 * Always refreshes GitHub metadata.
	 * @param path Path like 'owner/repo'
	 * @param user Authenticated user
	 * @returns Linked project as entity
	 */
	public async addProject(path: string, user: User): Promise<ProjectEntity | null> {
		const filter = this.parsePath(path);
		const data = await this.fetchProjectsService.fetchData(filter.owner, filter.name);
		if (!data) throw new NotFoundException('GitHub repository not found');

		const plainData = instanceToPlain({ ...data });
		const project = await this.projectRepository.create(plainData);

		if(project) {
			const projectEntity = ProjectMapper.toEntity(project);
			await this.projectRepository.updateLink(projectEntity.id, user.id);
			return projectEntity;
		}
		return null;
	}
	
	/**
	 * Refreshes a specific project with the latest data from GitHub.
	 * @param projectId Project ID
	 * @param user Authenticated user
	 * @returns Updated project
	 * @throws NotFoundException if project does not exist
	 */
	public async refreshProject(projectId: string, user: User): Promise<Project> {
		const project = await this.projectRepository.findBy({ _id: projectId });
		if (!project) throw new NotFoundException('Project not found');
		
		return await this.updateProject(ProjectMapper.toEntity(project));
	}
	
	/**
	 * Lists all projects linked to the user.
	 * @param user Authenticated user
	 */
	public async getProjects(user: User) {
		return await this.projectRepository.findAllByUserId(user.id);
	}
	
	/**
	 * Removes the user's link to the project.
	 * If the user is the last one — deletes the project completely.
	 * @param id Project ID
	 * @param user Authenticated user
	 */
	public async deleteProject(id: string, user: User): Promise<void> {
		await this.projectRepository.delete(id, user.id);
	}
}
