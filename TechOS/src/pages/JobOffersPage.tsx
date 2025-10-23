import { useState, useEffect } from 'react';
import { restFetchJobOffers, restFetchJobOffersByInstitutionId } from '@/lib/rest-client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Eye, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LOCAL_JOB_OFFERS } from '@/data/local-job-offers';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DEMO_OFFERS = LOCAL_JOB_OFFERS;

const JobOffersPage = () => {
  const navigate = useNavigate();
  const [jobOffers, setJobOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [searchParams] = useSearchParams();
  const institutionId = searchParams.get('institutionId') || undefined;
  const [query, setQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'school' | 'university' | 'institute'>('all');

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

  const states = ['all', ...Array.from(new Set((jobOffers as any[]).map(o => o.state).filter(Boolean))) as string[]];
  const cities = ['all', ...Array.from(new Set((jobOffers as any[]).filter(o => stateFilter === 'all' || o.state === stateFilter).map(o => o.city).filter(Boolean))) as string[]];
  const filtered = (jobOffers as any[]).filter(o => {
    const q = query.trim().toLowerCase();
    const matchesQ = q === '' || o.position_title.toLowerCase().includes(q) || o.institution_name.toLowerCase().includes(q);
    const matchesS = stateFilter === 'all' || o.state === stateFilter;
    const matchesC = cityFilter === 'all' || o.city === cityFilter;
    const matchesT = typeFilter === 'all' || o.institution_type === typeFilter;
    return matchesQ && matchesS && matchesC && matchesT;
  });

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

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input placeholder="Buscar por cargo o institución..." value={query} onChange={(e) => setQuery(e.target.value)} className="h-12" />
          <Select value={typeFilter} onValueChange={(v: any) => setTypeFilter(v)}>
            <SelectTrigger className="h-12"><SelectValue placeholder="Tipo de institución" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="university">Universidades</SelectItem>
              <SelectItem value="school">Escuelas</SelectItem>
              <SelectItem value="institute">Institutos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="h-12"><SelectValue placeholder="Estado" /></SelectTrigger>
            <SelectContent>
              {states.map(s => (
                <SelectItem key={s} value={s}>{s === 'all' ? 'Todos los estados' : s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="h-12"><SelectValue placeholder="Ciudad" /></SelectTrigger>
            <SelectContent>
              {cities.map(c => (
                <SelectItem key={c} value={c}>{c === 'all' ? 'Todas las ciudades' : c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {demoMode && (
          <div className="mb-6 rounded-md border border-dashed p-3 text-sm bg-yellow-50 border-yellow-300 text-yellow-800">
            Modo demostración: mostrando ofertas locales.
          </div>
        )}

        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((offer) => (
              <Card key={offer.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{offer.position_title}</CardTitle>
                      <CardDescription className="text-sm flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3" /> {offer.institution_name} · {offer.city || '—'}, {offer.state || '—'}
                      </CardDescription>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/oferta/${offer.id}`)}>
                      <Eye className="h-4 w-4 mr-2" /> Ver detalle
                    </Button>
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
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/oferta/${offer.id}`)}>
                      Postularme
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