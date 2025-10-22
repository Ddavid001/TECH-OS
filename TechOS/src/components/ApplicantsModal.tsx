import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, AlertCircle, CheckCircle } from 'lucide-react';
import { Dialog as UiDialog, DialogContent as UiDialogContent, DialogHeader as UiDialogHeader, DialogTitle as UiDialogTitle } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { LOCAL_TEACHER_PROFILES } from '@/data/local-applicants';

interface TeacherProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

interface ApplicantsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApplicantsModal = ({ open, onOpenChange }: ApplicantsModalProps) => {
  const { t } = useTranslation();
  const [applicants, setApplicants] = useState<TeacherProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    if (open) {
      fetchApplicants();
    }
  }, [open]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError(null);
      // Local mode: use static applicants
      setApplicants(LOCAL_TEACHER_PROFILES);
    } catch (err: any) {
      setError('No se pudieron cargar los perfiles locales');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    return `${local.slice(0, 2)}***@${domain}`;
  };

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            Profesores Postulantes
          </DialogTitle>
          <DialogDescription>
            Perfiles de docentes registrados en la plataforma
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-col items-center">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <Skeleton className="h-4 w-24 mt-2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-destructive text-center">{error}</p>
              <Button onClick={fetchApplicants} className="mt-4">
                Reintentar
              </Button>
            </div>
          )}

          {!loading && !error && applicants.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No hay perfiles disponibles
              </p>
            </div>
          )}

          {!loading && !error && applicants.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {applicants.map((applicant) => (
                <Card key={applicant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-col items-center text-center pb-3">
                    <Avatar className="h-16 w-16 mb-3">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white text-lg font-semibold">
                        {getInitials(applicant.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-sm font-semibold">
                      {applicant.full_name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{maskEmail(applicant.email)}</p>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {(LOCAL_TEACHER_PROFILES.find(p => p.id === applicant.id)?.expertise || []).slice(0,2).map((tag, i) => (
                        <Badge key={i} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelected(LOCAL_TEACHER_PROFILES.find(p => p.id === applicant.id))}
                    >
                      Ver Perfil
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && applicants.length > 0 && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Mostrando {applicants.length} perfiles de profesores
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>

    {/* Profile modal */}
    <UiDialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Perfil del Docente</UiDialogTitle>
        </UiDialogHeader>
        {selected && (
          <div className="space-y-2 text-sm">
            <div className="font-semibold text-base">{selected.full_name}</div>
            <div className="text-muted-foreground">{selected.email} • {selected.phone}</div>
            <div><span className="font-semibold">Ciudad: </span>{selected.city}</div>
            <div><span className="font-semibold">Experiencia: </span>{selected.experience_years} años</div>
            <div><span className="font-semibold">Educación: </span>{selected.education}</div>
            <div><span className="font-semibold">Áreas: </span>{(selected.expertise || []).join(', ')}</div>
            {selected.bio && (
              <div className="pt-2 text-gray-700 dark:text-gray-300">{selected.bio}</div>
            )}
          </div>
        )}
      </UiDialogContent>
    </UiDialog>
    </>
  );
};
