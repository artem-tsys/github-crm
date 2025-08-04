import { plainToInstance } from 'class-transformer';
import { ProjectDto } from "../dtos/project.dto";
import { ProjectEntity } from "../entities/project.entity";
import { ProjectDocument } from "../schemas/project.schema";

export class ProjectMapper {
  static toEntity(projectDocument: ProjectDocument): ProjectEntity {
    return plainToInstance(ProjectEntity, projectDocument.toJSON(), {
      excludeExtraneousValues: true,
    });
  }

  static toDto(entity: ProjectEntity): ProjectDto {
    return plainToInstance(ProjectDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
