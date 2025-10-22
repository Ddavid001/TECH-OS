import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { ApplicantsModal } from '@/components/ApplicantsModal';

const LandingPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showApplicants, setShowApplicants] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Error al intentar reproducir el video:", error);
      });
    }
  }, []);

  // Manejar apertura de modales desde hash URL
  useEffect(() => {
    const hash = location.hash;
    if (hash === '#postulaciones') {
      setShowApplicants(true);
    }
  }, [location.hash]);

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Navigation - SIEMPRE VISIBLE ARRIBA */}
      <div className="relative z-50">
        <MainNavigation />
      </div>

      {/* Hero Section with Video Background - FULL SCREEN */}
      <section className="relative flex-1 w-full overflow-hidden dark:bg-gray-900 flex flex-col">
        {/* Video Background con filtro oscuro */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-label="Video de fondo mostrando el campus educativo"
          >
            <source
              src="/Educational_Campus_Montage_Video_Generation.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta el tag de video.
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

          {/* Hero Content - Centrado - SIN BOTONES (como en la imagen) */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center text-white px-4 py-8">
            {/* Título principal - TECH OS */}
            <h1 className="text-6xl font-bold md:text-8xl lg:text-9xl mb-8 tracking-wide">
              TECH OS
            </h1>
            
            {/* Subtítulo / Descripción */}
            <p className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed px-4">
              Our platform ensures that learning never stops, connecting teachers, students, and representatives in real-time.
            </p>
          </div>
      </section>

      {/* Footer - Franja blanca inferior con copyright */}
      <footer className="w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 TechOS. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ApplicantsModal open={showApplicants} onOpenChange={setShowApplicants} />
    </div>
  );
};

export default LandingPage;
