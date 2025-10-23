import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Navigation, 
  X, 
  Building, 
  Users, 
  GraduationCap, 
  Sparkles,
  School,
  BookOpen,
  Filter,
  Map as MapIcon,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { SharedBackground } from '@/components/kinetic-glass/SharedBackground';
import { KineticGlassPanel } from '@/components/kinetic-glass/KineticGlassPanel';
import { caracasInstitutions } from '@/data/demoData';

// Usar las instituciones de demoData.ts
const venezuelaInstitutions = caracasInstitutions.map(inst => ({
  ...inst,
  programs: inst.programs || [],
  levels: inst.levels || [],
  phone: inst.phone || '',
  website: inst.website || '',
  description: inst.description || '',
}));

// Componente para centrar el mapa
const MapController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
};

interface PremiumMapViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedInstitutionId?: string;
}

export const PremiumMapView = ({ open, onOpenChange, selectedInstitutionId }: PremiumMapViewProps) => {
  const [selectedInst, setSelectedInst] = useState<string | null>(selectedInstitutionId || null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.4906, -66.8795]); // Centro de Caracas
  const [mapZoom, setMapZoom] = useState(12);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    if (selectedInstitutionId) {
      const inst = venezuelaInstitutions.find(i => i.id === selectedInstitutionId);
      if (inst) {
        setSelectedInst(selectedInstitutionId);
        setMapCenter([inst.coordinates.lat, inst.coordinates.lon]);
        setMapZoom(15);
      }
    }
  }, [selectedInstitutionId]);

  const selectedInstitution = selectedInst 
    ? venezuelaInstitutions.find(i => i.id === selectedInst)
    : null;

  const openInGoogleMaps = (lat: number, lon: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  // Filtrar instituciones
  const filteredInstitutions = filterType === 'all' 
    ? venezuelaInstitutions 
    : venezuelaInstitutions.filter(i => i.type === filterType);

  // Crear íconos personalizados por tipo
  const createCustomIcon = (type: string, sector: string, isSelected: boolean = false) => {
    let color = '#3b82f6';
    let emoji = '🏫';
    let size = 36;

    if (type === 'Universidad') {
      color = sector === 'Privado' ? '#8b5cf6' : '#06b6d4';
      emoji = '🎓';
      size = 44;
    } else if (type === 'Instituto') {
      color = sector === 'Privado' ? '#f59e0b' : '#10b981';
      emoji = '📚';
      size = 40;
    } else {
      color = sector === 'Privado' ? '#ec4899' : '#6366f1';
      emoji = '🏫';
      size = 36;
    }

    if (isSelected) {
      size += 8;
    }

    return L.divIcon({
      className: 'custom-icon',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 6px 20px rgba(0,0,0,0.4), 0 0 0 ${isSelected ? '6px' : '0px'} ${color}40;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${size * 0.5}px;
          position: relative;
          animation: ${isSelected ? 'pulse 2s infinite' : 'none'};
        ">
          ${emoji}
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 6px 20px rgba(0,0,0,0.4), 0 0 0 6px ${color}40; }
            50% { transform: scale(1.1); box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 0 12px ${color}60; }
          }
        </style>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  // Stats por tipo
  const stats = {
    total: venezuelaInstitutions.length,
    universidades: venezuelaInstitutions.filter(i => i.type === 'Universidad').length,
    institutos: venezuelaInstitutions.filter(i => i.type === 'Instituto').length,
    colegios: venezuelaInstitutions.filter(i => i.type === 'Colegio').length,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[98vw] max-h-[98vh] p-0 overflow-hidden bg-transparent border-none">
        {/* Video de Fondo */}
        <SharedBackground opacity={0.4} blur={0} />
        
        <div className="relative h-[96vh] flex">
          {/* Panel Lateral Izquierdo - Filtros y Stats */}
          <div className="w-80 flex-shrink-0 p-4 space-y-4 overflow-y-auto">
            <KineticGlassPanel 
              className="p-6"
              intensity={0.02}
              blur={28}
              opacity={0.12}
            >
              <DialogHeader className="mb-4">
                <DialogTitle className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <MapIcon className="h-6 w-6 text-white" />
                  </div>
                  Mapa Educativo
                </DialogTitle>
                <p className="text-white/70 text-sm mt-2">
                  Red educativa de Venezuela
                </p>
              </DialogHeader>

              {/* Stats Globales */}
              <div className="space-y-3 mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20">
                  <div className="text-3xl font-bold text-white">{stats.total}</div>
                  <div className="text-sm text-white/70 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    Instituciones Totales
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/20">
                  <div className="text-2xl font-bold text-white">Por determinar</div>
                  <div className="text-sm text-white/70 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Estudiantes
                  </div>
                </div>
              </div>

              {/* Filtros por Tipo */}
              <div className="space-y-2">
                <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filtrar por Tipo
                </h3>
                
                {[
                  { key: 'all', label: 'Todas', count: stats.total, icon: Building, color: 'bg-blue-500' },
                  { key: 'Universidad', label: 'Universidades', count: stats.universidades, icon: GraduationCap, color: 'bg-purple-500' },
                  { key: 'Instituto', label: 'Institutos', count: stats.institutos, icon: BookOpen, color: 'bg-amber-500' },
                  { key: 'Colegio', label: 'Colegios', count: stats.colegios, icon: School, color: 'bg-pink-500' },
                ].map(({ key, label, count, icon: Icon, color }) => (
                  <button
                    key={key}
                    onClick={() => setFilterType(key)}
                    className={`w-full p-3 rounded-lg transition-all flex items-center justify-between ${
                      filterType === key 
                        ? 'bg-white/20 border-2 border-white/40' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium text-sm">{label}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {count}
                    </Badge>
                  </button>
                ))}
              </div>
            </KineticGlassPanel>

            {/* Leyenda */}
            <KineticGlassPanel 
              className="p-4"
              intensity={0.015}
              blur={24}
              opacity={0.1}
            >
              <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Leyenda
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-lg">🎓</span>
                  <span>Universidad</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-lg">📚</span>
                  <span>Instituto</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-lg">🏫</span>
                  <span>Colegio</span>
                </div>
              </div>
            </KineticGlassPanel>
          </div>

          {/* Mapa Principal */}
          <div className="flex-1 relative">
            <div className="absolute inset-4 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapController center={mapCenter} zoom={mapZoom} />

                {/* Marcadores */}
                {filteredInstitutions.map((inst) => {
                  const isSelected = inst.id === selectedInst;
                  
                  return (
                    <div key={inst.id}>
                      <Marker
                        position={[inst.coordinates.lat, inst.coordinates.lon]}
                        icon={createCustomIcon(inst.type, inst.sector, isSelected)}
                        eventHandlers={{
                          click: () => {
                            setSelectedInst(inst.id);
                            setMapCenter([inst.coordinates.lat, inst.coordinates.lon]);
                            setMapZoom(15);
                          },
                        }}
                      >
                        <Popup>
                          <div className="p-2 min-w-[200px]">
                            <h3 className="font-bold text-sm mb-1">{inst.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{inst.district}</p>
                            <div className="flex items-center gap-2 text-xs mb-2">
                              <Badge variant="secondary">{inst.type}</Badge>
                              <Badge variant="outline">{inst.sector}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs mb-3">
                              <Users className="w-3 h-3" />
                              <span>Estudiantes: {inst.students}</span>
                            </div>
                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => {
                                setSelectedInst(inst.id);
                                setMapCenter([inst.coordinates.lat, inst.coordinates.lon]);
                                setMapZoom(15);
                              }}
                            >
                              Ver Detalles
                            </Button>
                          </div>
                        </Popup>
                      </Marker>

                      {/* Círculo para tu institución */}
                      {inst.id === 'col-001' && (
                        <Circle
                          center={[inst.coordinates.lat, inst.coordinates.lon]}
                          radius={150}
                          pathOptions={{
                            color: '#3b82f6',
                            fillColor: '#3b82f6',
                            fillOpacity: 0.15,
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
          </div>

          {/* Panel Derecho - Información Detallada */}
          {selectedInstitution && (
            <div className="w-96 flex-shrink-0 p-4">
              <KineticGlassPanel 
                className="h-full overflow-y-auto"
                intensity={0.02}
                blur={28}
                opacity={0.12}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                          {selectedInstitution.type}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 text-white">
                          {selectedInstitution.sector}
                        </Badge>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {selectedInstitution.name}
                      </h2>
                      <p className="text-white/70 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedInstitution.district}, Caracas
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedInst(null)}
                      className="text-white hover:bg-white/10 rounded-full h-10 w-10 p-0"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20">
                      <div className="text-lg font-bold text-white">{selectedInstitution.students}</div>
                      <div className="text-xs text-white/70 mt-1">Estudiantes</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/20">
                      <div className="text-2xl font-bold text-emerald-400">Activo</div>
                      <div className="text-xs text-white/70 mt-1">Estado</div>
                    </div>
                  </div>

                  {/* Descripción */}
                  {selectedInstitution.description && (
                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Descripción
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {selectedInstitution.description}
                      </p>
                    </div>
                  )}

                  {/* Programas/Niveles */}
                  {(selectedInstitution.programs || selectedInstitution.levels) && (
                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {selectedInstitution.type === 'Colegio' ? 'Niveles' : 'Programas'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(selectedInstitution.programs || selectedInstitution.levels)?.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-white/10 text-white border border-white/20">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contacto */}
                  <div className="mb-6 space-y-3">
                    <h3 className="text-white font-semibold mb-3">Contacto</h3>
                    {selectedInstitution.phone && (
                      <div className="flex items-center gap-3 text-white/70 text-sm">
                        <Phone className="w-4 h-4" />
                        <span>{selectedInstitution.phone}</span>
                      </div>
                    )}
                    {selectedInstitution.website && (
                      <div className="flex items-center gap-3 text-white/70 text-sm">
                        <Globe className="w-4 h-4" />
                        <span>{selectedInstitution.website}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-white/70 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="font-mono text-xs">
                        {selectedInstitution.coordinates.lat.toFixed(6)}°N, {selectedInstitution.coordinates.lon.toFixed(6)}°W
                      </span>
                    </div>
                  </div>

                  {/* Acción */}
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
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
                </div>
              </KineticGlassPanel>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumMapView;

