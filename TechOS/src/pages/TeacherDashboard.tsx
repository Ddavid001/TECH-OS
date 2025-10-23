import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FileManager } from '@/components/FileManager';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  LogOut,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { institution, demoUsers } from '@/data/demoData';
import { SharedBackground } from '@/components/kinetic-glass/SharedBackground';
import { KineticGlassPanel } from '@/components/kinetic-glass/KineticGlassPanel';

const TeacherDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showFileManager, setShowFileManager] = useState(false);

  // Obtener información del docente desde demoData
  const teacherInfo = demoUsers.teachers.find(t => t.email === user?.email) || demoUsers.teachers[0];

  // Actualizar reloj en tiempo real (cada segundo)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Datos simulados
  const todayClasses = [
    { time: '07:00 - 08:30', year: '4° Año', section: 'A', students: 28, attendance: 26 },
    { time: '08:45 - 10:15', year: '5° Año', section: 'B', students: 30, attendance: 28 },
    { time: '13:00 - 14:30', year: '4° Año', section: 'B', students: 27, attendance: 0 },
  ];

  const recentActivities = [
    { action: 'Material subido', detail: 'Guía de ejercicios - Cap. 5', time: 'Hace 2 horas', icon: FileText, color: 'blue' },
    { action: 'Evaluación creada', detail: 'Examen Parcial II', time: 'Ayer', icon: CheckCircle2, color: 'emerald' },
    { action: 'Asistencia registrada', detail: '5° Año B - 28/30 estudiantes', time: 'Hace 1 hora', icon: Users, color: 'purple' },
  ];

  return (
    <>
      {/* Video de Fondo Persistente */}
      <SharedBackground opacity={0.28} blur={0} />

      {/* Contenido Principal */}
      <div className="relative min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <Calendar className="w-4 h-4 text-white/80" />
                <span className="text-white text-sm font-medium">
                  {currentTime.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <Clock className="w-4 h-4 text-white/80" />
                <span className="text-white text-sm font-medium">
                  {currentTime.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <Button 
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 backdrop-blur-xl"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="pt-32 pb-12 px-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Título de Sección */}
            <div className="mb-8">
              <h2 className="text-white text-4xl font-bold tracking-tight mb-2">Panel de Docente</h2>
              <p className="text-white/60 text-lg">Gestiona tus clases, evaluaciones y materiales</p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Columna 1: Stats Rápidas */}
              <div className="space-y-6">
                {/* Total de Estudiantes */}
                <button
                  onClick={() => {
                    toast.success('👥 Total de Estudiantes', {
                      description: 'Ver lista completa de estudiantes...'
                    });
                    setTimeout(() => navigate('/students'), 1000);
                  }}
                  className="w-full"
                >
                  <KineticGlassPanel 
                    className="p-6 hover:scale-105 transition-transform cursor-pointer"
                    intensity={0.015}
                    blur={20}
                    opacity={0.12}
                    glow
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-white text-3xl font-bold">85</div>
                    </div>
                    <h3 className="text-white/80 text-sm font-medium mb-1">Total de Estudiantes</h3>
                    <p className="text-white/50 text-xs">En 3 secciones diferentes</p>
                  </KineticGlassPanel>
                </button>

                {/* Clases de Hoy */}
                <button
                  onClick={() => {
                    toast.success('📅 Clases de Hoy', {
                      description: 'Ver horario completo del día...'
                    });
                    setTimeout(() => navigate('/schedule'), 1000);
                  }}
                  className="w-full"
                >
                  <KineticGlassPanel 
                    className="p-6 hover:scale-105 transition-transform cursor-pointer"
                    intensity={0.015}
                    blur={20}
                    opacity={0.12}
                    delay={100}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-white text-3xl font-bold">{todayClasses.length}</div>
                    </div>
                    <h3 className="text-white/80 text-sm font-medium mb-1">Clases de Hoy</h3>
                    <p className="text-white/50 text-xs">2 completadas, 1 pendiente</p>
                  </KineticGlassPanel>
                </button>

                {/* Promedio de Asistencia */}
                <button
                  onClick={() => {
                    toast.success('📊 Promedio de Asistencia', {
                      description: 'Ver estadísticas detalladas...'
                    });
                    setTimeout(() => navigate('/attendance/stats'), 1000);
                  }}
                  className="w-full"
                >
                  <KineticGlassPanel 
                    className="p-6 hover:scale-105 transition-transform cursor-pointer"
                    intensity={0.015}
                    blur={20}
                    opacity={0.12}
                    delay={150}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-white text-3xl font-bold">93%</div>
                        <div className="text-emerald-400 text-sm font-medium">+5.2%</div>
                      </div>
                    </div>
                    <h3 className="text-white/80 text-sm font-medium mb-1">Promedio de Asistencia</h3>
                    <p className="text-white/50 text-xs">Esta semana</p>
                  </KineticGlassPanel>
                </button>
              </div>

              {/* Columna 2-3: Clases de Hoy */}
              <div className="lg:col-span-2 space-y-6">
                {/* Clases Programadas */}
                <KineticGlassPanel 
                  className="p-6"
                  intensity={0.018}
                  blur={22}
                  opacity={0.1}
                  delay={200}
                >
                  <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    Clases de Hoy
                  </h3>

                  <div className="space-y-4">
                    {todayClasses.map((classItem, index) => {
                      const isCompleted = classItem.attendance > 0;
                      const attendanceRate = isCompleted ? (classItem.attendance / classItem.students * 100).toFixed(0) : 0;

                      return (
                        <div
                          key={index}
                          className="relative p-5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 group"
                        >
                          {/* Status Indicator */}
                          <div className="absolute top-5 right-5">
                            {isCompleted ? (
                              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                                <CheckCircle2 className="w-3 h-3" />
                                Completada
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">
                                <AlertCircle className="w-3 h-3" />
                                Pendiente
                              </div>
                            )}
                          </div>

                          {/* Información de la Clase */}
                          <div className="pr-32">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="text-white/60 text-sm font-mono">{classItem.time}</div>
                              <div className="text-white/40">•</div>
                              <div className="text-white font-semibold text-lg">
                                {teacherInfo.subject} - {classItem.year} {classItem.section}
                              </div>
                            </div>

                            <div className="flex items-center gap-6">
                              {/* Estudiantes */}
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-white/40" />
                                <span className="text-white/70 text-sm">{classItem.students} estudiantes</span>
                              </div>

                              {/* Asistencia */}
                              {isCompleted && (
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  <span className="text-white/70 text-sm">
                                    {classItem.attendance}/{classItem.students} ({attendanceRate}%)
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Acciones Rápidas */}
                          <div className="mt-4 flex gap-2">
                            <Button 
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/10 text-xs"
                              onClick={() => {
                                toast.success(`📚 Materiales - ${classItem.year} ${classItem.section}`, {
                                  description: 'Abriendo repositorio de materiales...'
                                });
                                setTimeout(() => navigate('/materials'), 1000);
                              }}
                            >
                              <FileText className="w-3 h-3 mr-1.5" />
                              Materiales
                            </Button>
                            <Button 
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/10 text-xs"
                              onClick={() => {
                                toast.success(`✅ Asistencia - ${classItem.year} ${classItem.section}`, {
                                  description: `${classItem.attendance}/${classItem.students} estudiantes presentes`
                                });
                                setTimeout(() => navigate('/attendance'), 1000);
                              }}
                            >
                              <Users className="w-3 h-3 mr-1.5" />
                              Asistencia
                            </Button>
                            <Button 
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/10 text-xs"
                              onClick={() => {
                                toast.success(`📝 Evaluaciones - ${classItem.year} ${classItem.section}`, {
                                  description: 'Abriendo gradebook...'
                                });
                                setTimeout(() => navigate('/gradebook'), 1000);
                              }}
                            >
                              <TrendingUp className="w-3 h-3 mr-1.5" />
                              Evaluaciones
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </KineticGlassPanel>

                {/* Actividades Recientes */}
                <KineticGlassPanel 
                  className="p-6"
                  intensity={0.016}
                  blur={20}
                  opacity={0.1}
                  delay={250}
                >
                  <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    Actividad Reciente
                  </h3>

                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => {
                      const IconComponent = activity.icon;
                      const colorMap: any = {
                        blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
                        emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
                        purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
                      };
                      const colors = colorMap[activity.color];

                      return (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300"
                        >
                          <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                            <IconComponent className={`w-5 h-5 ${colors.text}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{activity.action}</h4>
                            <p className="text-white/60 text-xs mt-0.5">{activity.detail}</p>
                          </div>
                          <span className="text-white/40 text-xs">{activity.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </KineticGlassPanel>
              </div>

            </div>

            {/* Acciones Rápidas Flotantes */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
              <Button
                size="lg"
                onClick={() => setShowFileManager(true)}
                className="h-14 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-2xl shadow-blue-500/50 hover:scale-105 transition-transform"
              >
                <FileText className="w-5 h-5 mr-2" />
                Subir Material
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* File Manager Modal */}
      <FileManager open={showFileManager} onOpenChange={setShowFileManager} />
    </>
  );
};

export default TeacherDashboard;
