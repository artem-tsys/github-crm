import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { ProjectEntity } from "../entities/project.entity";
import { Project, ProjectDocument } from "../schemas/project.schema";

/**
 * Repository for managing Project entities and their relations to users.
 */
@Injectable()
export class ProjectRepository {
	constructor(
		@InjectModel(Project.name)
		private readonly projectModel: Model<ProjectDocument>,
	) {}
	
	/**
	 * Finds a single project by given filter.
	 * @param filter Mongoose filter (e.g. _id, owner+name)
	 * @returns Project or null
	 */
	async findBy(filter: FilterQuery<ProjectDocument>): Promise<ProjectDocument | null> {
		return this.projectModel.findOne(filter);
	}
	
	/**
	 * Creates a new project or returns existing one.
	 * Links the same project to multiple users without duplication.
	 * @param projectData Basic project data
	 * @returns Created or existing project
	 */
	async create(projectData): Promise<ProjectDocument | null> {
		return this.projectModel.findOneAndUpdate({
				owner: projectData.owner,
				name: projectData.name
			},
			projectData,
			{
				new: true,
				upsert: true
			});
	}
	
	/**
	 * Finds all projects linked to a user by user ID.
	 * @param userId User ID
	 * @returns Array of projects
	 */
	async findAllByUserId(userId: string): Promise<Project[]> {
		try {
			return this.projectModel.find({ userIds: userId })
		} catch (err) {
			console.error(err);
			return []
		}
	}
	
	/**
	 * Updates project data (e.g. GitHub stats).
	 * @param project Project data with ID
	 * @throws NotFoundException if project doesn't exist
	 * @returns Updated project
	 */
	async update(project: ProjectEntity): Promise<Project> {
		const updated = await this.projectModel.findByIdAndUpdate(
			project.id,
			project,
			{ new: true }
		)
		
		if (!updated) {
			throw new NotFoundException(`Project ${project.id} not found`);
		}
		return updated;
	}
	
	/**
	 * Adds a user ID to project.userIds (many-to-many).
	 * @param projectId Project ID
	 * @param userId User ID to link
	 * @throws NotFoundException if project not found
	 * @returns Updated project
	 */
	async updateLink(projectId: string, userId: string): Promise<Project> {
		const updated = await this.projectModel.findByIdAndUpdate(
			projectId,
			{ $addToSet: { userIds: userId } }
		)

		if (!updated) {
			throw new NotFoundException(`Project ${projectId} not found`);
		}
		return updated;
	}
	
	/**
	 * Unlinks a user from project. If no users left — deletes the project.
	 * @param projectId Project ID
	 * @param userId User ID to unlink
	 */
	async delete(projectId: string, userId: string): Promise<void> {
		const res = await this.projectModel.findOneAndUpdate(
			{ _id: projectId },
			{ $pull: { userIds: userId } },
			{ new: true },
		).exec();

		if (res?.userIds.length === 0) {
			await this.projectModel.deleteOne({ _id: projectId });
		}
	}
}
