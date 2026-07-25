import React from 'react';
import { motion } from 'motion/react';
import { shadowSpring } from './transitionConfig';

interface BookShadowProps {
  isTransitioning: boolean;
}

export const BookShadow: React.FC<BookShadowProps> = React.memo(({ isTransitioning }) => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute bottom-2 left-6 right-6 z-[2] h-12 rounded-[50%] bg-black"
    initial={false}
    animate={{
      opacity: isTransitioning ? 0.28 : 0.15,
      filter: `blur(${isTransitioning ? 22 : 16}px)`,
      y: isTransitioning ? 8 : 0,
      scaleX: isTransitioning ? 1.05 : 0.98,
    }}
    transition={shadowSpring}
  />
));

BookShadow.displayName = 'BookShadow';
