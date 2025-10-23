import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, School, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SandboxSetupStep1 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    type: 'school',
    address: '',
    latitude: 10.5,
    longitude: -66.92,
    attendanceRadius: 100,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: 'Error',
        description: 'El nombre de la institución es requerido',
        variant: 'destructive',
      });
      return;
    }

    // Guardar en localStorage para el siguiente paso
    localStorage.setItem('sandbox_institution', JSON.stringify(formData));
    
    toast({
      title: '✅ Institución configurada',
      description: `${formData.name} creada exitosamente`,
    });
    
    navigate('/setup-sandbox/step2');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Configuración del Sandbox</h1>
          <p className="text-muted-foreground">Paso 1 de 3: Configurar tu institución</p>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2">
          <div className="w-32 h-2 bg-primary rounded-full" />
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <School className="h-6 w-6 text-primary" />
              <CardTitle>Información de la Institución</CardTitle>
            </div>
            <CardDescription>
              Configura los datos básicos de tu institución educativa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Institución *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Colegio San José"
                  required
                />
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Institución</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">Escuela</SelectItem>
                    <SelectItem value="highschool">Liceo</SelectItem>
                    <SelectItem value="university">Universidad</SelectItem>
                    <SelectItem value="institute">Instituto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Av. Principal, Ciudad, Estado"
                />
              </div>

              {/* Coordenadas GPS */}
              <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <Label className="font-semibold">Ubicación GPS (Para Asistencia)</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Define las coordenadas del centro de tu institución para la verificación de asistencia
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitud</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="0.000001"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitud</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="0.000001"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  💡 Tip: Puedes obtener las coordenadas desde Google Maps haciendo click derecho en el mapa
                </div>
              </div>

              {/* Radio de Asistencia */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Radio de Asistencia</Label>
                  <span className="text-sm font-semibold text-primary">{formData.attendanceRadius}m</span>
                </div>
                <Slider
                  value={[formData.attendanceRadius]}
                  onValueChange={(value) => setFormData({ ...formData, attendanceRadius: value[0] })}
                  min={50}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Los estudiantes deben estar dentro de este radio para marcar asistencia
                </p>
              </div>

              {/* Botones */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SandboxSetupStep1;

