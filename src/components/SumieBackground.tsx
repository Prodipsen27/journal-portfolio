import React from 'react';

interface SumieBackgroundProps {
  isDarkMode?: boolean;
}

export const SumieBackground: React.FC<SumieBackgroundProps> = ({ isDarkMode }) => {
  if (isDarkMode) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0807]">
        {/* 4K FIXED DARK BACKGROUND VIDEO */}
        <video
          key="dark-video"
          src="/dark_bg_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover opacity-95 blur-md md:blur-none transition-all duration-300"
        />
        {/* Textured noise overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F7F4EB]">
      {/* 4K FIXED BACKGROUND VIDEO */}
      <video
        key="light-video"
        src="/light_bg_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover blur-md md:blur-none transition-all duration-300"
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
