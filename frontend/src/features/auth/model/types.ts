export interface SignInDto {
	email: string;
	password: string;
}

export interface RegisterDto {
	email: string;
	password: string;
}

export interface AuthResponseDto {
	access_token: string;
}
