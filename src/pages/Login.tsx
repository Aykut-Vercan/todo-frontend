import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const [apiError, setApiError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const loginSchema = z.object({
        email: z
            .string()
            .min(1, t('login.emailRequired'))
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t('login.emailInvalid')),
        password: z
            .string()
            .min(5, t('login.passwordMin'))
            .max(30, t('login.passwordMax')),
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setApiError('');

        try {
            await login(data);
            navigate('/dashboard');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            setApiError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };
    return (
        <AuthLayout>
            <div className="bg-card rounded-lg shadow-2xl w-full max-w-md p-6 sm:p-8">
                {/*Header*/}
                <h2 className="text-2xl sm:test-3xl font-bold text-center text-foreground mb-6 sm:mb-8">
                    {t('login.welcome')}
                </h2>
                {/*Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4 sm:mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{t('login.email')}</label>
                        <input
                            id='email'
                            type="email"
                            {...register('email')}
                            className={` w-full px-4 py-2.5 sm:py-3 border rounded-lg 
                         outline-none
                         focus:ring-2 focus:ring-lime-400 focus:border-transparent
                                transition duration-200 bg-background text-foreground placeholder:text-muted-foreground ${errors.email ? 'border-destructive' : 'border-input'}`}
                            placeholder={t('login.emailPlaceholder')}
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-5 sm:mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-foreground mb-2">
                            {t('login.password')}
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className={`w-full px-4 py-2.5 sm:py-3
                         border rounded-lg
                         outline-none
                         focus:ring-2 focus:ring-lime-400 focus:border-transparent
                         transition duration-200
                        bg-background text-foreground placeholder:text-muted-foreground
                         ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder={t('login.passwordPlaceholder')}
                        />
                        {errors.password && (
                            <p className="mt-1.5 text-sm text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    {apiError && (
                        <div className="mb-4 p-3 sm:p-4 bg-destructive/10 border-destructive/20 rounded-lg">
                            <p className="text-sm text-destructive">{apiError}</p>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2.5 sm:py-3 rounded-lg
                       font-semibold text-white
                       transition duration-200
                       ${isSubmitting
                                ? 'bg-muted cursor-not-allowed'
                                : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
                    >
                        {isSubmitting ? t('login.loggingIn') : t('login.loginButton')}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    {t('login.noAccount')}{' '}
                    <Link
                        to="/register"
                        className="font-medium text-primary hover:text-primary/80 hover:underline">
                        {t('login.registerHere')}
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Login;