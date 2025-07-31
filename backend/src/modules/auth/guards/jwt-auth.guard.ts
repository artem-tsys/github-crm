import { CanActivate, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT authentication guard for protecting routes.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {}
