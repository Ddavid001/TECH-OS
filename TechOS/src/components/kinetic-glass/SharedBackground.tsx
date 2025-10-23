import { useEffect, useRef } from 'react';

interface SharedBackgroundProps {
  opacity?: number;
  blur?: number;
}

export const SharedBackground = ({ opacity = 0.4, blur = 0 }: SharedBackgroundProps) => {
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
    <>
      {/* Video de Fondo Cinematográfico */}
      <div 
        className="fixed inset-0 w-full h-full overflow-hidden"
        style={{ zIndex: -2 }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: blur > 0 ? `blur(${blur}px)` : 'none',
            transform: 'scale(1.05)', // Slight zoom para evitar bordes
          }}
        >
          <source
            src="/Educational_Campus_Montage_Video_Generation.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Overlay de Control de Luminosidad */}
      <div 
        className="fixed inset-0 w-full h-full bg-black transition-opacity duration-1000"
        style={{ 
          zIndex: -1,
          opacity: 1 - opacity,
        }}
      />

      {/* Gradient Overlay Sutil para Mayor Profundidad */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </>
  );
};

export default SharedBackground;

