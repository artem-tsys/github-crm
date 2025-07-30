import { Env } from "./env.enum";

const appConfig = () => ({
	env: process.env.NODE_ENV || Env.Development,
	port: process.env.PORT ? parseInt(process.env.PORT) : 3004,
	cors: {
		origin:
			process.env.CORS_ORIGINS === '*'
				? process.env.CORS_ORIGINS
				: (process.env.CORS_ORIGINS?.split(',') ?? []),
		methods: process.env.CORS_METHODS?.split(',') ?? [],
		allowedHeaders: process.env.CORS_HEADERS?.split(',') ?? [],
		credentials: true,
	},
});

export type AppConfig = ReturnType<typeof appConfig>;
export default appConfig;
