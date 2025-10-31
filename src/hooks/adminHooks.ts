import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/adminService';

const USERS_QUERY_KEY = ['users'];

export const useUsers = () => {
    return useQuery({
        queryKey: USERS_QUERY_KEY,
        queryFn: adminService.getAllUsers
    });
}

export const usePromoteUser = () => {
    const quertClient = useQueryClient();
    return useMutation({
        mutationFn: adminService.promoteToAdmin,
        onSuccess: () => {
            quertClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
        }
    })
}

export const useDeleteUser = () => {
    const quertClient = useQueryClient();
    return useMutation({
        mutationFn: adminService.deleteUser,
        onSuccess: () => {
            quertClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
        }
    });
}