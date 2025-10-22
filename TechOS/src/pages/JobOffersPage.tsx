import { useState, useEffect } from 'react';
import { restFetchJobOffers, restFetchJobOffersByInstitutionId } from '@/lib/rest-client';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LOCAL_JOB_OFFERS } from '@/data/local-job-offers';

const DEMO_OFFERS = LOCAL_JOB_OFFERS;

const JobOffersPage = () => {
  const [jobOffers, setJobOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [searchParams] = useSearchParams();
  const institutionId = searchParams.get('institutionId') || undefined;

  useEffect(() => {
    const fetchJobOffers = async () => {
      setLoading(true);
      setError(null);
      try {
        const rows = institutionId
          ? await restFetchJobOffersByInstitutionId(institutionId)
          : await restFetchJobOffers();

        if (!rows || rows.length === 0) {
          setDemoMode(true);
          setJobOffers(DEMO_OFFERS as any[]);
        } else {
          setJobOffers(rows);
        }
      } catch (e: any) {
        console.error('Error fetching job offers:', e);
        setDemoMode(true);
        setJobOffers(DEMO_OFFERS as any[]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">
              <Briefcase className="inline-block h-10 w-10 mr-3" />
              Ofertas de Trabajo
            </h1>
            <p className="text-lg text-white/80">Explora oportunidades docentes</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 space-y-4">
          {[1,2,3].map(i => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            <Briefcase className="inline-block h-10 w-10 mr-3" />
            Ofertas de Trabajo
          </h1>
          <p className="text-lg text-white/80">Explora oportunidades docentes</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {demoMode && (
          <div className="mb-6 rounded-md border border-dashed p-3 text-sm bg-yellow-50 border-yellow-300 text-yellow-800">
            Modo demostración: mostrando ofertas locales.
          </div>
        )}

        <div className="space-y-4">
          {jobOffers.length > 0 ? (
            jobOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">
                          {offer.position_title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        {(offer.institutions as any)?.name || offer.institution_name}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {offer.description || offer.requirements}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-400">
                    {offer.branch && (
                      <div><span className="font-semibold">Rama: </span>{offer.branch}</div>
                    )}
                    {offer.schedule && (
                      <div><span className="font-semibold">Horario: </span>{offer.schedule}</div>
                    )}
                    {offer.tentative_salary && (
                      <div><span className="font-semibold">Salario: </span>{offer.tentative_salary}</div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" onClick={() => window.location.href = '/applications/teacher'}>
                      Postularme
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => window.open('https://maps.google.com', '_blank')}>
                      Ver Ubicación
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-gray-600 dark:text-gray-400">
                  No hay ofertas de trabajo disponibles en este momento.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobOffersPage;