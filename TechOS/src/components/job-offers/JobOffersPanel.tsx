import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, MapPin, Calendar, Clock, Users, DollarSign, TrendingUp } from 'lucide-react';
import { mockJobOffers } from '@/data/mock-job-offers';
import { caracasInstitutions } from '@/data/caracas-institutions';
import { JobOffer } from '@/types';

interface JobOffersPanelProps {
  className?: string;
}

// Group job offers by subject area
const groupOffersBySubject = (offers: JobOffer[]) => {
  const grouped: Record<string, JobOffer[]> = {};
  offers.forEach(offer => {
    if (!grouped[offer.subject_area]) {
      grouped[offer.subject_area] = [];
    }
    grouped[offer.subject_area].push(offer);
  });
  return grouped;
};

// Format job type for display
const formatJobType = (type: string) => {
  const types = {
    full_time: 'Tiempo Completo',
    part_time: 'Medio Tiempo',
    contract: 'Contrato',
    temporary: 'Temporal'
  };
  return types[type as keyof typeof types] || type;
};

const JobOffersPanel: React.FC<JobOffersPanelProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const activeOffers = mockJobOffers.filter(offer => offer.status === 'active');
  const offersBySubject = groupOffersBySubject(activeOffers);
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(offersBySubject)[0]);

  // Get institution name by ID
  const getInstitutionName = (institutionId: string) => {
    const institution = caracasInstitutions.find(inst => inst.id === institutionId);
    return institution?.name || 'Institución';
  };

  // Format salary range
  const formatSalaryRange = (min?: number, max?: number) => {
    if (!min && !max) return null;
    if (min && max) return `$${min} - $${max}`;
    if (min) return `Desde $${min}`;
    if (max) return `Hasta $${max}`;
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificado';
    return new Date(dateString).toLocaleDateString('es-VE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Ofertas Laborales Docentes
        </CardTitle>
        <CardDescription>
          {activeOffers.length} ofertas activas en instituciones educativas de Caracas
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full rounded-none">
            {Object.keys(offersBySubject).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(offersBySubject).map(([category, offers]) => (
            <TabsContent key={category} value={category} className="p-4 mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {offers.length} {offers.length === 1 ? 'oferta disponible' : 'ofertas disponibles'} en {category}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/job-offers')}
                  >
                    Ver todas
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                  {offers.map((offer) => (
                    <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/0 pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-1">{offer.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span className="line-clamp-1">{getInstitutionName(offer.institution_id)}</span>
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {offer.vacancies} {offer.vacancies === 1 ? 'vacante' : 'vacantes'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                          <span className="line-clamp-1">{offer.location || 'Caracas'}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                          <span>{formatJobType(offer.job_type)}</span>
                        </div>
                        
                        {formatSalaryRange(offer.salary_min, offer.salary_max) && (
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                            <span>{formatSalaryRange(offer.salary_min, offer.salary_max)}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                          <span className="text-xs">Vence: {formatDate(offer.application_deadline)}</span>
                        </div>

                        {offer.benefits && offer.benefits.length > 0 && (
                          <div className="pt-2 border-t">
                            <div className="flex flex-wrap gap-1">
                              {offer.benefits.slice(0, 2).map((benefit, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                              {offer.benefits.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{offer.benefits.length - 2} más
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="bg-gray-50 p-3 gap-2">
                        <Button 
                          className="flex-1"
                          onClick={() => navigate(`/job-offers/${offer.id}`)}
                        >
                          Ver detalles
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => navigate(`/job-offers/${offer.id}/apply`)}
                        >
                          Postular
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JobOffersPanel;