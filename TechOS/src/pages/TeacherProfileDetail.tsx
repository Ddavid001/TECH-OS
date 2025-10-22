import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  User, 
  Building, 
  Briefcase, 
  BookOpen,
  Award,
  Globe,
  GraduationCap,
  FileText,
  Link as LinkIcon,
  Mail,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { mockTeacherProfiles, getApplicationsByTeacher } from '@/data/mock-teacher-profiles';
import { caracasInstitutions } from '@/data/caracas-institutions';
import { mockJobOffers } from '@/data/mock-job-offers';

const TeacherProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const teacher = mockTeacherProfiles.find(t => t.id === id);
  const institution = teacher ? caracasInstitutions.find(inst => inst.id === teacher.institution_id) : null;
  const applications = teacher ? getApplicationsByTeacher(teacher.id) : [];

  if (!teacher) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Perfil no encontrado</h2>
        <Button onClick={() => navigate('/applications')}>
          Volver a profesores
        </Button>
      </div>
    );
  }

  const profile = teacher.teacher_profile;

  const formatEducationLevel = (level?: string) => {
    const levels = {
      bachelors: 'Licenciatura',
      masters: 'Maestría',
      phd: 'Doctorado',
      specialist: 'Especialización'
    };
    return level ? levels[level as keyof typeof levels] || level : 'No especificado';
  };

  const getApplicationStatus = (status: string) => {
    const statuses = {
      pending: { label: 'Pendiente', variant: 'default' as const },
      reviewing: { label: 'En Revisión', variant: 'secondary' as const },
      shortlisted: { label: 'Preseleccionado', variant: 'default' as const },
      rejected: { label: 'Rechazado', variant: 'destructive' as const },
      accepted: { label: 'Aceptado', variant: 'default' as const }
    };
    return statuses[status as keyof typeof statuses] || statuses.pending;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/applications')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a profesores
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {teacher.first_name} {teacher.last_name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="text-sm">{profile.specialties[0]}</Badge>
                  {profile.education_level && (
                    <Badge variant="secondary" className="text-sm">
                      {formatEducationLevel(profile.education_level)}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-sm">
                    {profile.years_of_experience} años de experiencia
                  </Badge>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{institution?.name}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button size="lg">
                <Mail className="h-4 w-4 mr-2" />
                Contactar
              </Button>
              {profile.cv_url && (
                <Button variant="outline" size="lg">
                  <FileText className="h-4 w-4 mr-2" />
                  Descargar CV
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            {profile.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>Sobre mí</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {profile.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Áreas de Especialización
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm py-2 px-4">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            {profile.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Certificaciones y Títulos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {profile.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Applications History */}
            {applications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-primary" />
                    Postulaciones Recientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 5).map((app) => {
                      const jobOffer = mockJobOffers.find(j => j.id === app.job_offer_id);
                      const appInstitution = jobOffer ? caracasInstitutions.find(i => i.id === jobOffer.institution_id) : null;
                      const status = getApplicationStatus(app.status);
                      
                      return (
                        <div 
                          key={app.id}
                          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold">{jobOffer?.title}</h4>
                              <p className="text-sm text-gray-600">{appInstitution?.name}</p>
                            </div>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            Postulado el {new Date(app.created_at).toLocaleDateString('es-VE')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact & Links */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    Email
                  </div>
                  <a 
                    href={`mailto:${teacher.email}`}
                    className="text-sm font-medium ml-6 hover:text-primary"
                  >
                    {teacher.email}
                  </a>
                </div>

                {profile.linkedin_url && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <LinkIcon className="h-4 w-4 mr-2 text-primary" />
                        LinkedIn
                      </div>
                      <a 
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium ml-6 hover:text-primary"
                      >
                        Ver perfil
                      </a>
                    </div>
                  </>
                )}

                {profile.portfolio_url && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <LinkIcon className="h-4 w-4 mr-2 text-primary" />
                        Portfolio
                      </div>
                      <a 
                        href={profile.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium ml-6 hover:text-primary"
                      >
                        Ver trabajos
                      </a>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles Profesionales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Briefcase className="h-4 w-4 mr-2 text-primary" />
                    Experiencia
                  </div>
                  <p className="font-medium ml-6">{profile.years_of_experience} años</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                    Nivel Educativo
                  </div>
                  <p className="font-medium ml-6">
                    {formatEducationLevel(profile.education_level)}
                  </p>
                </div>

                {profile.languages.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Globe className="h-4 w-4 mr-2 text-primary" />
                        Idiomas
                      </div>
                      <div className="ml-6 flex flex-wrap gap-1 mt-2">
                        {profile.languages.map((lang, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Última actualización
                  </div>
                  <p className="text-sm ml-6">
                    {new Date(profile.updated_at).toLocaleDateString('es-VE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Institution */}
            {institution && (
              <Card>
                <CardHeader>
                  <CardTitle>Institución Actual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">{institution.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{institution.type}</p>
                  </div>
                  <Separator />
                  <div className="text-sm text-gray-600">
                    {institution.address}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileDetail;
