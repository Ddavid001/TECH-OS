import { useState, useEffect } from 'react';
import InstitutionMap from '../components/InstitutionMap';
import { Skeleton } from "@/components/ui/skeleton"; // Componente para el esqueleto de carga
import { restFetchInstitutions } from '@/lib/rest-client';

const CaracasMapPage = () => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await restFetchInstitutions();
        setInstitutions(data);
      } catch (error) {
        console.error('Error fetching institutions:', error);
        setError('No se pudieron cargar las instituciones. Inténtalo de nuevo más tarde.');
      }
      setLoading(false);
    };

    fetchInstitutions();
  }, []);

  if (loading) {
    // Muestra un esqueleto de carga mientras se obtienen los datos
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Mapa de Instituciones en Caracas</h1>
        <Skeleton className="w-full h-[500px] rounded-lg" />
      </div>
    );
  }

  if (error) {
    // Muestra un mensaje de error si la petición falla
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mapa de Instituciones en Caracas</h1>
      <InstitutionMap />
    </div>
  );
};

export default CaracasMapPage;