// TechOS/src/pages/Login.tsx

import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, CheckCircle, UserCog, User, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { demoUsers } from '@/data/demoData';
import { SharedBackground } from '@/components/kinetic-glass/SharedBackground';
import { KineticGlassPanel } from '@/components/kinetic-glass/KineticGlassPanel';
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

  // Credenciales de demo del Colegio El Alba
  const DEMO_CREDENTIALS = {
    director: {
      email: demoUsers.director.email,
      password: demoUsers.director.password,
      name: demoUsers.director.name,
      role: demoUsers.director.position,
    },
    teacher: {
      email: demoUsers.teachers[0].email,
      password: demoUsers.teachers[0].password,
      name: demoUsers.teachers[0].name,
      role: `Docente de ${demoUsers.teachers[0].subject}`,
    },
    student: {
      email: demoUsers.students[0].email,
      password: demoUsers.students[0].password,
      name: demoUsers.students[0].name,
      role: `Estudiante - ${demoUsers.students[0].year}° Año`,
    },
  };

  const handleDemoLogin = async (role: 'director' | 'teacher' | 'student') => {
    setIsLoading(true);
    const credentials = DEMO_CREDENTIALS[role];
    
    try {
      // Llenar el formulario
      const emailInput = document.getElementById('login-email') as HTMLInputElement;
      const passwordInput = document.getElementById('login-password') as HTMLInputElement;
      
      if (emailInput && passwordInput) {
        emailInput.value = credentials.email;
        passwordInput.value = credentials.password;
      }

      // Simular login
      await signIn(credentials.email, credentials.password);
      
      toast({
        title: `¡Bienvenido ${credentials.name}! 🎓`,
        description: `${credentials.role} - Colegio El Alba`,
      });
    } catch (error: any) {
      toast({
        title: 'Error en demo',
        description: 'Las credenciales de demo no están configuradas. Usa el modo sandbox o crea una cuenta.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

 if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-white text-lg animate-pulse">Cargando...</div>
    </div>
  );
}

  return (
    <>
      {/* Video de Fondo Persistente - Transición desde Landing */}
      <SharedBackground opacity={0.35} blur={2} />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        {/* Logo Header */}
        <div className="absolute top-8 left-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">TechOS</h1>
              <p className="text-white/60 text-xs">Academic Platform</p>
            </div>
          </Link>
        </div>

        {/* Login Card con Kinetic Glass */}
        <div className="w-full max-w-md">
          <KineticGlassPanel 
            className="p-8"
            intensity={0.02}
            blur={24}
            opacity={0.15}
            glow
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-white text-3xl font-bold mb-2">Bienvenido</h2>
              <p className="text-white/70 text-sm">Inicia sesión en tu cuenta</p>
            </div>

            {/* Mensaje de Confirmación */}
            {confirmationMessage && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm text-emerald-200">{confirmationMessage}</p>
                </div>
              </div>
            )}

            {/* Form de Login */}
            <form onSubmit={handleLogin} className="space-y-5 mb-6">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-white/90">Email</Label>
                <Input
                  id="login-email"
                  name="login-email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-white/90">Contraseña</Label>
                <Input
                  id="login-password"
                  name="login-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 backdrop-blur-sm"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            {/* Separator */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white/60">Acceso Rápido</span>
              </div>
            </div>

            {/* Demo Login Section */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-white font-semibold text-sm mb-1 flex items-center justify-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Demo "Colegio El Alba"
                </h3>
                <p className="text-white/60 text-xs">
                  Explora el sistema con un rol predefinido
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('director')}
                  disabled={isLoading}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-blue-500/50 transition-all group disabled:opacity-50"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <UserCog className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-white text-xs font-semibold">Directora</span>
                  <span className="text-white/50 text-[10px]">Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('teacher')}
                  disabled={isLoading}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-purple-500/50 transition-all group disabled:opacity-50"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <User className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-white text-xs font-semibold">Docente</span>
                  <span className="text-white/50 text-[10px]">{demoUsers.teachers[0].subject}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('student')}
                  disabled={isLoading}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-emerald-500/50 transition-all group disabled:opacity-50"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                    <Users className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-white text-xs font-semibold">Estudiante</span>
                  <span className="text-white/50 text-[10px]">{demoUsers.students[0].year}° Año</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-white/50 text-xs">🏫 Los Palos Grandes, Miranda, Venezuela</p>
              </div>
            </div>

            {/* Footer Link */}
            <div className="mt-6 text-center pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </KineticGlassPanel>

          {/* Volver Link */}
          <div className="text-center mt-6">
            <Link 
              to="/" 
              className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;