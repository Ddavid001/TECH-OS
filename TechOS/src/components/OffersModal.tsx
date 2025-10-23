import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase, Eye, Share2, Building, Clock } from 'lucide-react';
import { LOCAL_JOB_OFFERS } from '@/data/local-job-offers';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface OffersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OffersModal = ({ open, onOpenChange }: OffersModalProps) => {
  const [offers, setOffers] = useState<typeof LOCAL_JOB_OFFERS>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        setOffers(LOCAL_JOB_OFFERS);
        setLoading(false);
      }, 150);
    }
  }, [open]);

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Ofertas Docentes
          </DialogTitle>
          <DialogDescription>
            Oportunidades en universidades, colegios e institutos
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {offers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">
                      {offer.position_title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{offer.institution_name}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                      {offer.description || offer.requirements}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {offer.branch && <Badge variant="secondary">{offer.branch}</Badge>}
                      {offer.schedule && <Badge variant="secondary">{offer.schedule}</Badge>}
                      {/* precio eliminado intencionalmente */}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => setSelected(offer)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalle
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => (window.location.href = '/ofertas')}>
                        Postularme
                      </Button>
                    </div>
                    {/* gating de salarios eliminado */}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    {/* Detail modal */}
    <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{selected?.position_title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Building className="h-4 w-4" /> {selected?.institution_name}
          </DialogDescription>
        </DialogHeader>
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selected.branch && <div><span className="font-semibold">Rama: </span>{selected.branch}</div>}
              {selected.schedule && (
                <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{selected.schedule}</span></div>
              )}
              {/* salario oculto */}
            </div>

            <div>
              <p className="font-semibold mb-1">Descripción</p>
              <p className="text-gray-700 dark:text-gray-300">
                {selected.description || 'Docencia en aula y acompañamiento académico.'}
              </p>
            </div>

            <div>
              <p className="font-semibold mb-1">Requisitos</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {(selected.requirements || '').split(/[.,•\n]/).map((r: string, i: number) => r.trim() && (
                  <li key={i}>{r.trim()}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <Button size="sm" onClick={() => (window.location.href = '/ofertas')}>
                Postularme
              </Button>
              {/* gating eliminado */}
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.origin + '/#ofertas');
                    toast({ title: 'Copiado', description: 'Enlace de oferta copiado' });
                  } catch {}
                }}
              >
                <Share2 className="h-4 w-4 mr-2" /> Compartir
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
};

export default OffersModal;


