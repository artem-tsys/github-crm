# User Module

This module provides user management functionality for the backend application. It handles user creation, lookup, and links users to projects.

## Structure

- **Entity:** `User` — describes the user data model and relations to projects.
- **Service:** `UserService` — contains logic for user database operations.
- **Module:** `UsersModule` — NestJS module for user management.

## Main Features

- Create a new user with email and password hash.
- Find users by email or ID.
- Link users to projects.

## Entity

- `id`: Unique identifier (UUID)
- `email`: User email address (unique)
- `passwordHash`: Hashed password
- `createdAt`: Date when the user was created
- `projects`: Projects linked to the user

## Usage Example

To create a user (via service):
```ts
await userService.create('user@example.com', passwordHash);
```

To find a user by email:
```ts
const user = await userService.findByEmail('user@example.com');
```
