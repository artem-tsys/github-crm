import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectController } from "./controllers/project.controller";
import { Project } from "./entities/project.entity";
import { ProjectRepository } from "./repositories/project.repository";
import { FetchProjectsService } from "./services/fetch-project.service";
import { ProjectService } from "./services/project.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Project]),
		HttpModule,
	],
	controllers: [ProjectController],
	providers: [ProjectService, FetchProjectsService, ProjectRepository],
	exports: [ProjectService],
})
export class ProjectModule {}
