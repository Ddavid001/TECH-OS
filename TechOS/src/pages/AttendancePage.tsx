import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

const AttendancePage = () => {
  const { user } = useAuth();
  const [institutionId, setInstitutionId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => new Promise<GeolocationPosition>((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 }));

  const doCheckin = async () => {
    try {
      setStatus(null); setError(null);
      const pos = await getLocation();
      const lat = pos.coords.latitude; const lon = pos.coords.longitude;
      setCoords({ lat, lon });
      const resp = await api.attendance.checkin({ institutionId, userId: user?.id || 'local-user', courseId, latitude: lat, longitude: lon });
      setStatus(`Asistencia registrada: ${resp.status || 'presente'}`);
    } catch (e: any) {
      setError(e.message || 'No se pudo marcar asistencia');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Asistencia</h1>
          <p className="text-white/80">Marca tu asistencia con geolocalización</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader><CardTitle>Check-in</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label>Institution ID</Label>
                <Input value={institutionId} onChange={e => setInstitutionId(e.target.value)} placeholder="UUID de institución" />
              </div>
              <div>
                <Label>Course ID</Label>
                <Input value={courseId} onChange={e => setCourseId(e.target.value)} placeholder="UUID de curso" />
              </div>
            </div>
            <Button onClick={doCheckin} disabled={!institutionId || !courseId}>Marcar asistencia</Button>
            {coords && <div className="text-xs text-muted-foreground">Ubicación: {coords.lat.toFixed(6)}, {coords.lon.toFixed(6)}</div>}
            {status && <div className="text-green-700 dark:text-green-400 text-sm">{status}</div>}
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendancePage;


