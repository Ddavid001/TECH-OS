import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation, X, Building, Users, GraduationCap, Sparkles } from 'lucide-react';
import { caracasInstitutions } from '@/data/demoData';

// Fix para los íconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para centrar el mapa en una institución seleccionada
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 14, { animate: true });
  }, [center, map]);
  return null;
};

interface EnhancedMapViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedInstitutionId?: string;
}

export const EnhancedMapView = ({ open, onOpenChange, selectedInstitutionId }: EnhancedMapViewProps) => {
  const [selectedInst, setSelectedInst] = useState<string | null>(selectedInstitutionId || null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.495, -66.87]);

  useEffect(() => {
    if (selectedInstitutionId) {
      const inst = caracasInstitutions.find(i => i.id === selectedInstitutionId);
      if (inst) {
        setSelectedInst(selectedInstitutionId);
        setMapCenter([inst.coordinates.lat, inst.coordinates.lon]);
      }
    }
  }, [selectedInstitutionId]);

  const selectedInstitution = selectedInst 
    ? caracasInstitutions.find(i => i.id === selectedInst)
    : null;

  const openInGoogleMaps = (lat: number, lon: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  // Crear íconos personalizados
  const createCustomIcon = (color: string, isMain: boolean = false) => {
    const size = isMain ? 40 : 32;
    return L.divIcon({
      className: 'custom-icon',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${isMain ? '20px' : '16px'};
          ${isMain ? 'animation: pulse 2s infinite;' : ''}
        ">
          ${isMain ? '🏫' : color === '#8b5cf6' ? '🎓' : '🏛️'}
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        </style>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 overflow-hidden">
        <div className="relative h-[90vh] flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-[1000] bg-gradient-to-br from-white/95 to-white/90 dark:from-slate-900/95 dark:to-slate-800/90 backdrop-blur-xl border-b border-white/20 p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                Mapa Interactivo de Caracas
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                Red educativa de {caracasInstitutions.length} instituciones • {caracasInstitutions.reduce((sum, i) => sum + i.students, 0).toLocaleString()} estudiantes
              </DialogDescription>
            </DialogHeader>

            {/* Leyenda */}
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <div className="w-4 h-4 rounded-full bg-blue-500 ring-2 ring-blue-400/50 animate-pulse" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Tu Instituto</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-100 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                <div className="w-4 h-4 rounded-full bg-purple-500" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Privados (4)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
                <div className="w-4 h-4 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Públicos (4)</span>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="flex-1 mt-32">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapController center={mapCenter} />

              {/* Marcadores de instituciones */}
              {caracasInstitutions.map((inst) => {
                const isMain = inst.id === 'inst-001';
                const color = isMain ? '#3b82f6' : inst.type === 'Privado' ? '#8b5cf6' : '#10b981';
                
                return (
                  <div key={inst.id}>
                    <Marker
                      position={[inst.coordinates.lat, inst.coordinates.lon]}
                      icon={createCustomIcon(color, isMain)}
                      eventHandlers={{
                        click: () => {
                          setSelectedInst(inst.id);
                          setMapCenter([inst.coordinates.lat, inst.coordinates.lon]);
                        },
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-sm mb-1">{inst.name}</h3>
                          <p className="text-xs text-muted-foreground">{inst.district}</p>
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <Users className="w-3 h-3" />
                            <span>{inst.students} estudiantes</span>
                          </div>
                          <Button
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => setSelectedInst(inst.id)}
                          >
                            Ver Detalles
                          </Button>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Radio de asistencia para tu institución */}
                    {isMain && (
                      <Circle
                        center={[inst.coordinates.lat, inst.coordinates.lon]}
                        radius={150}
                        pathOptions={{
                          color: '#3b82f6',
                          fillColor: '#3b82f6',
                          fillOpacity: 0.1,
                          weight: 2,
                          dashArray: '5, 5',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </MapContainer>
          </div>

          {/* Panel lateral de información */}
          {selectedInstitution && (
            <div className="absolute top-32 right-6 w-96 max-h-[calc(90vh-9rem)] overflow-y-auto z-[1000]">
              <Card className="border-2 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
                <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 p-4 border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2 mb-2">
                        {selectedInstitution.id === 'inst-001' && '🏫 '}
                        <h3 className="font-bold text-lg leading-tight">
                          {selectedInstitution.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {selectedInstitution.district}, Caracas
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedInst(null)}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-5 space-y-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedInstitution.students}
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300 mt-1 flex items-center justify-center gap-1">
                        <Users className="w-3 h-3" />
                        Estudiantes
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                      <Badge 
                        variant={selectedInstitution.type === 'Privado' ? 'default' : 'outline'}
                        className="text-sm px-3 py-1"
                      >
                        {selectedInstitution.type}
                      </Badge>
                      <div className="text-xs text-purple-700 dark:text-purple-300 mt-2 flex items-center justify-center gap-1">
                        <Building className="w-3 h-3" />
                        Sector
                      </div>
                    </div>
                  </div>

                  {/* Coordenadas */}
                  <div className="p-4 bg-muted/50 rounded-xl border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Ubicación GPS
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>📍 {selectedInstitution.district}</p>
                      <p className="font-mono text-xs">
                        {selectedInstitution.coordinates.lat.toFixed(6)}°N, {selectedInstitution.coordinates.lon.toFixed(6)}°W
                      </p>
                    </div>
                  </div>

                  {/* Badge especial */}
                  {selectedInstitution.id === 'inst-001' && (
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-700 dark:text-blue-300 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Esta es tu institución principal
                      </p>
                    </div>
                  )}

                  {/* Información adicional */}
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Información
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        • Institución educativa {selectedInstitution.type.toLowerCase()}
                      </li>
                      <li className="flex items-center gap-2">
                        • Población: {selectedInstitution.students} estudiantes
                      </li>
                      <li className="flex items-center gap-2">
                        • Ubicación: {selectedInstitution.district}, Caracas
                      </li>
                    </ul>
                  </div>

                  {/* Acción */}
                  <Button
                    className="w-full group"
                    onClick={() => openInGoogleMaps(
                      selectedInstitution.coordinates.lat,
                      selectedInstitution.coordinates.lon,
                      selectedInstitution.name
                    )}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Abrir en Google Maps
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedMapView;

