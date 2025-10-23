import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  MapPin, 
  LogOut,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { institution, demoUsers, mockAttendanceData, caracasInstitutions } from '@/data/demoData';
import { SharedBackground } from '@/components/kinetic-glass/SharedBackground';
import { KineticGlassPanel } from '@/components/kinetic-glass/KineticGlassPanel';
import { InstitutionsMapModal } from '@/components/InstitutionsMapModal';
import { CompactPremiumMap } from '@/components/CompactPremiumMap';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMapModal, setShowMapModal] = useState(false);

  // Reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Información del director desde demoData
  const directorInfo = demoUsers.director;

  // Estad isticas de asistencia
  const totalStudents = 380;
  const presentToday = 352;
  const absentToday = 20;
  const lateToday = 8;
  const attendanceRate = Math.round((presentToday / totalStudents) * 100);

  const handleLogout = () => {
    signOut();
    toast.success('Sesión cerrada exitosamente');
    navigate('/');
  };

  const mockAttendanceDataLocal = mockAttendanceData.map((inst, index) => {
    // Normalizar coordenadas al viewBox del SVG (800x600)
    const centerLat = 10.495;
    const centerLon = -66.87;
    const scale = 15000;
    
    const x = 400 + (inst.coordinates.lon - centerLon) * scale;
    const y = 300 - (inst.coordinates.lat - centerLat) * scale;
    
    return { ...inst, x, y };
  });

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Mapa Mejorado de Caracas */}
      <svg 
        viewBox="0 0 800 600" 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.4))' }}
      >
        {/* Definiciones */}
        <defs>
          {/* Grid de Fondo Mejorado */}
          <pattern id="enhanced-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="1" fill="rgba(59,130,246,0.1)" />
          </pattern>
          
          {/* Gradient para instituciones */}
          <radialGradient id="instGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        
        {/* Fondo con Grid */}
        <rect width="800" height="600" fill="url(#enhanced-grid)" />
        
        {/* Efecto de niebla/atmósfera */}
        <circle cx="400" cy="300" r="350" fill="url(#instGradient)" opacity="0.1" />

        {/* Red de "Carreteras" de Caracas - Más Realista */}
        <g opacity="0.2" stroke="#3b82f6" strokeWidth="1.5">
          {/* Autopista del Este */}
          <line x1="50" y1="320" x2="750" y2="280" strokeDasharray="8,4" />
          {/* Autopista Francisco Fajardo */}
          <line x1="100" y1="300" x2="700" y2="300" strokeWidth="2" />
          {/* Avenida Libertador */}
          <line x1="150" y1="250" x2="650" y2="350" strokeDasharray="5,3" />
          {/* Conexiones Norte-Sur */}
          <line x1="250" y1="150" x2="300" y2="450" opacity="0.5" />
          <line x1="400" y1="100" x2="400" y2="500" strokeWidth="2" opacity="0.6" />
          <line x1="550" y1="150" x2="500" y2="450" opacity="0.5" />
        </g>

        {/* Ríos de Caracas */}
        <g opacity="0.15" stroke="#06b6d4" strokeWidth="2">
          <path d="M 150 400 Q 300 380 450 390 T 700 370" fill="none" strokeDasharray="3,3" />
          <path d="M 100 350 Q 250 340 400 345 T 650 350" fill="none" strokeDasharray="2,2" />
        </g>

        {/* Instituciones Académicas de Caracas */}
        {mapInstitutions.map((inst, index) => {
          const isSelected = selectedInstitution === inst.id;
          const isMain = inst.id === 'inst-001'; // Colegio El Alba
          const size = isMain ? 18 : isSelected ? 14 : 10;
          const pulseSize = isMain ? 40 : 25;

          return (
            <g 
              key={inst.id} 
              transform={`translate(${inst.x}, ${inst.y})`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setSelectedInstitution(inst.id)}
              onMouseLeave={() => setSelectedInstitution(null)}
            >
              {/* Pulso de fondo (solo para institución principal) */}
              {isMain && (
                <>
                  <circle r={pulseSize} fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3">
                    <animate attributeName="r" values={`${pulseSize-10};${pulseSize+10};${pulseSize-10}`} dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle r={pulseSize - 10} fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.2">
                    <animate attributeName="r" values={`${pulseSize-15};${pulseSize};${pulseSize-15}`} dur="3s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {/* Aro exterior al hover */}
              {isSelected && (
                <circle 
                  r={size + 8} 
                  fill="none" 
                  stroke={inst.type === 'Privado' ? '#8b5cf6' : '#10b981'} 
                  strokeWidth="2" 
                  opacity="0.6"
                >
                  <animate attributeName="r" values={`${size + 5};${size + 10};${size + 5}`} dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Punto de la institución */}
              <circle 
                r={size} 
                fill={isMain ? '#3b82f6' : inst.type === 'Privado' ? '#8b5cf6' : '#10b981'} 
                opacity={isSelected ? 0.3 : 0.2}
              />
              <circle 
                r={size - 3} 
                fill={isMain ? '#3b82f6' : inst.type === 'Privado' ? '#8b5cf6' : '#10b981'}
              >
                {isMain && (
                  <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
                )}
              </circle>

              {/* Icono */}
              <text 
                y="5" 
                textAnchor="middle" 
                fill="white" 
                fontSize={isMain ? "14" : "10"} 
                fontWeight="bold"
              >
                {isMain ? '🏫' : inst.type === 'Privado' ? '🎓' : '🏛️'}
              </text>

              {/* Tooltip / Info Card */}
              <title>{`${inst.name}\n${inst.district}\nTipo: ${inst.type}\nEstudiantes: ${inst.students}`}</title>

              {/* Label al hover */}
              {isSelected && (
                <g transform={`translate(${size + 15}, -5)`}>
                  <rect 
                    x="0" 
                    y="-12" 
                    width={inst.name.length * 6 + 20} 
                    height="24" 
                    fill="rgba(0,0,0,0.8)" 
                    rx="4"
                  />
                  <text 
                    x="10" 
                    y="5" 
                    fill="white" 
                    fontSize="10" 
                    fontWeight="600"
                  >
                    {inst.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Pulsos de Asistencia en Tiempo Real (solo alrededor de El Alba) */}
        {pulses.slice(0, 6).map((record, index) => {
          const mainInst = mapInstitutions.find(i => i.id === 'inst-001')!;
          const angle = (index / 6) * Math.PI * 2 + (Date.now() / 1000) * 0.1;
          const distance = record.status === 'Verificado' ? 40 + Math.sin(Date.now() / 1000 + index) * 10 : 80 + Math.cos(Date.now() / 1000 + index) * 15;
          const x = mainInst.x + Math.cos(angle) * distance;
          const y = mainInst.y + Math.sin(angle) * distance;
          const isSuccess = record.status === 'Verificado';

          return (
            <g key={record.id} transform={`translate(${x}, ${y})`}>
              <circle
                r="5"
                fill="none"
                stroke={isSuccess ? '#10b981' : '#ef4444'}
                strokeWidth="1.5"
                opacity="0.6"
              >
                <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle
                r="3"
                fill={isSuccess ? '#10b981' : '#ef4444'}
                opacity="0.8"
              />
              <title>{`${record.user} - ${record.time}`}</title>
            </g>
          );
        })}
      </svg>

      {/* Leyenda Mejorada */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-400/50" />
            <span className="text-white text-xs font-medium">Tu Instituto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-white text-xs font-medium">Privados ({caracasInstitutions.filter(i => i.type === 'Privado').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-white text-xs font-medium">Públicos ({caracasInstitutions.filter(i => i.type === 'Público').length})</span>
          </div>
        </div>
        <div className="text-white/60 text-xs">
          📍 {caracasInstitutions.length} instituciones • Caracas, Venezuela
        </div>
      </div>

      {/* Panel de Información (si hay institución seleccionada) */}
      {selectedInstitution && (
        <div className="absolute top-4 right-4 max-w-xs">
          {(() => {
            const inst = caracasInstitutions.find(i => i.id === selectedInstitution)!;
            return (
              <div className="px-4 py-3 rounded-xl bg-black/60 backdrop-blur-xl border border-white/20 animate-in fade-in slide-in-from-right-2 duration-200">
                <h4 className="text-white font-semibold text-sm mb-2">{inst.name}</h4>
                <div className="space-y-1 text-xs text-white/70">
                  <p>📍 {inst.district}</p>
                  <p>🏫 Tipo: {inst.type}</p>
                  <p>👥 {inst.students} estudiantes</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMapModal, setShowMapModal] = useState(false);

  // Obtener información del director desde demoData
  const directorInfo = demoUsers.director;

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

  // Estadísticas en Tiempo Real (basadas en los datos de demo)
  const stats = {
    totalStudents: 250, // Más estudiantes de diferentes años
    presentToday: 235,
    lateToday: 5,
    absentToday: 10,
    totalTeachers: demoUsers.teachers.length,
    activeClasses: 12, // Múltiples secciones y años
    attendanceRate: Math.round((235 / 250) * 100), // 94%
    byYear: {
      1: { total: 45, present: 42 },
      2: { total: 50, present: 47 },
      3: { total: 52, present: 49 },
      4: { total: 48, present: 45 },
      5: { total: 55, present: 52 },
    }
  };

  return (
    <>
      {/* Video de Fondo Persistente */}
      <SharedBackground opacity={0.25} blur={0} />

      {/* Contenido Principal */}
      <div className="relative min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            {/* Información del Usuario */}
            <div>
              <h1 className="text-white font-bold text-2xl tracking-tight">{directorInfo.name}</h1>
              <p className="text-white/70 text-sm">{directorInfo.role} • {institution.shortName}</p>
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

        {/* Centro de Mando - Bento Grid */}
        <main className="pt-32 pb-12 px-6">
          <div className="max-w-[1600px] mx-auto">
            {/* Título de Sección */}
            <div className="mb-8">
              <h2 className="text-white text-4xl font-bold tracking-tight mb-2">Centro de Mando</h2>
              <p className="text-white/60 text-lg">Monitoreo en tiempo real del sistema de asistencia</p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Columna 1: Stats Cards */}
              <div className="lg:col-span-1 space-y-6">
                {/* Asistencia de Hoy */}
                <button
                  onClick={() => {
                    toast.success('📊 Reporte de Asistencia', {
                      description: 'Cargando estadísticas detalladas...'
                    });
                    setTimeout(() => navigate('/attendance/report'), 1000);
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
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-white text-3xl font-bold">{stats.attendanceRate}%</div>
                        <div className="text-emerald-400 text-sm font-medium">+2.5%</div>
                      </div>
                    </div>
                    <h3 className="text-white/80 text-sm font-medium mb-1">Asistencia de Hoy</h3>
                    <p className="text-white/50 text-xs">{stats.presentToday} de {stats.totalStudents} estudiantes</p>
                  </KineticGlassPanel>
                </button>

                {/* Estudiantes */}
                <button
                  onClick={() => {
                    toast.success('👥 Lista de Estudiantes', {
                      description: 'Cargando directorio completo...'
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
                    delay={100}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-white text-3xl font-bold">{stats.totalStudents}</div>
                    </div>
                    <h3 className="text-white/80 text-sm font-medium mb-1">Total Estudiantes</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-white/50">{stats.presentToday} Presentes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-white/50">{stats.lateToday} Tarde</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-white/50">{stats.absentToday} Ausentes</span>
                      </div>
                    </div>
                  </KineticGlassPanel>
                </button>

                {/* Docentes y Clases */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      toast.success('👨‍🏫 Lista de Docentes', {
                        description: 'Cargando directorio de profesores...'
                      });
                      setTimeout(() => navigate('/teachers'), 1000);
                    }}
                    className="w-full"
                  >
                    <KineticGlassPanel 
                      className="p-6 hover:scale-105 transition-transform cursor-pointer"
                      intensity={0.012}
                      blur={18}
                      opacity={0.1}
                      delay={150}
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                        <Users className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="text-white text-2xl font-bold mb-1">{stats.totalTeachers}</div>
                      <div className="text-white/60 text-xs">Docentes</div>
                    </KineticGlassPanel>
                  </button>

                  <button
                    onClick={() => {
                      toast.success('📚 Clases Activas', {
                        description: 'Ver clases en curso...'
                      });
                      setTimeout(() => navigate('/classes'), 1000);
                    }}
                    className="w-full"
                  >
                    <KineticGlassPanel 
                      className="p-6 hover:scale-105 transition-transform cursor-pointer"
                      intensity={0.012}
                      blur={18}
                      opacity={0.1}
                      delay={200}
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-white text-2xl font-bold mb-1">{stats.activeClasses}</div>
                      <div className="text-white/60 text-xs">Clases Activas</div>
                    </KineticGlassPanel>
                  </button>
                </div>
              </div>

              {/* Columna 2-3: Mapa de Geolocalización */}
              <div className="lg:col-span-2">
                <KineticGlassPanel 
                  className="p-6 h-full"
                  intensity={0.02}
                  blur={24}
                  opacity={0.08}
                  delay={250}
                >
                  <div className="mb-4">
                    <h3 className="text-white text-xl font-bold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      Mapa de Asistencia en Tiempo Real
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      Visualización geolocalizada de registros de asistencia en {caracasInstitutions.length} instituciones
                    </p>
                  </div>
                  
                  <CompactPremiumMap 
                    attendanceRecords={mockAttendanceData} 
                    onOpenFullMap={() => setShowMapModal(true)}
                  />
                </KineticGlassPanel>
              </div>

              {/* Columna Completa: Registros Recientes */}
              <div className="lg:col-span-3">
                <KineticGlassPanel 
                  className="p-6"
                  intensity={0.018}
                  blur={22}
                  opacity={0.1}
                  delay={300}
                >
                  <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    Registros Recientes de Asistencia
                  </h3>

                  <div className="space-y-3">
                    {mockAttendanceData.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          {/* Status Icon */}
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            record.status === 'Verificado' 
                              ? 'bg-emerald-500/20' 
                              : 'bg-red-500/20'
                          }`}>
                            {record.status === 'Verificado' ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                          </div>

                          {/* Info */}
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-white font-semibold">{record.user}</span>
                              <span className="text-white/40">•</span>
                              <span className="text-white/70 text-sm">{record.subject}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-white/40" />
                              <span className="text-white/50 text-xs">{record.time}</span>
                              <span className="text-white/30">•</span>
                              <MapPin className="w-3 h-3 text-white/40" />
                              <span className="text-white/50 text-xs">{record.distance}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          record.status === 'Verificado'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {record.status}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info Box */}
                  <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="text-blue-400 font-semibold text-sm mb-1">Sistema de Geolocalización</h4>
                        <p className="text-white/60 text-xs leading-relaxed">
                          Los registros se verifican automáticamente utilizando el GPS del dispositivo del estudiante. 
                          Radio de cobertura: <span className="font-semibold text-white">{institution.attendanceRadiusMeters}m</span> desde 
                          las coordenadas del instituto ({institution.coordinates.lat.toFixed(6)}, {institution.coordinates.lon.toFixed(6)}).
                        </p>
                      </div>
                    </div>
                  </div>
                </KineticGlassPanel>
              </div>

              {/* Nueva Fila: Asistencia por Año Académico */}
              <div className="lg:col-span-3">
                <KineticGlassPanel 
                  className="p-6"
                  intensity={0.018}
                  blur={22}
                  opacity={0.1}
                  delay={350}
                >
                  <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    Asistencia por Año Académico
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {Object.entries(stats.byYear).map(([year, data]: [string, any]) => {
                      const percentage = Math.round((data.present / data.total) * 100);
                      
                      return (
                        <button
                          key={year}
                          onClick={() => {
                            toast.success(`📊 ${year}° Año`, {
                              description: `${data.present}/${data.total} estudiantes presentes (${percentage}%)`
                            });
                            setTimeout(() => navigate(`/attendance/year/${year}`), 1000);
                          }}
                          className="p-5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105"
                        >
                          <div className="text-center">
                            <div className="text-white text-3xl font-bold mb-2">{year}°</div>
                            <div className="text-white/60 text-sm mb-3">Año</div>
                            
                            {/* Barra de progreso */}
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-emerald-400 font-semibold">{percentage}%</span>
                              <span className="text-white/50">{data.present}/{data.total}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </KineticGlassPanel>
              </div>

            </div>
          </div>
      </main>

      {/* Modal de Instituciones */}
      <InstitutionsMapModal open={showMapModal} onOpenChange={setShowMapModal} />
    </div>
    </>
  );
};

export default AdminDashboard;
