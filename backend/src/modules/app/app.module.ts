import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { typeOrmConfig } from "../../database/config/typeorm.config";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../user/user.module";
import { AppController } from "./app.controller";
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
	  
	  UsersModule,
	  AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
