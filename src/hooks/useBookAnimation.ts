import { useEffect } from 'react';

/**
 * Custom hook to handle the book flipping animation.
 * Extracts the opening, closing, and page-jumping logic into a separate file.
 */
export const useBookAnimation = (
  bookRef: React.MutableRefObject<any>,
  isJournalOpen: boolean,
  activeTab: string,
  pages: any[]
) => {
  useEffect(() => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      const pageFlip = bookRef.current.pageFlip();
      
      if (!isJournalOpen) {
        // --- CLOSING ANIMATION LOGIC ---
        const currentPage = pageFlip.getCurrentPageIndex();
        if (currentPage !== 0) {
          if (currentPage > 2) {
            // Jump near the front cover to make the closing flip responsive
            pageFlip.turnToPage(2);
            setTimeout(() => {
              if (bookRef.current && bookRef.current.pageFlip()) {
                bookRef.current.pageFlip().flip(0);
              }
            }, 50);
          } else {
            // Smoothly close if already near the front
            pageFlip.flip(0);
          }
        }
      } else {
        // --- OPENING / TAB NAVIGATION ANIMATION LOGIC ---
        const targetIndex = pages.findIndex((p: any) => p.id === activeTab);
        if (targetIndex !== -1) {
          const targetPage = targetIndex * 2 + 3; // Shift by 3 for cover, inside cover, title
          const currentPage = pageFlip.getCurrentPageIndex();
          
          if (targetPage !== currentPage && targetPage !== currentPage - 1) {
            const distance = Math.abs(targetPage - currentPage);
            if (distance > 2) {
              // Jump closer to the target page to avoid flipping through too many pages
              const jumpTo = targetPage > currentPage ? targetPage - 2 : targetPage + 2;
              pageFlip.turnToPage(jumpTo);
              
              setTimeout(() => {
                if (bookRef.current && bookRef.current.pageFlip()) {
                  bookRef.current.pageFlip().flip(targetPage);
                }
              }, 50);
            } else {
              // Standard flip if adjacent
              pageFlip.flip(targetPage);
            }
          }
        }
      }
    }
  }, [activeTab, pages, isJournalOpen, bookRef]);
};
