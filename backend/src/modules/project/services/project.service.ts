import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { User } from "../../user/entities/user.entity";
import { Project } from '../entities/project.entity';
import { ProjectRepository } from "../repositories/project.repository";
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
	
	private parsePath(path: string): { owner: string; name: string } {
		const [owner, name] = path.split('/');
		if (!owner || !name) {
			throw new BadRequestException('Invalid path format. Expected: owner/repo');
		}
		return { owner, name };
	}

/**
 * Adds a new project or updates an existing one for the user.
 * @param path Project path in owner/repo format
 * @param user User
 * @returns Added or updated project
 */
	async addProject(path: string, user: User): Promise<Project> {
		const filter = this.parsePath(path);
		let project = await this.projectRepository.findBy(filter);
		if(project) {
			this.updateProject(project, user).catch(err => {
				console.error(err); // todo: change to logger
			});
			return project;
		}
		return await this.createNewProject(filter, user);
	}
	
	/**
	 * Refreshes project data from GitHub for the given project ID.
	 * The project must be linked to the user.
	 * @param id Project ID
	 * @param user User
	 * @returns Updated project
	 * @throws NotFoundException if the project doesn't exist
	 * @throws ForbiddenException if the project is not linked to the user
	 */
	async refreshProject(id: string, user: User): Promise<Project> {
		const project = await this.projectRepository.findBy({ id });
		if (!project) throw new NotFoundException('Project not found');
		
		const isLinked = await this.projectRepository.isLinkedToUser(project.id, user.id);
		if (!isLinked) throw new ForbiddenException('You do not have access to this project');
		
		return this.updateProject(project, user);
	}

/**
 * Updates project data from GitHub and links it to the user.
 * @param project Project
 * @param user User
 * @returns Updated project
 * @throws NotFoundException if the repository is not found
 */
	async updateProject(project: Project, user: User): Promise<Project> {
		const data = await this.fetchProjectsService.fetchData(project.owner, project.name);
		if (!data) throw new NotFoundException('GitHub repository not found');
		
		project.url = data.url;
		project.stars = data.stars;
		project.forks = data.forks;
		project.issues = data.issues;
		
		const updatedProject = await this.projectRepository.save(project);
		await this.projectRepository.updateLink(project.id, user.id);
		
		return updatedProject;
	}

/**
 * Creates a new project and links it to the user.
 * @param filter owner and name
 * @param user User
 * @returns Created project
 * @throws NotFoundException if the repository is not found
 */
	async createNewProject(filter, user) {
		const data = await this.fetchProjectsService.fetchData(filter.owner, filter.name);
		if (!data) throw new NotFoundException('GitHub repository not found');
		
		const project = await this.projectRepository.create(data);
		await this.projectRepository.updateLink(project.id, user.id);
		
		return project;
	}

/**
 * Returns all projects of the user.
 * @param user User
 * @returns Array of projects
 */
	async getProjects(user: User) {
		return await this.projectRepository.findAllByUserId(user.id);
	}
	
	/**
	 * Deletes a project for the user.
	 * If the project is linked to multiple users, only the relation is removed.
	 * If it's linked only to the current user, the project is deleted entirely.
	 * @param id Project ID
	 * @param user User
	 * @throws NotFoundException if project not found or not accessible
	 */
	async deleteProject(id: string, user: User): Promise<void> {
		const project = await this.projectRepository.findBy({ id });
		if (!project) throw new NotFoundException('Project not found');
		
		const isLinked = await this.projectRepository.isLinkedToUser(id, user.id);
		if (!isLinked) throw new NotFoundException('Project not linked to current user');
		
		const totalLinks = await this.projectRepository.countLinks(id);
		
		if (totalLinks > 1) {
			await this.projectRepository.removeLink(id, user.id);
		} else {
			await this.projectRepository.delete(id);
		}
	}
}
