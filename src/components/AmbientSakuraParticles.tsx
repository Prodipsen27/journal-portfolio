import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface AmbientSakuraParticlesProps {
  isDarkMode?: boolean;
}

export const AmbientSakuraParticles: React.FC<AmbientSakuraParticlesProps> = ({ isDarkMode = false }) => {
  const shouldReduceMotion = useReducedMotion();

  // Generate falling sakura petals
  const petals = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 8 + 8,
      duration: Math.random() * 9 + 10,
      delay: Math.random() * 6,
      rotation: Math.random() * 360
    }));
  }, []);

  // Generate floating dust particles
  const dust = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 5
    }));
  }, []);

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* 1. Falling Sakura Petals */}
      {petals.map((p) => (
        <motion.svg
          key={`petal-${p.id}`}
          width={p.size}
          height={p.size * 1.3}
          viewBox="0 0 20 26"
          fill="none"
          initial={{
            opacity: 0,
            y: -30,
            x: `${p.left}vw`,
            rotate: p.rotation
          }}
          animate={{
            opacity: [0, 0.7, 0.8, 0.5, 0],
            y: ['0vh', '105vh'],
            x: [`${p.left}vw`, `${p.left + (p.id % 2 === 0 ? 12 : -12)}vw`],
            rotate: [p.rotation, p.rotation + 360]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
          className="absolute"
        >
          <path
            d="M10 0 C15 5 20 12 18 20 C16 25 10 26 10 26 C10 26 4 25 2 20 C0 12 5 5 10 0 Z"
            fill={isDarkMode ? '#E56B6B' : '#FCA5A5'}
            opacity={isDarkMode ? 0.35 : 0.6}
          />
        </motion.svg>
      ))}

      {/* 2. Floating Atmospheric Dust Particles */}
      {dust.map((d) => (
        <motion.div
          key={`dust-${d.id}`}
          initial={{
            opacity: 0,
            x: `${d.left}vw`,
            y: `${d.top}vh`
          }}
          animate={{
            opacity: [0, 0.6, 0.2, 0.7, 0],
            y: [`${d.top}vh`, `${(d.top - 20 + 100) % 100}vh`],
            x: [`${d.left}vw`, `${(d.left + 5) % 100}vw`]
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: 'easeInOut'
          }}
          style={{
            width: d.size,
            height: d.size
          }}
          className={`absolute rounded-full blur-[0.5px] ${
            isDarkMode ? 'bg-[#D4AF37]/40' : 'bg-[#B08D3F]/40'
          }`}
        />
      ))}
    </div>
  );
};

export default AmbientSakuraParticles;
