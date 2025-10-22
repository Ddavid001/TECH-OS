import React, { useState, useMemo } from 'react';
import { TeacherProfileCard } from '@/components/applications/TeacherProfileCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Users, GraduationCap, Award } from 'lucide-react';
import { teacherProfiles } from '@/data/teacher-profiles-data';

const ApplicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [selectedEducation, setSelectedEducation] = useState<string>('all');

  // Get unique specialties
  const allSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    teacherProfiles.forEach(profile => {
      profile.specialties.forEach(s => specialties.add(s));
    });
    return Array.from(specialties).sort();
  }, []);

  // Get unique degrees
  const allDegrees = useMemo(() => {
    const degrees = new Set<string>();
    teacherProfiles.forEach(profile => {
      profile.education.forEach(edu => {
        const degreeType = edu.degree.split(' ')[0]; // Get "Doctorado", "Maestría", "Licenciatura"
        degrees.add(degreeType);
      });
    });
    return Array.from(degrees).sort();
  }, []);

  // Filter profiles
  const filteredProfiles = useMemo(() => {
    return teacherProfiles.filter(profile => {
      const matchesSearch = 
        `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.experience.some(exp => 
          exp.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.position.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesSpecialty = selectedSpecialty === 'all' || 
        profile.specialties.some(s => s === selectedSpecialty);
      
      const matchesExperience = selectedExperience === 'all' || 
        (selectedExperience === '0-3' && profile.yearsOfExperience <= 3) ||
        (selectedExperience === '4-7' && profile.yearsOfExperience >= 4 && profile.yearsOfExperience <= 7) ||
        (selectedExperience === '8-12' && profile.yearsOfExperience >= 8 && profile.yearsOfExperience <= 12) ||
        (selectedExperience === '13+' && profile.yearsOfExperience >= 13);
      
      const matchesEducation = selectedEducation === 'all' || 
        profile.education.some(edu => edu.degree.includes(selectedEducation));
      
      return matchesSearch && matchesSpecialty && matchesExperience && matchesEducation;
    });
  }, [searchTerm, selectedSpecialty, selectedExperience, selectedEducation]);

  // Group profiles by subject area
  const profilesByArea = useMemo(() => {
    const areas: Record<string, typeof teacherProfiles> = {
      'Ciencias Exactas': [],
      'Ciencias Naturales': [],
      'Humanidades': [],
      'Tecnología': [],
      'Educación Física y Arte': [],
      'Idiomas': []
    };

    filteredProfiles.forEach(profile => {
      const primarySpecialty = profile.specialties[0];
      
      if (primarySpecialty.includes('Matemática') || primarySpecialty.includes('Física') || primarySpecialty.includes('Química')) {
        areas['Ciencias Exactas'].push(profile);
      } else if (primarySpecialty.includes('Biología') || primarySpecialty.includes('Ecología')) {
        areas['Ciencias Naturales'].push(profile);
      } else if (primarySpecialty.includes('Historia') || primarySpecialty.includes('Literatura') || primarySpecialty.includes('Derecho')) {
        areas['Humanidades'].push(profile);
      } else if (primarySpecialty.includes('Programación') || primarySpecialty.includes('Web') || primarySpecialty.includes('Diseño')) {
        areas['Tecnología'].push(profile);
      } else if (primarySpecialty.includes('Educación Física') || primarySpecialty.includes('Arte') || primarySpecialty.includes('Artes')) {
        areas['Educación Física y Arte'].push(profile);
      } else if (primarySpecialty.includes('Inglés')) {
        areas['Idiomas'].push(profile);
      } else {
        areas['Humanidades'].push(profile);
      }
    });

    // Remove empty areas
    Object.keys(areas).forEach(key => {
      if (areas[key].length === 0) {
        delete areas[key];
      }
    });

    return areas;
  }, [filteredProfiles]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('all');
    setSelectedExperience('all');
    setSelectedEducation('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Postulaciones de Profesores</h1>
          </div>
          <p className="text-lg text-primary-foreground/90 max-w-3xl">
            Descubre perfiles de profesores altamente calificados con experiencia en diversas áreas educativas. 
            Cada perfil incluye formación académica, experiencia profesional, certificaciones y habilidades.
          </p>
          <div className="flex gap-4 mt-6">
            <Badge variant="secondary" className="text-base px-4 py-1">
              {teacherProfiles.length} profesores postulados
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-1">
              {allSpecialties.length} especialidades
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Filters Section */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filtros de Búsqueda</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, especialidad, institución..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Specialty */}
              <div>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las especialidades</SelectItem>
                    {allSpecialties.slice(0, 15).map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience */}
              <div>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Años de experiencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    <SelectItem value="0-3">0-3 años</SelectItem>
                    <SelectItem value="4-7">4-7 años</SelectItem>
                    <SelectItem value="8-12">8-12 años</SelectItem>
                    <SelectItem value="13+">13+ años</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Education Level */}
              <div>
                <Select value={selectedEducation} onValueChange={setSelectedEducation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nivel educativo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    <SelectItem value="Doctorado">Doctorado</SelectItem>
                    <SelectItem value="Maestría">Maestría</SelectItem>
                    <SelectItem value="Licenciatura">Licenciatura</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <div className="lg:col-span-3">
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="w-full md:w-auto"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedSpecialty !== 'all' || selectedExperience !== 'all' || selectedEducation !== 'all') && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Filtros activos:</p>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary">
                      Búsqueda: "{searchTerm}"
                    </Badge>
                  )}
                  {selectedSpecialty !== 'all' && (
                    <Badge variant="secondary">
                      Especialidad: {selectedSpecialty}
                    </Badge>
                  )}
                  {selectedExperience !== 'all' && (
                    <Badge variant="secondary">
                      Experiencia: {selectedExperience} años
                    </Badge>
                  )}
                  {selectedEducation !== 'all' && (
                    <Badge variant="secondary">
                      Educación: {selectedEducation}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg font-medium">
            {filteredProfiles.length} {filteredProfiles.length === 1 ? 'perfil encontrado' : 'perfiles encontrados'}
          </p>
        </div>

        {/* Profiles Display - Organized by Area */}
        {Object.keys(profilesByArea).length > 0 ? (
          <Tabs defaultValue={Object.keys(profilesByArea)[0]} className="w-full">
            <TabsList className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full mb-6">
              {Object.keys(profilesByArea).map(area => (
                <TabsTrigger key={area} value={area} className="text-xs lg:text-sm">
                  {area} ({profilesByArea[area].length})
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(profilesByArea).map(([area, profiles]) => (
              <TabsContent key={area} value={area} className="mt-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    {area}
                  </h2>
                  <p className="text-muted-foreground">
                    {profiles.length} {profiles.length === 1 ? 'profesor postulado' : 'profesores postulados'} en esta área
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profiles.map(profile => (
                    <TeacherProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <Card className="p-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron perfiles</h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar los filtros para ver más resultados
              </p>
              <Button onClick={resetFilters}>
                Limpiar Filtros
              </Button>
            </div>
          </Card>
        )}

        {/* Statistics Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-12 w-12 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold mb-2">
                {teacherProfiles.filter(p => p.education.some(e => e.degree.includes('Doctorado'))).length}
              </p>
              <p className="text-muted-foreground">Doctores</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold mb-2">
                {teacherProfiles.reduce((sum, p) => sum + p.certifications.length, 0)}
              </p>
              <p className="text-muted-foreground">Certificaciones Totales</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold mb-2">
                {Math.round(teacherProfiles.reduce((sum, p) => sum + p.yearsOfExperience, 0) / teacherProfiles.length)}
              </p>
              <p className="text-muted-foreground">Años Promedio de Experiencia</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
