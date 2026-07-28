import React, { useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useBookAnimation } from '../hooks/useBookAnimation';

interface HTMLFlipBookWrapperProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pages: { id: string; left: React.ReactNode; right: React.ReactNode }[];
  isJournalOpen: boolean;
  onCloseJournal: () => void;
  onOpenJournal: () => void;
  frontCover: React.ReactNode;
  insideFrontCover: React.ReactNode;
  titlePage: React.ReactNode;
  insideBackCover: React.ReactNode;
  backCover: React.ReactNode;
}

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; style?: React.CSSProperties; className?: string }>((props, ref) => {
  return (
    <div ref={ref} className={`h-full w-full overflow-hidden relative page-flip-page ${props.className || 'bg-[#FBF7EE]'}`} style={props.style}>
      {props.children}
    </div>
  );
});

Page.displayName = 'Page';

export const HTMLFlipBookWrapper: React.FC<HTMLFlipBookWrapperProps> = ({
  activeTab,
  setActiveTab,
  pages,
  isJournalOpen,
  onCloseJournal,
  onOpenJournal,
  frontCover,
  insideFrontCover,
  titlePage,
  insideBackCover,
  backCover,
}) => {
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPortrait, setIsPortrait] = React.useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number }>({ width: 550, height: 700 });

  React.useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const isP = !isJournalOpen || window.innerWidth < 1024;
          setIsPortrait(isP);
          setDimensions({
            width: Math.max(300, Math.floor(window.innerWidth < 1024 ? rect.width : rect.width / 2)),
            height: Math.max(400, Math.floor(rect.height)),
          });
        }
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isJournalOpen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stopIfInput = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' || 
        target.isContentEditable ||
        target.closest('input, textarea, select, form, button, a')
      )) {
        if (e.type === 'pointerdown' || e.type === 'mousedown' || e.type === 'touchstart') {
          e.stopPropagation();
        }
      }
    };

    const events = ['pointerdown', 'mousedown', 'touchstart'];
    events.forEach(evt => container.addEventListener(evt, stopIfInput, true));

    return () => {
      events.forEach(evt => container.removeEventListener(evt, stopIfInput, true));
    };
  }, []);

  // Custom hook for book flipping animation
  useBookAnimation(bookRef, isJournalOpen, activeTab, pages);

  const onFlip = (e: any) => {
    const pageIndex = e.data;
    
    if (pageIndex === 0 || pageIndex === 15) {
      if (isJournalOpen) onCloseJournal();
      return;
    } else {
      if (!isJournalOpen) onOpenJournal();
    }

    const tabIndex = Math.floor((pageIndex - 3) / 2);
    if (tabIndex >= 0 && tabIndex < pages.length) {
      if (pages[tabIndex] && pages[tabIndex].id !== activeTab) {
        setActiveTab(pages[tabIndex].id);
      }
    }
  };

  return (
    <div ref={containerRef} className={`flex-1 relative w-full h-full flex items-center select-none bg-transparent transition-transform duration-500 ease-out ${isJournalOpen ? 'justify-start md:-translate-x-12' : 'justify-center'}`}>
      <HTMLFlipBook
        width={dimensions.width}
        height={dimensions.height}
        size="stretch"
        minWidth={250}
        maxWidth={2000}
        minHeight={350}
        maxHeight={2000}
        maxShadowOpacity={0.45}
        showCover={true}
        mobileScrollSupport={true}
        useMouseEvents={true}
        clickEventForward={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={true}
        flippingTime={450}
        style={{ width: '100%', height: '100%' }}
        startPage={0}
        drawShadow={true}
        startZIndex={0}
        autoSize={true}
        className="demo-book drop-shadow-2xl"
        ref={bookRef}
        onFlip={onFlip}
        usePortrait={!isJournalOpen || isPortrait}
      >
        <Page key="cover-front" className="bg-transparent">{frontCover}</Page>
        <Page key="cover-inside-front">{insideFrontCover}</Page>
        <Page key="title-page">{titlePage}</Page>
        
        {pages.map((p) => [
          <Page key={`${p.id}-left`}>{p.left}</Page>,
          <Page key={`${p.id}-right`}>{p.right}</Page>
        ]).flat()}

        <Page key="blank-page">
          <div className="w-full h-full bg-[#FBF7EE] flex items-center justify-center opacity-30">
             <p className="font-mono text-sm tracking-widest text-[#8C8577]">EOF</p>
          </div>
        </Page>
        <Page key="cover-inside-back">{insideBackCover}</Page>
        <Page key="cover-back" className="bg-transparent">{backCover}</Page>
      </HTMLFlipBook>
    </div>
  );
};
