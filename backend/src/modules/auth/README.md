# Authentication Module

This module handles user registration, login, and route protection using JWT in a NestJS backend.

---

## Structure

```
src/
├── auth/
│   ├── controllers/
│   │   ├── auth.controller.ts      # HTTP endpoints /auth/*
│   ├── services/
│   │   ├── auth.service.ts         # Registration and login logic
│   ├── dtos/
│   │   ├── auth.dto.ts             # Input validation DTOs
│   ├── strategies/
│   │   ├── jwt.strategy.ts         # JWT validation strategy
│   ├── guards/
│   │   ├── jwt-auth.guard.ts       # JWT guard
├── users/
│   ├── entities/
│   │   ├── user.entity.ts          # User database entity
│   ├── services/
│   │   ├── user.service.ts        # User DB logic
```

---

## Registration

**POST** `/auth/register`

### Request Body:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

### Validation:

* `email`: required, must be a valid email
* `password`: required, minimum 6 characters

### Response:

```json
{
  "id": "...",
  "email": "user@example.com",
  "createdAt": "..."
}
```

---

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
