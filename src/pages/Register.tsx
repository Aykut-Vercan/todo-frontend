import { useState } from "react";
import z from "zod"
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../components/AuthLayout";
import { useTranslation } from 'react-i18next';

const Register = () => {
    const { t } = useTranslation();
    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState(false);
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const registerSchema = z.object({
        firstName: z
            .string()
            .min(3, t('register.firstNameMin'))
            .max(30, t('register.firstNameMax')),
        lastName: z
            .string()
            .min(3, t('register.lastNameMin'))
            .max(30, t('register.lastNameMax')),
        email: z
            .string()
            .min(1, t('register.emailRequired'))
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t('register.emailInvalid')),
        password: z
            .string()
            .min(5, t('register.passwordMin'))
            .max(30, t('register.passwordMax')),
    })
    type RegisterFormData = z.infer<typeof registerSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (data: RegisterFormData) => {
        setApiError('');
        setSuccess(false);
        try {
            await registerUser(data);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000)
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    }
    return (
        <AuthLayout>
            <div className="bg-card rounded-lg shadow-2xl 
                      w-full max-w-md 
                      p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-6 sm:mb-8">
                    {t('register.title')}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-foreground mb-2">
                            {t('register.firstName')}
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            {...register('firstName')}
                            className={`w-full px-4 py-2.5 sm:py-3
                         border rounded-lg
                         outline-none
                         focus:ring-2 focus:ring-lime-400 focus:border-transparent
                         transition duration-200
                         text-gray-900 placeholder-gray-400
                         ${errors.firstName ? 'border-red-500' : 'border-input'}`}
                            placeholder={t('register.firstNamePlaceholder')}
                        />
                        {errors.firstName && (
                            <p className="mt-1.5 text-sm text-destructive">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-foreground mb-2">
                            {t('register.lastName')}
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            {...register('lastName')}
                            className={`w-full px-4 py-2.5 sm:py-3
                         border rounded-lg
                         outline-none
                         focus:ring-2 focus:ring-lime-400 focus:border-transparent
                         transition duration-200
                         text-gray-900 placeholder-gray-400
                         ${errors.lastName ? 'border-red-500' : 'border-input'}`}
                            placeholder={t('register.lastNamePlaceholder')}
                        />
                        {errors.lastName && (
                            <p className="mt-1.5 text-sm text-destructive">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-foreground mb-2">
                            {t('register.email')}
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className={`w-full px-4 py-2.5 sm:py-3
                         border rounded-lg
                         outline-none
                         focus:ring-2 focus:ring-lime-400 focus:border-transparent
                         transition duration-200
                         text-gray-900 placeholder-gray-400
                         ${errors.email ? 'border-red-500' : 'border-input'}`}
                            placeholder={t('register.emailPlaceholder')}
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-foreground mb-2">
                            {t('register.password')}
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
                         text-gray-900 placeholder-gray-400
                         ${errors.password ? 'border-red-500' : 'border-input'}`}
                            placeholder={t('register.passwordPlaceholder')}
                        />
                        {errors.password && (
                            <p className="mt-1.5 text-sm text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    {apiError && (
                        <div className="mb-4 p-3 sm:p-4 bg-destructive/10border border-destructive/20 rounded-lg">
                            <p className="text-sm text-destructive">{apiError}</p>
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-md text-green-600">
                                {t('register.success')}
                            </p>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2.5 sm:py-3 rounded-lg
                       font-semibold text-white
                       transition duration-200
                       ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]'}`}
                    >
                        {isSubmitting ? t('register.creating') : t('register.registerButton')}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    {t('register.haveAccount')}{' '}
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 hover:text-blue-700 hover:underline">
                        {t('register.loginHere')}
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}

export default Register