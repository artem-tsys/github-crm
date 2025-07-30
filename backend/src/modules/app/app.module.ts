import { HttpModule } from "@nestjs/axios";
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { typeOrmConfig } from "../../database/config/typeorm.config";
import { AuthModule } from "../auth/auth.module";
import { ProjectModule } from "../project/project.module";
import { UsersModule } from "../user/user.module";
import appConfig from './config/app.config';
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { mongooseConfig } from "../../database/config/mongoose.config";

@Module({
  imports: [
	  ConfigModule.forRoot({
		  isGlobal: true,
		  load: [appConfig],
	  }),
	  TypeOrmModule.forRootAsync(typeOrmConfig),
	  MongooseModule.forRootAsync(mongooseConfig),
	  
	  HttpModule,
	  UsersModule,
	  AuthModule,
	  ProjectModule
  ],
  providers: [],
})
export class AppModule {}
