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
import { GraduationCap, CheckCircle2, UploadCloud } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, register: registerUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

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
      toast({ title: 'Cuenta creada', description: 'Se creó tu cuenta en modo local.' });
      setStep(2);
    } catch (e: any) {
      toast({ title: 'Error al registrar', description: e.message || 'Intenta nuevamente', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      throw new Error('OAuth no disponible en modo local');
    } catch (error: any) {
      toast({
        title: 'Error de Google',
        description: error.message || 'No se pudo registrar con Google.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
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

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Step Indicator */}
        <div className="mb-6 grid grid-cols-4 gap-2 text-center text-xs">
          {[1,2,3,4].map(n => (
            <div key={n} className={`rounded-full py-2 ${n <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{`Paso ${n}`}</div>
          ))}
        </div>

        {/* Step 1 - Account */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Crear Cuenta</CardTitle>
              <CardDescription>Datos básicos para tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Juan" />
                </div>
                <div className="space-y-2">
                  <Label>Apellido</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Pérez" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@gmail.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contraseña</Label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>Confirmar</Label>
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select value={role} onValueChange={(v: any) => setRole(v)}>
                  <SelectTrigger><SelectValue placeholder="Selecciona tu rol" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Profesor</SelectItem>
                    <SelectItem value="student">Estudiante</SelectItem>
                    <SelectItem value="representative">Representante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild><Link to="/login">Ya tengo cuenta</Link></Button>
                <Button onClick={handleCreateAccount} disabled={!canNextFromAccount || isLoading}>{isLoading ? 'Creando...' : 'Continuar'}</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2 - Professional Profile */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Perfil Profesional</CardTitle>
              <CardDescription>Cuéntanos sobre tu experiencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título profesional</Label>
                <Input placeholder="Profesor de Matemáticas de Secundaria" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Acerca de</Label>
                <Textarea placeholder="Resumen profesional" value={about} onChange={(e) => setAbout(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Años de experiencia</Label>
                  <Input type="number" value={experienceYears} onChange={(e) => setExperienceYears(parseInt(e.target.value || '0'))} />
                </div>
                <div className="space-y-2">
                  <Label>Nivel educativo</Label>
                  <Select value={educationLevel} onValueChange={setEducationLevel as any}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Licenciado">Licenciado</SelectItem>
                      <SelectItem value="Magister">Magister</SelectItem>
                      <SelectItem value="Doctorado">Doctorado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Especialidades (separadas por coma)</Label>
                <Input placeholder="Matemáticas, Física" value={specialties} onChange={(e) => setSpecialties(e.target.value)} />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Atrás</Button>
                <Button onClick={() => setStep(3)} disabled={!title}>Continuar</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 - Documents */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Documentos Obligatorios</CardTitle>
              <CardDescription>Sube tus documentos (simulado en modo local)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cédula - Frente</Label>
                  <Input type="file" accept="image/*,application/pdf" onChange={(e) => setIdFront(e.target.files?.[0] || null)} />
                </div>
                <div className="space-y-2">
                  <Label>Cédula - Reverso</Label>
                  <Input type="file" accept="image/*,application/pdf" onChange={(e) => setIdBack(e.target.files?.[0] || null)} />
                </div>
                <div className="space-y-2">
                  <Label>Constancia de Residencia</Label>
                  <Input type="file" accept="image/*,application/pdf" onChange={(e) => setResidence(e.target.files?.[0] || null)} />
                </div>
                <div className="space-y-2">
                  <Label>Currículum (PDF)</Label>
                  <Input type="file" accept="application/pdf" onChange={(e) => setCv(e.target.files?.[0] || null)} />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Atrás</Button>
                <Button onClick={() => setStep(4)} disabled={!idFront || !idBack || !residence || !cv}><UploadCloud className="h-4 w-4 mr-2" />Continuar</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4 - Review */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Verificación y Aprobación</CardTitle>
              <CardDescription>Tu perfil será revisado por nuestro equipo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 bg-muted">
                <p className="flex items-center text-sm"><CheckCircle2 className="h-4 w-4 text-green-600 mr-2" /> Tu perfil se ha enviado para verificación.</p>
                <p className="text-sm text-muted-foreground mt-1">Recibirás un correo cuando sea aprobado.</p>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>Atrás</Button>
                <Button onClick={() => navigate('/login')}>Finalizar</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Register;

