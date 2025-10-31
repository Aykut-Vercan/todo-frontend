import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todoService";
import type { Todo } from "../types";

const TODOS_QUERY_KEY = ['todos'];



export const useTodos = () => {

    return useQuery({
        queryKey: TODOS_QUERY_KEY,
        queryFn: todoService.getAllTodos,
    });
};

export const useCreateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoService.createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY })
        },
        onError: (error) => {
            console.error('Todo oluşturulamadı:', error);
        },
    })
}

export const useToggleTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todoService.toggleTodo, // PUT /api/todos/:id

        // ⚡ Optimistic Update - Backend'i beklemeden UI'ı güncelle
        onMutate: async (todoId: number) => {
            // 1. Devam eden refetch'leri iptal et (çakışma önlemek için)
            await queryClient.cancelQueries({ queryKey: TODOS_QUERY_KEY });

            // 2. Önceki veriyi kaydet (hata durumunda geri almak için)
            const previousTodos = queryClient.getQueryData<Todo[]>(TODOS_QUERY_KEY);

            // 3. Cache'i hemen güncelle (UI anında değişir!)
            queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (old) => {
                if (!old) return [];
                return old.map((todo) =>
                    todo.id === todoId
                        ? { ...todo, complete: !todo.complete } // Toggle yap
                        : todo
                );
            });

            // 4. Rollback için önceki veriyi döndür
            return { previousTodos };
        },

        // ❌ Hata olursa - Eski haline döndür (rollback)
        onError: (_err, _todoId, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(TODOS_QUERY_KEY, context.previousTodos);
            }
        },

        // ✅ Başarılı olursa - Backend'den güncel veriyi al
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
        },
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoService.deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
        },
        onError: (error) => {
            console.error('Todo silinemedi:', error);
        },
    });
};