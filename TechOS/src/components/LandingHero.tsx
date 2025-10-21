import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LandingHeader } from "@/components/layout/LandingHeader";

const LandingHero = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Error al intentar reproducir el video:", error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-gray-900 dark:bg-gray-900">
      <LandingHeader />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover dark:brightness-60"
        aria-label="Video de fondo mostrando el campus educativo"
      >
        <source src="/Educational_Campus_Montage_Video_Generation.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white dark:text-gray-100 px-4">
        <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl mb-6">
          <span className="mb-4 block">
            {t('heroTitle1', 'Educación')}
          </span>
          <span className="mb-4 block">
            {t('heroTitle2', 'Tecnología')}
          </span>
          <span className="block">
            {t('heroTitle3', 'Futuro')}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl text-gray-100 dark:text-gray-200 mb-8">
          {t('heroDescription', 'Transformando la educación con tecnología avanzada para un futuro mejor')}
        </p>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown className="h-8 w-8 text-white" />
      </motion.div>
    </section>
  );
};

export default LandingHero;
