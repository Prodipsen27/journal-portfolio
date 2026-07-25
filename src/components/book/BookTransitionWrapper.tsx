import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { BookDirection } from './transitionConfig';
import { spreadVariants } from './transitionConfig';
import { PageContainer } from './PageContainer';
import { SharedLayout } from './SharedLayout';

interface BookTransitionWrapperProps {
  pageKey: string;
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
  direction: BookDirection;
  isTransitioning?: boolean;
  onExitComplete?: () => void;
}

export const BookTransitionWrapper: React.FC<BookTransitionWrapperProps> = React.memo(({
  pageKey,
  leftPage,
  rightPage,
  direction,
  isTransitioning = false,
  onExitComplete,
}) => (
  <SharedLayout pageKey={pageKey}>
    <AnimatePresence mode="wait" custom={direction} onExitComplete={onExitComplete}>
      <motion.div
        key={pageKey}
        custom={direction}
        variants={spreadVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className={`absolute inset-0 z-10 flex overflow-hidden rounded-2xl bg-[#FDFBF7] ${
          isTransitioning ? 'pointer-events-none' : ''
        }`}
        style={{
          willChange: 'transform, opacity',
          transformOrigin: '50% 50%',
        }}
      >
        <PageContainer side="left">{leftPage}</PageContainer>
        <PageContainer side="right">{rightPage}</PageContainer>
      </motion.div>
    </AnimatePresence>
  </SharedLayout>
));

BookTransitionWrapper.displayName = 'BookTransitionWrapper';
