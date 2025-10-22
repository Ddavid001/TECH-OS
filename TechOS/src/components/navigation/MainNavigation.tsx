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
      label: 'Mapa',
      href: '/map',
      icon: MapPin,
    },
    {
      label: 'Ofertas',
      href: '/#ofertas',
      icon: Building,
    },
    {
      label: 'Postulaciones',
      href: '/#postulaciones',
      icon: FileText,
    },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="bg-[#4a4a5e] shadow-sm" role="navigation" aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" aria-label="TechOS - Ir al inicio">
              <GraduationCap className="h-7 w-7 text-white" aria-hidden="true" />
              <span className="text-lg font-bold text-white">TechOS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2" role="menubar">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                role="menuitem"
                aria-current={isActive(item.href) ? 'page' : undefined}
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge className="ml-1 bg-indigo-700 text-white text-xs px-2 py-0.5">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3" role="menubar" aria-label="Menú de usuario">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2" aria-label={`Usuario: ${user.email}`}>
                  <User className="h-4 w-4 text-gray-300" aria-hidden="true" />
                  <span className="text-sm text-white">
                    {user.email}
                  </span>
                  {userRole && (
                    <Badge className="bg-indigo-700 text-white text-xs" aria-label={`Rol: ${userRole === 'admin' ? 'Admin' : userRole === 'teacher' ? 'Profesor' : userRole === 'student' ? 'Estudiante' : 'Representante'}`}>
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
                  className="text-white hover:bg-gray-700"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                  <Link to="/login" aria-label="Iniciar sesión">Iniciar Sesión</Link>
                </Button>
                <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                  <Link to="/register" aria-label="Registrarse">Registrarse</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Abrir menú principal"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden border-t bg-white dark:bg-gray-800 dark:border-gray-700"
            role="menu"
            aria-label="Menú de navegación móvil"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground dark:bg-blue-600 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  role="menuitem"
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs" aria-label={`${item.badge} - Nuevo`}>
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
                    className="w-full justify-start text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Cerrar sesión"
                  >
                    <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <div className="border-t pt-3 mt-3 space-y-2">
                  <Button asChild variant="ghost" size="sm" className="w-full justify-start dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <Link to="/login" aria-label="Iniciar sesión">{t('signIn')}</Link>
                  </Button>
                  <Button asChild size="sm" className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <Link to="/register" aria-label="Registrarse">{t('register')}</Link>
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
