import type { Variants } from 'motion/react';

export type BookDirection = 'next' | 'prev';

export const BOOK_TRANSITION_MS = 560;

export const bookSpring = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
  mass: 0.8,
} as const;

export const pageSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 32,
  mass: 0.75,
} as const;

export const cardSpring = {
  type: 'spring',
  stiffness: 360,
  damping: 30,
  mass: 0.65,
} as const;

export const shadowSpring = {
  type: 'spring',
  stiffness: 240,
  damping: 34,
  mass: 0.8,
} as const;

export const lightingSpring = {
  type: 'spring',
  stiffness: 180,
  damping: 26,
  mass: 0.7,
} as const;

export const bookVariants: Variants = {
  idle: {
    scale: 1,
    rotate: 0,
    x: 0,
  },
  turning: (direction: BookDirection) => ({
    scale: [1, 0.99, 1],
    rotate: direction === 'next' ? [0, -0.8, 0] : [0, 0.8, 0],
    x: direction === 'next' ? [0, -8, 0] : [0, 8, 0],
  }),
};

export const spreadVariants: Variants = {
  enter: (direction: BookDirection) => ({
    opacity: 0,
    x: direction === 'next' ? 80 : -80,
    rotate: direction === 'next' ? 1 : -1,
    scale: 0.99,
  }),
  center: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      ...pageSpring,
      delayChildren: 0.12,
      staggerChildren: 0.035,
    },
  },
  exit: (direction: BookDirection) => ({
    opacity: 0.92,
    x: direction === 'next' ? -80 : 80,
    rotate: direction === 'next' ? -1 : 1,
    scale: 0.985,
    transition: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const contentRevealVariants: Variants = {
  enter: {
    opacity: 0,
    y: 3,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: cardSpring,
  },
  exit: {
    opacity: 0,
    y: -2,
    transition: {
      duration: 0.14,
      ease: 'easeOut',
    },
  },
};
