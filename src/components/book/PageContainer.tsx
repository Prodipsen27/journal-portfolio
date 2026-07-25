import React from 'react';
import { motion } from 'motion/react';
import { contentRevealVariants } from './transitionConfig';

interface PageContainerProps {
  side: 'left' | 'right';
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = React.memo(({ side, children }) => (
  <motion.section
    layout
    layoutId={`book-page-${side}`}
    variants={contentRevealVariants}
    className={`relative h-full w-1/2 overflow-hidden ${
      side === 'left' ? 'border-r border-[#DCCFAF]' : ''
    }`}
    style={{ contain: 'content' }}
  >
    {children}
  </motion.section>
));

PageContainer.displayName = 'PageContainer';
