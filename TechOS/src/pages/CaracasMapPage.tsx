import React, { useState, useEffect } from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapMarker, InstitutionType } from '@/types';
import { useMapStore, useAppStore } from '@/stores/app-store';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Search, Filter, Briefcase, Building, GraduationCap, BookOpen } from 'lucide-react';
import { caracasInstitutions, jobOffersByCategory } from '@/data/caracas-institutions';
import { jobOffers } from '@/data/job-offers-data';
import { useNavigate } from 'react-router-dom';

/**
 * Caracas Map Page Component
 */
const CaracasMapPage: React.FC = () => {
  const { toast } = useToast();
  const { setMapMarkers, setMapCenter, setMapLoading } = useAppStore();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<InstitutionType | 'all'>('all');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Educación');
  const [activeTab, setActiveTab] = useState<string>('map');

  // Centrar el mapa en Caracas al cargar
  useEffect(() => {
    setMapCenter({
      latitude: 10.4806,
      longitude: -66.9036
    });
    setMapMarkers(caracasInstitutions);
  }, [setMapCenter, setMapMarkers]);

  /**
   * Filtrar instituciones basadas en búsqueda y tipo
   */
  const filteredInstitutions = caracasInstitutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inst.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || inst.type === selectedType;
    return matchesSearch && matchesType;
  });

  /**
   * Manejar clic en marcador
   */
  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    setActiveTab('details');
  };

  /**
   * Manejar selección de institución desde la lista
   */
  const handleInstitutionSelect = (institution: MapMarker) => {
    setSelectedMarker(institution);
    setMapCenter({
      latitude: institution.latitude,
      longitude: institution.longitude
    });
    setActiveTab('details');
  };

  return (
    <div className="container mx-auto py-6 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Mapa de Instituciones en Caracas</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* Panel lateral */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtros</CardTitle>
              <CardDescription>Busca instituciones en Caracas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por nombre o dirección"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select
                  value={selectedType}
                  onValueChange={(value) => setSelectedType(value as InstitutionType | 'all')}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Tipo de institución" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="school">Escuelas</SelectItem>
                    <SelectItem value="university">Universidades</SelectItem>
                    <SelectItem value="institute">Institutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="map">Instituciones</TabsTrigger>
              <TabsTrigger value="details">Detalles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Instituciones</CardTitle>
                  <CardDescription>
                    {filteredInstitutions.length} instituciones encontradas
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto space-y-3 p-4">
                  {filteredInstitutions.length > 0 ? (
                    filteredInstitutions.map((institution) => (
                      <Card
                        key={institution.id}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleInstitutionSelect(institution)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start space-x-2">
                            <div className="mt-1">
                              {institution.type === 'school' ? (
                                <BookOpen className="h-4 w-4 text-blue-500" />
                              ) : institution.type === 'university' ? (
                                <GraduationCap className="h-4 w-4 text-purple-500" />
                              ) : (
                                <Building className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{institution.name}</h4>
                              {institution.address && (
                                <p className="text-xs text-gray-500">{institution.address}</p>
                              )}
                              <Badge variant="outline" className="mt-1 text-xs">
                                {institution.type === 'school' ? 'Escuela' : 
                                institution.type === 'university' ? 'Universidad' : 'Instituto'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No se encontraron instituciones
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="mt-4">
              {selectedMarker ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedMarker.name}</CardTitle>
                    <CardDescription>
                      <Badge className="mr-2">
                        {selectedMarker.type === 'school' ? 'Escuela' : 
                        selectedMarker.type === 'university' ? 'Universidad' : 'Instituto'}
                      </Badge>
                      {selectedMarker.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Ofertas Laborales
                      </h3>
                      {(() => {
                        const institutionOffers = jobOffers.filter(offer => offer.institution === selectedMarker.name);
                        return institutionOffers.length > 0 ? (
                          <div className="space-y-3">
                            {institutionOffers.map((offer) => (
                              <div 
                                key={offer.id} 
                                className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => navigate(`/job-offers/${offer.id}`)}
                              >
                                <h4 className="font-medium text-sm mb-1">{offer.title}</h4>
                                <div className="flex gap-2 flex-wrap">
                                  <Badge variant="outline" className="text-xs">
                                    {offer.contractType === 'full-time' ? 'Tiempo Completo' : 
                                     offer.contractType === 'part-time' ? 'Medio Tiempo' : offer.contractType}
                                  </Badge>
                                  {offer.vacancies > 0 && (
                                    <Badge variant="secondary" className="text-xs">
                                      {offer.vacancies} vacante{offer.vacancies > 1 ? 's' : ''}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => navigate('/job-offers')}
                              className="w-full mt-2"
                            >
                              Ver Todas las Ofertas
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-muted-foreground mb-3">
                              No hay ofertas activas en este momento
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate('/job-offers')}
                              className="w-full"
                            >
                              Explorar Todas las Ofertas
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                    
                    <div className="pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab('map')}
                        className="w-full"
                      >
                        Volver al listado
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    Selecciona una institución para ver sus detalles
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Mapa */}
        <div className="md:col-span-2 h-full">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <InteractiveMap
                markers={filteredInstitutions}
                onMarkerClick={handleMarkerClick}
                height="100%"
                className="rounded-md overflow-hidden"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaracasMapPage;