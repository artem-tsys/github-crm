import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwt: JwtService
	) {}
	
	async register(email: string, password: string) {
		const existing = await this.usersService.findByEmail(email);
		if (existing) throw new ConflictException('Email already in use');

		const passwordHash = await bcrypt.hash(password, 10);
		return this.usersService.create(email, passwordHash);
	}
	
	async signIn(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);
		if (!user) throw new UnauthorizedException('Invalid credentials');
		
		const isMatch = await bcrypt.compare(password, user.passwordHash);
		if (!isMatch) throw new UnauthorizedException('Invalid credentials');
		
		const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
		
		return { access_token: token };
	}
}
