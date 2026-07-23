import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageFlipSpreadProps {
  pageKey: string;
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
}

/**
 * PageFlipSpread encapsulates the 3D realistic journal page-flipping animation
 * for both the left and right pages in a two-page spread.
 */
export const PageFlipSpread: React.FC<PageFlipSpreadProps> = ({
  pageKey,
  leftPage,
  rightPage,
}) => {
  return (
    <main className="flex-1 journal-paper rounded-r-2xl md:rounded-l-none border-y-2 border-r-2 border-[#8C8577]/30 flex flex-col lg:flex-row relative overflow-y-auto lg:overflow-hidden [perspective:1800px]">

      {/* LEFT PAGE ANIMATION CONTAINER */}
      <div 
        className={`lg:w-1/2 lg:border-r border-[#8C8577]/25 relative bg-[#FBF7EE] overflow-visible lg:overflow-hidden h-auto lg:h-full ${
          pageKey === 'projects' ? 'border-b-0' : 'border-b lg:border-b-0'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pageKey + '-left-page'}
            initial={{ rotateY: -35, opacity: 0, x: -10 }}
            animate={{ rotateY: 0, opacity: 1, x: 0 }}
            exit={{ rotateY: 35, opacity: 0, x: -10 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
            className="h-auto lg:h-full relative z-10"
          >
            {leftPage}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CENTRAL SPINE / GUTTER SHADOW EFFECT */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none z-20" />

      {/* RIGHT PAGE ANIMATION CONTAINER */}
      <div 
        className={`lg:w-1/2 bg-[#FDFBF7] relative overflow-visible lg:overflow-hidden h-auto lg:h-full ${
          pageKey === 'projects' ? 'hidden lg:block' : ''
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pageKey + '-right-page'}
            initial={{ rotateY: 50, opacity: 0, x: 10 }}
            animate={{ rotateY: 0, opacity: 1, x: 0 }}
            exit={{ rotateY: -50, opacity: 0, x: 10 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
            className="h-auto lg:h-full relative z-10"
          >
            {rightPage}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
};
