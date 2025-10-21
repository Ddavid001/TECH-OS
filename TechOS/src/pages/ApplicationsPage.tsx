import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, User, Building, Calendar, BookOpen } from 'lucide-react';

// Datos de postulaciones de profesores en diferentes materias
const teacherApplications = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    subject: 'Matemáticas',
    experience: '5 años',
    education: 'Licenciado en Educación Matemática',
    institution: 'Universidad Central de Venezuela',
    date: '15/06/2023',
  },
  {
    id: 2,
    name: 'María González',
    subject: 'Biología',
    experience: '8 años',
    education: 'Doctora en Ciencias Biológicas',
    institution: 'Universidad Simón Bolívar',
    date: '20/06/2023',
  },
  {
    id: 3,
    name: 'José Martínez',
    subject: 'Historia',
    experience: '6 años',
    education: 'Magister en Historia Contemporánea',
    institution: 'Universidad Católica Andrés Bello',
    date: '22/06/2023',
  },
  {
    id: 4,
    name: 'Ana Pérez',
    subject: 'Química',
    experience: '4 años',
    education: 'Licenciada en Química',
    institution: 'Universidad Central de Venezuela',
    date: '25/06/2023',
  },
  {
    id: 5,
    name: 'Luis Hernández',
    subject: 'Física',
    experience: '7 años',
    education: 'Doctor en Física',
    institution: 'Universidad Simón Bolívar',
    date: '28/06/2023',
  },
  {
    id: 6,
    name: 'Carmen Díaz',
    subject: 'Literatura',
    experience: '9 años',
    education: 'Licenciada en Letras',
    institution: 'Universidad Central de Venezuela',
    date: '01/07/2023',
  },
  {
    id: 7,
    name: 'Roberto Sánchez',
    subject: 'Informática',
    experience: '6 años',
    education: 'Ingeniero en Sistemas',
    institution: 'Universidad Simón Bolívar',
    date: '03/07/2023',
  },
  {
    id: 8,
    name: 'Patricia Flores',
    subject: 'Inglés',
    experience: '10 años',
    education: 'Licenciada en Idiomas Modernos',
    institution: 'Universidad Metropolitana',
    date: '05/07/2023',
  },
  {
    id: 9,
    name: 'Miguel Torres',
    subject: 'Educación Física',
    experience: '5 años',
    education: 'Licenciado en Educación Física',
    institution: 'Universidad Pedagógica Experimental Libertador',
    date: '08/07/2023',
  },
  {
    id: 10,
    name: 'Gabriela Ramírez',
    subject: 'Arte',
    experience: '7 años',
    education: 'Licenciada en Artes Plásticas',
    institution: 'Universidad de las Artes',
    date: '10/07/2023',
  },
];

const ApplicationsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-2">
          <FileText className="mr-2 h-8 w-8" />
          Postulaciones de Profesores
        </h1>
        <p className="text-gray-600">
          Explora las postulaciones de profesores en diferentes materias para instituciones educativas en Caracas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teacherApplications.map((application) => (
          <Card key={application.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-primary/5 pb-2">
              <CardTitle className="text-xl flex items-center">
                <User className="h-5 w-5 mr-2" />
                {application.name}
              </CardTitle>
              <CardDescription>
                Postulación para profesor de {application.subject}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Materia:</span>
                  <Badge variant="outline" className="ml-2">{application.subject}</Badge>
                </div>
                
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Experiencia:</span>
                  <span className="ml-2">{application.experience}</span>
                </div>
                
                <div className="flex items-start text-sm">
                  <Building className="h-4 w-4 mr-2 text-primary mt-1" />
                  <div>
                    <span className="font-medium">Formación:</span>
                    <p className="ml-2">{application.education}</p>
                    <p className="ml-2 text-gray-500">{application.institution}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Fecha de postulación:</span>
                  <span className="ml-2">{application.date}</span>
                </div>
                
                <div className="pt-3">
                  <Button className="w-full">Ver detalles</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;