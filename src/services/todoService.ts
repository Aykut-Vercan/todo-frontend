
import type { Todo, TodoRequest } from "../types";
import api from "./api";


export const todoService = {
    getAllTodos: async (): Promise<Todo[]> => {
        const response = await api.get<Todo[]>('/todos');
        return response.data;
    },

    createTodo: async (todo: TodoRequest): Promise<Todo> => {
        const response = await api.post<Todo>('/todos', todo);
        return response.data;
    },
    toggleTodo: async (id: number): Promise<Todo> => {
        const response = await api.put<Todo>(`/todos/${id}`)
        return response.data
    },
    deleteTodo: async (id: number): Promise<void> => {
        await api.delete(`/todos/${id}`)
    }


}