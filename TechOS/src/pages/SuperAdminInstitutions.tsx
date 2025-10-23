import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';

const SuperAdminInstitutions = () => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: '', type: 'school', address: '', latitude: '', longitude: '', radius: '100' });
  const [campusForms, setCampusForms] = useState<Record<string, { name: string; latitude: string; longitude: string; radius: string }>>({});

  const load = async () => {
    setLoading(true);
    try { setInstitutions(await api.institutions.list()); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const createInstitution = async () => {
    await api.institutions.create({
      name: form.name,
      type: form.type,
      address: form.address || undefined,
      latitude: form.latitude ? Number(form.latitude) : undefined,
      longitude: form.longitude ? Number(form.longitude) : undefined,
      attendanceRadiusMeters: Number(form.radius || '100'),
    });
    setForm({ name: '', type: 'school', address: '', latitude: '', longitude: '', radius: '100' });
    await load();
  };

  const addCampus = async (institutionId: string) => {
    const f = campusForms[institutionId] || { name: '', latitude: '', longitude: '', radius: '100' };
    await api.institutions.addCampus(institutionId, {
      name: f.name,
      latitude: Number(f.latitude),
      longitude: Number(f.longitude),
      radiusMeters: Number(f.radius || '100'),
    });
    await load();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Panel de Super Admin</h1>
          <p className="text-white/80">Gestión de instituciones y campuses</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Registrar Institución</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Nombre</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div>
                <Label>Tipo</Label>
                <Select value={form.type} onValueChange={(v: any) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">Colegio</SelectItem>
                    <SelectItem value="university">Universidad</SelectItem>
                    <SelectItem value="institute">Instituto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2"><Label>Dirección</Label><Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
              <div><Label>Latitud</Label><Input value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} /></div>
              <div><Label>Longitud</Label><Input value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} /></div>
              <div><Label>Radio asistencia (m)</Label><Input value={form.radius} onChange={e => setForm({ ...form, radius: e.target.value })} /></div>
            </div>
            <Button onClick={createInstitution} disabled={!form.name}>Crear institución</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Instituciones</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div>Cargando...</div>
            ) : institutions.length === 0 ? (
              <div>No hay instituciones</div>
            ) : (
              institutions.map((inst) => (
                <div key={inst.id} className="rounded-lg border p-3 bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{inst.name}</div>
                      <div className="text-xs text-muted-foreground">{inst.type} • {inst.campuses?.length || 0} campus</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {inst.campuses?.map((c: any) => (
                      <div key={c.id} className="text-xs border rounded p-2">{c.name}<br />{c.latitude.toFixed(4)}, {c.longitude.toFixed(4)} • {c.radiusMeters}m</div>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2">
                    <Input placeholder="Nombre campus" value={(campusForms[inst.id]?.name)||''} onChange={e => setCampusForms({ ...campusForms, [inst.id]: { ...(campusForms[inst.id]||{ name:'', latitude:'', longitude:'', radius:'100'}), name: e.target.value } })} />
                    <Input placeholder="Lat" value={(campusForms[inst.id]?.latitude)||''} onChange={e => setCampusForms({ ...campusForms, [inst.id]: { ...(campusForms[inst.id]||{ name:'', latitude:'', longitude:'', radius:'100'}), latitude: e.target.value } })} />
                    <Input placeholder="Lon" value={(campusForms[inst.id]?.longitude)||''} onChange={e => setCampusForms({ ...campusForms, [inst.id]: { ...(campusForms[inst.id]||{ name:'', latitude:'', longitude:'', radius:'100'}), longitude: e.target.value } })} />
                    <Input placeholder="Radio" value={(campusForms[inst.id]?.radius)||'100'} onChange={e => setCampusForms({ ...campusForms, [inst.id]: { ...(campusForms[inst.id]||{ name:'', latitude:'', longitude:'', radius:'100'}), radius: e.target.value } })} />
                    <Button onClick={() => addCampus(inst.id)}>Agregar campus</Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminInstitutions;


