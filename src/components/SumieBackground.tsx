import React from 'react';

interface SumieBackgroundProps {
  isDarkMode?: boolean;
  isJournalOpen?: boolean;
}

export const SumieBackground: React.FC<SumieBackgroundProps> = React.memo(({ isDarkMode, isJournalOpen }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isJournalOpen) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [isJournalOpen]);

  if (isDarkMode) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0807]"
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >
        {/* Mobile static fallback image for 60fps mobile scrolling */}
        <div
          className="md:hidden fixed inset-0 w-full h-full bg-cover bg-center opacity-70"
          style={{ backgroundImage: 'url("/sumie-dark-bg.jpg")' }}
        />

        {/* Desktop background video with automatic pause when reading */}
        <video
          ref={videoRef}
          key="dark-video"
          src="/dark_bg_video.mp4"
          poster="/sumie-dark-bg.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block fixed inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-500"
        />

        {/* Lightweight subtle vignette overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F7F4EB]"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      {/* Mobile static fallback image for 60fps mobile scrolling */}
      <div
        className="md:hidden fixed inset-0 w-full h-full bg-cover bg-center opacity-85"
        style={{ backgroundImage: 'url("/sumie-dark-bg.jpg")' }}
      />

      {/* Desktop background video with automatic pause when reading */}
      <video
        ref={videoRef}
        key="light-video"
        src="/light_bg_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block fixed inset-0 w-full h-full object-cover opacity-95 transition-opacity duration-500"
      />

      {/* Lightweight subtle vignette overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-stone-900/5 to-stone-900/15 pointer-events-none" />
    </div>
  );
});

SumieBackground.displayName = 'SumieBackground';

