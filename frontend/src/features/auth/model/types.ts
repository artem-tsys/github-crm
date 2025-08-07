export interface SignInDto {
	email: string;
	password: string;
}

export interface RegisterDto {
	email: string;
	password: string;
}

export interface User {
	id: string;
	email: string;
	createdAt: number;
}
