import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Building, FileText, ArrowLeft, Users, Briefcase } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

/**
 * Applications Portal Component
 */
const ApplicationsPortal: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Portal de Postulaciones y Ofertas</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Cómo quieres participar?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecciona el tipo de postulación que mejor se adapte a tu perfil y necesidades.
          </p>
        </div>

        {/* Browse Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Explora Oportunidades
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary"
              onClick={() => navigate('/job-offers')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-3 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Briefcase className="h-7 w-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Ofertas Laborales</CardTitle>
                <CardDescription>
                  Explora vacantes en instituciones educativas
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button variant="outline" className="w-full">
                  Ver Ofertas
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-green-500"
              onClick={() => navigate('/applications/browse')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-3 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Users className="h-7 w-7 text-green-600" />
                </div>
                <CardTitle className="text-xl">Profesores Postulados</CardTitle>
                <CardDescription>
                  Descubre perfiles de profesores calificados
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                  Ver Profesores
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="border-t pt-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Postúlate o Registra tu Institución
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Teacher Application */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">¿Eres Docente?</CardTitle>
              <CardDescription className="text-base">
                Postúlate como docente para impartir clases en instituciones educativas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Requisitos:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Título universitario o técnico</li>
                  <li>• Experiencia docente (preferible)</li>
                  <li>• Documentos de identidad</li>
                  <li>• Certificados académicos</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Beneficios:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Acceso a múltiples instituciones</li>
                  <li>• Flexibilidad horaria</li>
                  <li>• Desarrollo profesional</li>
                  <li>• Red de contactos educativos</li>
                </ul>
              </div>

              <Button 
                className="w-full" 
                onClick={() => navigate('/applications/teacher')}
              >
                Postularme como Docente
              </Button>
            </CardContent>
          </Card>

          {/* Institution Application */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Building className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">¿Eres Institución?</CardTitle>
              <CardDescription className="text-base">
                Registra tu institución educativa para acceder a docentes calificados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Requisitos:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Registro legal de la institución</li>
                  <li>• Documentos de constitución</li>
                  <li>• Licencias educativas</li>
                  <li>• Información de contacto</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Beneficios:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Acceso a docentes calificados</li>
                  <li>• Gestión de clases y horarios</li>
                  <li>• Seguimiento de asistencia</li>
                  <li>• Herramientas administrativas</li>
                </ul>
              </div>

              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => navigate('/applications/institution')}
              >
                Registrar mi Institución
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <div className="text-center mb-6">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Proceso de Postulación
            </h3>
            <p className="text-gray-600">
              Conoce los pasos que debes seguir para completar tu postulación
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Completa el Formulario</h4>
              <p className="text-sm text-gray-600">
                Llena todos los campos requeridos con información veraz
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sube tus Documentos</h4>
              <p className="text-sm text-gray-600">
                Adjunta los documentos necesarios en formato PDF o imagen
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Revisión</h4>
              <p className="text-sm text-gray-600">
                Nuestro equipo revisará tu postulación en 2-3 días hábiles
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Aprobación</h4>
              <p className="text-sm text-gray-600">
                Recibirás una notificación con el resultado de tu postulación
              </p>
            </div>
          </div>
        </div>

        {/* Status Information */}
        <div className="mt-8 text-center">
          <Badge variant="secondary" className="text-sm">
            <FileText className="h-4 w-4 mr-2" />
            Tiempo promedio de revisión: 2-3 días hábiles
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPortal;
