import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useCreateTodo, useDeleteTodo, useTodos, useToggleTodo } from "../hooks/todoHooks";
import { ConfirmModal } from "../components/ConfirmModal";
import type { TodoRequest } from "../types";
import AddTodoModal from "../components/AddTodoModal";
import { useTranslation } from 'react-i18next';
import toast from "react-hot-toast";


const Dashboard = () => {
    const { t } = useTranslation();
    const { data: todos, isLoading, error } = useTodos();

    const toggleMutation = useToggleTodo();
    const deleteMutation = useDeleteTodo();
    const createMutation = useCreateTodo();

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [priorityFilter, setPriorityFilter] = useState<number | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTodos = todos?.filter(todo => {

        if (filter === 'active' && todo.complete) return false;
        if (filter === 'completed' && !todo.complete) return false;

        if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchTitle = todo.title.toLowerCase().includes(query);
            const matchDesc = todo.description.toLowerCase().includes(query);
            if (!matchTitle && !matchDesc) return false;
        }

        return true;
    });

    const stats = {
        all: todos?.length || 0,
        active: todos?.filter(t => !t.complete).length || 0,
        completed: todos?.filter(t => t.complete).length || 0,
    };

    const handleToggle = (id: number) => {
        toggleMutation.mutate(id);
    };
    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
    };
    
    const handleDeleteConfirm = () => {
        if (deleteId !== null) {
            deleteMutation.mutate(deleteId, {
                onSuccess: () => {
                    toast.success(t('toast.todoDeleted'));  
                },
                onError: () => {
                    toast.error(t('toast.deleteError'));
                }
            });
            setDeleteId(null);
        }
    };
    const handleAddTodo = (data: TodoRequest) => {
        createMutation.mutate(data, {
            onSuccess: () => {
                toast.success(t('toast.todoAdded'));
                setIsAddModalOpen(false);
            },
        });
    };
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold foreground mb-4 sm:mb-0">
                        {t('dashboard.title')}
                    </h2>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition font-medium "
                        onClick={() => setIsAddModalOpen(true)}>
                        {t('dashboard.addTodo')}
                    </button>
                </div>

                {!isLoading && !error && todos && todos.length > 0 && (
                    <div className="bg-card rounded-lg shadow-sm p-2 mb-6 flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium transition
                                 ${filter === 'all'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                        >
                            {t('dashboard.all')} <span className="ml-1 text-sm">({stats.all})</span>
                        </button>
                        <button
                            onClick={() => setFilter('active')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium transition
                                 ${filter === 'active'
                                    ? 'bg-yellow-500 text-white dark:bg-yellow-600'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                        >
                            {t('dashboard.active')} <span className="ml-1 text-sm">({stats.active})</span>
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium transition
                                 ${filter === 'completed'
                                    ? 'bg-green-500 text-white dark:bg-green-600'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                        >
                            {t('dashboard.completed')} <span className="ml-1 text-sm">({stats.completed})</span>
                        </button>

                    </div>

                )}
                <div className="bg-card rounded-lg shadow-sm p-4 mb-6 flex flex-col justify-between sm:flex-row gap-3">
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder={t('dashboard.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-1/2 px-4 py-2 pl-10 border bg-background border-input rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Priority Filter */}
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="px-4 py-2 border border-input rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer bg-card"
                    >
                        <option value="all">{t('dashboard.allPriorities')}</option>
                        <option value={1}>{t('dashboard.priority')} 1</option>
                        <option value={2}>{t('dashboard.priority')} 2</option>
                        <option value={3}>{t('dashboard.priority')} 3</option>
                        <option value={4}>{t('dashboard.priority')} 4</option>
                        <option value={5}>{t('dashboard.priority')} 5</option>
                    </select>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-destructive/10 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-destructive">{t('dashboard.error')}</p>
                    </div>
                )}
                {!isLoading && !error && todos && todos.length > 0 && filteredTodos?.length === 0 && (
                    <div className="bg-card rounded-lg shadow-sm p-8 sm:p-12 text-center">
                        <div className="text-muted-foreground mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            {t('dashboard.noFilteredTodos', { filter })}
                        </h3>
                        <p className="text-muted-foreground">
                            {filter === 'active' && t('dashboard.allCompleted')}
                            {filter === 'completed' && t('dashboard.noCompletedYet')}
                        </p>
                    </div>
                )}


                {!isLoading && !error && todos?.length === 0 && (
                    <div className="bg-card rounded-lg shadow-sm p-8 sm:p-12 text-center">
                        <div className="text-muted-foreground mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{t('dashboard.noTodos')}</h3>
                        <p className="text-muted-foreground mb-4">{t('dashboard.getStarted')}</p>
                        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium"
                            onClick={() => setIsAddModalOpen(true)}>
                            {t('dashboard.createTodo')}
                        </button>
                    </div>
                )}

                {!isLoading && !error && filteredTodos && filteredTodos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredTodos.map((todo) => (
                            <div
                                key={todo.id}
                                className="bg-card rounded-lg shadow-sm hover:shadow-md transition p-4 sm:p-6 border border-border"
                            >
                                {/* Priority Badge */}
                                <div className="flex items-start justify-between mb-3">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${todo.priority === 1 ? 'bg-red-100 text-destructive' :
                                        todo.priority === 2 ? 'bg-orange-100 text-orange-600' :
                                            todo.priority === 3 ? 'bg-yellow-100 text-yellow-600' :
                                                todo.priority === 4 ? 'bg-blue-100 text-blue-600' :
                                                    'bg-gray-100 text-muted-foreground'
                                        }`}>
                                        {t('dashboard.priority')} {todo.priority}
                                    </span>

                                    <input
                                        type="checkbox"
                                        checked={todo.complete}
                                        onChange={() => handleToggle(todo.id)}
                                        className="w-5 h-5 rounded border-input text-primary focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        readOnly
                                    />

                                </div>

                                {/* Title */}
                                <h3 className={`text-lg font-semibold mb-2 ${todo.complete ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                    {todo.title}
                                </h3>

                                {/* Description */}
                                <p className={`text-sm mb-4 ${todo.complete ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                                    {todo.description}
                                </p>

                                {/* Actions */}
                                <div className="flex items-center justify-end space-x-2">
                                    <button
                                        onClick={() => handleDeleteClick(todo.id)}
                                        disabled={deleteMutation.isPending}
                                        className="p-2 text-destructive hover:bg-destructive/40 rounded-lg transition disabled:opacity-50">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <ConfirmModal
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDeleteConfirm}
                title={t('dashboard.deleteTitle')}
                description={t('dashboard.deleteDesc')}
                confirmText={t('dashboard.delete')}
                cancelText={t('dashboard.cancel')}
                confirmButtonStyle="danger"
                isLoading={deleteMutation.isPending}
                icon={
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                }
            />
            <AddTodoModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddTodo}
                isLoading={createMutation.isPending}
            />
        </div>
    )
}

export default Dashboard