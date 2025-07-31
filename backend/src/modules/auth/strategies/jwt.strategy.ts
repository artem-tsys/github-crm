import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from "../../user/services/user.service";

type JwtPayload = { sub: string; email: string };

/**
 * JWT strategy for validating and extracting user from JWT token.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	/**
	 * @param userService Service for user management
	 */
	constructor(private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		} as any);
	}

	/**
	 * Validates JWT payload and returns user.
	 * @param payload JWT payload
	 * @returns User entity
	 * @throws UnauthorizedException if user not found
	 */
	async validate(payload: JwtPayload) {
		const user = await this.userService.findById(payload.sub);
		if (!user) throw new UnauthorizedException();
		return user;
	}
}
