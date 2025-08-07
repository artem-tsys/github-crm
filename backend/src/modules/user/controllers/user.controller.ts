import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller()
@UseGuards(JwtAuthGuard)
export class UserController {
	/**
	 * Get current user info by access_token cookie.
	 */
	@Get('/me')
	getMe(@Req() req: Request) {
		return { user: req.user };
	}
}
