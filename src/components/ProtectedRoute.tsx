import type { ReactNode } from "react"
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { t } = useTranslation();
    const { user, token, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-sm sm:text-base text-gray-600">{t('protected.loading')}</p>
                </div>
            </div>
        )
    }
    //token ve user yoksa 
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Admin gerekiyorsa ve user admin değilse
    if (requireAdmin && !isAdmin()) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                    <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4">{t('protected.accessDenied')}</h2>
                    <p className="text-sm sm:text-base text-gray-600">{t('protected.noPermission')}</p>
                </div>
            </div>
        );
    }

    return (
        <>{children}</>
    )
}

export default ProtectedRoute