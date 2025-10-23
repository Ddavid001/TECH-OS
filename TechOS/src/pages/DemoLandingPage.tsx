import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Wrench, ArrowRight, School, Users, Home, MapPin, Calendar, BookOpen, TrendingUp } from 'lucide-react';

const DemoLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Navigation Bar - Estilo Original */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                Iniciar Sesión
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className="bg-primary hover:bg-primary/90"
              >
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Estilo Minimalista */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern Sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm bg-white dark:bg-gray-800 shadow-sm">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Sistema de Demostración</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
              Explora TechOS
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                en Acción
              </span>
            </h1>

            {/* Descripción */}
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Experimenta la plataforma completa de gestión educativa. 
              Elige entre una demo guiada o crea tu propio entorno personalizado.
            </p>

            {/* Stats Rápidos */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Gratuito</div>
              </div>
              <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">3 min</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Configuración</div>
              </div>
              <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Instalación</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Options Section - Diseño Premium */}
      <section className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Dos Formas de Explorar
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Elige la experiencia que mejor se adapte a tus necesidades
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Demo Guiada - Colegio El Alba */}
              <Card className="group relative overflow-hidden border-2 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl bg-white dark:bg-gray-900">
                {/* Badge Recomendado */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
                    Recomendado
                  </span>
                </div>

                <CardHeader className="space-y-6 pb-8">
                  {/* Icono */}
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    <School className="h-8 w-8" />
                  </div>

                  <div>
                    <CardTitle className="text-2xl mb-2">Colegio "El Alba"</CardTitle>
                    <CardDescription className="text-base">
                      Demo Guiada del Caso de Estudio Real
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Características */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-green-100 dark:bg-green-900 p-1">
                        <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Unidad Educativa Privada real de Los Palos Grandes, Caracas
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-green-100 dark:bg-green-900 p-1">
                        <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Acceso rápido como Directora, Docente o Estudiante
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-green-100 dark:bg-green-900 p-1">
                        <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Sistema de asistencia con verificación GPS activa
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-green-100 dark:bg-green-900 p-1">
                        <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Horarios, evaluaciones y materiales de ejemplo
                      </p>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>Los Palos Grandes, Miranda, Venezuela</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all group"
                  >
                    Explorar Demo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>

              {/* Sandbox */}
              <Card className="group relative overflow-hidden border-2 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-2xl bg-white dark:bg-gray-900">
                <CardHeader className="space-y-6 pb-8">
                  {/* Icono */}
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                    <Wrench className="h-8 w-8" />
                  </div>

                  <div>
                    <CardTitle className="text-2xl mb-2">Nueva Institución</CardTitle>
                    <CardDescription className="text-base">
                      Sandbox Interactivo
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Características */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-purple-100 dark:bg-purple-900 p-1">
                        <svg className="h-3 w-3 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Configura tu institución con nombre y ubicación GPS
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-purple-100 dark:bg-purple-900 p-1">
                        <svg className="h-3 w-3 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Define el radio de asistencia personalizado
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-purple-100 dark:bg-purple-900 p-1">
                        <svg className="h-3 w-3 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Agrega usuarios: docentes, estudiantes y administrativos
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-purple-100 dark:bg-purple-900 p-1">
                        <svg className="h-3 w-3 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Crea horarios de clases visuales interactivos
                      </p>
                    </div>
                  </div>

                  {/* Tiempo */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>Configuración en 3 pasos (~3 minutos)</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => navigate('/setup-sandbox')}
                    variant="outline"
                    className="w-full h-12 text-base font-semibold border-2 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent transition-all group"
                  >
                    Crear Mi Institución
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Todo lo que Necesitas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Un sistema completo para la gestión educativa moderna
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Gestión de Usuarios
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Administra roles, permisos y accesos de toda tu comunidad educativa
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Calendario Académico
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Calendario unificado con eventos, evaluaciones y materiales didácticos
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 hover:shadow-lg transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Asistencia GPS
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Verificación de asistencia con geolocalización y radio personalizable
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-400 hover:shadow-lg transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Libro de Calificaciones
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Sistema completo de evaluaciones y seguimiento académico
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-yellow-500 dark:hover:border-yellow-400 hover:shadow-lg transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Multi-Institución
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Gestiona múltiples sedes y campus desde una sola plataforma
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                  <School className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Ofertas Laborales
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Conecta instituciones con profesionales educativos calificados
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Estilo Original */}
      <footer className="border-t bg-white dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 TechOS. Sistema de Gestión Educativa para Venezuela.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <button onClick={() => navigate('/')} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                Inicio
              </button>
              <span>·</span>
              <button onClick={() => navigate('/login')} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Logo Flotante - Minimalista en Esquina Inferior Derecha */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
          <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">TechOS</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Demo</span>
        </div>
      </div>
    </div>
  );
};

export default DemoLandingPage;
