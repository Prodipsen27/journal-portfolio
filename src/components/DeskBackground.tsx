import React from 'react';

export const DeskBackground: React.FC = React.memo(() => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#2a1a10]"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center opacity-100"
        style={{ backgroundImage: 'url("/new-desk-bg.png")' }}
      />
      {/* Subtle vignette over the desk for depth */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/5 to-black/30 pointer-events-none" />
    </div>
  );
});

DeskBackground.displayName = 'DeskBackground';
