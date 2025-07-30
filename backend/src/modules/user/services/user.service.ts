import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private repo: Repository<User>) {}
	
	async findByEmail(email: string): Promise<User | null> {
		return this.repo.findOne({ where: { email } });
	}
	
	async findById(id: string): Promise<User | null> {
		return this.repo.findOne({ where: { id } });
	}
	
	async create(email: string, passwordHash: string): Promise<User> {
		return this.repo.save({ email, passwordHash });
	}
}
