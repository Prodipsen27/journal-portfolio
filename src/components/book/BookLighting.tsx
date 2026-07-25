import React from 'react';
import { motion } from 'motion/react';
import { lightingSpring, type BookDirection } from './transitionConfig';

interface BookLightingProps {
  direction: BookDirection;
  isTransitioning: boolean;
}

export const BookLighting: React.FC<BookLightingProps> = React.memo(({
  direction,
  isTransitioning,
}) => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-30 book-lighting"
    initial={false}
    animate={{
      opacity: isTransitioning ? 0.78 : 0.42,
      x: isTransitioning ? (direction === 'next' ? -3 : 3) : 0,
    }}
    transition={lightingSpring}
  />
));

BookLighting.displayName = 'BookLighting';
