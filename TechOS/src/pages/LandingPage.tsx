import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import backgroundVideo from '@/assets/videos/background.mp4';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { LandingHero } from '@/components/LandingHero';

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
        aria-label="Video de fondo mostrando el campus educativo"
      >
        <source
          src={backgroundVideo}
          type="video/mp4"
        />
        Tu navegador no soporta el tag de video.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Hero Content */}
      <LandingHero />
    </main>
  );
};

export default LandingPage;
