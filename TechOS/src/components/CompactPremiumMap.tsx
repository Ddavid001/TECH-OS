import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Eye } from 'lucide-react';
import { caracasInstitutions } from '@/data/demoData';

// Componente para centrar el mapa
const MapController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
};

interface AttendanceRecord {
  id: string;
  user: string;
  subject: string;
  time: string;
  distance: number;
  status: 'verified' | 'out_of_range';
}

interface CompactPremiumMapProps {
  attendanceRecords: AttendanceRecord[];
  onOpenFullMap?: () => void;
}

export const CompactPremiumMap = ({ attendanceRecords, onOpenFullMap }: CompactPremiumMapProps) => {
  const [pulses, setPulses] = useState(attendanceRecords);
  const [selectedInst, setSelectedInst] = useState<string | null>('col-001'); // El Alba por defecto

  useEffect(() => {
    // Simular nuevos registros cada 5 segundos
    const interval = setInterval(() => {
      const newRecord = {
        ...attendanceRecords[Math.floor(Math.random() * attendanceRecords.length)],
        id: Date.now().toString(),
        time: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      };
      setPulses(prev => [newRecord, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [attendanceRecords]);

  // Centro del mapa en El Alba
  const elAlba = caracasInstitutions.find(i => i.id === 'col-001');
  const mapCenter: [number, number] = elAlba 
    ? [elAlba.coordinates.lat, elAlba.coordinates.lon]
    : [10.4906, -66.8795];

  // Crear íconos personalizados por tipo
  const createCustomIcon = (type: string, sector: string, isSelected: boolean = false) => {
    let color = '#3b82f6';
    let emoji = '🏫';
    let size = isSelected ? 38 : 32;

    if (type === 'Universidad') {
      color = sector === 'Privado' ? '#8b5cf6' : '#06b6d4';
      emoji = '🎓';
      size = isSelected ? 42 : 36;
    } else if (type === 'Instituto') {
      color = sector === 'Privado' ? '#f59e0b' : '#10b981';
      emoji = '📚';
      size = isSelected ? 40 : 34;
    } else {
      color = sector === 'Privado' ? '#ec4899' : '#6366f1';
      emoji = '🏫';
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
          box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 ${isSelected ? '4px' : '0px'} ${color}40;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${size * 0.5}px;
          position: relative;
          animation: ${isSelected ? 'pulse 2s infinite' : 'none'};
          cursor: pointer;
          transition: transform 0.2s;
        ">
          ${emoji}
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          .custom-icon div:hover {
            transform: scale(1.12);
          }
        </style>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  // Crear marcador de pulso para asistencias recientes
  const createPulseIcon = (status: 'verified' | 'out_of_range') => {
    const color = status === 'verified' ? '#10b981' : '#ef4444';
    return L.divIcon({
      className: 'pulse-icon',
      html: `
        <div style="
          width: 16px;
          height: 16px;
          background: ${color};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 0 ${color};
          animation: pulseAttendance 2s infinite;
        "></div>
        <style>
          @keyframes pulseAttendance {
            0% { box-shadow: 0 0 0 0 ${color}80; }
            50% { box-shadow: 0 0 0 6px ${color}20; }
            100% { box-shadow: 0 0 0 0 ${color}00; }
          }
        </style>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  };

  return (
    <div className="relative h-[400px] w-full rounded-xl overflow-hidden border border-white/20">
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={mapCenter} zoom={13} />

        {/* Marcadores de Instituciones */}
        {caracasInstitutions.map((inst) => {
          const isSelected = inst.id === selectedInst;
          
          return (
            <Marker
              key={inst.id}
              position={[inst.coordinates.lat, inst.coordinates.lon]}
              icon={createCustomIcon(inst.type, inst.sector, isSelected)}
              eventHandlers={{
                click: () => setSelectedInst(inst.id),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[180px]">
                  <h3 className="font-bold text-sm mb-1">{inst.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{inst.district}</p>
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <Badge variant="secondary" className="text-xs">{inst.type}</Badge>
                    <Badge variant="outline" className="text-xs">{inst.sector}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Users className="w-3 h-3" />
                    <span>Estudiantes: {inst.students}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Círculo para El Alba */}
        {elAlba && (
          <Circle
            center={[elAlba.coordinates.lat, elAlba.coordinates.lon]}
            radius={150}
            pathOptions={{
              color: '#3b82f6',
              fillColor: '#3b82f6',
              fillOpacity: 0.12,
              weight: 2,
              dashArray: '5, 5',
            }}
          />
        )}

        {/* Marcadores de asistencia reciente (últimos 5 registros) */}
        {pulses.slice(0, 5).map((record, index) => {
          if (!elAlba) return null;
          // Pequeña variación aleatoria alrededor de El Alba para visualizar múltiples registros
          const offsetLat = (Math.random() - 0.5) * 0.002;
          const offsetLon = (Math.random() - 0.5) * 0.002;
          
          return (
            <Marker
              key={record.id + index}
              position={[
                elAlba.coordinates.lat + offsetLat,
                elAlba.coordinates.lon + offsetLon
              ]}
              icon={createPulseIcon(record.status)}
            >
              <Popup>
                <div className="p-2 text-xs">
                  <div className="font-semibold">{record.user}</div>
                  <div className="text-muted-foreground">{record.subject}</div>
                  <div className="text-muted-foreground">{record.time}</div>
                  <div className={record.status === 'verified' ? 'text-green-600' : 'text-red-600'}>
                    {record.distance}m {record.status === 'verified' ? '✓ Verificado' : '✗ Fuera de rango'}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Botón flotante para abrir mapa completo */}
      {onOpenFullMap && (
        <button
          onClick={onOpenFullMap}
          className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-white/20 hover:bg-white transition-all flex items-center gap-2 text-sm font-medium group"
        >
          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Ver Mapa Completo
        </button>
      )}

      {/* Leyenda compacta */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-3">
        <div className="text-xs font-semibold mb-2">Asistencia en Tiempo Real</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
            <span>Verificado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white"></div>
            <span>Fuera de rango</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{caracasInstitutions.length} instituciones</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactPremiumMap;

