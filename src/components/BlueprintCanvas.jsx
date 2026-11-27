import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function BlueprintCanvas({ forceReduceMotion = false }) {
  const prefersReduced = useReducedMotion();
  const isReduced = forceReduceMotion || prefersReduced;
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    if (isReduced) return;

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [isReduced]);

  return (
    <>
      {/* Base low-contrast architectural dot-grid (#E5E2DC dots at 24px spacing) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(#E5E2DC 1.15px, transparent 1.15px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle 250px cursor-spotlight reveal sharpening the drafting dots */}
      {!isReduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-200"
          style={{
            backgroundImage: 'radial-gradient(#BDB8AE 1.35px, transparent 1.35px)',
            backgroundSize: '24px 24px',
            WebkitMaskImage: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
            maskImage: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`
          }}
        />
      )}
    </>
  );
}
