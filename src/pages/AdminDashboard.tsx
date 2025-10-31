import { useState } from "react";
import { useDeleteUser, usePromoteUser, useUsers } from "../hooks/adminHooks";
import { Navbar } from "../components/Navbar";
import { Shield, Trash2, UserCog } from "lucide-react";
import { ConfirmModal } from "../components/ConfirmModal";
import type { User } from "../types";
import { useTranslation } from 'react-i18next';
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const { t } = useTranslation();
    const { data: users, isLoading, error } = useUsers();
    const promoteMutation = usePromoteUser();
    const deleteMutation = useDeleteUser();

    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
    const [promoteUserId, setPromoteUserId] = useState<number | null>(null);

    const handlePromoteConfirm = () => {
        if (promoteUserId !== null) {
            promoteMutation.mutate(promoteUserId, {
                onSuccess: () => {
                    toast.success(t('toast.userPromoted'));
                },
                onError: () => {
                    toast.error(t('toast.promoteError'));
                }
            });
            setPromoteUserId(null);
        }
    };
    const isAdmin = (user: User): boolean => {
        return user.authorities?.some((auth) => auth.authority === 'ROLE_ADMIN');
    };
    const handleDeleteConfirm = () => {
        if (deleteUserId !== null) {
            deleteMutation.mutate(deleteUserId, {
                onSuccess: () => {
                    toast.success(t('toast.userDeleted'))
                },
                onError: () => {
                    toast.error(t('toast.deleteUserError'))
                }
            })
            setDeleteUserId(null);
        }
    };
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="mb-6 sm:mb-8">

                    <div className="flex items-center space-x-3 mb-2">
                        <Shield className="w-8 h-8 text-purple-600" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                            {t('admin.title')}
                        </h2>
                    </div>
                    <p className="text-muted-foreground">{t('admin.subtitle')}</p>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-600">{t('admin.error')}</p>
                    </div>
                )}

                {/*  Liste*/}
                {!isLoading && !error && users && (
                    <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-secondary border-b border-border">
                                    <tr className="text-gray-900">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('admin.user')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('admin.email')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('admin.role')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('admin.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-secondary/50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-foreground">{user.fullName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {isAdmin(user) ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                                        <Shield className="w-3 h-3 mr-1" />
                                                        {t('admin.admin')}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                        {t('admin.employee')}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    {!isAdmin(user) && (
                                                        <button
                                                            onClick={() => setPromoteUserId(user.id)}
                                                            className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 rounded-lg transition"
                                                            title={t('admin.promoteTitle')}
                                                        >
                                                            <UserCog className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                    {!isAdmin(user) && (
                                                        <button
                                                            onClick={() => setDeleteUserId(user.id)}
                                                            className="p-2 text-destructive hover:bg-destructive/30 rounded-lg transition"
                                                            title={t('admin.deleteTitle')}
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-border">
                            {users.map((user) => (
                                <div key={user.id} className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-foreground">{user.fullName}</h3>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                        {isAdmin(user) ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20">
                                                <Shield className="w-3 h-3 mr-1" />
                                                {t('admin.admin')}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {t('admin.employee')}
                                            </span>
                                        )}
                                    </div>

                                    {!isAdmin(user) && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setPromoteUserId(user.id)}
                                                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition text-sm font-medium"
                                            >
                                                <UserCog className="w-4 h-4" />
                                                <span>{t('admin.promote')}</span>
                                            </button>
                                            <button
                                                onClick={() => setDeleteUserId(user.id)}
                                                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>{t('admin.delete')}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <ConfirmModal
                isOpen={promoteUserId !== null}
                onClose={() => setPromoteUserId(null)}
                onConfirm={handlePromoteConfirm}
                title={t('admin.promoteModalTitle')}
                description={t('admin.promoteModalDesc')}
                confirmText={t('admin.promoteConfirm')}
                cancelText={t('admin.promoteCancel')}
                confirmButtonStyle="primary"
                isLoading={promoteMutation.isPending}
                icon={
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                }
            />
            <ConfirmModal
                isOpen={deleteUserId !== null}
                onClose={() => setDeleteUserId(null)}
                onConfirm={handleDeleteConfirm}
                title={t('admin.deleteModalTitle')}
                description={t('admin.deleteModalDesc')}
                confirmText={t('admin.deleteConfirm')}
                cancelText={t('admin.deleteCancel')}
                confirmButtonStyle="danger"
                isLoading={deleteMutation.isPending}
                icon={
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                }
            />
        </div>
    )
}

export default AdminDashboard