import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { AuthService } from '../services/auth.service';

/**
 * Controller for authentication endpoints: registration and login.
 */
@Controller('/auth')
export class AuthController {
	/**
	 * @param authService Service for authentication logic
	 */
	constructor(private authService: AuthService) {}

	/**
	 * Registers a new user.
	 * @param dto Registration data
	 * @returns Created user
	 */
	@Post('/register')
	public register(@Body() dto: RegisterDto) {
		return this.authService.register(dto.email, dto.password);
	}

	/**
	 * Signs in a user and returns JWT token.
	 * @param dto Login data
	 * @returns JWT access token
	 */
	@Post('/sign-in')
	public signIn(@Body() dto: LoginDto) {
		return this.authService.signIn(dto.email, dto.password);
	}
}
