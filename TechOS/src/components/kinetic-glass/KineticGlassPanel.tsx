import { ReactNode } from 'react';
import { useParallax } from '@/hooks/useParallax';
import { cn } from '@/lib/utils';

interface KineticGlassPanelProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  blur?: number;
  opacity?: number;
  glow?: boolean;
  animated?: boolean;
  delay?: number;
}

export const KineticGlassPanel = ({
  children,
  className,
  intensity = 0.015,
  blur = 20,
  opacity = 0.1,
  glow = false,
  animated = true,
  delay = 0,
}: KineticGlassPanelProps) => {
  const { elementRef, offset } = useParallax({ 
    intensity, 
    maxOffset: 12, 
    smooth: true 
  });

  return (
    <div
      ref={elementRef}
      className={cn(
        "relative rounded-2xl border border-white/20 overflow-hidden",
        "transition-all duration-300 ease-out",
        animated && "animate-in fade-in slide-in-from-bottom-4",
        className
      )}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        boxShadow: glow 
          ? '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1)' 
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Borde Luminoso Sutil */}
      {glow && (
        <div 
          className="absolute inset-0 rounded-2xl opacity-50"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, transparent 50%, rgba(147, 51, 234, 0.2) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Contenido */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Efecto de Luz en Hover */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default KineticGlassPanel;

