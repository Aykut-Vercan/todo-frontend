import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

interface PasswordUpdateRequest {
    oldPassword: string;
    newPassword: string;
    newPassword2: string;
}

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: async (data: PasswordUpdateRequest) => {
            await api.put('/users/password', data)
        }
    });
}

export const useDeleteAccount = () => {
    return useMutation({
        mutationFn: async () => {
            await api.delete('/users')
        }
    })
}