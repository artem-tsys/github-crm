import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}
	
	async register(email: string, password: string) {
		const existing = await this.usersService.findByEmail(email);
		if (existing) throw new ConflictException('Email already in use');
		console.log('register', email, password)
		return this.usersService.create(email, password);
	}
}
