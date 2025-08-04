import { Expose } from 'class-transformer';

export class ProjectEntity {
	@Expose({ name: '_id' })
	id: string;
	
	@Expose()
	owner: string;
	
	@Expose()
	name: string;
	
	@Expose()
	url: string;
	
	@Expose()
	stars: number;
	
	@Expose()
	issues: number;
	
	@Expose()
	forks: number;
	
	@Expose()
	createdAt: Date;
	
	@Expose()
	addedAt: Date;
	
	@Expose()
	userIds: string[];
}
