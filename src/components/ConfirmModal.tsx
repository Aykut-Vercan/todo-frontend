import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from 'react-i18next';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmButtonStyle?: 'danger' | 'primary' | 'success';
    icon?: ReactNode;
    isLoading?: boolean;
}
export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    description = 'Are you sure you want to proceed?',
    confirmText,
    cancelText,
    confirmButtonStyle = 'primary',
    icon,
    isLoading = false,
}: ConfirmModalProps) => {
    const { t } = useTranslation();
    
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const getConfirmButtonClasses = () => {
        const base = 'px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed';

        switch (confirmButtonStyle) {
            case 'danger':
                return `${base} bg-red-600 text-white hover:bg-red-700`;
            case 'success':
                return `${base} bg-green-600 text-white hover:bg-green-700`;
            case 'primary':
            default:
                return `${base} bg-blue-600 text-white hover:bg-blue-700`;
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-card rounded-lg shadow-2xl max-w-md w-full transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-start space-x-3">
                            {icon && (
                                <div className="flex-shrink-0 mt-0.5">
                                    {icon}
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold py-3 text-foreground">
                                    {title}
                                </h3>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-muted-foreground transition p-1 rounded-lg hover:bg-gray-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 p-4 sm:p-6 bg-card rounded-b-lg">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 sm:px-6 py-2 sm:py-2.5 border border-muted-foreground rounded-lg font-semibold text-foreground hover:bg-foreground/20 transition disabled:opacity-50"
                        >
                            {cancelText || t('modal.cancel')}
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className={getConfirmButtonClasses()}
                        >
                            {isLoading ? t('modal.processing') : (confirmText || t('modal.confirm'))}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};