import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Eye, Navigation, Building, Users, GraduationCap } from 'lucide-react';
import { caracasInstitutions } from '@/data/demoData';
import { useToast } from '@/hooks/use-toast';
import { PremiumMapView } from './PremiumMapView';

interface InstitutionsMapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InstitutionsMapModal = ({ open, onOpenChange }: InstitutionsMapModalProps) => {
  const [institutions, setInstitutions] = useState<typeof caracasInstitutions>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [showMapView, setShowMapView] = useState(false);
  const [mapSelectedInst, setMapSelectedInst] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        setInstitutions(caracasInstitutions);
        setLoading(false);
      }, 150);
    }
  }, [open]);

  const openMapView = (institutionId: string) => {
    setMapSelectedInst(institutionId);
    setShowMapView(true);
  };

  const openInGoogleMaps = (lat: number, lon: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              Mapa de Instituciones Educativas
            </DialogTitle>
            <DialogDescription>
              Red educativa de Caracas • {caracasInstitutions.length} instituciones • {caracasInstitutions.reduce((sum, i) => sum + i.students, 0).toLocaleString()} estudiantes
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {institutions.map((inst) => (
                  <Card 
                    key={inst.id} 
                    className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${
                      inst.id === 'inst-001' 
                        ? 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20' 
                        : inst.type === 'Privado' 
                        ? 'border-l-purple-500' 
                        : 'border-l-emerald-500'
                    }`}
                    onClick={() => setSelected(inst)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base font-semibold leading-tight mb-1">
                            {inst.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {inst.district}
                          </p>
                        </div>
                        {inst.id === 'inst-001' && (
                          <Badge variant="default" className="bg-blue-600 text-xs">
                            Principal
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Estudiantes
                          </span>
                          <span className="font-semibold">{inst.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Tipo</span>
                          <Badge variant={inst.type === 'Privado' ? 'secondary' : 'outline'} className="text-xs">
                            {inst.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button 
                          size="sm" 
                          className="w-full" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(inst);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            openMapView(inst.id);
                          }}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Ver en Mapa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Leyenda */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-blue-500 rounded" />
                <span className="font-medium">Tu Instituto</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-purple-500 rounded" />
                <span>Privados ({institutions.filter(i => i.type === 'Privado').length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-emerald-500 rounded" />
                <span>Públicos ({institutions.filter(i => i.type === 'Público').length})</span>
              </div>
              <div className="ml-auto text-muted-foreground">
                📍 Caracas, Venezuela
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              {selected?.id === 'inst-001' && '🏫 '}
              {selected?.name}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {selected?.district}, Caracas
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{selected.students}</div>
                  <div className="text-xs text-muted-foreground mt-1">Estudiantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selected.type}</div>
                  <div className="text-xs text-muted-foreground mt-1">Sector</div>
                </div>
                <div className="text-center col-span-2 md:col-span-1">
                  <div className="text-2xl font-bold text-emerald-600">{selected.status === 'active' ? 'Activo' : 'Inactivo'}</div>
                  <div className="text-xs text-muted-foreground mt-1">Estado</div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Ubicación
                </p>
                <div className="p-3 bg-muted/30 rounded border text-sm space-y-1">
                  <p><span className="font-medium">Distrito:</span> {selected.district}</p>
                  <p><span className="font-medium">Coordenadas:</span> {selected.coordinates.lat.toFixed(4)}°N, {selected.coordinates.lon.toFixed(4)}°W</p>
                  {selected.id !== 'inst-001' && (
                    <p><span className="font-medium">Distancia desde tu instituto:</span> {calculateDistance(
                      10.498, -66.829, // Colegio El Alba
                      selected.coordinates.lat, 
                      selected.coordinates.lon
                    )} km</p>
                  )}
                </div>
              </div>

              {/* Información Adicional */}
              <div className="space-y-2">
                <p className="font-semibold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Información
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Institución educativa {selected.type.toLowerCase()}</li>
                  <li>Población estudiantil de {selected.students} estudiantes</li>
                  <li>Ubicada en {selected.district}, Caracas</li>
                  {selected.id === 'inst-001' && (
                    <li className="text-blue-600 dark:text-blue-400 font-semibold">
                      🏫 Esta es tu institución principal
                    </li>
                  )}
                </ul>
              </div>

              {/* Acciones */}
              <div className="space-y-2 pt-4 border-t">
                <Button 
                  size="sm"
                  className="w-full"
                  onClick={() => openMapView(selected.id)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Ver en Mapa Interactivo
                </Button>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => openInGoogleMaps(selected.coordinates.lat, selected.coordinates.lon, selected.name)}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Google Maps
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={async () => {
                      try {
                        const text = `${selected.name}\n${selected.district}, Caracas\n${selected.students} estudiantes\nCoordenadas: ${selected.coordinates.lat}, ${selected.coordinates.lon}`;
                        await navigator.clipboard.writeText(text);
                        toast({ title: 'Copiado', description: 'Información de la institución copiada al portapapeles' });
                      } catch {
                        toast({ title: 'Error', description: 'No se pudo copiar', variant: 'destructive' });
                      }
                    }}
                  >
                    Copiar Info
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Vista de Mapa */}
      <PremiumMapView 
        open={showMapView} 
        onOpenChange={setShowMapView}
        selectedInstitutionId={mapSelectedInst}
      />
    </>
  );
};

export default InstitutionsMapModal;

