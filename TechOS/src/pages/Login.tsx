// TechOS/src/pages/Login.tsx

import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, CheckCircle } from 'lucide-react';
// import { FcGoogle } from 'react-icons/fc'; // Icono de Google

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userRole, loading, signIn } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  useEffect(() => {
    // Mostrar mensaje de confirmación si viene del registro
    if (location.state?.message) {
      setConfirmationMessage(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    if (user) {
      const dashboardMap = {
        admin: '/admin/dashboard',
        teacher: '/teacher/dashboard',
        student: '/student/dashboard',
        representative: '/representative/dashboard',
      };
      const destination = userRole ? dashboardMap[userRole] : '/profile';
      navigate(destination, { replace: true });
    }
  }, [user, userRole, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('login-email') as string;
    const password = formData.get('login-password') as string;

    try {
      await signIn(email, password);
      toast({
        title: 'Éxito',
        description: 'Has iniciado sesión correctamente.',
      });
    } catch (error: any) {
      console.error('Error completo en login:', error);
      
      // Manejo específico de errores comunes
      let errorMessage = 'Error al intentar iniciar sesión';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Por favor confirma tu email antes de iniciar sesión.';
      } else if (error.message?.includes('Too many requests')) {
        errorMessage = 'Demasiados intentos. Espera un momento antes de intentar nuevamente.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Error de inicio de sesión',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      throw new Error('OAuth no disponible en modo local');
    } catch (error: any) {
      console.error('Error completo en Google login:', error);
      
      let errorMessage = 'No se pudo iniciar sesión con Google';
      
      if (error.message?.includes('popup_blocked')) {
        errorMessage = 'El navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio.';
      } else if (error.message?.includes('access_denied')) {
        errorMessage = 'Acceso denegado. Intenta nuevamente.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: 'Error de Google',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

 if (loading) {
  // Muestra un indicador de carga centrado
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>Cargando...</div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <GraduationCap className="h-8 w-8 mr-3" />
            Academic Continuity
          </h1>
          <p className="text-lg text-white/80">Platform for Education Management</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>Inicia sesión en tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            {confirmationMessage && (
              <div className="mb-4 rounded-lg bg-green-50 p-4 border border-green-200">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-sm text-green-800">{confirmationMessage}</p>
                </div>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="login-email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Contraseña</Label>
                <Input
                  id="login-password"
                  name="login-password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            {/* Google OAuth deshabilitado - no configurado en Supabase
            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-muted"></div>
              <span className="mx-4 text-xs uppercase text-muted-foreground">O</span>
              <div className="flex-grow border-t border-muted"></div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
              <span className="mr-2 h-5 w-5">G</span>
              Continuar con Google
            </Button>
            */}

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;