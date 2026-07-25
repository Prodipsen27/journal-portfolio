import { useCallback, useRef } from 'react';

export const usePageFlipSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/sounds/page-flip.mp3');
        audioRef.current.volume = 0.6;
      }
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore browser autoplay restrictions before user interaction
        });
      }
    } catch {
      // Audio fallback
    }
  }, []);

  return { playPageFlipSound: playSound };
};
