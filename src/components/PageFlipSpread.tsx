import React, { useCallback, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { SpiralBinderSpine } from './SpiralBinderSpine';
import { JournalLeftPage } from './JournalLeftPage';
import { JournalRightPage } from './JournalRightPage';
import { ProjectItem, ChatMessage } from '../types';

interface PageFlipSpreadProps {
  pageKey: string;
  onTabChange?: (tab: string) => void;
  activeProject?: ProjectItem;
  onSelectProject?: (p: ProjectItem) => void;
  onOpenProjectDetail?: (p: ProjectItem) => void;
  onAssistantQuery?: (query: string) => void;
  assistantMessages?: ChatMessage[];
  isAssistantProcessing?: boolean;
  onClearAssistantChat?: () => void;
  onSaveAssistantConversation?: () => void;
  isDarkMode?: boolean;
}

const TAB_ORDER = ['overview', 'projects', 'skills', 'assistant', 'contact'];

// ForwardRef wrapper required by react-pageflip / StPageFlip
const Page = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; style?: React.CSSProperties }
>(({ children, className = '', style }, ref) => {
  return (
    <div
      ref={ref}
      className={`page journal-paper overflow-hidden h-full relative select-none ${className}`}
      style={style}
    >
      {children}
      {/* Hand cursor indicators on all 4 page corners */}
      <div className="absolute top-0 left-0 w-24 h-24 z-30 corner-hand-trigger pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 z-30 corner-hand-trigger pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 z-30 corner-hand-trigger pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 z-30 corner-hand-trigger pointer-events-none" />
    </div>
  );
});

Page.displayName = 'Page';

export const PageFlipSpread: React.FC<PageFlipSpreadProps> = React.memo(({
  pageKey,
  onTabChange,
  activeProject,
  onSelectProject,
  onOpenProjectDetail,
  onAssistantQuery,
  assistantMessages = [],
  isAssistantProcessing = false,
  onClearAssistantChat,
  onSaveAssistantConversation,
  isDarkMode = false,
  
}) => {
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number }>({
    width: 600,
    height: 750,
  });

  // Dynamically measure container dimensions so 
  // FlipBook aspect ratio matches 100% of container
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({
            width: Math.max(300, Math.floor(rect.width / 2)),
            height: Math.max(400, Math.floor(rect.height)),
          });
        }
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Map activeTab string to page index (0, 2, 4, 6, 8)
  const getPageIndexFromTab = useCallback((tab: string) => {
    const idx = TAB_ORDER.indexOf(tab);
    return (idx >= 0 ? idx : 0) * 2;
  }, []);

  // Map page number back to activeTab string
  const getTabFromPageIndex = useCallback((pageIndex: number) => {
    const tabIdx = Math.floor(pageIndex / 2);
    return TAB_ORDER[Math.max(0, Math.min(TAB_ORDER.length - 1, tabIdx))];
  }, []);

  // Sync flipbook position when parent changes pageKey (activeTab) with a single flip animation
  useEffect(() => {
    if (!flipBookRef.current) return;
    try {
      const pageFlipInstance = flipBookRef.current.pageFlip();
      if (pageFlipInstance) {
        const targetPage = getPageIndexFromTab(pageKey);
        const currentPage = pageFlipInstance.getCurrentPageIndex();
        
        if (Math.floor(currentPage / 2) !== Math.floor(targetPage / 2)) {
          const diff = targetPage - currentPage;
          if (Math.abs(diff) > 2) {
            // Instantly skip to the page adjacent to targetPage, then trigger a single flip animation
            if (diff > 0) {
              pageFlipInstance.turnToPage(targetPage - 2);
            } else {
              pageFlipInstance.turnToPage(targetPage + 2);
            }
            setTimeout(() => {
              try {
                pageFlipInstance.flip(targetPage);
              } catch {
                // Safe fallback if target page becomes invalid or timing conflicts
              }
            }, 30);
          } else {
            pageFlipInstance.flip(targetPage);
          }
        }
      }
    } catch {
      // Catch initial render timing
    }
  }, [pageKey, getPageIndexFromTab]);

  // Capture-phase event listener to guarantee all inputs/textareas receive clicks and keypresses without StPageFlip interference
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
        target.closest('input, textarea, select, form')
      )) {
        e.stopPropagation();
      }
    };

    const events = ['pointerdown', 'mousedown', 'touchstart', 'click', 'keydown', 'keyup'];
    events.forEach(evt => container.addEventListener(evt, stopIfInput, true));

    return () => {
      events.forEach(evt => container.removeEventListener(evt, stopIfInput, true));
    };
  }, []);

  // Event handler when user manually flips page using drag/corner
  const handleFlipEvent = (e: any) => {
    const newPageIndex = e.data;
    const newTab = getTabFromPageIndex(newPageIndex);
    if (newTab !== pageKey) {
      onTabChange?.(newTab);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex select-none bg-transparent items-center justify-center">
      <HTMLFlipBook
        width={dimensions.width}
        height={dimensions.height}
        size="stretch"
        minWidth={250}
        maxWidth={2000}
        minHeight={350}
        maxHeight={2000}
        maxShadowOpacity={0.45}
        showCover={false}
        mobileScrollSupport={false}
        useMouseEvents={true}
        clickEventForward={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={true}
        flippingTime={450}
        startPage={0}
        drawShadow={true}
        usePortrait={false}
        startZIndex={0}
        autoSize={true}
        onFlip={handleFlipEvent}
        ref={flipBookRef}
        className="w-full h-full flex-1"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 1. OVERVIEW SPREAD (Pages 1 & 2) */}
        <Page key="overview-left">
          <JournalLeftPage
            activeTab="overview"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onSelectProject}
            onAssistantQuery={onAssistantQuery}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            onSaveAssistantConversation={onSaveAssistantConversation}
            hasAssistantMessages={assistantMessages.length > 0}
          />
        </Page>
        <Page key="overview-right">
          <JournalRightPage
            activeTab="overview"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onOpenProjectDetail}
            assistantMessages={assistantMessages}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            isDarkMode={isDarkMode}
          />
        </Page>

        {/* 2. PROJECTS SPREAD (Pages 3 & 4) */}
        <Page key="projects-left">
          <JournalLeftPage
            activeTab="projects"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onSelectProject}
            onAssistantQuery={onAssistantQuery}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            onSaveAssistantConversation={onSaveAssistantConversation}
            hasAssistantMessages={assistantMessages.length > 0}
          />
        </Page>
        <Page key="projects-right">
          <JournalRightPage
            activeTab="projects"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onOpenProjectDetail}
            assistantMessages={assistantMessages}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            isDarkMode={isDarkMode}
          />
        </Page>

        {/* 3. SKILLS SPREAD (Pages 5 & 6) */}
        <Page key="skills-left">
          <JournalLeftPage
            activeTab="skills"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onSelectProject}
            onAssistantQuery={onAssistantQuery}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            onSaveAssistantConversation={onSaveAssistantConversation}
            hasAssistantMessages={assistantMessages.length > 0}
          />
        </Page>
        <Page key="skills-right">
          <JournalRightPage
            activeTab="skills"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onSelectProject}
            assistantMessages={assistantMessages}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            isDarkMode={isDarkMode}
          />
        </Page>

        {/* 4. AI TWIN SPREAD (Pages 7 & 8) */}
        <Page key="assistant-left">
          <JournalLeftPage
            activeTab="assistant"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onSelectProject}
            onAssistantQuery={onAssistantQuery}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            onSaveAssistantConversation={onSaveAssistantConversation}
            hasAssistantMessages={assistantMessages.length > 0}
          />
        </Page>
        <Page key="assistant-right">
          <JournalRightPage
            activeTab="assistant"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onSelectProject}
            assistantMessages={assistantMessages}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            isDarkMode={isDarkMode}
          />
        </Page>

        {/* 5. CONTACT SPREAD (Pages 9 & 10) */}
        <Page key="contact-left">
          <JournalLeftPage
            activeTab="contact"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onSelectProject}
            onAssistantQuery={onAssistantQuery}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            onSaveAssistantConversation={onSaveAssistantConversation}
            hasAssistantMessages={assistantMessages.length > 0}
          />
        </Page>
        <Page key="contact-right">
          <JournalRightPage
            activeTab="contact"
            setActiveTab={onTabChange || (() => {})}
            activeProject={activeProject}
            onSelectProject={onSelectProject}
            assistantMessages={assistantMessages}
            isAssistantProcessing={isAssistantProcessing}
            onClearAssistantChat={onClearAssistantChat}
            isDarkMode={isDarkMode}
          />
        </Page>
      </HTMLFlipBook>

      {/* CENTRAL SPIRAL BINDER SPINE OVERLAY */}
      
    </div>
  );
});

PageFlipSpread.displayName = 'PageFlipSpread';
