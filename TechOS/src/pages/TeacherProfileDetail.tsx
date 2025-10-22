import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  BookOpen, 
  GraduationCap,
  Languages,
  Briefcase,
  FileText,
  Link as LinkIcon,
  Calendar,
  Building
} from 'lucide-react';
import { teacherProfiles } from '@/data/teacher-profiles-data';

const TeacherProfileDetail: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const navigate = useNavigate();

  const profile = teacherProfiles.find(p => p.id === teacherId);

  if (!profile) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Perfil no encontrado</h2>
          <p className="text-muted-foreground mb-6">
            El perfil que buscas no existe.
          </p>
          <Button onClick={() => navigate('/applications')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Postulaciones
          </Button>
        </Card>
      </div>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/applications')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Postulaciones
          </Button>
          
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary-foreground/20">
              <AvatarImage src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} />
              <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground font-bold text-2xl">
                {getInitials(profile.firstName, profile.lastName)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {profile.firstName} {profile.lastName}
              </h1>
              {profile.education[0] && (
                <p className="text-xl text-primary-foreground/90 mb-3">
                  {profile.education.sort((a, b) => parseInt(b.graduationYear) - parseInt(a.graduationYear))[0].degree}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm">
                  {profile.yearsOfExperience} años de experiencia
                </Badge>
                {profile.certifications.length > 0 && (
                  <Badge variant="secondary" className="text-sm">
                    {profile.certifications.length} certificaciones
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre mí</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Especialidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experiencia Profesional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.experience.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 pb-6 border-l-2 border-primary/20 last:pb-0 last:border-l-0">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-2 border-background" />
                      
                      <div className="space-y-2">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="font-semibold text-lg">{exp.position}</h3>
                            <p className="text-muted-foreground flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              {exp.institution}
                            </p>
                          </div>
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(exp.startDate).toLocaleDateString('es-VE', { month: 'short', year: 'numeric' })}
                            {' - '}
                            {exp.endDate ? new Date(exp.endDate).toLocaleDateString('es-VE', { month: 'short', year: 'numeric' }) : 'Presente'}
                          </Badge>
                        </div>
                        
                        {exp.subject && (
                          <Badge variant="secondary" className="text-xs">
                            {exp.subject}
                          </Badge>
                        )}
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Formación Académica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.education
                    .sort((a, b) => parseInt(b.graduationYear) - parseInt(a.graduationYear))
                    .map((edu, idx) => (
                    <div key={idx} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <Badge variant="outline">{edu.graduationYear}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-primary mt-1">{edu.field}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            {profile.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.certifications.map((cert, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-1">{cert.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(cert.issueDate).toLocaleDateString('es-VE', { month: 'short', year: 'numeric' })}
                            {cert.expiryDate && ` - ${new Date(cert.expiryDate).toLocaleDateString('es-VE', { month: 'short', year: 'numeric' })}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {profile.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Habilidades Técnicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm">Email</p>
                    <a 
                      href={`mailto:${profile.email}`}
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                {profile.phone && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Teléfono</p>
                        <a 
                          href={`tel:${profile.phone}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {profile.phone}
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {profile.preferredLocations.length > 0 && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Ubicaciones Preferidas</p>
                        <p className="text-sm text-muted-foreground">
                          {profile.preferredLocations.join(', ')}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {profile.availableFrom && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Disponible desde</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(profile.availableFrom).toLocaleDateString('es-VE', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Languages */}
            {profile.languages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Languages className="h-5 w-5" />
                    Idiomas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {profile.languages.map((lang, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {lang}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Documentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {profile.cvUrl && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      Descargar CV
                    </a>
                  </Button>
                )}
                {profile.portfolioUrl && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Ver Portfolio
                    </a>
                  </Button>
                )}
                {profile.linkedinUrl && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Perfil LinkedIn
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">Contactar Candidato</CardTitle>
                <CardDescription className="text-xs">
                  Envía un mensaje o programa una entrevista
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" asChild>
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Email
                  </a>
                </Button>
                {profile.phone && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileDetail;
