import * as React from "react";
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from "../../../shared/api/axios";
import type { User } from "../model/types";

interface AuthContextProps {
	user: User | null;
	loading: boolean;
	setUser: (user: User | null) => void;
	refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	loading: true,
	setUser: () => {},
	refetchUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	
	const fetchUser = async () => {
		try {
			const res = await api.get('/me');
			setUser(res.data.user);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	};
	
	
	useEffect(() => {
		fetchUser()
	}, []);
	
	return (
		<AuthContext.Provider value={{ user, loading, setUser, refetchUser: fetchUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return useContext(AuthContext);
}
