import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class ProjectRepository {
	constructor(
		@InjectRepository(Project)
		private readonly repo: Repository<Project>
	) {}
	
	async findByOwnerAndName(filter): Promise<Project | null> {
		return this.repo.findOne({ where: filter });
	}
	
	async create(projectData: Partial<Project>, user: User): Promise<Project> {
		const entity = this.repo.create({ ...projectData });
		return this.save(entity);
	}
	
	async save(project: Project): Promise<Project> {
		return this.repo.save(project);
	}
	
	async findAllByUserId(userId: string): Promise<Project[]> {
		return this.repo
			.createQueryBuilder('project')
			.leftJoin('project.users', 'user')
			.where('user.id = :userId', { userId })
			.getMany();
	}
	
	async updateLink(projectId: string, userId: string): Promise<void> {
		const existingIds = await this.repo
			.createQueryBuilder()
			.relation(Project, 'users')
			.of(projectId)
			.loadMany<User>();
		
		if (existingIds.find(u => u.id === userId)) return;
		
		await this.repo
			.createQueryBuilder()
			.relation(Project, 'users')
			.of(projectId)
			.add(userId);
	}
}
