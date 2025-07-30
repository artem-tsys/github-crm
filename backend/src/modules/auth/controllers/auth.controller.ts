import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	
	@Post('/register')
	public register(@Body() dto: RegisterDto) {
		return this.authService.register(dto.email, dto.password);
	}

	@Post('/sign-in')
	public signIn(@Body() dto: LoginDto) {
		return this.authService.signIn(dto.email, dto.password);
	}
}
