# GitHub CRM Project

A full-stack application for managing public GitHub projects. Includes user authentication, project tracking, and integration with GitHub API.

## Project Structure

- `backend/` — NestJS API (authentication, project management, user management)
- `frontend/` — React.js client (UI for authentication and project list)

## Technologies

- Node.js, TypeScript
- NestJS (backend)
- React.js (frontend)
- PostgreSQL, MongoDB
- Docker, Docker Compose

## Main Features

- User registration and login (JWT authentication)
- Add GitHub projects by repository path (e.g., `facebook/react`)
- View project details: owner, name, URL, stars, forks, issues, creation date
- Update and delete projects
- Data fetched from GitHub API and stored in database

## How to Run

1. Clone the repository
2. Check `.env.local` files in both `backend/` and `frontend/` folders and set required variables (see below)
3. Start Docker App
4. Build and start with Docker Compose:
   ```sh
   docker-compose up --build
   ```
5. Access backend at `http://localhost:3004`, frontend at `http://localhost:3000`

## Environment Variables

Backend:
```
PORT=3004

MONGO_URI=mongodb://mongo:27017/github-crm
JWT_SECRET=your_jwt_secret

GITHUB_API_URL=https://api.github.com/repos

POSTGRES_HOST=...
POSTGRES_PORT=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...

CORS_HEADERS=Content-Type,Authorization
CORS_ORIGINS=http://localhost:3000
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
```

Frontend:
```
VITE_API_URL=http://localhost:3004
```

## API Endpoints

- `POST /auth/register` — Register user
- `POST /auth/sign-in` — Login and get JWT
- `GET /projects` — Get user's projects
- `POST /projects` — Add new project

## Documentation

- See module-level README files in `backend/src/modules/*` for details on each backend module.

## Dependencies

- `@nestjs/jwt`, `passport-jwt`, `bcrypt`, `class-validator` (backend)
- `react`, `axios`, `vite` (frontend)

## License

MIT

