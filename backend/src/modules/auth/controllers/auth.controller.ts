import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from "../dtos/auth.dto";
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	
	@Post('register')
	register(@Body() dto: RegisterDto) {
		return this.authService.register(dto.email, dto.password);
	}
}
