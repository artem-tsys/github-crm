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
	 * Finds a project by any filter criteria (e.g. id, owner + name).
	 * @param filter Partial project fields to match
	 * @returns Project or null if not found
	 */
	async findBy(filter: Partial<Project>): Promise<Project | null> {
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
	
	/**
	 * Checks whether a project is linked to the given user.
	 * @param projectId Project ID
	 * @param userId User ID
	 * @returns True if the user is linked to the project
	 */
	async isLinkedToUser(projectId: string, userId: string): Promise<boolean> {
		const users = await this.repo
			.createQueryBuilder()
			.relation(Project, 'users')
			.of(projectId)
			.loadMany<User>();
		return users.some(user => user.id === userId);
	}
	
	/**
	 * Counts how many users are linked to the project.
	 * @param projectId Project ID
	 * @returns Number of users linked to the project
	 */
	async countLinks(projectId: string): Promise<number> {
		const users = await this.repo
			.createQueryBuilder()
			.relation(Project, 'users')
			.of(projectId)
			.loadMany<User>();
		return users.length;
	}
	
	/**
	 * Removes the relation between a project and a user.
	 * Does not delete the project entity itself.
	 * @param projectId Project ID
	 * @param userId User ID
	 */
	async removeLink(projectId: string, userId: string): Promise<void> {
		await this.repo
			.createQueryBuilder()
			.relation(Project, 'users')
			.of(projectId)
			.remove(userId);
	}
	
	/**
	 * Deletes a project entity by ID.
	 * This does not consider user relations; use only if project has no other owners.
	 * @param id Project ID
	 */
	async delete(id: string): Promise<void> {
		await this.repo.delete(id);
	}
}
