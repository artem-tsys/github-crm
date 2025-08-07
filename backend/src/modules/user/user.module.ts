import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from "./controllers/user.controller";
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

/**
 * NestJS module for user management.
 */
@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UsersModule {}
