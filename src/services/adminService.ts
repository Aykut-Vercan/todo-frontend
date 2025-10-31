import type { User } from "../types";
import api from "./api";

export const adminService = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/admin');
        return response.data;
    },
    promoteToAdmin: async (userId: number): Promise<User> => {
        const response = await api.put<User>(`/admin/${userId}/role`);
        return response.data;
    },
    deleteUser: async (userId: number): Promise<void> => {
        await api.delete(`/admin/${userId}`)
    }

}