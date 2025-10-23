import { useEffect, useState } from 'react';
import { MapPin, CheckCircle2, XCircle } from 'lucide-react';

interface RadarScannerProps {
  isScanning: boolean;
  onComplete: (success: boolean, message: string) => void;
  institutionCoords: { lat: number; lon: number };
}

export const RadarScanner = ({ 
  isScanning, 
  onComplete,
  institutionCoords 
}: RadarScannerProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'scanning' | 'success' | 'error' | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isScanning) {
      setProgress(0);
      setStatus(null);
      return;
    }

    setStatus('scanning');
    setMessage('Verificando ubicación...');
    
    // Simular progreso de escaneo
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Simular verificación de geolocalización
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              
              // Calcular distancia (Haversine simplificado)
              const R = 6371e3; // Radio de la Tierra en metros
              const φ1 = (institutionCoords.lat * Math.PI) / 180;
              const φ2 = (latitude * Math.PI) / 180;
              const Δφ = ((latitude - institutionCoords.lat) * Math.PI) / 180;
              const Δλ = ((longitude - institutionCoords.lon) * Math.PI) / 180;

              const a =
                Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              const distance = R * c;

              const isInRange = distance <= 50; // 50 metros de radio

              setTimeout(() => {
                if (isInRange) {
                  setStatus('success');
                  setMessage(`Asistencia verificada • ${Math.round(distance)}m del instituto`);
                  setTimeout(() => onComplete(true, 'Asistencia registrada exitosamente'), 2000);
                } else {
                  setStatus('error');
                  setMessage(`Fuera de rango • ${Math.round(distance)}m del instituto (máx. 50m)`);
                  setTimeout(() => onComplete(false, 'Ubicación fuera del radio permitido'), 2000);
                }
              }, 500);
            },
            (error) => {
              setStatus('error');
              setMessage('No se pudo acceder a tu ubicación');
              setTimeout(() => onComplete(false, 'Error de geolocalización'), 2000);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
          
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isScanning, institutionCoords, onComplete]);

  if (!isScanning && !status) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Video de Fondo a Pantalla Completa */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Radar de Escaneo */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Ícono Central */}
        <div className="relative">
          {status === 'scanning' && (
            <>
              {/* Ondas de Radar */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border-2 border-blue-400/40"
                    style={{
                      width: `${100 + i * 80}px`,
                      height: `${100 + i * 80}px`,
                      animation: `radar-pulse 2s ease-out infinite ${i * 0.4}s`,
                    }}
                  />
                ))}
              </div>

              {/* Ícono de Ubicación */}
              <div className="relative z-10 p-8 rounded-full bg-blue-500/20 backdrop-blur-xl border-2 border-blue-400/60">
                <MapPin className="w-16 h-16 text-blue-400 animate-pulse" />
              </div>
            </>
          )}

          {status === 'success' && (
            <div className="relative z-10 p-8 rounded-full bg-emerald-500/20 backdrop-blur-xl border-2 border-emerald-400/60 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-16 h-16 text-emerald-400" />
            </div>
          )}

          {status === 'error' && (
            <div className="relative z-10 p-8 rounded-full bg-red-500/20 backdrop-blur-xl border-2 border-red-400/60 animate-in zoom-in duration-500">
              <XCircle className="w-16 h-16 text-red-400" />
            </div>
          )}
        </div>

        {/* Mensaje de Estado */}
        <div className="text-center space-y-2">
          <p className="text-2xl font-semibold text-white tracking-tight">
            {message}
          </p>
          
          {status === 'scanning' && (
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Coordenadas (Solo durante escaneo) */}
        {status === 'scanning' && (
          <div className="text-sm text-white/60 font-mono">
            {institutionCoords.lat.toFixed(6)}, {institutionCoords.lon.toFixed(6)}
          </div>
        )}
      </div>

      {/* Estilos de Animación */}
      <style>{`
        @keyframes radar-pulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RadarScanner;

