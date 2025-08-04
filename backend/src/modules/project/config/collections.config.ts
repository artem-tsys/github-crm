import { Project, ProjectSchema } from '../schemas/project.schema';
import { CollectionNames } from "./collections-names.config";

export const MODELS = [
	{
		name: Project.name,
		schema: ProjectSchema,
		collection: CollectionNames.project,
	},
];
