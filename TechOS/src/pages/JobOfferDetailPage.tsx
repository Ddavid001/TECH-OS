import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowLeft } from 'lucide-react';
import { LOCAL_JOB_OFFERS } from '@/data/local-job-offers';

const JobOfferDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<any | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const found = LOCAL_JOB_OFFERS.find(o => o.id === id);
    setOffer(found || null);
    setApplied(localStorage.getItem(`applied_offer_${id}`) === '1');
  }, [id]);

  const apply = () => {
    localStorage.setItem(`applied_offer_${id}`, '1');
    setApplied(true);
  };

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <p>Oferta no encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <Button variant="secondary" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold mb-1">{offer.position_title}</h1>
            <p className="text-white/80 flex items-center gap-2"><MapPin className="h-4 w-4" /> {offer.institution_name} · {offer.city || '—'}, {offer.state || '—'}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Descripción de la oferta</CardTitle>
            <CardDescription>Detalles y requisitos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {offer.branch && <Badge variant="secondary">{offer.branch}</Badge>}
              {offer.schedule && <Badge variant="secondary">{offer.schedule}</Badge>}
              {offer.institution_type && <Badge variant="secondary">{offer.institution_type}</Badge>}
            </div>

            <div>
              <p className="font-semibold mb-1">Descripción</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{offer.description || 'Docencia en aula y acompañamiento académico.'}</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Requisitos</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {(offer.requirements || '').split(/[.,•\n]/).map((r: string, i: number) => r.trim() && (
                  <li key={i}>{r.trim()}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t flex gap-2">
              <Button className="flex-1" disabled={applied} onClick={apply}>
                {applied ? 'Postulado ✓' : 'Postularme'}
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => navigate('/ofertas')}>Volver al listado</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobOfferDetailPage;


