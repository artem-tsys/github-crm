import { Expose, Type } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsString } from "class-validator";

export class ProjectDto {
	@Expose()
	@IsDefined()
	id: string;
	
	@Expose()
	@IsString()
	owner: string;
	
	@Expose()
	@IsString()
	name: string;

	@Expose()
	@IsString()
	url: string;
	
	@Expose()
	@IsNumber()
	stars: number;
	
	@Expose()
	@IsNumber()
	forks: number;
	
	@Expose()
	@IsNumber()
	issues: number;
	
	@Expose()
	@Type(() => Date)
	@IsDate()
	createdAt: Date;
}
