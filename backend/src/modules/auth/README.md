# Authentication Module

This module provides user registration, login, and JWT-based route protection for the backend application.

## Structure

- **Controller:** `AuthController` — handles HTTP endpoints for registration and login.
- **Service:** `AuthService` — contains authentication logic (register, sign-in).
- **DTOs:** `RegisterDto`, `LoginDto` — validate input data for registration and login.
- **Strategy:** `JwtStrategy` — validates JWT tokens and extracts user.
- **Guard:** `JwtAuthGuard` — protects routes using JWT authentication.
- **Decorator:** `GetUser` — extracts user or user property from request.

## Main Features

- Register a new user with email and password.
- Sign in and receive a JWT access token.
- Protect routes using JWT authentication.
- Validate user input with DTOs.

## Endpoints

- `POST /auth/register` — Register a new user
- `POST /auth/sign-in` — Sign in and get JWT token

## Validation

- `email`: required, must be a valid email
- `password`: required, minimum 6 characters

## Security

- All endpoints are protected using JWT authentication (except registration and login).

## Usage Example

To register a user:
```json
POST /auth/register
{
  "email": "user@example.com",
  "password": "123456"
}
```

To sign in:
```json
POST /auth/sign-in
{
  "email": "user@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "access_token": "...jwt..."
}
```

---

For more details, see the code documentation in each file.

## Login

**POST** `/auth/login`

### Request Body:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

### Response:

```json
{
  "access_token": "<JWT token>"
}
```

---

## Protected Routes

Use `@UseGuards(AuthGuard('jwt'))` to secure a route:

```ts
@Get('profile')
@UseGuards(AuthGuard('jwt'))
getProfile(@GetUser() user) {
  return user;
}
```

### Authorization Header:

```
Authorization: Bearer <jwt_token>
```

---

## JWT Payload Format

```json
{
  "sub": "<userId>",
  "email": "user@example.com",
  "iat": 1690000000,
  "exp": 1690086400
}
```

---

## Dependencies

* `@nestjs/jwt` — JWT generation
* `passport-jwt` — JWT strategy
* `bcrypt` — password hashing
* `class-validator` — DTO validation

---

##  ENV Configuration

```
JWT_SECRET=supersecret
```
