import React from 'react';
import { motion } from 'motion/react';
import { BookBinder } from './BookBinder';
import { BookLighting } from './BookLighting';
import { BookPaper } from './BookPaper';
import { BookParticles } from './BookParticles';
import { BookShadow } from './BookShadow';
import { bookSpring, bookVariants, type BookDirection } from './transitionConfig';

interface AnimatedBookProps {
  currentPage: string;
  direction: BookDirection;
  isTransitioning: boolean;
  children: React.ReactNode;
}

export const AnimatedBook: React.FC<AnimatedBookProps> = React.memo(({
  currentPage,
  direction,
  isTransitioning,
  children,
}) => (
  <motion.main
    data-current-page={currentPage}
    data-book-transitioning={isTransitioning ? 'true' : 'false'}
    className="relative h-full min-w-0 flex-1 select-none overflow-hidden rounded-2xl bg-[#EFE6D2]"
    custom={direction}
    initial={false}
    animate={isTransitioning ? 'turning' : 'idle'}
    variants={bookVariants}
    transition={bookSpring}
    style={{
      contain: 'layout paint style',
      transformOrigin: '50% 50%',
      willChange: 'transform',
    }}
  >
    <BookShadow isTransitioning={isTransitioning} />
    <BookPaper />

    <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl">
      {children}
    </div>

    <BookBinder isTransitioning={isTransitioning} />
    <BookParticles isTransitioning={isTransitioning} />
    <BookLighting direction={direction} isTransitioning={isTransitioning} />
  </motion.main>
));

AnimatedBook.displayName = 'AnimatedBook';
