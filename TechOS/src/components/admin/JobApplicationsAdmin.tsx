import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { JobApplicationSummary, JobApplicationsStats } from '@/types';
import {
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  Download,
  Eye,
  MessageSquare,
} from 'lucide-react';

interface ApplicationWithDetails extends JobApplicationSummary {
  cover_letter?: string;
  resume_url?: string;
  phone?: string;
  email?: string;
  rejection_reason?: string;
}

const JobApplicationsAdmin: React.FC = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([]);
  const [stats, setStats] = useState<JobApplicationsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('submitted');
  const [selectedApplication, setSelectedApplication] = useState<ApplicationWithDetails | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadApplications();
    loadStats();
  }, []);

  const loadApplications = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('job_applications_summary')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      // Fetch additional details for each application
      const detailedApplications = await Promise.all(
        (data || []).map(async (app: any) => {
          const { data: fullData } = await supabase
            .from('job_applications')
            .select('*')
            .eq('id', app.id)
            .single();

          return {
            ...app,
            ...fullData,
          };
        })
      );

      setApplications(detailedApplications);
    } catch (error: any) {
      console.error('Error loading applications:', error);
      toast({
        title: 'Error',
        description: 'No pudimos cargar las aplicaciones',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications_stats')
        .select('*')
        .single();

      if (error) throw error;
      setStats(data);
    } catch (error: any) {
      console.error('Error loading stats:', error);
    }
  };

  const updateApplicationStatus = async (
    applicationId: string,
    newStatus: string,
    rejectionReason?: string
  ) => {
    setIsUpdating(true);
    try {
      const updateData: any = {
        status: newStatus,
        reviewed_at: new Date().toISOString(),
      };

      if (rejectionReason) {
        updateData.rejection_reason = rejectionReason;
      }

      const { error } = await supabase
        .from('job_applications')
        .update(updateData)
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: `Aplicación actualizada a ${newStatus}`,
      });

      await loadApplications();
      await loadStats();
      setSelectedApplication(null);
      setRejectReason('');
    } catch (error: any) {
      console.error('Error updating application:', error);
      toast({
        title: 'Error',
        description: 'No pudimos actualizar la aplicación',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
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
        return null;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (selectedTab === 'all') return true;
    return app.status === selectedTab;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Gestión de Postulaciones</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Visualiza y gestiona todas las aplicaciones de trabajo
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_applications}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending_applications}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Aceptadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.accepted_applications}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Rechazadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected_applications}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Postulantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unique_applicants}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="submitted">Pendientes</TabsTrigger>
          <TabsTrigger value="reviewing">En Revisión</TabsTrigger>
          <TabsTrigger value="accepted">Aceptadas</TabsTrigger>
          <TabsTrigger value="rejected">Rechazadas</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4 mt-6">
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
                          <span className="ml-1">{application.status}</span>
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        <strong>{application.first_name} {application.last_name}</strong> • {application.institution_name}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Applicant Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600 dark:text-gray-400">{application.user_email}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Enviada</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {new Date(application.submitted_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Cover Letter Preview */}
                  {application.cover_letter && (
                    <div>
                      <p className="font-semibold text-sm mb-2">Carta de Presentación</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
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
                  <div className="flex gap-2 pt-2 border-t flex-wrap">
                    {application.resume_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(application.resume_url, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        CV
                      </Button>
                    )}

                    {application.status === 'submitted' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateApplicationStatus(application.id, 'reviewing')}
                          disabled={isUpdating}
                        >
                          <Loader2 className="h-4 w-4 mr-2" />
                          En Revisión
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(application);
                          }}
                          disabled={isUpdating}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Rechazar
                        </Button>
                      </>
                    )}

                    {application.status === 'reviewing' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateApplicationStatus(application.id, 'accepted')}
                          disabled={isUpdating}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Aceptar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                          disabled={isUpdating}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Rechazar
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    No hay aplicaciones en este estado
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Rejection Modal */}
      {selectedApplication && selectedApplication.status !== 'rejected' && (
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle>Rechazar Aplicación</CardTitle>
            <CardDescription>
              {selectedApplication.first_name} {selectedApplication.last_name} - {selectedApplication.position_title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Razón del rechazo (opcional)</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Explicar brevemente por qué se rechaza la aplicación..."
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() =>
                  updateApplicationStatus(selectedApplication.id, 'rejected', rejectReason)
                }
                disabled={isUpdating}
              >
                Confirmar Rechazo
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedApplication(null);
                  setRejectReason('');
                }}
                disabled={isUpdating}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobApplicationsAdmin;
