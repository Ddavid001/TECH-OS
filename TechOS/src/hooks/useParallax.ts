import { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
  intensity?: number;
  maxOffset?: number;
  smooth?: boolean;
}

export const useParallax = ({ 
  intensity = 0.02, 
  maxOffset = 15,
  smooth = true 
}: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  useEffect(() => {
    let targetOffset = { x: 0, y: 0 };
    let currentOffset = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calcular offset basado en la distancia del cursor al centro del elemento
      const deltaX = (e.clientX - centerX) * intensity;
      const deltaY = (e.clientY - centerY) * intensity;

      // Limitar el offset máximo
      targetOffset = {
        x: Math.max(-maxOffset, Math.min(maxOffset, deltaX)),
        y: Math.max(-maxOffset, Math.min(maxOffset, deltaY)),
      };

      if (!smooth) {
        setOffset(targetOffset);
      }
    };

    const animate = () => {
      if (smooth) {
        // Interpolación suave (lerp)
        const lerpFactor = 0.1;
        currentOffset.x += (targetOffset.x - currentOffset.x) * lerpFactor;
        currentOffset.y += (targetOffset.y - currentOffset.y) * lerpFactor;

        setOffset({ ...currentOffset });
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    if (smooth) {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [intensity, maxOffset, smooth]);

  return { elementRef, offset };
};

export default useParallax;

