import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();

  console.log('ProtectedRoute - Estado:', { user: !!user, userRole, loading }); // TODO: Remover en producción

  if (loading) {
    console.log('ProtectedRoute - Mostrando loader'); // TODO: Remover en producción
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute - Usuario no autenticado, redirigiendo a login'); // TODO: Remover en producción
    return <Navigate to="/login" replace />;
  }

  // If user exists but has no role, they need to complete registration
  if (user && !userRole) {
    console.log('ProtectedRoute - Usuario sin rol, redirigiendo a completar registro'); // TODO: Remover en producción
    return <Navigate to="/complete-registration" replace />;
  }

  console.log('ProtectedRoute - Acceso permitido'); // TODO: Remover en producción
  return <>{children}</>;
};
