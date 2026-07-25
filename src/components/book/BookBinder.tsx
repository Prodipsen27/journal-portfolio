import React from 'react';
import { motion } from 'motion/react';
import { SpiralBinderSpine } from '../SpiralBinderSpine';
import { lightingSpring } from './transitionConfig';

interface BookBinderProps {
  isTransitioning: boolean;
}

export const BookBinder: React.FC<BookBinderProps> = React.memo(({ isTransitioning }) => (
  <motion.div
    className="absolute inset-y-0 left-1/2 z-40 w-12 -translate-x-1/2"
    initial={false}
    animate={{
      scaleY: isTransitioning ? 0.996 : 1,
      opacity: isTransitioning ? 0.96 : 1,
    }}
    whileHover={isTransitioning ? undefined : { scaleX: 1.015 }}
    transition={lightingSpring}
  >
    <SpiralBinderSpine />
  </motion.div>
));

BookBinder.displayName = 'BookBinder';
