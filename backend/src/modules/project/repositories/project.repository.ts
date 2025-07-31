import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { User } from '../../user/entities/user.entity';

/**
 * Repository for managing Project entities and their relations to users.
 */
@Injectable()
export class ProjectRepository {
	/**
	 * @param repo TypeORM repository for Project entity
	 */
	constructor(
		@InjectRepository(Project)
		private readonly repo: Repository<Project>
	) {}
	
	/**
	 * Finds a project by owner and name.
	 * @param filter Object with owner and name
	 * @returns Project or null if not found
	 */
	async findByOwnerAndName(filter): Promise<Project | null> {
		return this.repo.findOne({ where: filter });
	}
	
	/**
	 * Creates a new project entity.
	 * @param projectData Partial project data
	 * @returns Created project
	 */
	async create(projectData: Partial<Project>): Promise<Project> {
		const entity = this.repo.create({ ...projectData });
		return this.save(entity);
	}
	
	/**
	 * Saves a project entity to the database.
	 * @param project Project entity
	 * @returns Saved project
	 */
	async save(project: Project): Promise<Project> {
		return this.repo.save(project);
	}
	
	/**
	 * Finds all projects linked to a user by user ID.
	 * @param userId User ID
	 * @returns Array of projects
	 */
	async findAllByUserId(userId: string): Promise<Project[]> {
		return this.repo
			.createQueryBuilder('project')
			.leftJoin('project.users', 'user')
			.where('user.id = :userId', { userId })
			.getMany();
	}
	
	/**
	 * Links a project to a user if not already linked.
	 * @param projectId Project ID
	 * @param userId User ID
	 */
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
