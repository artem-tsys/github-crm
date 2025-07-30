import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from "../../user/entities/user.entity";
import { Project } from '../entities/project.entity';
import { ProjectRepository } from "../repositories/project.repository";
import { FetchProjectsService } from '../services/fetch-project.service';

@Injectable()
export class ProjectService {
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
	
	async addProject(path: string, user: User): Promise<Project> {
		const filter = this.parsePath(path);
		let project = await this.projectRepository.findByOwnerAndName(filter);
		if(project) {
			this.updateProject(project, user).catch(err => {
				console.error(err); // todo: change to logger
			});
			return project;
		}
		
		return await this.createNewProject(filter, user);
	}
	
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
	
	async createNewProject(filter, user) {
		const data = await this.fetchProjectsService.fetchData(filter.owner, filter.name);
		if (!data) throw new NotFoundException('GitHub repository not found');
		
		const project = await this.projectRepository.create(data, user);
		await this.projectRepository.updateLink(project.id, user.id);
		
		return project;
	}
	
	async getProjects(user: User) {
		return await this.projectRepository.findAllByUserId(user.id);
	}
}
