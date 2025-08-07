import axios from 'axios';
import { config } from "@/app/config/api.config";

export const api = axios.create({
	baseURL: config.API_URL,
	withCredentials: true,
});
