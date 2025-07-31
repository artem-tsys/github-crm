
# Authentication Module

This module provides user registration, login, JWT token management, and route protection for the frontend application.

## Structure
- **api/** — HTTP requests for authentication
- **model/** — Types and hooks for authentication logic
- **ui/** — Form components (LoginForm, RegisterForm)
- **lib/** — Utilities for error mapping

## Main Features
- Register new users
- Sign in existing users
- Store JWT token in localStorage
- Add token to all API requests
- Protect routes for authenticated users

## Components & Hooks
- `LoginForm` — Login form UI
- `RegisterForm` — Registration form UI
- `useSignIn`, `useRegister` — Hooks for login/register logic
- `useAuthSubmit` — Universal hook for form submission
- `useAuthCheck` — Redirects authenticated users from login/register pages
- `PrivateRoute` — Protects routes for authenticated users

## Error Handling
- API errors are mapped for Ant Design forms
- All errors are displayed via Ant Design message

## Usage Example
```tsx
<Route path="/projects" element={
  <PrivateRoute>
    <ProjectsPage />
  </PrivateRoute>
} />
```
