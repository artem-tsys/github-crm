import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
}
