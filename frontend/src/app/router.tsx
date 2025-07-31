import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login/Login-page';
import { RegisterPage } from '@/pages/register/Register-page';
// import { ProjectsPage } from '@/pages/projects/ProjectsPage'; // TODO

export const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			{/* <Route path="/projects" element={<ProjectsPage />} /> */}
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	</BrowserRouter>
);
