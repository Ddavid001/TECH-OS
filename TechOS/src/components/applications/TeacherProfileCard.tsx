import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User,
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  BookOpen, 
  GraduationCap,
  Languages,
  Briefcase,
  FileText,
  ChevronRight
} from 'lucide-react';
import { TeacherProfile } from '@/types';
import { useNavigate } from 'react-router-dom';

interface TeacherProfileCardProps {
  profile: TeacherProfile;
  className?: string;
}

export const TeacherProfileCard: React.FC<TeacherProfileCardProps> = ({ profile, className = '' }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/applications/teacher/${profile.id}`);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const latestEducation = profile.education.sort((a, b) => 
    parseInt(b.graduationYear) - parseInt(a.graduationYear)
  )[0];

  const currentOrLatestExperience = profile.experience.find(exp => !exp.endDate) || profile.experience[0];

  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
      <CardHeader className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(profile.firstName, profile.lastName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl mb-1">
              {profile.firstName} {profile.lastName}
            </CardTitle>
            <CardDescription className="flex flex-col gap-1">
              {latestEducation && (
                <span className="font-medium text-foreground">
                  {latestEducation.degree}
                </span>
              )}
              {currentOrLatestExperience && (
                <span className="text-sm">
                  {currentOrLatestExperience.position}
                </span>
              )}
            </CardDescription>
          </div>
          
          <Badge variant="secondary" className="shrink-0">
            {profile.yearsOfExperience} años exp.
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {profile.bio}
        </p>

        {/* Specialties */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <Award className="h-3 w-3" />
            Especialidades
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.specialties.slice(0, 4).map((specialty, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {profile.specialties.length > 4 && (
              <Badge variant="outline" className="text-xs bg-muted">
                +{profile.specialties.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Education & Experience Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              Formación
            </p>
            {latestEducation && (
              <div className="text-xs">
                <p className="font-medium">{latestEducation.degree}</p>
                <p className="text-muted-foreground">{latestEducation.institution}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              Experiencia Reciente
            </p>
            {currentOrLatestExperience && (
              <div className="text-xs">
                <p className="font-medium">{currentOrLatestExperience.institution}</p>
                <p className="text-muted-foreground">{currentOrLatestExperience.position}</p>
              </div>
            )}
          </div>
        </div>

        {/* Languages & Skills */}
        <div className="space-y-2">
          {profile.languages.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <Languages className="h-3 w-3 text-primary shrink-0" />
              <span className="text-muted-foreground">
                {profile.languages.slice(0, 2).join(', ')}
                {profile.languages.length > 2 && ` +${profile.languages.length - 2}`}
              </span>
            </div>
          )}

          {profile.skills.length > 0 && (
            <div className="flex items-start gap-2 text-xs">
              <BookOpen className="h-3 w-3 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground line-clamp-1">
                {profile.skills.slice(0, 5).join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-1.5 pt-2 border-t">
          <div className="flex items-center gap-2 text-xs">
            <Mail className="h-3 w-3 text-primary" />
            <span className="text-muted-foreground truncate">{profile.email}</span>
          </div>
          {profile.phone && (
            <div className="flex items-center gap-2 text-xs">
              <Phone className="h-3 w-3 text-primary" />
              <span className="text-muted-foreground">{profile.phone}</span>
            </div>
          )}
          {profile.preferredLocations.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="text-muted-foreground">
                {profile.preferredLocations.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Certifications Count */}
        {profile.certifications.length > 0 && (
          <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2 text-xs">
              <Award className="h-3 w-3 text-primary" />
              <span className="font-medium">
                {profile.certifications.length} Certificación{profile.certifications.length !== 1 ? 'es' : ''}
              </span>
            </div>
            {profile.cvUrl && (
              <Badge variant="outline" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                CV Disponible
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-muted/30 p-3 gap-2">
        <Button 
          onClick={handleViewProfile} 
          className="w-full group"
          variant="default"
        >
          Ver Perfil Completo
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};
