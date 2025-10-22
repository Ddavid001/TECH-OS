import React, { useState, useMemo } from 'react';
import { JobOfferCard } from '@/components/job-offers/JobOfferCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Briefcase, MapPin, Building } from 'lucide-react';
import { jobOffers, jobCategories } from '@/data/job-offers-data';
import { InstitutionType } from '@/types';

const JobOffersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string>('all');
  const [selectedContractType, setSelectedContractType] = useState<string>('all');

  // Filter offers
  const filteredOffers = useMemo(() => {
    return jobOffers.filter(offer => {
      const matchesSearch = 
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (offer.subject && offer.subject.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
      const matchesInstitutionType = selectedInstitutionType === 'all' || offer.institutionType === selectedInstitutionType;
      const matchesContractType = selectedContractType === 'all' || offer.contractType === selectedContractType;
      
      return matchesSearch && matchesCategory && matchesInstitutionType && matchesContractType && offer.isActive;
    });
  }, [searchTerm, selectedCategory, selectedInstitutionType, selectedContractType]);

  // Group offers by category
  const offersByCategory = useMemo(() => {
    const grouped: Record<string, typeof jobOffers> = {};
    filteredOffers.forEach(offer => {
      if (!grouped[offer.category]) {
        grouped[offer.category] = [];
      }
      grouped[offer.category].push(offer);
    });
    return grouped;
  }, [filteredOffers]);

  const activeOffersCount = jobOffers.filter(o => o.isActive).length;

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedInstitutionType('all');
    setSelectedContractType('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Ofertas Laborales</h1>
          </div>
          <p className="text-lg text-primary-foreground/90 max-w-3xl">
            Encuentra oportunidades de empleo en instituciones educativas de Caracas. 
            Universidades, colegios e institutos buscan profesionales talentosos.
          </p>
          <div className="flex gap-4 mt-6">
            <Badge variant="secondary" className="text-base px-4 py-1">
              {activeOffersCount} ofertas activas
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-1">
              {jobCategories.length} categorías
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Filters Section */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filtros de Búsqueda</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por título, institución, materia..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {jobCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Institution Type */}
              <div>
                <Select value={selectedInstitutionType} onValueChange={setSelectedInstitutionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de institución" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="university">Universidades</SelectItem>
                    <SelectItem value="school">Colegios</SelectItem>
                    <SelectItem value="institute">Institutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contract Type */}
              <div>
                <Select value={selectedContractType} onValueChange={setSelectedContractType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de contrato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los contratos</SelectItem>
                    <SelectItem value="full-time">Tiempo Completo</SelectItem>
                    <SelectItem value="part-time">Medio Tiempo</SelectItem>
                    <SelectItem value="contract">Contrato</SelectItem>
                    <SelectItem value="temporary">Temporal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <div className="lg:col-span-3">
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="w-full md:w-auto"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedCategory !== 'all' || selectedInstitutionType !== 'all' || selectedContractType !== 'all') && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Filtros activos:</p>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary">
                      Búsqueda: "{searchTerm}"
                    </Badge>
                  )}
                  {selectedCategory !== 'all' && (
                    <Badge variant="secondary">
                      Categoría: {selectedCategory}
                    </Badge>
                  )}
                  {selectedInstitutionType !== 'all' && (
                    <Badge variant="secondary">
                      Tipo: {selectedInstitutionType === 'university' ? 'Universidad' : selectedInstitutionType === 'school' ? 'Colegio' : 'Instituto'}
                    </Badge>
                  )}
                  {selectedContractType !== 'all' && (
                    <Badge variant="secondary">
                      Contrato: {selectedContractType}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg font-medium">
            {filteredOffers.length} {filteredOffers.length === 1 ? 'oferta encontrada' : 'ofertas encontradas'}
          </p>
        </div>

        {/* Offers Display - Organized by Category */}
        {selectedCategory === 'all' ? (
          // Display grouped by categories
          <Tabs defaultValue={Object.keys(offersByCategory)[0]} className="w-full">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-6">
              {Object.keys(offersByCategory).map(category => (
                <TabsTrigger key={category} value={category}>
                  {category} ({offersByCategory[category].length})
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(offersByCategory).map(([category, offers]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">{category}</h2>
                  <p className="text-muted-foreground">
                    {offers.length} {offers.length === 1 ? 'oferta disponible' : 'ofertas disponibles'} en esta categoría
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offers.map(offer => (
                    <JobOfferCard key={offer.id} offer={offer} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          // Display all filtered results
          <div>
            {filteredOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffers.map(offer => (
                  <JobOfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            ) : (
              <Card className="p-12">
                <div className="text-center">
                  <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No se encontraron ofertas</h3>
                  <p className="text-muted-foreground mb-4">
                    Intenta ajustar los filtros para ver más resultados
                  </p>
                  <Button onClick={resetFilters}>
                    Limpiar Filtros
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOffersPage;
