import { IsString, Matches } from 'class-validator';

export class CreateProjectDto {
	@IsString()
	@Matches(/^[\w_.-]+\/[\w_.-]+$/, {
		message: 'Must be in format "owner/repo" (e.g. facebook/react)',
	})
	path: string;
}
