import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwt: JwtService
	) {}
	
	async register(email: string, password: string) {
		const existing = await this.userService.findByEmail(email);
		if (existing) throw new ConflictException('Email already in use');

		const passwordHash = await bcrypt.hash(password, 10);
		return this.userService.create(email, passwordHash);
	}
	
	async signIn(email: string, password: string) {
		try {
			const user = await this.userService.findByEmail(email);
			if (!user) throw new UnauthorizedException('Invalid credentials');
			
			const isMatch = await bcrypt.compare(password, user.passwordHash);
			if (!isMatch) throw new UnauthorizedException('Invalid credentials');
			
			const token = await this.jwt.signAsync({sub: user.id, email: user.email});
			return { access_token: token };
		} catch (e) {
			console.error(e);
			throw new UnauthorizedException('Invalid credentials');
		}
	}
}
