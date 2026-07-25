import React from 'react';
import { motion } from 'motion/react';

interface BookParticlesProps {
  isTransitioning: boolean;
}

const specks = [
  { left: '12%', top: '18%', size: 2 },
  { left: '28%', top: '72%', size: 1 },
  { left: '47%', top: '11%', size: 1 },
  { left: '68%', top: '64%', size: 2 },
  { left: '84%', top: '28%', size: 1 },
];

export const BookParticles: React.FC<BookParticlesProps> = React.memo(({ isTransitioning }) => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-20"
    initial={false}
    animate={{ opacity: isTransitioning ? 0 : 0.32 }}
    transition={{ duration: 0.18, ease: 'easeOut' }}
  >
    {specks.map((speck) => (
      <span
        key={`${speck.left}-${speck.top}`}
        className="absolute rounded-full bg-[#6F5B42]/45"
        style={{
          left: speck.left,
          top: speck.top,
          width: speck.size,
          height: speck.size,
        }}
      />
    ))}
  </motion.div>
));

BookParticles.displayName = 'BookParticles';
