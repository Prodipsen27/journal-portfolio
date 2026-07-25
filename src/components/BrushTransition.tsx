import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface BrushTransitionProps {
  isTriggered: boolean;
  onHalfway: () => void;
  onComplete: () => void;
}

export const BrushTransition: React.FC<BrushTransitionProps> = ({
  isTriggered,
  onHalfway,
  onComplete
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTriggered) return;

    if (overlayRef.current) {
      overlayRef.current.style.display = 'block';
      overlayRef.current.style.opacity = '0';
    }

    const timeline = anime.timeline({
      complete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    // 1. Fade in the black overlay
    timeline.add({
      targets: overlayRef.current,
      opacity: [0, 1],
      duration: 350,
      easing: 'easeOutQuad',
      changeComplete: () => {
        // Toggle the theme when fully black/opaque
        onHalfway();
      }
    });

    // 2. Pause briefly at full opacity
    timeline.add({
      duration: 80
    });

    // 3. Fade out the black overlay
    timeline.add({
      targets: overlayRef.current,
      opacity: [1, 0],
      duration: 350,
      easing: 'easeInQuad'
    });

  }, [isTriggered]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-[#0a0807] pointer-events-none hidden"
      style={{ opacity: 0 }}
    />
  );
};
