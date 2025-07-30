import {
	INestApplication,
	ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

export const mainConfig = (app: INestApplication | NestExpressApplication) => {
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			enableDebugMessages: true,
			forbidNonWhitelisted: false,
		}),
	);

	app.enableShutdownHooks();
};
