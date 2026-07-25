import { useCallback, useEffect, useMemo, useState } from 'react';
import { BOOK_TRANSITION_MS, type BookDirection } from './transitionConfig';

interface UseBookTransitionOptions {
  pageKey: string;
  pageOrder: string[];
  durationMs?: number;
}

interface BookTransitionState {
  currentPage: string;
  nextPage: string | null;
  direction: BookDirection;
  isTransitioning: boolean;
}

const getDirection = (from: string, to: string, pageOrder: string[]): BookDirection => {
  const fromIndex = pageOrder.indexOf(from);
  const toIndex = pageOrder.indexOf(to);

  if (fromIndex === -1 || toIndex === -1) {
    return 'next';
  }

  return toIndex >= fromIndex ? 'next' : 'prev';
};

const getAdjacentPage = (
  page: string,
  pageOrder: string[],
  offset: 1 | -1,
) => {
  const index = pageOrder.indexOf(page);
  if (index === -1) return page;
  return pageOrder[Math.min(pageOrder.length - 1, Math.max(0, index + offset))];
};

export const useBookTransition = ({
  pageKey,
  pageOrder,
  durationMs = BOOK_TRANSITION_MS,
}: UseBookTransitionOptions) => {
  const [state, setState] = useState<BookTransitionState>({
    currentPage: pageKey,
    nextPage: null,
    direction: 'next',
    isTransitioning: false,
  });

  const goTo = useCallback((targetPage: string) => {
    setState((previous) => {
      const visualPage = previous.nextPage ?? previous.currentPage;
      if (targetPage === visualPage) return previous;

      return {
        currentPage: previous.isTransitioning ? visualPage : previous.currentPage,
        nextPage: targetPage,
        direction: getDirection(visualPage, targetPage, pageOrder),
        isTransitioning: true,
      };
    });
  }, [pageOrder]);

  const next = useCallback(() => {
    setState((previous) => {
      const visualPage = previous.nextPage ?? previous.currentPage;
      const targetPage = getAdjacentPage(visualPage, pageOrder, 1);
      if (targetPage === visualPage) return previous;

      return {
        currentPage: visualPage,
        nextPage: targetPage,
        direction: 'next',
        isTransitioning: true,
      };
    });
  }, [pageOrder]);

  const prev = useCallback(() => {
    setState((previous) => {
      const visualPage = previous.nextPage ?? previous.currentPage;
      const targetPage = getAdjacentPage(visualPage, pageOrder, -1);
      if (targetPage === visualPage) return previous;

      return {
        currentPage: visualPage,
        nextPage: targetPage,
        direction: 'prev',
        isTransitioning: true,
      };
    });
  }, [pageOrder]);

  const finishTransition = useCallback(() => {
    setState((previous) => {
      if (!previous.nextPage) {
        return {
          ...previous,
          isTransitioning: false,
        };
      }

      return {
        currentPage: previous.nextPage,
        nextPage: null,
        direction: previous.direction,
        isTransitioning: false,
      };
    });
  }, []);

  const cancel = useCallback(() => {
    setState((previous) => ({
      ...previous,
      nextPage: null,
      isTransitioning: false,
    }));
  }, []);

  useEffect(() => {
    goTo(pageKey);
  }, [goTo, pageKey]);

  useEffect(() => {
    if (!state.isTransitioning) return undefined;

    const timeout = window.setTimeout(finishTransition, durationMs);
    return () => window.clearTimeout(timeout);
  }, [durationMs, finishTransition, state.isTransitioning, state.nextPage]);

  const activePage = state.nextPage ?? state.currentPage;

  return useMemo(() => ({
    ...state,
    activePage,
    goTo,
    next,
    prev,
    finishTransition,
    cancel,
  }), [activePage, cancel, finishTransition, goTo, next, prev, state]);
};
