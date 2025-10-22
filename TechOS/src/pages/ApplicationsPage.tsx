import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  User, 
  Building, 
  Calendar, 
  BookOpen, 
  Award,
  Briefcase,
  Globe,
  Search,
  Filter,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import { mockTeacherProfiles } from '@/data/mock-teacher-profiles';
import { caracasInstitutions } from '@/data/caracas-institutions';

const ApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<string>('all');
  const [minExperience, setMinExperience] = useState<string>('0');

  // Get all unique specialties
  const allSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    mockTeacherProfiles.forEach(teacher => {
      teacher.teacher_profile.specialties.forEach(spec => specialties.add(spec));
    });
    return Array.from(specialties).sort();
  }, []);

  // Format education level
  const formatEducationLevel = (level?: string) => {
    const levels = {
      bachelors: 'Licenciatura',
      masters: 'Maestría',
      phd: 'Doctorado',
      specialist: 'Especialización'
    };
    return level ? levels[level as keyof typeof levels] || level : 'No especificado';
  };

  // Get institution name
  const getInstitutionName = (institutionId: string) => {
    const institution = caracasInstitutions.find(inst => inst.id === institutionId);
    return institution?.name || 'Institución';
  };

  // Filter teachers
  const filteredTeachers = useMemo(() => {
    return mockTeacherProfiles.filter(teacher => {
      const profile = teacher.teacher_profile;
      
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const fullName = `${teacher.first_name} ${teacher.last_name}`.toLowerCase();
        const matchesName = fullName.includes(searchLower);
        const matchesSpecialty = profile.specialties.some(spec => 
          spec.toLowerCase().includes(searchLower)
        );
        const matchesBio = profile.bio?.toLowerCase().includes(searchLower);
        
        if (!matchesName && !matchesSpecialty && !matchesBio) return false;
      }

      // Specialty filter
      if (selectedSpecialty !== 'all' && !profile.specialties.includes(selectedSpecialty)) {
        return false;
      }

      // Education level filter
      if (selectedEducationLevel !== 'all' && profile.education_level !== selectedEducationLevel) {
        return false;
      }

      // Experience filter
      if (profile.years_of_experience < parseInt(minExperience)) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedSpecialty, selectedEducationLevel, minExperience]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold flex items-center mb-2">
              <FileText className="mr-3 h-8 w-8 text-primary" />
              Perfiles de Profesores Disponibles
            </h1>
            <p className="text-gray-600">
              Explora los perfiles de profesores calificados en diferentes áreas educativas
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Profesores</p>
                    <p className="text-2xl font-bold">{filteredTeachers.length}</p>
                  </div>
                  <User className="h-8 w-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Especialidades</p>
                    <p className="text-2xl font-bold">{allSpecialties.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Experiencia Promedio</p>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        filteredTeachers.reduce((sum, t) => sum + t.teacher_profile.years_of_experience, 0) / 
                        filteredTeachers.length
                      )} años
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Con Doctorado</p>
                    <p className="text-2xl font-bold">
                      {filteredTeachers.filter(t => t.teacher_profile.education_level === 'phd').length}
                    </p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="h-5 w-5 mr-2" />
              Filtrar Profesores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre o especialidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las especialidades</SelectItem>
                  {allSpecialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedEducationLevel} onValueChange={setSelectedEducationLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Nivel educativo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los niveles</SelectItem>
                  <SelectItem value="bachelors">Licenciatura</SelectItem>
                  <SelectItem value="masters">Maestría</SelectItem>
                  <SelectItem value="phd">Doctorado</SelectItem>
                  <SelectItem value="specialist">Especialización</SelectItem>
                </SelectContent>
              </Select>
              <Select value={minExperience} onValueChange={setMinExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Experiencia mínima" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Cualquier experiencia</SelectItem>
                  <SelectItem value="2">Mínimo 2 años</SelectItem>
                  <SelectItem value="5">Mínimo 5 años</SelectItem>
                  <SelectItem value="10">Mínimo 10 años</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => {
            const profile = teacher.teacher_profile;
            return (
              <Card 
                key={teacher.id} 
                className="overflow-hidden hover:shadow-xl transition-all border-l-4 border-l-primary hover:scale-105"
              >
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/0 pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        {teacher.first_name} {teacher.last_name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {profile.specialties[0]}
                      </CardDescription>
                    </div>
                    {profile.education_level && (
                      <Badge variant="secondary">
                        {formatEducationLevel(profile.education_level)}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4 space-y-3">
                  {/* Bio */}
                  {profile.bio && (
                    <p className="text-sm text-gray-700 line-clamp-3">{profile.bio}</p>
                  )}

                  {/* Experience */}
                  <div className="flex items-center text-sm border-t pt-3">
                    <Briefcase className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    <span className="font-medium">Experiencia:</span>
                    <span className="ml-2">{profile.years_of_experience} años</span>
                  </div>

                  {/* Institution */}
                  <div className="flex items-start text-sm">
                    <Building className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="font-medium">Institución:</span>
                      <p className="text-gray-600 line-clamp-1">
                        {getInstitutionName(teacher.institution_id)}
                      </p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex items-start text-sm">
                    <BookOpen className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="font-medium">Especialidades:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.specialties.slice(0, 3).map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {profile.specialties.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{profile.specialties.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  {profile.languages.length > 0 && (
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      <span className="font-medium">Idiomas:</span>
                      <span className="ml-2">{profile.languages.join(', ')}</span>
                    </div>
                  )}

                  {/* Certifications */}
                  {profile.certifications.length > 0 && (
                    <div className="flex items-start text-sm">
                      <Award className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-medium">Certificaciones:</span>
                        <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                          {profile.certifications.join(', ')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex items-center text-xs text-gray-500 pt-2 border-t">
                    <Calendar className="h-3 w-3 mr-1" />
                    Perfil actualizado: {new Date(profile.updated_at).toLocaleDateString('es-VE')}
                  </div>
                </CardContent>

                <div className="bg-gray-50 p-3">
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/teacher-profile/${teacher.id}`)}
                  >
                    Ver Perfil Completo
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredTeachers.length === 0 && (
          <Card className="p-12 text-center">
            <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron profesores
            </h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros de búsqueda
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;