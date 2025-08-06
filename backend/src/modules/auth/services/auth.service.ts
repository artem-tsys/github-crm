import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from '../../user/services/user.service';

/**
 * Service for authentication logic: registration and login.
 */
@Injectable()
export class AuthService {
	/**
	 * @param userService Service for user management
	 * @param jwt JWT service
	 */
	constructor(
		private userService: UserService,
		private jwt: JwtService
	) {}
	
	/**
	 * Registers a new user with email and password.
	 * @param email User email
	 * @param password User password
	 * @returns Created user entity
	 * @throws ConflictException if email already exists
	 */
	async register(email: string, password: string) {
		const existing = await this.userService.findByEmail(email);
		if (existing) throw new ConflictException('Email already in use');

		const passwordHash = await bcrypt.hash(password, 10);
		return this.userService.create(email, passwordHash);
	}
	
	/**
	 * Signs in a user and returns access/refresh tokens and user entity.
	 * Tokens will be set as httpOnly cookies by an interceptor.
	 * @param email User email
	 * @param password User password
	 * @returns { accessToken, refreshToken, user }
	 * @throws UnauthorizedException if credentials are invalid
	 */
	async signIn(email: string, password: string) {
		try {
			const user = await this.userService.findByEmail(email);
			if (!user) throw new UnauthorizedException('Invalid credentials');
			
			const isMatch = await bcrypt.compare(password, user.passwordHash);
			if (!isMatch) throw new UnauthorizedException('Invalid credentials');
			
			const accessToken = await this.jwt.signAsync({ sub: user.id, email: user.email }, { expiresIn: '15m' });
			const refreshToken = await this.jwt.signAsync({ sub: user.id }, { expiresIn: '7d' });
			
			return { accessToken, refreshToken, user };
		} catch (e) {
			console.error(e);
			throw new UnauthorizedException('Invalid credentials');
		}
	}
}
