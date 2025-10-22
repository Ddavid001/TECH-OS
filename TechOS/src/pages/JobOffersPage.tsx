import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Search,
  Filter,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { mockJobOffers } from '@/data/mock-job-offers';
import { caracasInstitutions } from '@/data/caracas-institutions';
import { JobOffer } from '@/types';

const JobOffersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string>('all');

  // Get unique subject areas
  const subjectAreas = useMemo(() => {
    const areas = new Set(mockJobOffers.map(offer => offer.subject_area));
    return Array.from(areas).sort();
  }, []);

  // Format job type
  const formatJobType = (type: string) => {
    const types = {
      full_time: 'Tiempo Completo',
      part_time: 'Medio Tiempo',
      contract: 'Contrato',
      temporary: 'Temporal'
    };
    return types[type as keyof typeof types] || type;
  };

  // Get institution by ID
  const getInstitution = (institutionId: string) => {
    return caracasInstitutions.find(inst => inst.id === institutionId);
  };

  // Filter offers
  const filteredOffers = useMemo(() => {
    return mockJobOffers
      .filter(offer => offer.status === 'active')
      .filter(offer => {
        // Search filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          const institution = getInstitution(offer.institution_id);
          return (
            offer.title.toLowerCase().includes(searchLower) ||
            offer.description.toLowerCase().includes(searchLower) ||
            offer.subject_area.toLowerCase().includes(searchLower) ||
            institution?.name.toLowerCase().includes(searchLower)
          );
        }
        return true;
      })
      .filter(offer => selectedSubject === 'all' || offer.subject_area === selectedSubject)
      .filter(offer => selectedJobType === 'all' || offer.job_type === selectedJobType)
      .filter(offer => {
        if (selectedInstitutionType === 'all') return true;
        const institution = getInstitution(offer.institution_id);
        return institution?.type === selectedInstitutionType;
      });
  }, [searchTerm, selectedSubject, selectedJobType, selectedInstitutionType]);

  // Format salary range
  const formatSalaryRange = (min?: number, max?: number) => {
    if (!min && !max) return 'A convenir';
    if (min && max) return `$${min} - $${max}`;
    if (min) return `Desde $${min}`;
    if (max) return `Hasta $${max}`;
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificado';
    return new Date(dateString).toLocaleDateString('es-VE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Briefcase className="mr-3 h-8 w-8 text-primary" />
                Ofertas Laborales Docentes
              </h1>
              <p className="text-gray-600 mt-2">
                Encuentra oportunidades de enseñanza en las mejores instituciones educativas de Caracas
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Ofertas</p>
                    <p className="text-2xl font-bold">{filteredOffers.length}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Instituciones</p>
                    <p className="text-2xl font-bold">
                      {new Set(filteredOffers.map(o => o.institution_id)).size}
                    </p>
                  </div>
                  <Building className="h-8 w-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Áreas</p>
                    <p className="text-2xl font-bold">{subjectAreas.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Vacantes</p>
                    <p className="text-2xl font-bold">
                      {filteredOffers.reduce((sum, offer) => sum + offer.vacancies, 0)}
                    </p>
                  </div>
                  <ArrowUpRight className="h-8 w-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="h-5 w-5 mr-2" />
              Filtrar Ofertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar ofertas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Área de estudio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las áreas</SelectItem>
                  {subjectAreas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de contrato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="full_time">Tiempo Completo</SelectItem>
                  <SelectItem value="part_time">Medio Tiempo</SelectItem>
                  <SelectItem value="contract">Contrato</SelectItem>
                  <SelectItem value="temporary">Temporal</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedInstitutionType} onValueChange={setSelectedInstitutionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de institución" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las instituciones</SelectItem>
                  <SelectItem value="university">Universidad</SelectItem>
                  <SelectItem value="school">Colegio</SelectItem>
                  <SelectItem value="institute">Instituto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Offers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => {
            const institution = getInstitution(offer.institution_id);
            return (
              <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-all border-l-4 border-l-primary hover:scale-105">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/0">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">
                      {offer.vacancies} {offer.vacancies === 1 ? 'vacante' : 'vacantes'}
                    </Badge>
                    <Badge>{formatJobType(offer.job_type)}</Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{offer.title}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{institution?.name}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-gray-700 line-clamp-3">{offer.description}</p>
                  
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      <span className="line-clamp-1">{offer.location || 'Caracas'}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      <span>{formatSalaryRange(offer.salary_min, offer.salary_max)}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      <span className="text-xs">Vence: {formatDate(offer.application_deadline)}</span>
                    </div>
                  </div>

                  {offer.benefits && offer.benefits.length > 0 && (
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1">
                        {offer.benefits.slice(0, 3).map((benefit, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {offer.benefits.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{offer.benefits.length - 3}
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
                    Ver Detalles
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(`/teacher-application?job=${offer.id}`)}
                  >
                    Postular
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredOffers.length === 0 && (
          <Card className="p-12 text-center">
            <Briefcase className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron ofertas
            </h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros de búsqueda
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobOffersPage;