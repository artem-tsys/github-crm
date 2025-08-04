import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from "../../auth/decorators/get-user.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { User } from "../../user/entities/user.entity";
import { ProjectMapper } from "../mappers/project.mapper";
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dtos/create-project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}
	
	@Get()
	async getProjects(
		@GetUser() user: User
		) {
		return await this.projectService.getProjects(user);
	}
	
	@Post()
	async addProject(
		@Body() dto: CreateProjectDto,
		@GetUser() user: User
		) {
		const project = await this.projectService.addProject(dto.path, user);
		if (!project) {
			return null;
		}
	
		return ProjectMapper.toDto(project);
	}
	
	@Delete(':id')
	async deleteProject(
		@Param('id') id: string,
		@GetUser() user: User
		) {
		
		await this.projectService.deleteProject(id, user);
		return {
			ok: true
		}
	}
	
	@Get(':id/refresh')
	async refreshProject(
		@Param('id') id: string,
		@GetUser() user: User
	) {
		return this.projectService.refreshProject(id, user);
	}
}
