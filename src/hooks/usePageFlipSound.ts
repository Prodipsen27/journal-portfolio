import { useCallback, useRef } from 'react';

export const usePageFlipSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedRef = useRef<number>(0);

  const playSound = useCallback(() => {
    try {
      const now = Date.now();
      // Throttle rapid triggers to prevent clipping and audio driver stutter
      if (now - lastPlayedRef.current < 120) return;
      lastPlayedRef.current = now;

      if (!audioRef.current) {
        audioRef.current = new Audio('/sounds/page-flip.mp3');
        audioRef.current.volume = 0.5;
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
