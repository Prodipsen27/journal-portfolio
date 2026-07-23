import React from 'react';
import bgImage from '../assets/sumie-bg.jpg';

export const SumieBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F7F4EB]">
      {/* 4K FIXED BACKGROUND IMAGE */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      {/* RICE PAPER GRAIN TEXTURE OVERLAY */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};
