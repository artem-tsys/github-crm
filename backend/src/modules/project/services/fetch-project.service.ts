import { HttpService } from "@nestjs/axios";
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class FetchProjectsService {
	private readonly baseUrl: string;
	
	constructor(
		private readonly http: HttpService,
		private readonly config: ConfigService,
	) {
		this.baseUrl = this.config.getOrThrow<string>('GITHUB_API_URL');
	}
	
	async fetchData(owner: string, repo: string) {
		try {
			const url = `${this.baseUrl}/${owner}/${repo}`;
			const response = await firstValueFrom(this.http.get(url));
			const data = response.data;
			
			return {
				owner: data.owner.login,
				name: data.name,
				url: data.html_url,
				stars: data.stargazers_count,
				forks: data.forks_count,
				issues: data.open_issues_count,
				createdAtUnix: Math.floor(new Date(data.created_at).getTime() / 1000),
			};
		} catch (error) {
			if (error.response?.status === 404) return null;
			throw new Error('GitHub API request failed');
		}
	}
}
