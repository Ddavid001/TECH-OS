import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker, Location } from '@/types';
import { useMapStore, useAppStore } from '@/stores/app-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Loader2, Briefcase, TrendingUp } from 'lucide-react';
import { getJobOffersByInstitution } from '@/data/mock-job-offers';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  markers?: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
  height?: string;
  className?: string;
}

/**
 * Component to handle map view updates
 */
const MapViewUpdater: React.FC<{ center: Location; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.latitude, center.longitude], zoom);
  }, [map, center, zoom]);
  
  return null;
};

/**
 * Custom marker icon for institutions
 */
const createCustomIcon = (type: string) => {
  const colors = {
    school: '#3b82f6',
    university: '#8b5cf6',
    institute: '#10b981',
  };
  
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${colors[type as keyof typeof colors] || '#3b82f6'}"/>
        <circle cx="12.5" cy="12.5" r="8" fill="white"/>
        <text x="12.5" y="16" text-anchor="middle" font-size="10" fill="${colors[type as keyof typeof colors] || '#3b82f6'}">${type.charAt(0).toUpperCase()}</text>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
};

/**
 * Institution Popup Content Component
 */
const InstitutionPopupContent: React.FC<{
  marker: MapMarker;
  jobOffers: any[];
  onMarkerClick: (marker: MapMarker) => void;
}> = ({ marker, jobOffers, onMarkerClick }) => {
  const navigate = useNavigate();

  const formatJobType = (type: string) => {
    const types = {
      full_time: 'TC',
      part_time: 'MT',
      contract: 'Contrato',
      temporary: 'Temporal'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="min-w-[300px] max-w-[350px]">
      <h3 className="font-bold text-lg mb-2 pr-4">{marker.name}</h3>
      
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="secondary">
          {marker.type === 'school' ? 'Escuela' : 
           marker.type === 'university' ? 'Universidad' : 'Instituto'}
        </Badge>
        {jobOffers.length > 0 && (
          <Badge variant="default" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {jobOffers.length} {jobOffers.length === 1 ? 'oferta' : 'ofertas'}
          </Badge>
        )}
      </div>
      
      {marker.address && (
        <p className="text-sm text-gray-600 mb-3 flex items-start gap-2">
          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>{marker.address}</span>
        </p>
      )}

      {/* Job Offers List */}
      {jobOffers.length > 0 && (
        <div className="mb-3 max-h-[200px] overflow-y-auto border-t pt-2">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Ofertas Disponibles
          </h4>
          <div className="space-y-2">
            {jobOffers.slice(0, 3).map((offer) => (
              <div 
                key={offer.id}
                className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer transition-colors text-sm"
                onClick={() => navigate(`/job-offers/${offer.id}`)}
              >
                <div className="font-medium line-clamp-1">{offer.title}</div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    {offer.subject_area}
                  </Badge>
                  <span>•</span>
                  <span>{formatJobType(offer.job_type)}</span>
                  <span>•</span>
                  <span>{offer.vacancies} vacante{offer.vacancies !== 1 ? 's' : ''}</span>
                </div>
              </div>
            ))}
            {jobOffers.length > 3 && (
              <p className="text-xs text-gray-500 text-center pt-1">
                +{jobOffers.length - 3} ofertas más
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {jobOffers.length > 0 ? (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onMarkerClick(marker)}
              className="flex-1"
            >
              Ver institución
            </Button>
            <Button
              size="sm"
              onClick={() => navigate(`/job-offers?institution=${marker.id}`)}
              className="flex-1"
            >
              Ver ofertas
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            onClick={() => onMarkerClick(marker)}
            className="w-full"
          >
            Ver detalles
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Interactive Map Component
 */
export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  markers = [],
  onMarkerClick,
  height = '500px',
  className = '',
}) => {
  const { center, zoom, userLocation, isLoading } = useMapStore();
  const { setMapCenter, setUserLocation, setMapLoading } = useAppStore();
  const [locationError, setLocationError] = useState<string | null>(null);

  /**
   * Request user's geolocation
   */
  const requestLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocalización no soportada por este navegador');
      return;
    }

    setMapLoading(true);
    setLocationError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        });
      });

      const userLoc: Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setUserLocation(userLoc);
      setMapCenter(userLoc);
    } catch (error: any) {
      console.error('Error getting location:', error);
      setLocationError('No se pudo obtener tu ubicación. Usando ubicación por defecto.');
    } finally {
      setMapLoading(false);
    }
  }, [setMapCenter, setUserLocation, setMapLoading]);

  /**
   * Handle marker click
   */
  const handleMarkerClick = useCallback((marker: MapMarker) => {
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  }, [onMarkerClick]);

  /**
   * Request location on component mount
   */
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Obteniendo ubicación...</span>
          </div>
        </div>
      )}
      
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <MapViewUpdater center={center} zoom={zoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={new Icon({
              iconUrl: 'data:image/svg+xml;base64,' + btoa(`
                <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#ef4444"/>
                  <circle cx="12.5" cy="12.5" r="8" fill="white"/>
                  <text x="12.5" y="16" text-anchor="middle" font-size="10" fill="#ef4444">U</text>
                </svg>
              `),
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Tu ubicación</p>
                <p className="text-sm text-gray-600">
                  {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Institution markers */}
        {markers.map((marker) => {
          const jobOffers = getJobOffersByInstitution(marker.id).filter(o => o.status === 'active');
          return (
            <Marker
              key={marker.id}
              position={[marker.latitude, marker.longitude]}
              icon={createCustomIcon(marker.type)}
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
            >
              <Popup maxWidth={350} className="custom-popup">
                <InstitutionPopupContent 
                  marker={marker} 
                  jobOffers={jobOffers}
                  onMarkerClick={handleMarkerClick}
                />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Location controls */}
      <div className="absolute top-4 right-4 z-20 space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={requestLocation}
          disabled={isLoading}
          className="bg-white shadow-md"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Mi ubicación
        </Button>
      </div>
      
      {/* Location error message */}
      {locationError && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-600" />
                <p className="text-sm text-yellow-800">{locationError}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
