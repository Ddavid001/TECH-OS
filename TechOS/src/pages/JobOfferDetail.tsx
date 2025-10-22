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
  Mail,
  GraduationCap,
  School,
  BookOpen,
  Award,
  Target,
  Gift
} from 'lucide-react';
import { jobOffers } from '@/data/job-offers-data';
import { InstitutionType } from '@/types';

const getInstitutionIcon = (type: InstitutionType) => {
  switch (type) {
    case 'university':
      return <GraduationCap className="h-6 w-6" />;
    case 'school':
      return <School className="h-6 w-6" />;
    case 'institute':
      return <Building className="h-6 w-6" />;
    default:
      return <BookOpen className="h-6 w-6" />;
  }
};

const JobOfferDetail: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const offer = jobOffers.find(o => o.id === jobId);

  if (!offer) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Oferta no encontrada</h2>
          <p className="text-muted-foreground mb-6">
            La oferta laboral que buscas no existe o ha sido eliminada.
          </p>
          <Button onClick={() => navigate('/job-offers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Ofertas
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/job-offers')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Ofertas
          </Button>
          
          <div className="flex items-start gap-4">
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              {getInstitutionIcon(offer.institutionType)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{offer.title}</h1>
              <p className="text-xl text-primary-foreground/90 mb-3">{offer.institution}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{offer.category}</Badge>
                {offer.subject && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">{offer.subject}</Badge>
                )}
                {offer.isActive && (
                  <Badge variant="default">Activa</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Descripción del Puesto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{offer.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Requisitos
                </CardTitle>
                <CardDescription>
                  Calificaciones y experiencia requerida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {offer.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Responsabilidades
                </CardTitle>
                <CardDescription>
                  Funciones principales del cargo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {offer.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Beneficios
                </CardTitle>
                <CardDescription>
                  Lo que ofrecemos a nuestros empleados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {offer.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Ubicación</p>
                    <p className="text-sm text-muted-foreground">{offer.location}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Tipo de Contrato</p>
                    <p className="text-sm text-muted-foreground">
                      {offer.contractType === 'full-time' ? 'Tiempo Completo' : 
                       offer.contractType === 'part-time' ? 'Medio Tiempo' : 
                       offer.contractType === 'contract' ? 'Contrato' : 'Temporal'}
                    </p>
                  </div>
                </div>

                {offer.salary && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Rango Salarial</p>
                        <p className="text-sm text-muted-foreground font-medium text-green-600">
                          {offer.salary}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Vacantes</p>
                    <p className="text-sm text-muted-foreground">
                      {offer.vacancies} {offer.vacancies === 1 ? 'posición disponible' : 'posiciones disponibles'}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Publicado</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(offer.postedDate).toLocaleDateString('es-VE', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                {offer.deadline && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Fecha Límite</p>
                        <p className="text-sm text-orange-600 font-medium">
                          {new Date(offer.deadline).toLocaleDateString('es-VE', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Apply Section */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Postúlate Ahora</CardTitle>
                <CardDescription>
                  Envía tu CV y carta de presentación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => navigate('/applications/teacher')}
                >
                  Aplicar a esta Oferta
                </Button>
                
                {offer.contactEmail && (
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      O envía tu CV directamente a:
                    </p>
                    <div className="flex items-center gap-2 p-2 bg-background rounded-md">
                      <Mail className="h-4 w-4 text-primary shrink-0" />
                      <a 
                        href={`mailto:${offer.contactEmail}`}
                        className="text-sm text-primary hover:underline truncate"
                      >
                        {offer.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Comparte esta Oferta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Copiar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOfferDetail;
