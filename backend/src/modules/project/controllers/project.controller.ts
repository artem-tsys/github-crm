import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GetUser } from "../../auth/decorators/get-user.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { User } from "../../user/entities/user.entity";
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
		return this.projectService.addProject(dto.path, user);
	}
	
	@Delete(':id')
	async deleteProject(
		@Param('id') id: string,
		@GetUser() user: User
		) {
		return this.projectService.deleteProject(id, user);
	}
	
	@Get(':id/refresh')
	async refreshProject(
		@Param('id') id: string,
		@GetUser() user: User
	) {
		return this.projectService.refreshProject(id, user);
	}
}
