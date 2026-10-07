import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      setIsVisible(true);
      
      // Simulate the timeline halfway point
      const halfwayTimer = setTimeout(() => {
        onHalfway();
        setIsVisible(false);
      }, 350 + 80); // 350 fade in + 80 pause

      return () => clearTimeout(halfwayTimer);
    }
  }, [isTriggered, onHalfway]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0a0807] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

