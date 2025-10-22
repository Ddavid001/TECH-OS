import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign,
  Users,
  CheckCircle,
  Briefcase,
  Award,
  TrendingUp,
  FileText
} from 'lucide-react';
import { mockJobOffers, getJobOffersByInstitution } from '@/data/mock-job-offers';
import { caracasInstitutions } from '@/data/caracas-institutions';
import { getApplicationsByJobOffer } from '@/data/mock-teacher-profiles';

const JobOfferDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const jobOffer = mockJobOffers.find(offer => offer.id === id);
  const institution = jobOffer ? caracasInstitutions.find(inst => inst.id === jobOffer.institution_id) : null;
  const relatedOffers = jobOffer ? getJobOffersByInstitution(jobOffer.institution_id).filter(o => o.id !== id).slice(0, 3) : [];
  const applications = jobOffer ? getApplicationsByJobOffer(jobOffer.id) : [];

  if (!jobOffer) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Oferta no encontrada</h2>
        <Button onClick={() => navigate('/job-offers')}>
          Volver a ofertas
        </Button>
      </div>
    );
  }

  const formatJobType = (type: string) => {
    const types = {
      full_time: 'Tiempo Completo',
      part_time: 'Medio Tiempo',
      contract: 'Contrato',
      temporary: 'Temporal'
    };
    return types[type as keyof typeof types] || type;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificado';
    return new Date(dateString).toLocaleDateString('es-VE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSalaryRange = (min?: number, max?: number) => {
    if (!min && !max) return 'A convenir';
    if (min && max) return `$${min} - $${max}`;
    if (min) return `Desde $${min}`;
    if (max) return `Hasta $${max}`;
  };

  const daysUntilDeadline = jobOffer.application_deadline 
    ? Math.ceil((new Date(jobOffer.application_deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/job-offers')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a ofertas
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-2">
                <Briefcase className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h1 className="text-3xl font-bold mb-2">{jobOffer.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building className="h-4 w-4 mr-2" />
                    <span className="text-lg">{institution?.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge>{formatJobType(jobOffer.job_type)}</Badge>
                    <Badge variant="outline">{jobOffer.subject_area}</Badge>
                    <Badge variant="secondary">
                      {jobOffer.vacancies} {jobOffer.vacancies === 1 ? 'vacante' : 'vacantes'}
                    </Badge>
                    {daysUntilDeadline && daysUntilDeadline > 0 && (
                      <Badge variant={daysUntilDeadline < 7 ? 'destructive' : 'default'}>
                        {daysUntilDeadline} días restantes
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                size="lg"
                onClick={() => navigate(`/teacher-application?job=${jobOffer.id}`)}
                className="min-w-[150px]"
              >
                Postular Ahora
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate(`/map?institution=${jobOffer.institution_id}`)}
              >
                Ver en Mapa
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción del Puesto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{jobOffer.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  Requisitos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {jobOffer.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Responsabilidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {jobOffer.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            {jobOffer.benefits && jobOffer.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Beneficios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {jobOffer.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start p-3 bg-primary/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Offers */}
            {relatedOffers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Más ofertas de {institution?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedOffers.map((offer) => (
                      <div 
                        key={offer.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/job-offers/${offer.id}`)}
                      >
                        <h4 className="font-semibold mb-1">{offer.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="outline" className="text-xs">{offer.subject_area}</Badge>
                          <span>•</span>
                          <span>{formatJobType(offer.job_type)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Detalles de la Oferta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    Ubicación
                  </div>
                  <p className="font-medium ml-6">{jobOffer.location || 'Caracas'}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <DollarSign className="h-4 w-4 mr-2 text-primary" />
                    Salario
                  </div>
                  <p className="font-medium ml-6">{formatSalaryRange(jobOffer.salary_min, jobOffer.salary_max)}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    Tipo de Contrato
                  </div>
                  <p className="font-medium ml-6">{formatJobType(jobOffer.job_type)}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Vacantes
                  </div>
                  <p className="font-medium ml-6">
                    {jobOffer.vacancies} {jobOffer.vacancies === 1 ? 'posición' : 'posiciones'}
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Fecha límite
                  </div>
                  <p className="font-medium ml-6">{formatDate(jobOffer.application_deadline)}</p>
                </div>

                {jobOffer.start_date && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        Fecha de inicio
                      </div>
                      <p className="font-medium ml-6">{formatDate(jobOffer.start_date)}</p>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    Postulaciones
                  </div>
                  <p className="font-medium ml-6">{applications.length} recibidas</p>
                </div>

                <Separator />

                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => navigate(`/teacher-application?job=${jobOffer.id}`)}
                >
                  Postular Ahora
                </Button>
              </CardContent>
            </Card>

            {/* Institution Info */}
            {institution && (
              <Card>
                <CardHeader>
                  <CardTitle>Sobre la Institución</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Building className="h-4 w-4 mr-2 text-primary" />
                      Tipo
                    </div>
                    <p className="font-medium ml-6 capitalize">{institution.type}</p>
                  </div>
                  
                  <Separator />

                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Dirección
                    </div>
                    <p className="text-sm ml-6">{institution.address}</p>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => navigate(`/map?institution=${institution.id}`)}
                  >
                    Ver en Mapa
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOfferDetail;
