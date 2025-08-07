import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { setAuthCookies } from "../helpers/set-auth-cookies";
import { AuthService } from '../services/auth.service';
import { Response } from 'express';

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
	 * @param res
	 * @returns Created user (without tokens)
	 */
	@Post('/register')
	public async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
		await this.authService.register(dto.email, dto.password);
		const { user, ...tokens } = await this.authService.signIn(dto.email, dto.password);
		setAuthCookies(res, tokens);
		return { user };
	}

	/**
	 * Signs in a user set cookies and returns User Data.
	 * @param dto Login data
	 * @param res
	 * @returns User data
	 */
	@Post('/sign-in')
	public async signIn(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { user, ...tokens } = await this.authService.signIn(dto.email, dto.password);
		setAuthCookies(res, tokens);
		return { user };
	}
	
	/**
	 * Logs out user and clears authentication cookies.
	 */
	@Post('/sign-out')
	public signOut(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'strict' });
		res.clearCookie('refresh_token', { httpOnly: true, secure: true, sameSite: 'strict' });
		return { message: 'Logged out' };
	}
}
