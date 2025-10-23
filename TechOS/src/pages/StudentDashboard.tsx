import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Clock, MapPin, User, FileText, TrendingUp, Calendar } from 'lucide-react';
import { institution, getCurrentClass, demoUsers, academicEvents } from '@/data/demoData';
import { SharedBackground } from '@/components/kinetic-glass/SharedBackground';
import { KineticGlassPanel } from '@/components/kinetic-glass/KineticGlassPanel';
import { RadarScanner } from '@/components/kinetic-glass/RadarScanner';
import { toast } from 'sonner';

const StudentDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Obtener información del estudiante desde demoData
  const studentInfo = demoUsers.students.find(s => s.email === user?.email) || demoUsers.students[0];
  const studentYear = studentInfo.year;

  // Actualizar reloj en tiempo real (cada segundo)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { subject: currentSubject, nextSubject, isClassTime } = getCurrentClass(studentYear);
  const displaySubject = isClassTime ? currentSubject : nextSubject;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handleMarkAttendance = () => {
    setIsScanning(true);
  };

  const handleScanComplete = (success: boolean, message: string) => {
    setIsScanning(false);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      {/* Video de Fondo Persistente */}
      <SharedBackground opacity={0.3} blur={0} />

      {/* Radar Scanner Overlay */}
      <RadarScanner
        isScanning={isScanning}
        onComplete={handleScanComplete}
        institutionCoords={institution.coordinates}
      />

      {/* Contenido Principal */}
      <div className="relative min-h-screen">
        {/* Header Minimalista */}
        <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Información del Usuario */}
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">{studentInfo.name}</h1>
              <p className="text-white/60 text-sm">{studentYear}° Año • {institution.shortName}</p>
            </div>

            {/* Acciones Rápidas */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <Clock className="w-4 h-4 text-white/80" />
                <span className="text-white text-sm font-medium">
                  {currentTime.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <Calendar className="w-4 h-4 text-white/80" />
                <span className="text-white text-sm font-medium">
                  {currentTime.toLocaleDateString('es-VE', { weekday: 'short', day: 'numeric', month: 'short' })}
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

        {/* Contenido Principal - Zero UI */}
        <main className="pt-32 pb-12 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Widget de Acción Inmediata - Hero Card */}
            {displaySubject ? (
              <KineticGlassPanel 
                className="p-0 overflow-hidden"
                intensity={0.02}
                blur={24}
                opacity={0.15}
                glow={isClassTime}
                animated
              >
                <div className="relative">
                  {/* Gradient Header */}
                  <div 
                    className="h-2"
                    style={{
                      background: `linear-gradient(90deg, ${displaySubject.color}, ${displaySubject.colorLight})`,
                    }}
                  />

                  <div className="p-8 md:p-12">
                    {/* Estado de la Clase */}
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: isClassTime ? '#10b981' : '#f59e0b' }}
                      />
                      <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                        {isClassTime ? 'Clase en curso' : 'Próxima clase'}
                      </span>
                    </div>

                    {/* Información de la Materia */}
                    <h2 className="text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                      {displaySubject.name}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-6 text-white/70 mb-8">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <span className="text-lg">{displaySubject.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-lg">Salón {displaySubject.classroom}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span className="text-lg">{displaySubject.time}</span>
                      </div>
                    </div>

                    {/* Acción Principal */}
                    {isClassTime ? (
                      <div className="space-y-4">
                        <Button
                          onClick={handleMarkAttendance}
                          size="lg"
                          className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02]"
                        >
                          <MapPin className="w-6 h-6 mr-3" />
                          Marcar mi Asistencia
                        </Button>
                        <p className="text-white/50 text-center text-sm">
                          📍 Radio de verificación: {institution.attendanceRadiusMeters}m desde el instituto
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => {
                            toast.success('📚 Materiales de ' + displaySubject.name, {
                              description: 'Abriendo repositorio de materiales...'
                            });
                            setTimeout(() => navigate('/materials'), 1000);
                          }}
                          size="lg"
                          variant="outline"
                          className="flex-1 h-14 text-lg font-semibold bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-xl"
                        >
                          <FileText className="w-5 h-5 mr-2" />
                          Ver Materiales
                        </Button>
                        <Button
                          onClick={() => {
                            toast.success('📊 Calificaciones de ' + studentInfo.name, {
                              description: 'Cargando tu historial académico...'
                            });
                            setTimeout(() => navigate('/grades'), 1000);
                          }}
                          size="lg"
                          variant="outline"
                          className="flex-1 h-14 text-lg font-semibold bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-xl"
                        >
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Mis Calificaciones
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </KineticGlassPanel>
            ) : (
              // Si no hay clases programadas
              <KineticGlassPanel 
                className="p-12 text-center"
                intensity={0.015}
                blur={20}
                opacity={0.12}
              >
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-white/40" />
                <h2 className="text-white text-2xl font-bold mb-2">No hay clases programadas</h2>
                <p className="text-white/60">Disfruta tu tiempo libre</p>
              </KineticGlassPanel>
            )}

            {/* Horario de Hoy - Grid Compacto */}
            <KineticGlassPanel
              className="p-8"
              intensity={0.012}
              blur={20}
              opacity={0.1}
              delay={150}
            >
              <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horario de Hoy
              </h3>
              
              <div className="space-y-3">
                {[
                  { time: '07:00 - 08:30', subject: 'Matemáticas', teacher: 'Prof. Carlos Mendoza', color: '#3b82f6', room: 'Aula 301' },
                  { time: '08:45 - 10:15', subject: 'Física y Química', teacher: 'Prof. Roberto Sánchez', color: '#10b981', room: 'Lab 1' },
                  { time: '10:30 - 12:00', subject: 'Castellano y Literatura', teacher: 'Profa. Laura Ramírez', color: '#f59e0b', room: 'Aula 302' },
                  { time: '13:00 - 14:30', subject: 'GHC', teacher: 'Profa. Carmen Silva', color: '#8b5cf6', room: 'Aula 205' },
                ].map((classItem, index) => (
                  <button
                    key={index}
                    onClick={() => toast.info(`📚 ${classItem.subject} en ${classItem.room}`)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all duration-300 group"
                  >
                    <div 
                      className="w-1 h-12 rounded-full"
                      style={{ backgroundColor: classItem.color }}
                    />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-semibold text-lg">{classItem.subject}</h4>
                        <span className="text-white/60 text-sm">{classItem.time}</span>
                      </div>
                      <p className="text-white/60 text-sm">{classItem.teacher} • {classItem.room}</p>
                    </div>
                  </button>
                ))}
              </div>
            </KineticGlassPanel>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Asistencia', value: '95%', icon: TrendingUp, color: '#10b981', action: 'Ver historial de asistencia' },
                { label: 'Materias', value: '8', icon: BookOpen, color: '#3b82f6', action: 'Ver lista de materias inscritas' },
                { label: 'Promedio', value: '18.5', icon: TrendingUp, color: '#f59e0b', action: 'Ver detalles de calificaciones' },
              ].map((stat, index) => (
                <button
                  key={index}
                  onClick={() => {
                    toast.success(`📊 ${stat.action}`, {
                      description: 'Cargando información...'
                    });
                  }}
                  className="w-full"
                >
                  <KineticGlassPanel
                    className="p-6 hover:scale-105 transition-transform cursor-pointer"
                    intensity={0.01}
                    blur={16}
                    opacity={0.08}
                    delay={200 + index * 50}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <div className="text-left">
                        <p className="text-white/60 text-sm">{stat.label}</p>
                        <p className="text-white text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </KineticGlassPanel>
                </button>
              ))}
            </div>

            {/* Próximos Eventos Académicos */}
            <KineticGlassPanel
              className="p-8"
              intensity={0.015}
              blur={20}
              opacity={0.1}
              delay={300}
            >
              <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                Próximos Eventos
              </h3>
              
              <div className="space-y-3">
                {academicEvents
                  .filter(event => !event.year || event.year === studentYear)
                  .slice(0, 4)
                  .map((event, index) => {
                    const eventDate = new Date(event.date);
                    const daysUntil = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    
                    const typeColors: any = {
                      exam: { bg: 'bg-red-500/20', text: 'text-red-400', icon: '📝' },
                      assignment: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: '📋' },
                      meeting: { bg: 'bg-purple-500/20', text: 'text-purple-400', icon: '👥' },
                      activity: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: '🎉' },
                      workshop: { bg: 'bg-amber-500/20', text: 'text-amber-400', icon: '🎨' },
                    };
                    
                    const colors = typeColors[event.type] || typeColors.activity;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          toast.success(`📅 ${event.title}`, {
                            description: `${event.date} a las ${event.time} en ${event.location}`
                          });
                        }}
                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all duration-300 group"
                      >
                        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                          <span className="text-2xl">{colors.icon}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="text-white font-semibold text-base">{event.title}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs ${colors.text}`}>
                              {daysUntil === 0 ? 'Hoy' : daysUntil === 1 ? 'Mañana' : `En ${daysUntil} días`}
                            </span>
                            <span className="text-white/40 text-xs">•</span>
                            <span className="text-white/60 text-xs">{event.time}</span>
                            <span className="text-white/40 text-xs">•</span>
                            <span className="text-white/60 text-xs">{event.location}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>

              {academicEvents.filter(e => !e.year || e.year === studentYear).length > 4 && (
                <Button
                  onClick={() => {
                    toast.success('📅 Calendario Completo', {
                      description: 'Cargando todos los eventos académicos...'
                    });
                    setTimeout(() => navigate('/calendar'), 1000);
                  }}
                  variant="ghost"
                  className="w-full mt-4 text-white hover:bg-white/10"
                >
                  Ver todos los eventos →
                </Button>
              )}
            </KineticGlassPanel>

          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
