import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CollectionNames } from "../config/collections-names.config";

export type ProjectDocument = HydratedDocument<Project>;

@Schema({
	timestamps: false,
	collection: CollectionNames.project,
	toJSON: {
		virtuals: true,
		versionKey: false,
		flattenObjectIds: true,
	},
})
export class Project {
	@Prop({ required: true })
	owner: string;
	
	@Prop({ required: true })
	name: string;
	
	@Prop({ required: true })
	url: string;
	
	@Prop({ required: true })
	stars: number;
	
	@Prop({ required: true })
	forks: number;
	
	@Prop({ required: true })
	issues: number;
	
	@Prop({ required: true })
	createdAt: number;
	
	@Prop({ default: () => Date.now() })
	addedAt: Date;
	
	@Prop({ type: [String], default: [] })
	userIds: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.index({ owner: 1, name: 1 })
ProjectSchema.index({ userId: 1})
