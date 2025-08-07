import { api } from "@/shared/api/axios";
import type { User } from "../model/types";

export async function signOut(): Promise<User> {
	const res = await api.post('/auth/sign-out');
	return res.data;
}
