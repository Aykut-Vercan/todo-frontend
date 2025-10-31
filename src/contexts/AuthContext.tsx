// src/contexts/AuthContext.tsx

import { useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../types';
import { AuthContext } from './authContextDefinition';
import { useQueryClient } from '@tanstack/react-query';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient();

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await api.get<User>('/users/info');
                    setUser(response.data);
                } catch (error) {
                    console.error('failed to fetch', error);
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [token]);

    const login = async (credentials: LoginRequest) => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);

        const userResponse = await api.get<User>('/users/info');
        setUser(userResponse.data);
    };

    const register = async (data: RegisterRequest) => {
        await api.post('/auth/register', data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        queryClient.clear();
    };

    const isAdmin = () => {
        return user?.authorities.some(auth => auth.authority === 'ROLE_ADMIN') ?? false;
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};