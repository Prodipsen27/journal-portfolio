import React, { useEffect } from 'react';

const DEFAULT_PAGE_IDS = ['overview', 'projects', 'skills', 'assistant', 'contact'];

/**
 * Custom hook to handle the book flipping animation.
 * Extracts the opening, closing, and page-jumping logic with timer cleanup.
 */
export const useBookAnimation = (
  bookRef: React.MutableRefObject<any>,
  isJournalOpen: boolean,
  activeTab: string,
  pageList?: any[]
) => {
  const pageIdKey = pageList ? pageList.map(p => p.id || p).join(',') : DEFAULT_PAGE_IDS.join(',');

  useEffect(() => {
    if (!bookRef.current) return;
    const pageFlip = bookRef.current.pageFlip ? bookRef.current.pageFlip() : null;
    if (!pageFlip) return;

    if (!isJournalOpen) {
      // --- CLOSING ANIMATION LOGIC ---
      const currentPage = pageFlip.getCurrentPageIndex();
      if (currentPage !== 0) {
        try {
          pageFlip.flip(0);
        } catch {
          pageFlip.turnToPage(0);
        }
      }
    } else {
      // --- OPENING / TAB NAVIGATION ANIMATION LOGIC ---
      const ids = pageIdKey.split(',');
      const targetIndex = ids.indexOf(activeTab);
      if (targetIndex !== -1) {
        const targetPage = targetIndex * 2 + 3; // Shift by 3 for cover, inside cover, title
        const currentPage = pageFlip.getCurrentPageIndex();

        // Check if the target page or spread is already active
        const isCurrentSpread =
          currentPage === targetPage ||
          currentPage === targetPage + 1 ||
          currentPage === targetPage - 1;

        if (!isCurrentSpread) {
          try {
            pageFlip.flip(targetPage);
          } catch {
            pageFlip.turnToPage(targetPage);
          }
        }
      }
    }
  }, [activeTab, isJournalOpen, bookRef, pageIdKey]);
};

