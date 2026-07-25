import React, { createContext, useContext } from 'react';
import type { BookDirection } from './transitionConfig';

export interface BookTransitionContextValue {
  currentPage: string;
  direction: BookDirection;
  isTransitioning: boolean;
}

const BookContext = createContext<BookTransitionContextValue>({
  currentPage: 'overview',
  direction: 'next',
  isTransitioning: false,
});

export const BookProvider: React.FC<React.PropsWithChildren<BookTransitionContextValue>> = ({
  children,
  currentPage,
  direction,
  isTransitioning,
}) => (
  <BookContext.Provider value={{ currentPage, direction, isTransitioning }}>
    {children}
  </BookContext.Provider>
);

export const useBookContext = () => useContext(BookContext);
