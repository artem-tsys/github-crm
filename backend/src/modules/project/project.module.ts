import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MODELS } from "./config/collections.config";
import { ProjectController } from "./controllers/project.controller";
import { ProjectRepository } from "./repositories/project.repository";
import { FetchProjectsService } from "./services/fetch-project.service";
import { ProjectService } from "./services/project.service";

@Module({
	imports: [
		MongooseModule.forFeature(MODELS),
		HttpModule,
	],
	controllers: [ProjectController],
	providers: [ProjectService, FetchProjectsService, ProjectRepository],
	exports: [ProjectService],
})
export class ProjectModule {}
