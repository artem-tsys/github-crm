# GitHub CRM Frontend

A React.js client for managing public GitHub projects. Supports user authentication, project tracking, and integration with the backend API.

## Project Structure
- `src/app/` — Application entry, router, global styles
- `src/features/auth/` — Authentication module (login, register, route protection)
- `src/pages/` — Page components (login, register, projects)
- `src/shared/` — Shared utilities (API, error handling)

## Technologies
- React.js, TypeScript
- Ant Design (UI)
- React Router
- Axios
- Sass (SCSS modules)

## Main Features
- User registration and login (JWT authentication)
- Protected routes for authorized users
- Add and view GitHub projects

## How to Run
1. Clone the repository
2. Create `.env.dev` in `frontend/` and set required variables (see below)
3. Build and start with Docker Compose:
   ```sh
   docker-compose up --build
   ```
4. Access frontend at `http://localhost:3000`

## Environment Variables
```
VITE_API_URL=http://localhost:3004
```

## Documentation
- See module-level README files in `src/features/*` for details on each frontend module.

## License
MIT
