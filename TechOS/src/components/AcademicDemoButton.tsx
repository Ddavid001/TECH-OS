import { Calendar, FileText, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

export const AcademicDemoButton = () => {
  const navigate = useNavigate();

  const demos = [
    {
      title: 'Calendario Unificado',
      description: 'Visualiza y gestiona eventos académicos',
      icon: Calendar,
      path: '/calendar',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
    },
    {
      title: 'Repositorio de Materiales',
      description: 'Sube y descarga materiales de curso',
      icon: FileText,
      path: '/materials',
      color: 'text-green-500',
      bgColor: 'bg-green-50 hover:bg-green-100',
    },
    {
      title: 'Libro de Calificaciones',
      description: 'Gestiona evaluaciones y notas',
      icon: BookOpen,
      path: '/gradebook',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
    },
    {
      title: 'Mis Notas',
      description: 'Consulta tu rendimiento académico',
      icon: GraduationCap,
      path: '/grades',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        >
          🎓 Sistema Académico Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">🎓 Sistema Académico TechOS</DialogTitle>
          <p className="text-muted-foreground">
            Explora las nuevas funcionalidades académicas implementadas
          </p>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {demos.map((demo) => (
            <Card
              key={demo.path}
              className={`cursor-pointer transition-all hover:shadow-lg ${demo.bgColor} border-2`}
              onClick={() => navigate(demo.path)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                    <demo.icon className={`h-6 w-6 ${demo.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{demo.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {demo.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏫</span>
            <h3 className="font-semibold text-blue-900">Demostración - Colegio El Alba</h3>
          </div>
          <p className="text-sm text-blue-800">
            Explora el sistema académico con datos de ejemplo del Colegio El Alba, incluyendo cursos, 
            estudiantes, y evaluaciones reales.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcademicDemoButton;

