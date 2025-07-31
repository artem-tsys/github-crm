import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

/**
 * Service for user management and database operations.
 */
@Injectable()
export class UserService {
	/**
	 * @param repo TypeORM repository for User entity
	 */
	constructor(@InjectRepository(User) private repo: Repository<User>) {}

	/**
	 * Finds a user by email address.
	 * @param email User email
	 * @returns User or null if not found
	 */
	async findByEmail(email: string): Promise<User | null> {
		return this.repo.findOne({ where: { email } });
	}

	/**
	 * Finds a user by ID.
	 * @param id User ID
	 * @returns User or null if not found
	 */
	async findById(id: string): Promise<User | null> {
		return this.repo.findOne({ where: { id } });
	}

	/**
	 * Creates a new user with email and password hash.
	 * @param email User email
	 * @param passwordHash Hashed password
	 * @returns Created user
	 */
	async create(email: string, passwordHash: string): Promise<User> {
		return this.repo.save({ email, passwordHash });
	}
}
