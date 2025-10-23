import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { isRestEnabled, restFetchInstitutions } from '@/lib/rest-client';
import { MapPin, Search, Filter, X, Loader2, Building, GraduationCap, BookOpen, Navigation as NavigationIcon, MapPinned, Route, Globe, Briefcase } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Institution {
  id: string;
  name: string;
  type: 'school' | 'university' | 'institute';
  latitude: number;
  longitude: number;
  state?: string;
  city?: string;
}

interface MapMarker {
  id: string;
  name: string;
  type: 'school' | 'university' | 'institute';
  latitude: number;
  longitude: number;
}

/**
 * Component to update map view
 */
const MapViewUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

/**
 * Create custom marker icons
 */
const createCustomIcon = (type: string) => {
  const colors = {
    school: '#3b82f6',
    university: '#8b5cf6',
    institute: '#10b981',
  };
  
  const color = colors[type as keyof typeof colors] || '#3b82f6';
  
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${color}"/>
        <circle cx="12.5" cy="12.5" r="8" fill="white"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

/**
 * User location marker icon
 */
const userLocationIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#ef4444"/>
      <circle cx="12.5" cy="12.5" r="8" fill="white"/>
      <circle cx="12.5" cy="12.5" r="4" fill="#ef4444"/>
    </svg>
  `)}`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

/**
 * Map Page Component - Mapa con Geolocalización
 */
const MapPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'school' | 'university' | 'institute'>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Institution[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [locationPermissionAsked, setLocationPermissionAsked] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.4806, -66.9036]); // Caracas
  const [mapZoom, setMapZoom] = useState(12);
  const [userCountry, setUserCountry] = useState<string>('Venezuela');
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [geoWatchId, setGeoWatchId] = useState<number | null>(null);

  /**
   * Detect user's location using IP Geolocation API
   */
  const detectUserLocationByIP = useCallback(async () => {
    try {
      // Using ip-api.com for free IP geolocation
      const response = await fetch('http://ip-api.com/json/?fields=status,country,countryCode,lat,lon,city');
      const data = await response.json();
      
      if (data.status === 'success') {
        console.log('📍 Ubicación detectada por IP:', data);
        setUserCountry(data.country);
        
        const location = {
          latitude: data.lat,
          longitude: data.lon,
        };
        
        setUserLocation(location);
        setMapCenter([data.lat, data.lon]);
        setMapZoom(12);
        
        toast({
          title: `Ubicación: ${data.city}, ${data.country}`,
          description: 'Mostrando instituciones en tu región',
        });
      }
    } catch (error) {
      console.error('Error detecting location by IP:', error);
    }
  }, [toast]);

  /**
   * Request user location permission using Geolocation API
   */
  const requestUserLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Geolocalización no disponible',
        description: 'Intentando detectar ubicación por IP...',
        variant: 'default',
      });
      await detectUserLocationByIP();
      return;
    }

    setLocationPermissionAsked(true);
    setShowLocationPrompt(false);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setUserLocation(location);
      setMapCenter([position.coords.latitude, position.coords.longitude]);
      setMapZoom(14);

      toast({
        title: '✅ Ubicación obtenida',
        description: 'Mostrando instituciones cerca de ti',
      });
    } catch (error: any) {
      console.error('Error getting location:', error);
      
      toast({
        title: 'Detectando ubicación alternativa',
        description: 'Usando geolocalización por IP...',
      });
      
      await detectUserLocationByIP();
    }
  }, [toast, detectUserLocationByIP]);

  /**
   * Load institutions from REST (with demo data fallback)
   */
  const loadInstitutions = useCallback(async () => {
    try {
      setIsLoading(true);
      if (isRestEnabled()) {
        const rows = await restFetchInstitutions();
        const filtered = (rows || []).filter((r: any) => r.latitude != null && r.longitude != null);
        if (filtered.length > 0) {
          setInstitutions(filtered as Institution[]);
          return;
        }
      }
      loadDemoInstitutions();
    } catch (error: any) {
      console.error('⚠️ Error loading institutions (usando datos de demostración):', error);
      loadDemoInstitutions();
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Load demo institutions (shown if Supabase is not configured)
   */
  const loadDemoInstitutions = async () => {
    const { VENEZUELA_INSTITUTIONS } = await import('@/data/venezuela-institutions');
    const mapped = VENEZUELA_INSTITUTIONS.map((i: any) => ({
      id: i.id,
      name: i.name,
      type: i.type,
      latitude: i.latitude,
      longitude: i.longitude,
      state: i.state,
      city: i.city,
    })) as Institution[];
    setInstitutions(mapped);
    toast({ title: '📍 Instituciones locales', description: `Mostrando ${mapped.length} ubicaciones en Venezuela` });
  };

  /**
   * Handle search with autocomplete (Google Maps style)
   */
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      const suggestions = institutions.filter(inst =>
        inst.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Top 5 suggestions
      
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [institutions]);

  /**
   * Select institution from search (auto-zoom and center)
   */
  const selectInstitutionFromSearch = useCallback((institution: Institution) => {
    setSearchTerm(institution.name);
    setShowSuggestions(false);
    
    // Center map on selected institution
    setMapCenter([institution.latitude, institution.longitude]);
    setMapZoom(16); // Close zoom like Google Maps
    
    // Select marker
    setSelectedMarker({
      id: institution.id,
      name: institution.name,
      type: institution.type,
      latitude: institution.latitude,
      longitude: institution.longitude,
    });

    toast({
      title: institution.name,
      description: 'Ubicación encontrada',
    });
  }, [toast]);

  /**
   * Filter institutions based on search and type
   */
  const filteredInstitutions = institutions.filter(inst => {
    const matchesSearch = searchTerm === '' || 
      inst.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || inst.type === selectedType;
    const matchesState = stateFilter === 'all' || inst.state === stateFilter;
    const matchesCity = cityFilter === 'all' || inst.city === cityFilter;
    return matchesSearch && matchesType && matchesState && matchesCity;
  });

  /**
   * Convert institutions to map markers
   */
  const mapMarkers: MapMarker[] = useMemo(() => {
    const markers = filteredInstitutions.map(inst => ({
      id: inst.id,
      name: inst.name,
      type: inst.type,
      latitude: inst.latitude,
      longitude: inst.longitude,
    }));
    
    console.log(`🗺️ Marcadores para el mapa: ${markers.length}`);
    return markers;
  }, [filteredInstitutions]);

  /**
   * Handle marker click
   */
  const handleMarkerClick = useCallback((marker: MapMarker) => {
    setSelectedMarker(marker);
    setMapCenter([marker.latitude, marker.longitude]);
    setMapZoom(16);
    // Auto draw route if we already have user location
    if (userLocation) {
      void drawRouteFromUser(marker);
    } else {
      setRouteCoords(null);
    }
  }, []);

  /**
   * Clear all filters and search
   */
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setStateFilter('all');
    setCityFilter('all');
    setSelectedMarker(null);
    setShowSuggestions(false);
  };

  /**
   * Get directions to institution (Google Maps link)
   */
  const getDirections = useCallback((institution: MapMarker) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${institution.latitude},${institution.longitude}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${institution.latitude},${institution.longitude}`;
      window.open(url, '_blank');
    }
  }, [userLocation]);

  /**
   * Draw driving route on the map using OSRM public API
   */
  const drawRouteFromUser = useCallback(async (marker: MapMarker) => {
    if (!userLocation) return;
    try {
      setRouteLoading(true);
      setRouteCoords(null);
      const url = `https://router.project-osrm.org/route/v1/driving/${userLocation.longitude},${userLocation.latitude};${marker.longitude},${marker.latitude}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      const coords = data?.routes?.[0]?.geometry?.coordinates as [number, number][] | undefined;
      if (coords && coords.length > 0) {
        // OSRM returns [lon, lat]; leaflet Polyline needs [lat, lon]
        const latlngs = coords.map(([lon, lat]) => [lat, lon] as [number, number]);
        setRouteCoords(latlngs);
      }
    } catch (e) {
      console.error('Error fetching route', e);
      setRouteCoords(null);
    } finally {
      setRouteLoading(false);
    }
  }, [userLocation]);

  // Recalculate route whenever selected marker or user position changes
  useEffect(() => {
    if (selectedMarker && userLocation) {
      void drawRouteFromUser(selectedMarker);
    }
  }, [selectedMarker, userLocation, drawRouteFromUser]);

  // Watch user movement (like Ridery) and re-route while a destination is selected
  useEffect(() => {
    if (!selectedMarker || !navigator.geolocation) {
      if (geoWatchId !== null) {
        navigator.geolocation.clearWatch(geoWatchId);
        setGeoWatchId(null);
      }
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        void drawRouteFromUser(selectedMarker);
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    setGeoWatchId(id);

    return () => {
      navigator.geolocation.clearWatch(id);
      setGeoWatchId(null);
    };
  }, [selectedMarker, drawRouteFromUser]);

  /**
   * Get institution type label
   */
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'school':
        return 'Escuela';
      case 'university':
        return 'Universidad';
      case 'institute':
        return 'Instituto';
      default:
        return type;
    }
  };

  /**
   * Get institution type icon
   */
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'school':
        return <BookOpen className="h-4 w-4" />;
      case 'university':
        return <GraduationCap className="h-4 w-4" />;
      case 'institute':
        return <Building className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  /**
   * Load institutions and detect location on component mount
   */
  useEffect(() => {
    loadInstitutions();
    
    // Auto-detect location by IP on first load
    const timer = setTimeout(() => {
      detectUserLocationByIP();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [loadInstitutions, detectUserLocationByIP]);

  /**
   * Show location prompt on mount
   */
  useEffect(() => {
    if (!locationPermissionAsked) {
      const timer = setTimeout(() => {
        setShowLocationPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [locationPermissionAsked]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <MainNavigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
          {/* Left Sidebar - Search & List */}
          <div className="lg:w-96 flex flex-col space-y-4">
            {/* Search Box (Google Maps style) */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Buscar institución..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchSuggestions.length > 0 && setShowSuggestions(true)}
                    className="pl-10 pr-10 h-12 text-base"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearFilters}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  
                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border dark:border-gray-700 z-50 max-h-80 overflow-y-auto">
                      {searchSuggestions.map((inst) => (
                        <button
                          key={inst.id}
                          onClick={() => selectInstitutionFromSearch(inst)}
                          className="w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left border-b dark:border-gray-700 last:border-b-0 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">{inst.name}</p>
                              <Badge variant="secondary" className="text-xs mt-1">
                                {getTypeLabel(inst.type)}
                              </Badge>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Filtros</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de Institución</label>
                  <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="school">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4" />
                          <span>Escuelas</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="university">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4" />
                          <span>Universidades</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="institute">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <span>Institutos</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtros por Estado y Ciudad (coherentes con Directorio) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Estado</label>
                    <Select value={stateFilter} onValueChange={setStateFilter}>
                      <SelectTrigger><SelectValue placeholder="Todos los estados" /></SelectTrigger>
                      <SelectContent>
                        {['all', ...Array.from(new Set(institutions.map(i => i.state).filter(Boolean))) as string[]].map((s) => (
                          <SelectItem key={s} value={s}>{s === 'all' ? 'Todos los estados' : s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ciudad</label>
                    <Select value={cityFilter} onValueChange={setCityFilter}>
                      <SelectTrigger><SelectValue placeholder="Todas las ciudades" /></SelectTrigger>
                      <SelectContent>
                        {['all', ...Array.from(new Set(institutions.filter(i => stateFilter === 'all' || i.state === stateFilter).map(i => i.city).filter(Boolean))) as string[]].map((c) => (
                          <SelectItem key={c} value={c}>{c === 'all' ? 'Todas las ciudades' : c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location Button */}
                <Button
                  variant="outline"
                  onClick={requestUserLocation}
                  className="w-full"
                >
                  <NavigationIcon className="h-4 w-4 mr-2" />
                  {userLocation ? 'Actualizar ubicación' : 'Obtener mi ubicación'}
                </Button>

                {/* Results Count */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pt-2 border-t">
                  <span className="font-medium">Resultados:</span>
                  <Badge variant="secondary">
                    {filteredInstitutions.length} de {institutions.length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Institutions List */}
            <Card className="flex-1 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Instituciones</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredInstitutions.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">
                      No se encontraron instituciones
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {institutions.length === 0 
                        ? 'Cargando datos...'
                        : 'Intenta con otro filtro o búsqueda'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="overflow-y-auto max-h-[calc(100vh-32rem)] px-4 pb-4 space-y-2">
                    {filteredInstitutions.map((inst) => (
                      <Card
                        key={inst.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedMarker?.id === inst.id
                            ? 'ring-2 ring-primary bg-primary/5'
                            : ''
                        }`}
                        onClick={() => selectInstitutionFromSearch(inst)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm mb-1">{inst.name}</h3>
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant="secondary" className="text-xs">
                                  <span className="mr-1">{getTypeIcon(inst.type)}</span>
                                  {getTypeLabel(inst.type)}
                                </Badge>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  getDirections({
                                    id: inst.id,
                                    name: inst.name,
                                    type: inst.type,
                                    latitude: inst.latitude,
                                    longitude: inst.longitude,
                                  });
                                }}
                                className="w-full mt-2"
                              >
                                <Route className="h-3 w-3 mr-1" />
                                Cómo llegar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Map */}
          <div className="flex-1 lg:min-h-full relative">
            <Card className="h-full">
              <CardContent className="p-0 h-full relative">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  </div>
                ) : (
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={true}
                    scrollWheelZoom={true}
                    className="rounded-lg z-0"
                  >
                    <MapViewUpdater center={mapCenter} zoom={mapZoom} />
                    
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* User Location Marker */}
                    {userLocation && (
                      <Marker
                        position={[userLocation.latitude, userLocation.longitude]}
                        icon={userLocationIcon}
                      >
                        <Popup>
                          <div className="text-center">
                            <p className="font-semibold text-base mb-1">📍 Tu ubicación</p>
                            <p className="text-sm text-gray-600">
                              {userCountry}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    )}
                    
                    {/* Institution Markers */}
                    {mapMarkers.map((marker) => (
                      <Marker
                        key={marker.id}
                        position={[marker.latitude, marker.longitude]}
                        icon={createCustomIcon(marker.type)}
                        eventHandlers={{
                          click: () => handleMarkerClick(marker),
                        }}
                      >
                        <Popup>
                          <div className="min-w-[200px]">
                            <h3 className="font-semibold text-base mb-2">{marker.name}</h3>
                            <Badge variant="secondary" className="mb-3">
                              {getTypeIcon(marker.type)}
                              <span className="ml-1">{getTypeLabel(marker.type)}</span>
                            </Badge>
                            <div className="space-y-2">
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => navigate('/#ofertas')}
                                className="w-full"
                              >
                                <Briefcase className="h-4 w-4 mr-2" />
                                Ofertas Docentes
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => getDirections(marker)}
                                className="w-full"
                              >
                                <Route className="h-4 w-4 mr-2" />
                                Cómo llegar
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={async () => {
                                  if (!userLocation) {
                                    await requestUserLocation();
                                  }
                                  await drawRouteFromUser(marker);
                                }}
                                className="w-full"
                              >
                                {routeLoading ? 'Calculando ruta...' : 'Trazar ruta en el mapa'}
                              </Button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                    {/* Route polyline */}
                    {routeCoords && (
                      <Polyline positions={routeCoords} pathOptions={{ color: '#2563eb', weight: 5 }} />
                    )}
                  </MapContainer>
                )}
              </CardContent>
            </Card>


            {/* Location Permission Prompt (Superpuesto al Mapa) */}
            {showLocationPrompt && !locationPermissionAsked && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-sm px-4">
                <Card className="shadow-2xl border-2 border-primary bg-white dark:bg-gray-800 animate-in slide-in-from-top">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-base">
                      <Globe className="h-5 w-5 text-primary animate-pulse" />
                      <span>¿Permitir ubicación?</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Te mostraremos instituciones académicas cerca de ti
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <Button 
                        onClick={requestUserLocation}
                        className="w-full"
                        size="default"
                      >
                        <NavigationIcon className="h-4 w-4 mr-2" />
                        Obtener ubicación precisa
                      </Button>
                      <Button 
                        variant="secondary"
                        onClick={() => {
                          setShowLocationPrompt(false);
                          detectUserLocationByIP();
                        }}
                        className="w-full"
                        size="sm"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Usar ubicación aproximada (IP)
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={() => setShowLocationPrompt(false)}
                        className="w-full"
                        size="sm"
                      >
                        Cerrar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Marker Details Modal (Google Maps style) */}
      {selectedMarker && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Card className="shadow-2xl border-2">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{selectedMarker.name}</CardTitle>
                  <CardDescription className="mt-1">
                    <Badge variant="secondary" className="mr-2">
                      <span className="mr-1">{getTypeIcon(selectedMarker.type)}</span>
                      {getTypeLabel(selectedMarker.type)}
                    </Badge>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMarker(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                <NavigationIcon className="h-3 w-3" />
                <span>
                  {selectedMarker.latitude.toFixed(6)}, {selectedMarker.longitude.toFixed(6)}
                </span>
              </div>
              <Button
                onClick={() => getDirections(selectedMarker)}
                className="w-full"
              >
                <Route className="h-4 w-4 mr-2" />
                Cómo llegar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MapPage;
