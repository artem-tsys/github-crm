import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class SetCookiesInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const res = context.switchToHttp().getResponse();
		
		return next.handle().pipe(
			tap((data) => {
				if (data?.accessToken) {
					res.cookie('access_token', data.accessToken, {
						httpOnly: true,
						secure: true,
						sameSite: 'strict',
						maxAge: 15 * 60 * 1000,
					});
				}
				
				if (data?.refreshToken) {
					res.cookie('refresh_token', data.refreshToken, {
						httpOnly: true,
						secure: true,
						sameSite: 'strict',
						maxAge: 7 * 24 * 60 * 60 * 1000,
					});
				}
			}),
		);
	}
}
