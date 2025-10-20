import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap } from 'lucide-react';
import { db } from '@/lib/supabase-helper';

interface Institution {
  id: string;
  name: string;
  type: string;
}

const CompleteRegistration = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    fetchInstitutions();
  }, [user, loading, navigate]);

  const fetchInstitutions = async () => {
    try {
      const { data, error } = await db
        .from('institutions')
        .select('id, name, type')
        .order('name');

      if (error) throw error;
      setInstitutions(data || []);
    } catch (error) {
      console.error('Error fetching institutions:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las instituciones',
        variant: 'destructive',
      });
    } finally {
      setLoadingInstitutions(false);
    }
  };

  const handleCompleteRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const role = formData.get('role') as string;
    const institutionId = formData.get('institutionId') as string;

    try {
      // Create profile for the user
      const { error } = await db
        .from('profiles')
        .insert({
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          role: role,
          institution_id: institutionId,
          email: user.email,
        });

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Registro completado correctamente.',
      });

      // Refresh the page to update auth state
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Error al completar registro',
        description: error.message || 'No se pudo completar el registro',
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

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Academic Continuity</h1>
          <p className="text-muted-foreground">Complete your registration</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Completar Registro</CardTitle>
            <CardDescription>
              Bienvenido {user.email}. Por favor completa tu información para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCompleteRegistration} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Juan"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Pérez"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select name="role" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Profesor</SelectItem>
                    <SelectItem value="student">Estudiante</SelectItem>
                    <SelectItem value="representative">Representante</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institutionId">Institución</Label>
                <Select name="institutionId" required disabled={loadingInstitutions}>
                  <SelectTrigger>
                    <SelectValue placeholder={loadingInstitutions ? "Cargando..." : "Selecciona tu institución"} />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || loadingInstitutions}>
                {isLoading ? 'Completando...' : 'Completar Registro'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompleteRegistration;
