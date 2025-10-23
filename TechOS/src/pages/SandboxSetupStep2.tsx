import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ArrowLeft, Users, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const SandboxSetupStep2 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: 'Error',
        description: 'El nombre y email son requeridos',
        variant: 'destructive',
      });
      return;
    }

    const user: User = {
      id: Math.random().toString(36).substring(7),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'student' });
    
    toast({
      title: '✅ Usuario agregado',
      description: `${user.name} (${user.role})`,
    });
  };

  const handleRemoveUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleSubmit = () => {
    if (users.length === 0) {
      toast({
        title: 'Advertencia',
        description: 'Agrega al menos un usuario para continuar',
        variant: 'destructive',
      });
      return;
    }

    // Guardar en localStorage
    localStorage.setItem('sandbox_users', JSON.stringify(users));
    
    toast({
      title: '✅ Usuarios configurados',
      description: `${users.length} usuario(s) agregado(s)`,
    });
    
    navigate('/setup-sandbox/step3');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Configuración del Sandbox</h1>
          <p className="text-muted-foreground">Paso 2 de 3: Agregar usuarios de ejemplo</p>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2">
          <div className="w-32 h-2 bg-primary rounded-full" />
          <div className="w-32 h-2 bg-primary rounded-full" />
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        {/* Add User Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary" />
              <CardTitle>Agregar Usuario</CardTitle>
            </div>
            <CardDescription>
              Crea docentes, estudiantes y administradores para tu institución
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="role">Rol</Label>
                <div className="flex gap-2">
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="teacher">Docente</SelectItem>
                      <SelectItem value="student">Estudiante</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddUser} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Usuarios Agregados ({users.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay usuarios agregados aún</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'teacher' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {user.role === 'admin' ? 'Administrador' :
                           user.role === 'teacher' ? 'Docente' : 'Estudiante'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/setup-sandbox')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Button onClick={handleSubmit}>
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SandboxSetupStep2;

