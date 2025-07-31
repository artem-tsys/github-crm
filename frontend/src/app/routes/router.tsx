import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login/Login-page';
import { RegisterPage } from '@/pages/register/Register-page';
import { ProjectsPage } from '@/pages/projects/ProjectsPage';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => (
	<BrowserRouter>
		<Routes>
		   <Route path="/sign-in" element={<LoginPage />} />
		   <Route path="/register" element={<RegisterPage />} />
		   <Route path="/projects" element={
			 <PrivateRoute>
			   <ProjectsPage />
			 </PrivateRoute>
		   } />
		   <Route path="*" element={<Navigate to="/sign-in" />} />
		</Routes>
	</BrowserRouter>
);
