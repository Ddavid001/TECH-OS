import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import backgroundVideo from '@/assets/videos/background.mp4';
import { MainNavigation } from '@/components/navigation/MainNavigation';

const LandingPage = () => {
  const navigate = useNavigate();
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
    <div className="relative min-h-screen w-full overflow-hidden dark:bg-gray-900">
      {/* Navigation */}
      <MainNavigation />
      
      {/* Video Background - Fullscreen con zoom para evitar bordes negros */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1] dark:brightness-60"
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          objectFit: 'cover'
        }}
      >
        <source
          src={backgroundVideo}
          type="video/mp4"
        />
        Tu navegador no soporta el tag de video.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content - Asegurar que esté por encima del video */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold text-white dark:text-gray-100 md:text-6xl lg:text-7xl">
          TECH OS 
        </h1>
        
        <p className="mb-12 max-w-2xl text-lg text-white/90 dark:text-gray-200 md:text-xl">
          {t('heroDescription')}
        </p>

        {/* Call-to-action buttons for main features */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={() => navigate('/map')}
            className="text-lg bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {t('viewMap')}
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/applications')}
            className="border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 dark:border-gray-300 dark:bg-gray-800/50 dark:text-gray-100 dark:hover:bg-gray-700/50"
          >
            {t('applications')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
