import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { ChevronDown } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LandingPage = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Asegurar que el video se reproduzca automáticamente
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Error al intentar reproducir el video:", error);
      });
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden dark:bg-gray-900 flex flex-col">
      {/* Navigation */}
      <MainNavigation />
      
      {/* Video Background con filtro oscuro */}
      <div className="absolute inset-0 w-full h-full z-[-1]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            minHeight: '100vh',
            minWidth: '100vw',
            objectFit: 'cover'
          }}
          aria-label="Video de fondo mostrando el campus educativo"
        >
          <source
            src="/Educational_Campus_Montage_Video_Generation.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta el tag de video.
        </video>
        {/* Filtro oscuro para resaltar el texto */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Hero Content - Centrado y proporcional */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-7xl font-bold md:text-9xl lg:text-[10rem] mb-8">
          <span className="block tracking-tight">
            Tech
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto text-gray-100 mb-16">
          {t('heroDescription', 'Transformando la educación con tecnología avanzada para un futuro mejor')}
        </p>

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-12 w-12 text-white" />
        </div>
      </div>
      
      {/* Footer - Franja blanca */}
      <div className="w-full bg-white py-4 z-10">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Tech OS - Todos los derechos reservados
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
