import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { User } from '../enities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private repo: Repository<User>) {}
	
	async findByEmail(email: string): Promise<User | null> {
		return this.repo.findOne({ where: { email } });
	}
	
	async create(email: string, password: string): Promise<User> {
		const passwordHash = await bcrypt.hash(password, 10);
		return this.repo.save({ email, passwordHash });
	}
}
