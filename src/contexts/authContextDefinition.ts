
import { createContext } from 'react';
import type { User, LoginRequest, RegisterRequest } from '../types';

export interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    isAdmin: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);