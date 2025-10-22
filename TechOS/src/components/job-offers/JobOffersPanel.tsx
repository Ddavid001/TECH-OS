import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { jobOffersByCategory } from '@/data/caracas-institutions';
import { useNavigate } from 'react-router-dom';

interface JobOffersPanelProps {
  className?: string;
}

const JobOffersPanel: React.FC<JobOffersPanelProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(jobOffersByCategory)[0]);
  const navigate = useNavigate();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Ofertas Laborales
        </CardTitle>
        <CardDescription>
          Explora ofertas laborales en instituciones educativas
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
            {Object.keys(jobOffersByCategory).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(jobOffersByCategory).map(([category, offers]) => (
            <TabsContent key={category} value={category} className="p-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-500">
                  {offers.length} ofertas disponibles en {category}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {offers.map((offer, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="bg-primary/5 pb-2">
                        <CardTitle className="text-lg">{offer.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {offer.institution}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            <span>{offer.location}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span>Tiempo {offer.type}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span>Publicado: {new Date().toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-primary" />
                            <span>Vacantes: {Math.floor(Math.random() * 5) + 1}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 p-3 flex gap-2">
                        <Button 
                          className="flex-1"
                          onClick={() => navigate('/job-offers')}
                        >
                          Ver todas las ofertas
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JobOffersPanel;