import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const SandboxSetupStep3 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [institution, setInstitution] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Cargar datos de los pasos anteriores
    const institutionData = localStorage.getItem('sandbox_institution');
    const usersData = localStorage.getItem('sandbox_users');

    if (institutionData) {
      setInstitution(JSON.parse(institutionData));
    }
    if (usersData) {
      setUsers(JSON.parse(usersData));
    }
  }, []);

  const toggleScheduleSlot = (day: number, hour: string) => {
    const key = `${day}-${hour}`;
    const newSchedule = { ...schedule };
    
    if (newSchedule[key]) {
      delete newSchedule[key];
    } else {
      newSchedule[key] = 'class';
    }
    
    setSchedule(newSchedule);
  };

  const handleFinish = async () => {
    setIsCreating(true);

    try {
      // Simular creación del sandbox
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Guardar configuración completa
      const sandboxConfig = {
        institution,
        users,
        schedule,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('sandbox_config', JSON.stringify(sandboxConfig));

      toast({
        title: '🎉 ¡Sandbox creado!',
        description: 'Tu institución ha sido configurada exitosamente',
      });

      // Limpiar datos temporales
      localStorage.removeItem('sandbox_institution');
      localStorage.removeItem('sandbox_users');

      // Redirigir al login o dashboard
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema al crear el sandbox',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const scheduledSlots = Object.keys(schedule).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Configuración del Sandbox</h1>
          <p className="text-muted-foreground">Paso 3 de 3: Crear horario visual (opcional)</p>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2">
          <div className="w-32 h-2 bg-primary rounded-full" />
          <div className="w-32 h-2 bg-primary rounded-full" />
          <div className="w-32 h-2 bg-primary rounded-full" />
        </div>

        {/* Summary Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2">
          <CardHeader>
            <CardTitle>Resumen de Configuración</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Institución</div>
                <div className="font-semibold">{institution?.name || 'No configurada'}</div>
                <div className="text-xs text-muted-foreground">{institution?.type}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Usuarios</div>
                <div className="font-semibold">{users.length} usuarios</div>
                <div className="text-xs text-muted-foreground">
                  {users.filter(u => u.role === 'teacher').length} docentes,{' '}
                  {users.filter(u => u.role === 'student').length} estudiantes
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Radio GPS</div>
                <div className="font-semibold">{institution?.attendanceRadius}m</div>
                <div className="text-xs text-muted-foreground">
                  📍 {institution?.latitude?.toFixed(3)}, {institution?.longitude?.toFixed(3)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle>Horario Visual</CardTitle>
              </div>
              <Badge variant="secondary">{scheduledSlots} bloques seleccionados</Badge>
            </div>
            <CardDescription>
              Click en los bloques para marcar los horarios de clases (opcional, puedes saltar este paso)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Header con días */}
                <div className="grid grid-cols-8 gap-1 mb-2">
                  <div className="text-xs font-semibold text-center p-2"></div>
                  {DAYS.slice(1, 6).map(day => (
                    <div key={day} className="text-xs font-semibold text-center p-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Filas de horarios */}
                {HOURS.map(hour => (
                  <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
                    <div className="text-xs font-semibold text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      {hour}
                    </div>
                    {[1, 2, 3, 4, 5].map(day => {
                      const key = `${day}-${hour}`;
                      const isSelected = schedule[key];
                      
                      return (
                        <button
                          key={key}
                          onClick={() => toggleScheduleSlot(day, hour)}
                          className={`p-2 rounded transition-colors text-xs ${
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {isSelected ? '✓' : ''}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              💡 Los bloques azules representan horarios de clases programadas
            </p>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/setup-sandbox/step2')}
            disabled={isCreating}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleFinish}
              disabled={isCreating}
            >
              Saltar este paso
            </Button>
            <Button
              onClick={handleFinish}
              disabled={isCreating}
              className="min-w-[200px]"
            >
              {isCreating ? (
                'Creando sandbox...'
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Finalizar y Crear
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxSetupStep3;

