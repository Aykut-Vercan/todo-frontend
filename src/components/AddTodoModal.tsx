import z from "zod"
import type { TodoRequest } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface AddTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TodoRequest) => void,
    isLoading?: boolean;
}

const AddTodoModal = ({ isOpen, onClose, onSubmit, isLoading }: AddTodoModalProps) => {
    const { t } = useTranslation();

    const todoSchema = z.object({
        title: z.string()
            .min(3, t('addTodo.titleMin'))
            .max(30, t('addTodo.titleMax')),
        description: z.string()
            .min(3, t('addTodo.descriptionMin'))
            .max(120, t('addTodo.descriptionMax')),
        priority: z.number()
            .min(1, t('addTodo.priorityRange'))
            .max(5, t('addTodo.priorityRange')),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm<TodoRequest>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            priority: 1
        }
    })
    const handleFormSubmit = (data: TodoRequest) => {
        onSubmit(data);
        reset();
    };
    const handleClose = () => {
        if (!isLoading) {
            reset();
            onClose();
        }
    };
    const handleBackdropClick = () => {
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity flex items-center justify-center p-4"
                onClick={handleBackdropClick}>
                <div
                    className="bg-card rounded-lg shadow-2xl max-w-md w-full transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">
                            {t('addTodo.title')}
                        </h3>
                        <button
                            onClick={handleClose}
                            className="text-muted-foreground hover:text-foreground transition p-1 rounded-lg hover:bg-destructive/50"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                        <div className="p-4 sm:p-6 space-y-4">

                            {/* Title Input */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t('addTodo.todoTitle')}
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    {...register('title')}
                                    placeholder={t('addTodo.titlePlaceholder')}
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none bg-background text-foreground
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        transition duration-200
                                        ${errors.title ? 'border-destructive' : 'border-input'}`}
                                />
                                {errors.title && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Description Input */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t('addTodo.description')}
                                </label>
                                <textarea
                                    id="description"
                                    {...register('description')}
                                    placeholder={t('addTodo.descriptionPlaceholder')}
                                    rows={3}
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none bg-background text-foreground
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        transition duration-200
                                        ${errors.title ? 'border-destructive' : 'border-input'}`}
                                />
                                {errors.description && (
                                    <p className="mt-1.5 text-sm text-destructive">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            {/* Priority Selector */}
                            <div>
                                <label
                                    htmlFor="priority"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    {t('addTodo.priority')}
                                </label>
                                <select
                                    id="priority"
                                    {...register('priority', { valueAsNumber: true })}
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none bg-background text-foreground
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        transition duration-200
                                        ${errors.title ? 'border-destructive' : 'border-input'}`}
                                >
                                    <option value={1}>{t('addTodo.priority1')}</option>
                                    <option value={2}>{t('addTodo.priority2')}</option>
                                    <option value={3}>{t('addTodo.priority3')}</option>
                                    <option value={4}>{t('addTodo.priority4')}</option>
                                    <option value={5}>{t('addTodo.priority5')}</option>
                                </select>
                                {errors.priority && (
                                    <p className="mt-1.5 text-sm text-destructive">
                                        {errors.priority.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Footer - Buttons */}
                        <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 p-4 sm:p-6 bg-background rounded-b-lg">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isLoading}
                                className="px-4 sm:px-6 py-2 sm:py-2.5 border border-input rounded-lg 
                                font-semibold text-foreground hover:bg-secondary transition disabled:opacity-50"
                            >
                                {t('addTodo.cancel')}
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold
                                 hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? t('addTodo.adding') : t('addTodo.addButton')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTodoModal