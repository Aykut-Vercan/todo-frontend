import { Toaster } from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme';

export const ToasterWrapper = () => {
    const { theme } = useTheme();

    return (
        <Toaster
            position="bottom-left"
            reverseOrder={false}
            toastOptions={{
                duration: 4000,
                style: {
                    background: theme === 'dark' ? '#1f2937' : '#ffffff',
                    color: theme === 'dark' ? '#f9fafb' : '#111827',
                    border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
                },
                success: {
                    iconTheme: {
                        primary: 'rgb(34, 197, 94)',
                        secondary: 'white',
                    },
                },
                error: {
                    iconTheme: {
                        primary: 'rgb(239, 68, 68)',
                        secondary: 'white',
                    },
                },
            }}
        />
    );
};