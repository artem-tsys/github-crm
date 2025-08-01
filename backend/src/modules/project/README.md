# Project Module

This module provides functionality for managing GitHub projects within the application. It allows users to add, update, and view projects, storing relevant repository data and linking projects to users.

## Structure

- **Entity:** `Project` — describes the project data model and its relation to users.
- **Controller:** `ProjectController` — handles HTTP requests for project operations.
- **Service:** `ProjectService` — contains business logic for project management.
- **Repository:** `ProjectRepository` — manages database operations for projects.
- **DTO:** `CreateProjectDto` — validates input data for creating projects.
- **FetchProjectsService:** — fetches repository data from GitHub API.

## Main Features

- Add a new project by specifying the GitHub path (`owner/repo`).
- Update project data from GitHub.
- Link projects to users.
- Retrieve all projects for a user.

## Project Entity

- `id`: Unique identifier (UUID)
- `owner`: GitHub repository owner
- `name`: Repository name
- `url`: Repository URL
- `stars`: Number of stars
- `forks`: Number of forks
- `issues`: Number of open issues
- `createdAt`: Repository creation date (Unix timestamp)
- `addedAt`: Date when the project was added to the system
- `users`: Users linked to the project

## Endpoints

- `GET /projects` — Get all projects for the authenticated user
- `POST /projects` — Add a new project by GitHub path

## Validation

- The project path must be in the format `owner/repo` (e.g., `facebook/react`).

## Security

- All endpoints are protected by JWT authentication.

## Usage Example

To add a project:
```json
POST /projects
{
  "path": "facebook/react"
}
```

To get all projects:
```http
GET /projects
```
