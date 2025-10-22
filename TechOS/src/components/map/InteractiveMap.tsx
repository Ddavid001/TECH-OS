import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker, Location } from '@/types';
import { useMapStore, useAppStore } from '@/stores/app-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Loader2 } from 'lucide-react';

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
  userLocation?: {latitude: number, longitude: number} | null;
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
 * Interactive Map Component
 */
export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  markers = [],
  onMarkerClick,
  height = '500px',
  className = '',
  userLocation: propUserLocation = null,
}) => {
  const { center, zoom, userLocation: storeUserLocation, isLoading } = useMapStore();
  const { setMapCenter, setUserLocation, setMapLoading } = useAppStore();
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Use prop location if provided, otherwise use store location
  const userLocation = propUserLocation || storeUserLocation;

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
   * Auto-center map on markers if available
   */
  useEffect(() => {
    if (markers.length > 0) {
      // Calculate bounds to fit all markers
      const latitudes = markers.map(m => m.latitude);
      const longitudes = markers.map(m => m.longitude);
      
      const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
      const centerLng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;
      
      setMapCenter({ latitude: centerLat, longitude: centerLng });
    }
  }, [markers, setMapCenter]);

  /**
   * Request location on component mount (optional - only if user allows)
   */
  useEffect(() => {
    // Request location after a short delay to not block rendering
    const timer = setTimeout(() => {
      requestLocation();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-10">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-gray-700 dark:text-gray-300">Obteniendo ubicación...</span>
          </div>
        </div>
      )}
      
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={markers.length > 0 ? 12 : zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
        className="rounded-lg"
      >
        <MapViewUpdater center={center} zoom={markers.length > 0 ? 12 : zoom} />
        
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
        {markers.map((marker) => (
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
                <h3 className="font-semibold text-lg mb-2">{marker.name}</h3>
                <Badge variant="secondary" className="mb-2">
                  {marker.type === 'school' ? 'Escuela' : 
                   marker.type === 'university' ? 'Universidad' : 'Instituto'}
                </Badge>
                {marker.address && (
                  <p className="text-sm text-gray-600 mb-2">{marker.address}</p>
                )}
                <Button
                  size="sm"
                  onClick={() => handleMarkerClick(marker)}
                  className="w-full"
                >
                  Ver detalles
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
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
