// TechOS/src/pages/Login.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap } from 'lucide-react';
// import { FcGoogle } from 'react-icons/fc'; // Icono de Google

const Login = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Has iniciado sesión correctamente.',
      });
    } catch (error: any) {
      toast({
        title: 'Fallo de inicio de sesión',
        description: error.message || 'Email o contraseña inválidos.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'Error de Google',
        description: error.message || 'No se pudo iniciar sesión con Google.',
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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Academic Continuity</h1>
          <p className="text-muted-foreground">Platform for Education Management</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>Inicia sesión en tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
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

            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-muted"></div>
              <span className="mx-4 text-xs uppercase text-muted-foreground">O</span>
              <div className="flex-grow border-t border-muted"></div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
              <span className="mr-2 h-5 w-5">G</span>
              Continuar con Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;