import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapMarker, InstitutionType } from '@/types';
import { useMapStore, useAppStore } from '@/stores/app-store';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Search, Filter, Navigation, Building, GraduationCap, BookOpen } from 'lucide-react';
import { db } from '@/lib/supabase-helper';

/**
 * Map Page Component
 */
const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const { markers, isLoading } = useMapStore();
  const { setMapMarkers, setMapLoading } = useAppStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<InstitutionType | 'all'>('all');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [institutions, setInstitutions] = useState<MapMarker[]>([]);

  /**
   * Load institutions from database
   */
  const loadInstitutions = useCallback(async () => {
    try {
      setMapLoading(true);
      
      const { data, error } = await db
        .from('institutions')
        .select('id, name, type, address, latitude, longitude')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);

      if (error) throw error;

      const institutionMarkers: MapMarker[] = (data || []).map(inst => ({
        id: inst.id,
        name: inst.name,
        type: inst.type,
        latitude: inst.latitude!,
        longitude: inst.longitude!,
        address: inst.address,
      }));

      setInstitutions(institutionMarkers);
      setMapMarkers(institutionMarkers);
    } catch (error: any) {
      console.error('Error loading institutions:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las instituciones',
        variant: 'destructive',
      });
    } finally {
      setMapLoading(false);
    }
  }, [setMapMarkers, setMapLoading, toast]);

  /**
   * Filter institutions based on search and type
   */
  const filteredInstitutions = institutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inst.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || inst.type === selectedType;
    return matchesSearch && matchesType;
  });

  /**
   * Handle marker click
   */
  const handleMarkerClick = useCallback((marker: MapMarker) => {
    setSelectedMarker(marker);
  }, []);

  /**
   * Handle institution selection from list
   */
  const handleInstitutionSelect = useCallback((institution: MapMarker) => {
    setSelectedMarker(institution);
    // Center map on selected institution
    // This would require updating the map center in the store
  }, []);

  /**
   * Load institutions on component mount
   */
  useEffect(() => {
    loadInstitutions();
  }, [loadInstitutions]);

  /**
   * Redirect if not authenticated
   */
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Mapa de Instituciones</h1>
              <Badge variant="outline" className="text-xs">
                {filteredInstitutions.length} instituciones
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Volver al Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Search and Filters */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar instituciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={(value) => setSelectedType(value as InstitutionType | 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="school">Escuelas</SelectItem>
                  <SelectItem value="university">Universidades</SelectItem>
                  <SelectItem value="institute">Institutos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Institution List */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Instituciones</h3>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : filteredInstitutions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No se encontraron instituciones</p>
                </div>
              ) : (
                filteredInstitutions.map((institution) => (
                  <Card
                    key={institution.id}
                    className={`cursor-pointer transition-colors ${
                      selectedMarker?.id === institution.id ? 'ring-2 ring-primary' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleInstitutionSelect(institution)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {institution.type === 'school' && <Building className="h-5 w-5 text-blue-500" />}
                          {institution.type === 'university' && <GraduationCap className="h-5 w-5 text-purple-500" />}
                          {institution.type === 'institute' && <BookOpen className="h-5 w-5 text-green-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 truncate">
                            {institution.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {institution.address}
                          </p>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {institution.type === 'school' ? 'Escuela' : 
                             institution.type === 'university' ? 'Universidad' : 'Instituto'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <InteractiveMap
            markers={filteredInstitutions}
            onMarkerClick={handleMarkerClick}
            height="100%"
          />
        </div>
      </div>

      {/* Selected Institution Details */}
      {selectedMarker && (
        <div className="fixed bottom-4 left-4 right-4 z-30 max-w-md mx-auto">
          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{selectedMarker.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {selectedMarker.address}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMarker(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {selectedMarker.type === 'school' ? 'Escuela' : 
                   selectedMarker.type === 'university' ? 'Universidad' : 'Instituto'}
                </Badge>
                <Button size="sm" variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Direcciones
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MapPage;
