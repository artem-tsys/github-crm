import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { SetCookiesInterceptor } from "../interceptors/set-cookies.interceptor";
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
	 * Registers a new user and sets tokens in httpOnly cookies.
	 * @param dto Registration data
	 * @returns Created user (without tokens)
	 */
	@Post('/register')
	@UseInterceptors(SetCookiesInterceptor)
	public async register(@Body() dto: RegisterDto) {
		await this.authService.register(dto.email, dto.password);
		const { user } = await this.authService.signIn(dto.email, dto.password);
		return { user };
	}

	/**
	 * Signs in a user and returns JWT token.
	 * @param dto Login data
	 * @returns JWT access token
	 */
	@Post('/sign-in')
	@UseInterceptors(SetCookiesInterceptor)
	public async signIn(@Body() dto: LoginDto) {
		const { user } = await this.authService.signIn(dto.email, dto.password);
		return { user };
	}
	
	/**
	 * Logs out user and clears authentication cookies.
	 */
	@Post('/logout')
	public logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'strict' });
		res.clearCookie('refresh_token', { httpOnly: true, secure: true, sameSite: 'strict' });
		return { message: 'Logged out' };
	}
}
