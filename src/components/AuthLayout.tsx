import type { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

interface AuthLayoutProps {
    children: ReactNode;
    gradient?: string;
}

export const AuthLayout = ({
    children,
    gradient = "from-green-600 to-purple-200 dark:from-green-900 dark:to-purple-900"
}: AuthLayoutProps) => {

    const { theme, toggleTheme } = useTheme();
    return (
        <div className={`min-h-screen bg-gradient-to-br ${gradient} 
                    flex items-center justify-center 
                    p-4 sm:p-6 md:p-8 relative`}>
            <button
                onClick={toggleTheme}
                className="absolute top-6 right-6 p-3 rounded-lg bg-secondary hover:bg-secondary/80 backdrop-blur-sm transition"
                title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
                {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                    <Moon className="w-5 h-5 text-muted-foreground" />
                )}
            </button>
            {children}
        </div>
    );
};