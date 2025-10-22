import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { isRestEnabled, restFetchUserApplications } from '@/lib/rest-client';
import { useAuth } from '@/hooks/useAuth';
import { JobApplicationSummary } from '@/types';
import {
  Briefcase,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Download,
  Eye,
  Loader2,
  Calendar,
  User,
  Phone,
  Mail,
} from 'lucide-react';

interface ApplicationDetail extends JobApplicationSummary {
  cover_letter?: string;
  resume_url?: string;
  phone?: string;
  email?: string;
  rejection_reason?: string;
}

const DEMO_APPLICATIONS: ApplicationDetail[] = [
  {
    id: 'demo-app-1',
    user_id: 'demo-user',
    first_name: 'María',
    last_name: 'González',
    user_email: 'maria@example.com',
    position_title: 'Profesor de Matemáticas',
    institution_name: 'UCV',
    status: 'submitted',
    submitted_at: new Date().toISOString(),
    total_applications_for_offer: 10,
    application_number: 3,
    cover_letter: 'Tengo experiencia enseñando álgebra y cálculo a nivel medio superior.',
    phone: '+58 412-000-0000',
    email: 'maria@example.com',
  },
  {
    id: 'demo-app-2',
    user_id: 'demo-user',
    first_name: 'Carlos',
    last_name: 'Pérez',
    user_email: 'carlos@example.com',
    position_title: 'Profesor de Física',
    institution_name: 'Colegio Aplicación Caracas',
    status: 'reviewing',
    submitted_at: new Date(Date.now() - 86400000).toISOString(),
    total_applications_for_offer: 7,
    application_number: 1,
    phone: '+58 414-111-1111',
    email: 'carlos@example.com',
  },
  {
    id: 'demo-app-3',
    user_id: 'demo-user',
    first_name: 'Ana',
    last_name: 'López',
    user_email: 'ana@example.com',
    position_title: 'Profesor de Programación',
    institution_name: 'USB',
    status: 'accepted',
    submitted_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    reviewed_at: new Date().toISOString(),
    total_applications_for_offer: 15,
    application_number: 5,
    phone: '+58 424-222-2222',
    email: 'ana@example.com',
  },
];

const MyApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    if (user) {
      loadApplications(user.id);
    } else if (isRestEnabled()) {
      const localUserId = localStorage.getItem('local_user_id');
      if (localUserId) {
        loadApplications(localUserId);
      } else {
        setApplications([]);
        setDemoMode(true);
        setIsLoading(false);
      }
    } else {
      setApplications(DEMO_APPLICATIONS);
      setDemoMode(true);
      setIsLoading(false);
    }
  }, [user]);

  const loadApplications = async (targetUserId: string) => {
    setIsLoading(true);
    try {
      const rows = await restFetchUserApplications(targetUserId);

      // Transform data to match our interface
      const transformedData: ApplicationDetail[] = (rows || []).map((app: any) => ({
        id: app.id,
        user_id: app.user_id,
        first_name: user?.user_metadata?.full_name?.split(' ')[0] || '',
        last_name: user?.user_metadata?.full_name?.split(' ')[1] || '',
        user_email: app.email || user?.email || '',
        position_title: app.job_offers?.position_title || '',
        institution_name: app.job_offers?.institution_name || '',
        status: app.status,
        submitted_at: app.submitted_at,
        reviewed_at: app.reviewed_at,
        total_applications_for_offer: 0,
        application_number: 0,
        cover_letter: app.cover_letter,
        resume_url: app.resume_url,
        phone: app.phone,
        email: app.email,
        rejection_reason: app.rejection_reason,
      }));

      if (transformedData.length === 0) {
        setDemoMode(true);
        setApplications(DEMO_APPLICATIONS);
      } else {
        setApplications(transformedData);
      }
    } catch (error: any) {
      console.error('Error loading applications:', error);
      setDemoMode(true);
      setApplications(DEMO_APPLICATIONS);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-4 w-4" />;
      case 'reviewing':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Enviada';
      case 'reviewing':
        return 'En Revisión';
      case 'accepted':
        return 'Aceptada';
      case 'rejected':
        return 'Rechazada';
      case 'withdrawn':
        return 'Retirada';
      default:
        return status;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (selectedTab === 'all') return true;
    return app.status === selectedTab;
  });

  const stats = {
    total: applications.length,
    submitted: applications.filter(a => a.status === 'submitted').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <MainNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/ofertas')}
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Ofertas
            </Button>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <Briefcase className="inline-block h-10 w-10 mr-3" />
            Mis Postulaciones
          </h1>
          <p className="text-lg text-white/80">
            Visualiza el estado de todas tus aplicaciones
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {demoMode && (
          <div className="mb-6 rounded-md border border-dashed p-3 text-sm bg-yellow-50 border-yellow-300 text-yellow-800">
            Modo demostración: mostrando postulaciones de ejemplo. Inicia sesión y configura Supabase para ver tus datos reales.
          </div>
        )}
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Enviadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.submitted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600">En Revisión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reviewing}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Aceptadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.accepted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Rechazadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        {applications.length > 0 ? (
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all">Todas ({stats.total})</TabsTrigger>
              <TabsTrigger value="submitted">Enviadas ({stats.submitted})</TabsTrigger>
              <TabsTrigger value="reviewing">En Revisión ({stats.reviewing})</TabsTrigger>
              <TabsTrigger value="accepted">Aceptadas ({stats.accepted})</TabsTrigger>
              <TabsTrigger value="rejected">Rechazadas ({stats.rejected})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="space-y-4">
              {filteredApplications.length > 0 ? (
                filteredApplications.map(application => (
                  <Card key={application.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg">
                              {application.position_title}
                            </CardTitle>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1">{getStatusLabel(application.status)}</span>
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center text-base">
                            {application.institution_name}
                            {application.branch && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{application.branch}</span>
                              </>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Application Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {application.phone && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Phone className="h-4 w-4" />
                            <span>{application.phone}</span>
                          </div>
                        )}
                        {application.email && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Mail className="h-4 w-4" />
                            <span>{application.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Enviada: {new Date(application.submitted_at).toLocaleDateString()}
                          </span>
                        </div>
                        {application.reviewed_at && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4" />
                            <span>
                              Revisada: {new Date(application.reviewed_at).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Cover Letter */}
                      {application.cover_letter && (
                        <div>
                          <p className="text-sm font-semibold mb-2">Carta de Presentación:</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                            {application.cover_letter}
                          </p>
                        </div>
                      )}

                      {/* Rejection Reason */}
                      {application.rejection_reason && (
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                          <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                            Razón del rechazo:
                          </p>
                          <p className="text-sm text-red-700 dark:text-red-300">
                            {application.rejection_reason}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2 border-t">
                        {application.resume_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(application.resume_url, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Descargar CV
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/ofertas`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Oferta
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center">
                      <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No hay postulaciones {selectedTab !== 'all' ? `en estado "${getStatusLabel(selectedTab)}"` : ''}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {selectedTab === 'all'
                          ? 'Aún no has aplicado a ninguna oferta'
                          : 'No tienes postulaciones en este estado'}
                      </p>
                      <Button onClick={() => navigate('/ofertas')}>
                        Explorar Ofertas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Aún no has aplicado a ninguna oferta
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  ¡Comienza a explorar nuestras oportunidades laborales!
                </p>
                <Button size="lg" onClick={() => navigate('/ofertas')}>
                  Ver Ofertas de Trabajo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 py-6 bg-white dark:bg-gray-800 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 TechOS. Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MyApplicationsPage;
