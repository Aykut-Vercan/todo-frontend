export interface Authority {
    authority: string;
}

export interface User {
    id: number;
    fullName: string;
    email: string;
    authorities: Authority[];
}
export interface AuthResponse {
    token: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface Todo {
    id: number;
    title: string;
    description: string;
    priority: number;
    complete: boolean;
}
export interface TodoRequest {
    title: string;
    description: string;
    priority: number;
}
export interface ApiError {
    status: number;
    message: string;
    timeStamp: number;
}