import {
	INestApplication,
	ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfig } from "./modules/app/config/app.config";

export const mainConfig = (app: INestApplication | NestExpressApplication) => {
	const config = app.get<ConfigService<AppConfig>>(ConfigService);
	const corsConfig = config.get<object>('cors');

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			enableDebugMessages: true,
			forbidNonWhitelisted: false,
		}),
	);

	app.enableShutdownHooks();
	app.enableCors(corsConfig);
};
