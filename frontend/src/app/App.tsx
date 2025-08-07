import './App.css'
import { AuthProvider } from "../features/auth/context/auth-context";
import { AppRouter } from "./routes/router";

function App() {
	return <AuthProvider>
		<AppRouter />
	</AuthProvider>;
}

export default App
