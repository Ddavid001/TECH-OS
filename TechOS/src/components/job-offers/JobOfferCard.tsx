import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  BookOpen,
  GraduationCap,
  School,
  ChevronRight
} from 'lucide-react';
import { JobOffer, InstitutionType } from '@/types';
import { useNavigate } from 'react-router-dom';

interface JobOfferCardProps {
  offer: JobOffer;
  className?: string;
}

const getInstitutionIcon = (type: InstitutionType) => {
  switch (type) {
    case 'university':
      return <GraduationCap className="h-4 w-4" />;
    case 'school':
      return <School className="h-4 w-4" />;
    case 'institute':
      return <Building className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

const getContractTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'full-time': 'Tiempo Completo',
    'part-time': 'Medio Tiempo',
    'contract': 'Contrato',
    'temporary': 'Temporal'
  };
  return labels[type] || type;
};

const getInstitutionTypeLabel = (type: InstitutionType) => {
  const labels: Record<InstitutionType, string> = {
    'university': 'Universidad',
    'school': 'Colegio',
    'institute': 'Instituto'
  };
  return labels[type];
};

export const JobOfferCard: React.FC<JobOfferCardProps> = ({ offer, className = '' }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/job-offers/${offer.id}`);
  };

  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary ${className}`}>
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 line-clamp-2">{offer.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <div className="flex items-center text-primary">
                {getInstitutionIcon(offer.institutionType)}
              </div>
              <span className="font-medium text-foreground">{offer.institution}</span>
            </CardDescription>
          </div>
          {offer.isActive && (
            <Badge variant="default" className="ml-2 shrink-0">Activa</Badge>
          )}
        </div>
        
        <div className="flex gap-2 mt-3 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {getInstitutionTypeLabel(offer.institutionType)}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {offer.category}
          </Badge>
          {offer.subject && (
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
              {offer.subject}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-3">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {offer.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span className="text-muted-foreground truncate">{offer.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            <span className="text-muted-foreground">{getContractTypeLabel(offer.contractType)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary shrink-0" />
            <span className="text-muted-foreground">
              {offer.vacancies} {offer.vacancies === 1 ? 'vacante' : 'vacantes'}
            </span>
          </div>
          
          {offer.salary && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground font-medium">{offer.salary}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm col-span-full">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <span className="text-muted-foreground">
              Publicado: {new Date(offer.postedDate).toLocaleDateString('es-VE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>

          {offer.deadline && (
            <div className="flex items-center gap-2 text-sm col-span-full">
              <Calendar className="h-4 w-4 text-orange-500 shrink-0" />
              <span className="text-muted-foreground">
                Cierre: <span className="font-medium text-orange-600">
                  {new Date(offer.deadline).toLocaleDateString('es-VE', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Requirements Preview */}
        {offer.requirements.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs font-medium text-muted-foreground mb-1">Requisitos principales:</p>
            <ul className="space-y-1">
              {offer.requirements.slice(0, 2).map((req, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="line-clamp-1">{req}</span>
                </li>
              ))}
            </ul>
            {offer.requirements.length > 2 && (
              <p className="text-xs text-primary mt-1">+{offer.requirements.length - 2} requisitos más</p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-muted/30 p-3 gap-2">
        <Button 
          onClick={handleViewDetails} 
          className="w-full group"
        >
          Ver Detalles
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};
