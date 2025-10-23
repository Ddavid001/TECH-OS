import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Users, 
  CheckCircle, 
  Sparkles, 
  Building2,
  Plus,
  ArrowRight,
  MapPin
} from 'lucide-react';

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const navigate = useNavigate();

  const handleColegioElAlba = () => {
    onOpenChange(false);
    navigate('/login');
  };

  const handleNuevaInstitucion = () => {
    onOpenChange(false);
    navigate('/setup-sandbox');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            Demo Interactiva de TechOS
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Explora el sistema con dos opciones: un caso de estudio real o crea tu propia institución
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Opción 1: Colegio El Alba */}
          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group cursor-pointer" onClick={handleColegioElAlba}>
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Caso Real</span>
                </div>
              </div>
              <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                Colegio "El Alba"
              </CardTitle>
              <CardDescription className="text-sm">
                Explora un caso de estudio completo con datos reales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Ubicación */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Los Palos Grandes, Caracas, Venezuela</span>
              </div>

              {/* Características */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Incluye:</h4>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    3 Roles predefinidos (Director, Docente, Estudiante)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Sistema de asistencia con geolocalización
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Horarios y materias configurados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Datos de ejemplo realistas
                  </li>
                </ul>
              </div>

              {/* Usuarios Demo */}
              <div className="pt-3 border-t">
                <h4 className="font-semibold text-sm mb-2">Usuarios de prueba:</h4>
                <div className="flex gap-2">
                  <div className="flex-1 px-2 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-center">
                    <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">Directora</div>
                  </div>
                  <div className="flex-1 px-2 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-center">
                    <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">Docente</div>
                  </div>
                  <div className="flex-1 px-2 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-center">
                    <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Estudiante</div>
                  </div>
                </div>
              </div>

              {/* Botón de Acción */}
              <Button 
                className="w-full mt-4 group-hover:scale-105 transition-transform"
                size="lg"
              >
                Iniciar Demo con El Alba
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Opción 2: Nueva Institución (Sandbox) */}
          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group cursor-pointer" onClick={handleNuevaInstitucion}>
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <Plus className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900 border border-amber-200 dark:border-amber-800">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">Personalizado</span>
                </div>
              </div>
              <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                Nueva Institución
              </CardTitle>
              <CardDescription className="text-sm">
                Crea tu propio entorno de prueba desde cero
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Descripción */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Modo Sandbox - Configura tu propia institución</span>
              </div>

              {/* Características */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Podrás configurar:</h4>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Nombre y ubicación de tu institución
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Radio de asistencia personalizado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Usuarios y roles de ejemplo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Horarios simples de prueba
                  </li>
                </ul>
              </div>

              {/* Pasos */}
              <div className="pt-3 border-t">
                <h4 className="font-semibold text-sm mb-2">Proceso rápido:</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">1</div>
                  <span>Info básica</span>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">2</div>
                  <span>Usuarios</span>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">3</div>
                  <span>Horario</span>
                </div>
              </div>

              {/* Botón de Acción */}
              <Button 
                className="w-full mt-4 group-hover:scale-105 transition-transform"
                variant="outline"
                size="lg"
              >
                Crear Mi Institución
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Características de la Demo
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">Roles Diferentes</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-xs text-muted-foreground">Funcional</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary">GPS</div>
              <div className="text-xs text-muted-foreground">Geolocalización</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-xs text-muted-foreground">Setup Requerido</div>
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            💡 <strong>Tip:</strong> Ambas opciones te permitirán explorar todas las funcionalidades del sistema sin necesidad de configuración adicional.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;

