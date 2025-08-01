import axios from 'axios';
import { config } from "@/app/config/api.config";

console.log("config", config);
export const api = axios.create({
	baseURL: config.API_URL,
	withCredentials: false,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
