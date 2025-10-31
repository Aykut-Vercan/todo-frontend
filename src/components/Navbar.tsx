import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { CheckSquare, LogOut, Menu, Moon, Settings, Shield, Sun, User, X, Languages } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from 'react-i18next';


export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const isAdminPage = location.pathname === '/admin';
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    const currentLanguage = i18n.language;

    return (
        <nav className="bg-background border-b  shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo / Brand */}
                    <Link to="/dashboard" className="flex items-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-primary hover:opacity-80 transition cursor-pointer">
                            TodoApp
                        </h1>
                    </Link>


                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAdmin() && (
                            <Link
                                to={isAdminPage ? '/dashboard' : '/admin'}
                                className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:opacity-80 transition font-medium ${isAdminPage
                                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                    }`}>

                                {
                                    isAdminPage
                                        ? (<CheckSquare className="w-4 h-4" />)
                                        : (<Shield className="w-4 h-4" />)
                                }
                                <span>{isAdminPage ? t('nav.todoPanel') : t('nav.adminPanel')}</span>
                            </Link>
                        )}

                        {/* User Info */}
                        <div className="flex items-center space-x-2 px-3 py-2 bg-secondary rounded-lg">
                            <User className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                                <p className="font-semibold text-foreground">{user?.fullName}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>
                        <Link
                            to="/settings"
                            className="flex items-center space-x-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition">
                            <Settings className="w-6 h-6" />
                        </Link>

                        {/* Language Toggle */}
                        <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
                            <button
                                onClick={() => changeLanguage('tr')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                                    currentLanguage === 'tr'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                TR
                            </button>
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                                    currentLanguage === 'en'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80  transition"
                            title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-muted-foreground" />
                            )}
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition">
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">{t('nav.logout')}</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-secondary transition">
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-foreground" />
                        ) : (
                            <Menu className="w-6 h-6 text-foreground" />
                        )}
                    </button>
                </div>
                {isAdmin() && (
                    <Link
                        to={isAdminPage ? '/dashboard' : '/admin'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-2 px-4 py-3 mb-3 rounded-lg hover:opacity-80 transition font-medium ${isAdminPage
                            ? 'bg-green-50 text-green-600'
                            : 'bg-purple-50 text-purple-600'
                            }`}>
                        {
                            isAdminPage
                                ? (<CheckSquare className="w-5 h-5" />)
                                : (<Shield className="w-5 h-5" />)
                        }
                        <span>{isAdminPage ? t('nav.todoPanel') : t('nav.adminPanel')}</span>
                    </Link>
                )}

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        {isAdmin() && (
                            <div className="flex items-center space-x-1 px-3 py-2 bg-purple-500/10 rounded-lg mb-3">
                                <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">{t('nav.admin')}</span>
                            </div>
                        )}
                        {/* User Info */}
                        <div className="px-4 py-3 bg-secondary rounded-lg mb-3 gap-2">
                            <div className="flex items-center space-x-2 mb-2">
                                <User className="w-5 h-5 text-muted-foreground" />
                                <p className="font-semibold text-foreground">{user?.fullName}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>

                            <div className="flex flex-row justify-between gap-2">
                                <Link
                                    to="/settings"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 mt-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition">
                                    <Settings className="w-4 h-4" />
                                    <span>{t('nav.settings')}</span>
                                </Link>

                                <button
                                    onClick={() => {
                                        toggleTheme();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 mt-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition"
                                >
                                    {theme === 'dark' ? (
                                        <Sun className="w-5 h-5 text-yellow-500" />
                                    ) : (
                                        <Moon className="w-5 h-5" />
                                    )}
                                    <span className="font-medium text-xs">{theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}</span>
                                </button>
                            </div>

                            {/* Language Toggle Mobile */}
                            <div className="flex items-center space-x-2 mt-3 bg-background/50 rounded-lg p-2">
                                <Languages className="w-4 h-4 text-muted-foreground" />
                                <button
                                    onClick={() => {
                                        changeLanguage('tr');
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                                        currentLanguage === 'tr'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    TR
                                </button>
                                <button
                                    onClick={() => {
                                        changeLanguage('en');
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                                        currentLanguage === 'en'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition">
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">{t('nav.logout')}</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}