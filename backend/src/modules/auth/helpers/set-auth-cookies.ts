import { Response } from 'express';

const ACCESS_TOKEN_AGE = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

export const setAuthCookies = (res: Response, tokens: { accessToken: string, refreshToken: string }) => {
	const isProd = process.env.NODE_ENV === 'production';
	res.cookie('access_token', tokens.accessToken, {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'strict' : 'lax',
		maxAge: ACCESS_TOKEN_AGE,
	});
	res.cookie('refresh_token', tokens.refreshToken, {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? 'strict' : 'lax',
		maxAge: REFRESH_TOKEN_AGE,
	});
};
