import z from "zod"
import { useAuth } from "../hooks/useAuth";
import { useDeleteAccount, useUpdatePassword } from "../hooks/userHooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Lock, Settings, Trash2 } from "lucide-react";
import { ConfirmModal } from "../components/ConfirmModal";
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const UserSettings = () => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const updatePasswordMutation = useUpdatePassword();
    const deleteAccountMutation = useDeleteAccount();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const passwordSchema = z.object({
        oldPassword: z
            .string()
            .min(5, t('settings.oldPasswordMin'))
            .max(30, t('settings.oldPasswordMax')),
        newPassword: z
            .string()
            .min(5, t('settings.newPasswordMin'))
            .max(30, t('settings.newPasswordMax')),
        newPassword2: z
            .string()
            .min(5, t('settings.newPasswordMin'))
            .max(30, t('settings.newPasswordMax')),
    }).refine((data) => data.newPassword === data.newPassword2, {
        message: t('settings.passwordsDontMatch'),
        path: ['newPassword2']
    })

    type PasswordFormData = z.infer<typeof passwordSchema>;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema)
    })
    const onPasswordSubmit = (data: PasswordFormData) => {
        updatePasswordMutation.mutate(data, {
            onSuccess: () => {
                toast.success(t('toast.passwordUpdated'));
                reset();
            },
            onError: () => {
                toast.error(t('toast.passwordError'));
            }
        });
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccountMutation.mutateAsync();
            toast.success(t('toast.accountDeleted'));
            logout();
            navigate('/login');
        } catch {
            // TanStack Query otomatik error state'i set eder
        }
    };
    const getErrorMessage = (error: unknown): string => {
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            const message = axiosError.response?.data?.message;

            if (message) {
                const match = message.match(/"([^"]+)"/);
                return match ? match[1] : message;
            }
        }
        return t('settings.updateFailed');
    };
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <Settings className="w-8 h-8 text-blue-600" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                            {t('settings.title')}
                        </h2>
                    </div>
                    <p className="text-muted-foreground">{t('settings.subtitle')}</p>
                </div>

                {/* User Info Card */}
                <div className="bg-card rounded-lg shadow-sm p-4 sm:p-6 mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">{t('settings.profileInfo')}</h3>
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm text-muted-foreground">{t('settings.fullName')}</span>
                            <p className="font-medium text-foreground">{user?.fullName}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">{t('settings.email')}</span>
                            <p className="font-medium text-foreground">{user?.email}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">{t('settings.role')}</span>
                            <p className="font-medium text-foreground">
                                ( {user?.authorities.map(a => a.authority).join(', ')} )
                            </p>
                        </div>
                    </div>
                </div>

                {/* Change Password Card */}
                <div className="bg-card rounded-lg shadow-sm p-4 sm:p-6 mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                        <h3 className="text-lg font-semibold text-foreground">{t('settings.changePassword')}</h3>
                    </div>



                    {/* API Error */}
                    {updatePasswordMutation.isError && (
                        <div className="mb-4 p-3 bg-destructive/10 border-destructive/20 rounded-lg">
                            <p className="text-sm text-destructive">
                                {getErrorMessage(updatePasswordMutation.error)}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
                        {/* Old Password */}
                        <div>
                            <label htmlFor="oldPassword" className="block text-sm font-medium text-foreground mb-2">
                                {t('settings.currentPassword')}
                            </label>
                            <input
                                id="oldPassword"
                                type="password"
                                {...register('oldPassword')}
                                className={`w-full px-4 py-2.5 bg-background border text-foreground rounded-lg outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                           ${errors.oldPassword ? 'border-destructive' : 'border-input'}`}
                            />
                            {errors.oldPassword && (
                                <p className="mt-1.5 text-sm text-destructive">{errors.oldPassword.message}</p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">
                                {t('settings.newPassword')}
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                {...register('newPassword')}
                                className={`w-full px-4 py-2.5 bg-background border text-foreground rounded-lg outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                           ${errors.newPassword ? 'border-destructive' : 'border-input'}`}
                            />
                            {errors.newPassword && (
                                <p className="mt-1.5 text-sm text-destructive">{errors.newPassword.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="newPassword2" className="block text-sm font-medium text-foreground mb-2">
                                {t('settings.confirmPassword')}
                            </label>
                            <input
                                id="newPassword2"
                                type="password"
                                {...register('newPassword2')}
                                className={`w-full px-4 py-2.5 bg-background border text-foreground rounded-lg outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                           ${errors.newPassword2 ? 'border-destructive' : 'border-input'}`}
                            />
                            {errors.newPassword2 && (
                                <p className="mt-1.5 text-sm text-destructive">{errors.newPassword2.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={updatePasswordMutation.isPending}
                            className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold
                       hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {updatePasswordMutation.isPending ? t('settings.updating') : t('settings.updateButton')}
                        </button>
                    </form>
                </div>

                {/* Danger Zone */}
                <div className="bg-card rounded-lg shadow-sm p-4 sm:p-6 border-2 border-destructive/80">
                    <div className="flex items-center space-x-2 mb-4">
                        <Trash2 className="w-5 h-5 text-destructive" />
                        <h3 className="text-lg font-semibold text-destructive">{t('settings.dangerZone')}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        {t('settings.dangerDesc')}
                    </p>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-semibold
                     hover:bg-destructive/90 transition"
                    >
                        {t('settings.deleteAccount')}
                    </button>
                </div>
            </main>
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
                title={t('settings.deleteModalTitle')}
                description={t('settings.deleteModalDesc')}
                confirmText={t('settings.deleteConfirm')}
                cancelText={t('settings.deleteCancel')}
                confirmButtonStyle="danger"
                isLoading={deleteAccountMutation.isPending}
                icon={
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Trash2 className="w-6 h-6 text-destructive" />
                    </div>
                }
            />
        </div>
    )
}

export default UserSettings