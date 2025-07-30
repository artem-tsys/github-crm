import { ConfigService } from "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import { mainConfig } from "./main.config";
import { AppModule } from './modules/app/app.module';
import { AppConfig } from "./modules/app/config/app.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	const config = app.get<ConfigService<AppConfig>>(ConfigService);
	
	mainConfig(app);
	
	const port = config.get<string>('port');
	await app.listen(process.env.PORT ?? 3004).then(() => console.log('Listening on port', port));
}
void bootstrap();
