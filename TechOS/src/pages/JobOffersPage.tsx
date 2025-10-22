import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { JobOffer } from '@/types';
import { JobApplicationModal } from '@/components/JobApplicationModal';
import { useAuth } from '@/hooks/useAuth';
import { 
  Briefcase, 
  Building, 
  Clock, 
  DollarSign, 
  FileText, 
  MapPin, 
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Zap,
  Search
} from 'lucide-react';

/**
 * Job Offers Page Component
 * Displays all job offers or filtered by institution
 */
const JobOffersPage: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [institutionName, setInstitutionName] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const institutionId = searchParams.get('institutionId');

  /**
   * Load job offers from Supabase
   * OPTIMIZADO: Conexión directa, sin fallbacks de demostración
   */
  const loadJobOffers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('🔄 Cargando ofertas laborales desde Supabase...');
      
      // Verificar que supabase está configurado
      if (!supabase) {
        throw new Error('Supabase no está configurado correctamente');
      }
      
      let query = supabase
        .from('job_offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Filtrar por institución si se proporciona
      if (institutionId) {
        console.log(`🏢 Filtrando por institución: ${institutionId}`);
        query = query.eq('institution_id', institutionId);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        console.error('❌ Error de Supabase:', supabaseError);
        throw new Error(`Error al cargar ofertas: ${supabaseError.message}`);
      }

      console.log(`✅ Ofertas cargadas: ${data?.length || 0}`);
      
      if (!data || data.length === 0) {
        setOffers([]);
        setError('No hay ofertas disponibles. Asegúrate de ejecutar el SQL en Supabase.');
        return;
      }
      
      setOffers(data);
      
      // Si se filtra por institución, obtener nombre
      if (institutionId && data && data.length > 0) {
        setInstitutionName(data[0].institution_name);
      }
      
    } catch (error: any) {
      console.error('❌ Error completo:', error);
      setError(error.message || 'No se pudieron cargar las ofertas');
      setOffers([]);
    } finally {
      setIsLoading(false);
    }
  }, [institutionId]);

  /**
   * Fetch institution name
   */
  const fetchInstitutionName = async (instId: string) => {
    try {
      const { data, error } = await supabase
        .from('institutions')
        .select('name')
        .eq('id', instId)
        .single();
      
      if (!error && data) {
        setInstitutionName(data.name);
      }
    } catch (error) {
      console.error('Error fetching institution name:', error);
    }
  };

  /**
   * Load offers on mount or when institutionId changes
   */
  useEffect(() => {
    loadJobOffers();
  }, [loadJobOffers]);

  /**
   * Render loading skeleton
   */
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-full mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <div className="text-center py-16 px-4">
      <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {institutionId 
          ? 'No hay ofertas para esta institución'
          : 'No hay ofertas disponibles'
        }
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        {error ? error : 'Vuelve pronto para ver nuevas oportunidades'}
      </p>
      <div className="flex gap-2 justify-center">
        <Button 
          variant="outline" 
          onClick={() => navigate(institutionId ? '/map' : '/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {institutionId ? 'Volver al Mapa' : 'Volver al Inicio'}
        </Button>
        <Button 
          onClick={() => loadJobOffers()}
          variant="default"
        >
          Reintentar
        </Button>
      </div>
    </div>
  );

  /**
   * Filter offers based on search and branch
   */
  const filteredOffers = offers.filter(offer => {
    const matchesSearch = 
      offer.position_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.institution_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.branch?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = !filterBranch || offer.branch === filterBranch;
    
    return matchesSearch && matchesBranch;
  });

  /**
   * Get unique branches
   */
  const branches = Array.from(new Set(offers.map(o => o.branch).filter(Boolean)));

  /**
   * Handle apply button click
   */
  const handleApplyClick = (offer: JobOffer) => {
    if (!user) {
      toast({
        title: 'Debes iniciar sesión',
        description: 'Por favor inicia sesión para aplicar a una oferta',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    setSelectedOffer(offer);
    setIsApplicationModalOpen(true);
  };

  /**
   * Handle successful application
   */
  const handleApplicationSuccess = () => {
    toast({
      title: 'Éxito',
      description: 'Tu aplicación ha sido registrada correctamente',
    });
    loadJobOffers();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <MainNavigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <Briefcase className="inline-block h-10 w-10 mr-3" />
            Ofertas de Trabajo para Docentes
          </h1>
          {institutionName && (
            <p className="text-xl text-white/90">
              {institutionName}
            </p>
          )}
          {!institutionId && (
            <p className="text-lg text-white/80 mt-2">
              Encuentra tu próxima oportunidad profesional
            </p>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && !isLoading && offers.length === 0 && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Atención</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
                  {error}
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-200 mt-2">
                  ✅ Solución: Ejecuta el archivo <strong>SQL_COMPLETO_LISTO_PARA_EJECUTAR.sql</strong> en Supabase Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        {!isLoading && offers.length > 0 && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Box */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar oferta, institución o rama..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Branch Filter */}
              {branches.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={!filterBranch ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterBranch(null)}
                  >
                    Todas
                  </Button>
                  {branches.map(branch => (
                    <Button
                      key={branch}
                      variant={filterBranch === branch ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterBranch(branch)}
                    >
                      {branch}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {isLoading ? (
          renderSkeleton()
        ) : filteredOffers.length === 0 && offers.length === 0 ? (
          renderEmptyState()
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No se encontraron ofertas con los filtros aplicados
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Mostrando{' '}
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {filteredOffers.length}
                </Badge>{' '}
                {filteredOffers.length === 1 ? 'oferta' : 'ofertas'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <Card 
                  key={offer.id} 
                  className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="default" className="mb-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Activa
                      </Badge>
                      {offer.experience_level && (
                        <Badge variant="outline" className="text-xs">
                          {offer.experience_level}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2 line-clamp-2">
                      {offer.position_title}
                    </CardTitle>
                    <CardDescription className="flex items-center text-base">
                      <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{offer.institution_name}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      {offer.branch && (
                        <div className="flex items-start">
                          <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Rama:</strong> {offer.branch}
                          </span>
                        </div>
                      )}
                      
                      {offer.schedule && (
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Horario:</strong> {offer.schedule}
                          </span>
                        </div>
                      )}
                      
                      {offer.tentative_salary && (
                        <div className="flex items-start">
                          <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Salario:</strong> {offer.tentative_salary}
                          </span>
                        </div>
                      )}

                      {offer.education_level && (
                        <div className="flex items-start">
                          <GraduationCap className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Nivel:</strong> {offer.education_level}
                          </span>
                        </div>
                      )}

                      {offer.benefits && (
                        <div className="flex items-start">
                          <Zap className="h-4 w-4 mr-2 mt-0.5 text-yellow-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            <strong>Beneficios:</strong> {offer.benefits}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-start">
                        <FileText className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          <strong>Requisitos:</strong> {offer.requirements}
                        </span>
                      </div>

                      {offer.application_deadline && (
                        <div className="flex items-start text-amber-600 dark:text-amber-400">
                          <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">
                            <strong>Fecha límite:</strong> {new Date(offer.application_deadline).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => handleApplyClick(offer)}
                      >
                        <Briefcase className="h-4 w-4 mr-2" />
                        Aplicar
                      </Button>
                      
                      {!institutionId && (
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={() => navigate(`/map?highlight=${offer.institution_id}`)}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Ver en Mapa
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Application Modal */}
      <JobApplicationModal
        open={isApplicationModalOpen}
        onClose={() => {
          setIsApplicationModalOpen(false);
          setSelectedOffer(null);
        }}
        jobOffer={selectedOffer}
        onSuccess={handleApplicationSuccess}
      />

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

export default JobOffersPage;
