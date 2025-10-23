import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  GraduationCap, 
  CheckCircle, 
  UploadCloud, 
  MapPin, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  FileText,
  Award,
  Shield
} from 'lucide-react';
import { InstitutionsMapModal } from '@/components/InstitutionsMapModal';
import { SharedBackground } from '@/components/kinetic-glass/SharedBackground';
import { KineticGlassPanel } from '@/components/kinetic-glass/KineticGlassPanel';

const Register = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, register: registerUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showMapModal, setShowMapModal] = useState(false);

  // Step 1: account
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'teacher' | 'student' | 'representative'>('teacher');

  // Step 2: profile
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [specialties, setSpecialties] = useState<string>('');
  const [educationLevel, setEducationLevel] = useState('Licenciado');

  // Step 3: documents
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [residence, setResidence] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);

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

  const canNextFromAccount = useMemo(() => {
    return firstName && lastName && email.includes('@') && password.length >= 6 && password === confirmPassword;
  }, [firstName, lastName, email, password, confirmPassword]);

  const handleCreateAccount = async () => {
    setIsLoading(true);
    try {
      await registerUser(email, password, firstName, lastName, role);
      toast({ title: 'Cuenta creada', description: 'Se creó tu cuenta exitosamente.' });
      setStep(2);
    } catch (e: any) {
      toast({ title: 'Error al registrar', description: e.message || 'Intenta nuevamente', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Video de Fondo con Kinetic Glass */}
      <SharedBackground opacity={0.3} blur={0} />
      
      <div className="relative min-h-screen">
        {/* Header Premium con Glass Effect */}
        <header className="relative py-20 overflow-hidden">
          {/* Overlay para mejor contraste */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center mb-6 animate-in fade-in slide-in-from-top duration-700">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center shadow-2xl">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-2xl animate-in fade-in slide-in-from-top duration-700 delay-100">
              Únete a TechOS
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6 drop-shadow-lg animate-in fade-in slide-in-from-top duration-700 delay-200">
              Plataforma líder en gestión educativa innovadora
            </p>
            
            {/* Stats con Glass Effect */}
            <div className="flex items-center justify-center gap-8 mt-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              <div className="px-6 py-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="text-3xl font-bold text-white">3,770+</div>
                <div className="text-sm text-white/70">Estudiantes</div>
              </div>
              <div className="px-6 py-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="text-3xl font-bold text-white">8</div>
                <div className="text-sm text-white/70">Instituciones</div>
              </div>
              <div className="px-6 py-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-white/70">Seguro</div>
              </div>
            </div>
          </div>
        </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-3">
            {[
              { num: 1, label: 'Cuenta', icon: User },
              { num: 2, label: 'Perfil', icon: Award },
              { num: 3, label: 'Documentos', icon: FileText },
              { num: 4, label: 'Verificación', icon: Shield }
            ].map(({ num, label, icon: Icon }, index) => (
              <div key={num} className="flex items-center">
                <div className={`flex flex-col items-center ${num <= step ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    num === step 
                      ? 'bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/50 scale-110' 
                      : num < step 
                      ? 'bg-emerald-500' 
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`}>
                    {num < step ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${num === step ? 'text-primary' : 'text-muted-foreground'}`}>
                    {label}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    num < step ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 - Account */}
        {step === 1 && (
          <KineticGlassPanel 
            className="p-8 animate-in fade-in slide-in-from-bottom"
            intensity={0.015}
            blur={24}
            opacity={0.08}
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-4 ring-blue-500/20">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Crear Cuenta</h2>
                  <p className="text-white/70 text-sm mt-1">Ingresa tus datos básicos para comenzar</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombre
                  </Label>
                  <Input 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="Juan" 
                    className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white">Apellido</Label>
                  <Input 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Pérez" 
                    className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Correo Electrónico
                </Label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="tu@email.com" 
                  className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              {/* Contraseñas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Contraseña
                  </Label>
                  <Input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white">Confirmar Contraseña</Label>
                  <Input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* Rol */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Tu Rol
                </Label>
                <Select value={role} onValueChange={(v: any) => setRole(v)}>
                  <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Selecciona tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Profesor
                      </div>
                    </SelectItem>
                    <SelectItem value="student">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Estudiante
                      </div>
                    </SelectItem>
                    <SelectItem value="representative">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Representante
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Requisitos */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                <h4 className="font-semibold text-sm mb-3 text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Requisitos de contraseña:
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${password.length >= 6 ? 'text-emerald-400' : 'text-white/30'}`} />
                    Mínimo 6 caracteres
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${password === confirmPassword && password.length > 0 ? 'text-emerald-400' : 'text-white/30'}`} />
                    Las contraseñas coinciden
                  </li>
                </ul>
              </div>

              {/* Botones */}
              <div className="flex justify-between gap-3 pt-4">
                <Button variant="outline" asChild size="lg" className="w-1/3 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Link to="/login">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Ya tengo cuenta
                  </Link>
                </Button>
                <Button 
                  onClick={handleCreateAccount} 
                  disabled={!canNextFromAccount || isLoading}
                  size="lg"
                  className="flex-1 group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? 'Creando...' : 'Continuar'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </KineticGlassPanel>
        )}

        {/* Step 2 - Professional Profile */}
        {step === 2 && (
          <Card className="border-2 hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom">
            <CardHeader className="space-y-3 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg ring-4 ring-purple-500/20">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Perfil Profesional
                  </CardTitle>
                  <CardDescription>Cuéntanos sobre tu experiencia</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Título Profesional</Label>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Ej: Licenciado en Educación" 
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Acerca de ti</Label>
                <Textarea 
                  value={about} 
                  onChange={(e) => setAbout(e.target.value)} 
                  placeholder="Describe brevemente tu experiencia..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Años de Experiencia</Label>
                  <Input 
                    type="number" 
                    value={experienceYears} 
                    onChange={(e) => setExperienceYears(Number(e.target.value))} 
                    min={0}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Nivel Educativo</Label>
                  <Select value={educationLevel} onValueChange={setEducationLevel}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bachiller">Bachiller</SelectItem>
                      <SelectItem value="Técnico">Técnico</SelectItem>
                      <SelectItem value="Licenciado">Licenciado</SelectItem>
                      <SelectItem value="Magíster">Magíster</SelectItem>
                      <SelectItem value="Doctor">Doctor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Especialidades (separadas por coma)</Label>
                <Input 
                  value={specialties} 
                  onChange={(e) => setSpecialties(e.target.value)} 
                  placeholder="Ej: Matemáticas, Física, Química"
                  className="h-11"
                />
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Atrás
                </Button>
                <Button onClick={() => setStep(3)} size="lg" className="flex-1 group">
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 - Documents */}
        {step === 3 && (
          <Card className="border-2 hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom">
            <CardHeader className="space-y-3 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg ring-4 ring-emerald-500/20">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                    Documentos
                  </CardTitle>
                  <CardDescription>Sube tus documentos de verificación</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: 'Cédula (Frontal)', file: idFront, setter: setIdFront },
                { label: 'Cédula (Reverso)', file: idBack, setter: setIdBack },
                { label: 'Constancia de Residencia', file: residence, setter: setResidence },
                { label: 'Curriculum Vitae', file: cv, setter: setCv }
              ].map(({ label, file, setter }) => (
                <div key={label} className="space-y-2">
                  <Label className="text-sm font-semibold">{label}</Label>
                  <div className="relative">
                    <Input 
                      type="file" 
                      onChange={(e) => setter(e.target.files?.[0] || null)}
                      className="h-11"
                    />
                    {file && (
                      <div className="mt-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-emerald-700 dark:text-emerald-300">{file.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <UploadCloud className="w-4 h-4 inline mr-2" />
                  <strong>Formatos aceptados:</strong> PDF, JPG, PNG (máx. 5MB)
                </p>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(2)} size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Atrás
                </Button>
                <Button 
                  onClick={() => setStep(4)} 
                  disabled={!idFront || !idBack || !residence || !cv}
                  size="lg"
                  className="flex-1 group"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4 - Review */}
        {step === 4 && (
          <Card className="border-2 hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom">
            <CardHeader className="space-y-3 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg ring-4 ring-amber-500/20">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                    Verificación y Aprobación
                  </CardTitle>
                  <CardDescription>Tu perfil será revisado por nuestro equipo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border-2 border-emerald-200 dark:border-emerald-800 p-6 bg-emerald-50 dark:bg-emerald-950 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
                  ¡Registro Completado!
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400">
                  Tu perfil se ha enviado para verificación. Recibirás un correo cuando sea aprobado.
                </p>
              </div>

              {/* Próximos Pasos */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Próximos pasos:
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span>Revisaremos tu perfil en las próximas 24-48 horas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span>Recibirás un correo de confirmación cuando sea aprobado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span>Podrás acceder a todas las funcionalidades de la plataforma</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(3)} size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Atrás
                </Button>
                <Button onClick={() => navigate('/login')} size="lg" className="flex-1 group">
                  Ir al Login
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instituciones Card */}
        <Card className="mt-8 border-2 border-primary/30 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 animate-in fade-in slide-in-from-bottom delay-200">
          <CardHeader className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Red de Instituciones Educativas
              </span>
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Descubre el ecosistema educativo de Caracas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">8 Instituciones Educativas en Caracas</h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  Explora el mapa interactivo de instituciones educativas. 
                  Conoce ubicaciones, tipos y población estudiantil de cada centro educativo.
                </p>
              </div>
              <Button 
                size="lg"
                onClick={() => setShowMapModal(true)}
                className="mt-2 group"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Ver Mapa de Instituciones
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 w-full mt-4">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-center">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">Privadas</div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-center">
                  <div className="text-2xl font-bold text-emerald-600">4</div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-300">Públicas</div>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 text-center">
                  <div className="text-2xl font-bold text-purple-600">3.7K+</div>
                  <div className="text-xs text-purple-700 dark:text-purple-300">Estudiantes</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Footer */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                ¿Quieres probar antes de registrarte?
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                Explora nuestra demo interactiva con datos reales del Colegio "El Alba" y conoce todas las funcionalidades sin necesidad de registro.
              </p>
              <Button variant="outline" asChild size="sm">
                <Link to="/#demo" className="inline-flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Ir a la Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

        {/* Modal de Instituciones */}
        <InstitutionsMapModal open={showMapModal} onOpenChange={setShowMapModal} />
      </div>
    </>
  );
};

export default Register;
