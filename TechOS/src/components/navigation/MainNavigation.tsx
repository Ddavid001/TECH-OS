import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { 
  MapPin, 
  FileText, 
  Home, 
  User, 
  LogOut, 
  Menu,
  X,
  GraduationCap,
  Building
} from 'lucide-react';
import { useState } from 'react';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
  badge?: string;
}

// Navigation items will be created dynamically with translations

/**
 * Main Navigation Component
 */
export const MainNavigation: React.FC = () => {
  const { user, userRole, signOut } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items with translations
  const navigationItems: NavigationItem[] = [
    {
      label: 'Inicio',
      href: '/',
      icon: Home,
    },
    {
      label: t('viewMap'),
      href: '/map',
      icon: MapPin,
    },
    {
      label: t('applications'),
      href: '/applications',
      icon: FileText,
      badge: 'Nuevo',
    },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">TechOS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground dark:bg-blue-600 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user.email}
                  </span>
                  {userRole && (
                    <Badge variant="outline" className="text-xs">
                      {userRole === 'admin' ? 'Admin' :
                       userRole === 'teacher' ? 'Profesor' :
                       userRole === 'student' ? 'Estudiante' : 'Representante'}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm" className="dark:text-gray-300 dark:hover:text-white">
                  <Link to="/login">{t('signIn')}</Link>
                </Button>
                <Button asChild size="sm" className="dark:bg-blue-600 dark:hover:bg-blue-700">
                  <Link to="/register">{t('register')}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground dark:bg-blue-600 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              
              {/* Language Switcher for Mobile */}
              <div className="border-t pt-3 mt-3">
                <div className="px-3 py-2">
                  <LanguageSwitcher />
                </div>
              </div>
              
              {user ? (
                <div className="border-t pt-3 mt-3">
                  <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                    {userRole && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {userRole === 'admin' ? 'Admin' :
                         userRole === 'teacher' ? 'Profesor' :
                         userRole === 'student' ? 'Estudiante' : 'Representante'}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="w-full justify-start text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <div className="border-t pt-3 mt-3 space-y-2">
                  <Button asChild variant="ghost" size="sm" className="w-full justify-start dark:text-gray-300 dark:hover:text-white">
                    <Link to="/login">{t('signIn')}</Link>
                  </Button>
                  <Button asChild size="sm" className="w-full dark:bg-blue-600 dark:hover:bg-blue-700">
                    <Link to="/register">{t('register')}</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
