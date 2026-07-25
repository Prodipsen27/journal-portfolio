import React, { useState, useRef, useEffect } from 'react';
import { JournalCover } from './components/JournalCover';
import { JournalSidebar } from './components/JournalSidebar';
import { JournalLeftPage } from './components/JournalLeftPage';
import { JournalRightPage } from './components/JournalRightPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SumieBackground } from './components/SumieBackground';
// import { AmbientSakuraParticles } from './components/AmbientSakuraParticles';
import { PageFlipSpread } from './components/PageFlipSpread';
import { BrushTransition } from './components/BrushTransition';
import { MobileChatSection } from './components/MobileChatSection';
import {
  MobileAboutSection,
  MobileProjectsSection,
  MobileSkillsSection,
  MobileContactSection,
} from './components/MobileSections';
import { Download } from 'lucide-react';

import { FEATURED_PROJECTS } from './data/portfolioData';
import { ProjectItem, ChatMessage } from './types';
import { usePageFlipSound } from './hooks/usePageFlipSound';
import { HTMLFlipBookWrapper } from './components/HTMLFlipBookWrapper';
import { JournalInsideFrontCover } from './components/JournalInsideFrontCover';
import { JournalTitlePage } from './components/JournalTitlePage';
import { JournalInsideBackCover } from './components/JournalInsideBackCover';
import { JournalBackCover } from './components/JournalBackCover';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { playPageFlipSound } = usePageFlipSound();
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isBrushTriggered, setIsBrushTriggered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeProject, setActiveProject] = useState<ProjectItem>(FEATURED_PROJECTS[0]);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  const TAB_ORDER = ['overview', 'projects', 'skills', 'assistant', 'contact'];

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const lastScrollTime = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const sections = ['overview', 'projects', 'skills', 'assistant', 'contact'];
    
    // Create an observer
    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tabId = entry.target.id.replace('section-', '');
          setActiveTab(tabId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(tab => {
      const el = document.getElementById(`section-${tab}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile, isJournalOpen]);

  const handleOpenJournal = () => {
    setActiveTab('overview');
    setIsJournalOpen(true);
  };

  const triggerTabChange = (nextTab: string) => {
    const isDesktopViewport = window.innerWidth >= 1024;
    if (nextTab !== activeTab && isDesktopViewport) {
      playPageFlipSound();
    }
    setActiveTab(nextTab);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const element = document.getElementById(`section-${nextTab}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  const canScrollElement = (target: HTMLElement, direction: 'up' | 'down'): boolean => {
    let el: HTMLElement | null = target;
    while (el && el !== document.body) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const isScrollable = overflowY === 'auto' || overflowY === 'scroll';
      const hasScrollRange = el.scrollHeight > el.clientHeight;

      if (isScrollable && hasScrollRange) {
        if (direction === 'down') {
          // Can scroll down further if scrollTop + clientHeight is less than scrollHeight
          if (el.scrollTop + el.clientHeight < el.scrollHeight - 6) {
            return true;
          }
        } else {
          // Can scroll up further if scrollTop is greater than 0
          if (el.scrollTop > 6) {
            return true;
          }
        }
      }
      el = el.parentElement;
    }
    return false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Scroll-to-flip feature disabled
    return;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Disable swipe-to-tab on mobile devices (allow native vertical scroll instead)
    if (window.innerWidth < 1024) return;

    if (!touchStartRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, [contenteditable="true"]')) {
      return;
    }

    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;
    
    touchStartRef.current = null;

    // Detect vertical swipe gestures (scroll up/down)
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
      const direction = diffY < 0 ? 'down' : 'up';
      if (canScrollElement(target, direction)) {
        return; // Let the container scroll inside the page
      }

      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;

      const currentIndex = TAB_ORDER.indexOf(activeTab);
      if (direction === 'down') {
        // Swiped Up (Scrolling Down) -> Next Tab
        if (currentIndex < TAB_ORDER.length - 1) {
          triggerTabChange(TAB_ORDER[currentIndex + 1]);
          lastScrollTime.current = now;
        }
      } else {
        // Swiped Down (Scrolling Up) -> Previous Tab
        if (currentIndex > 0) {
          triggerTabChange(TAB_ORDER[currentIndex - 1]);
          lastScrollTime.current = now;
        }
      }
    }
  };


  // Assistant Twin Chat State
  const [assistantMessages, setAssistantMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: "Hello! I am Prodip Sengupta's Professional Twin AI Assistant. Ask me anything on the left page about Prodip's 27+ projects, LangGraph multi-agent experience, RAG pipelines, or availability for hire!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      thoughtProcess: ['Initial System Twin Active', 'Loaded Portfolio Context']
    }
  ]);
  const [isAssistantProcessing, setIsAssistantProcessing] = useState<boolean>(false);

  const handleAssistantQuery = async (queryText: string) => {
    if (!queryText.trim() || isAssistantProcessing) return;

    if (activeTab !== 'assistant') {
      triggerTabChange('assistant');
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAssistantMessages(prev => [...prev, userMsg]);
    setIsAssistantProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.reply || data.answer || "I am grounded in Prodip's engineering experience.";
        const agentMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          thoughtProcess: data.thoughtProcess || ['Gemini 3.6 Flash Twin Node'],
          sources: data.sources || ['Prodip Portfolio Knowledge Base']
        };
        setAssistantMessages(prev => [...prev, agentMsg]);
      } else {
        throw new Error('Fallback response');
      }
    } catch {
      setTimeout(() => {
        let answer = "";
        let thoughts = ["Local Portfolio Query Matcher"];
        const lower = queryText.toLowerCase();

        if (lower.includes('background') || lower.includes('me') || lower.includes('bio') || lower.includes('education')) {
          answer = "Prodip Sengupta is a Full-Stack GenAI Engineer based in India with over 1 year of hands-on experience building autonomous agents, multi-agent reasoning graphs (LangGraph JS), and production web applications. He holds a Computer Science background and has completed 27+ end-to-end full-stack projects.";
          thoughts.push("Matched Profile Context: Background & Bio");
        } else if (lower.includes('project') || lower.includes('repo') || lower.includes('code')) {
          answer = "Prodip's top featured projects include:\n\n1. VitalTrace AI — Multi-Agent Health & Medical Records Assistant\n2. FinDoc AI — RAG SEC Filing Analyst with pgvector RRF\n3. Grocery Delivery Platform — MERN App with Gemini AI Cart Agent\n4. MenuOS AI — Restaurant Ordering System with Gemini Concierge\n5. Aurality — Full-stack Web3/Web2 Music Streaming Platform.";
          thoughts.push("Matched Project Catalog: 5 Featured Repositories");
        } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('rag') || lower.includes('agent')) {
          answer = "Prodip's core technical stack encompasses:\n\n• AI & Agents: Gemini API (Function Calling), LangGraph JS & LangChain, RAG Pipelines & pgvector (RRF), Anthropic MCP.\n• Frontend: React 19, Next.js, Tailwind CSS v4, Motion.\n• Backend & Databases: Node.js, Express, MongoDB, PostgreSQL, Docker, Cloud Run.";
          thoughts.push("Matched Technical Stack");
        } else if (lower.includes('fun') || lower.includes('interest') || lower.includes('hobby')) {
          answer = "When Prodip isn't designing multi-agent graphs, he enjoys hacking on high-frequency API tools, participating in AI hackathons, exploring ambient electronic music, and sketching interactive UI physics visualizers!";
          thoughts.push("Matched Creative & Fun Section");
        } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('work')) {
          answer = "Prodip is currently Open to Work for full-time remote roles and contracts!\n\n• Email: prodipsengupta27@gmail.com\n• GitHub: github.com/prodipsen27\n• LinkedIn: linkedin.com/in/prodipsen27\n\nYou can also head over to the CONTACT tab to send a direct sealed envelope message.";
          thoughts.push("Matched Recruitment & Contact Information");
        } else {
          answer = `Thanks for asking! As Prodip's AI Twin, I can share that Prodip Sengupta is a GenAI Engineer specializing in autonomous multi-agent reasoning and full-stack web applications. Feel free to ask more specific questions about his projects or skills!`;
          thoughts.push("General Twin Synthesis");
        }

        const agentMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          thoughtProcess: thoughts
        };
        setAssistantMessages(prev => [...prev, agentMsg]);
        setIsAssistantProcessing(false);
      }, 600);
    } finally {
      setIsAssistantProcessing(false);
    }
  };
  const handleSelectProject = (project: ProjectItem) => {
    setActiveProject(project);
    setActiveTab('projects');
  };

  const handleOpenModal = (project: ProjectItem) => {
    setModalProject(project);
  };

  const handleSaveConversation = () => {
    if (assistantMessages.length === 0) return;
    const content = assistantMessages
      .map(m => `[${m.timestamp}] ${m.sender === 'user' ? 'VISITOR' : "PRODIP'S AI TWIN"}:\n${m.text}\n`)
      .join('\n----------------------------------------\n\n');
    
    const blob = new Blob([`PRODIP SENGUPTA - AI TWIN FIELD JOURNAL CONVERSATION\nSaved: ${new Date().toLocaleString()}\n\n========================================\n\n${content}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prodip_ai_twin_journal_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render closed cover if user toggles book closed
 

  return (
    <div className={`h-screen w-screen overflow-hidden text-[#20242B] p-0 sm:p-6 md:p-10 flex items-center justify-center relative transition-colors duration-300 ${isDarkMode ? 'dark dark-mode-grid' : ''}`}>
      {/* JAPANESE SUMI-E INK WASH BACKGROUND WITH RED RISING SUN */}
      <SumieBackground isDarkMode={isDarkMode} />
      {/* <AmbientSakuraParticles isDarkMode={isDarkMode} /> */}

      {/* ALWAYS VISIBLE MOBILE NAVBAR */}
      <div className="block md:hidden w-full relative z-30">
        <JournalSidebar
          activeTab={activeTab}
          setActiveTab={triggerTabChange}
          onCloseJournal={() => setIsJournalOpen(false)}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsBrushTriggered(true)}
        />
      </div>

      {/* MAIN TWO-PAGE OPEN NOTEBOOK WITH SPINE SIDEBAR */}
      <div 
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full max-w-[1400px] h-full md:h-[760px] md:max-h-[92vh] flex flex-col md:flex-row items-center justify-center my-0 md:my-2 bg-transparent"
      >
        {/* LEFT LEATHER SPINE SIDEBAR FOR DESKTOP (Fades in when book open, fades out when closed) */}
        <AnimatePresence initial={false}>
          {isJournalOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: -20, width: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="hidden md:block shrink-0 z-20"
            >
              <JournalSidebar
                activeTab={activeTab}
                setActiveTab={triggerTabChange}
                onCloseJournal={() => setIsJournalOpen(false)}
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsBrushTriggered(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* TWO-PAGE SPREAD CONTAINER */}
        {isMobile ? (
          <div 
            ref={scrollContainerRef}
            className="flex-1 bg-transparent flex flex-col relative overflow-y-auto w-full px-3 sm:px-5 pt-16 pb-28 space-y-8 no-scrollbar scroll-smooth"
          >
            {/* 1. ABOUT SECTION */}
            <div id="section-overview" className="">
              <MobileAboutSection isDarkMode={isDarkMode} />
            </div>

            {/* 2. PROJECTS SECTION */}
            <div id="section-projects" className="">
              <MobileProjectsSection
                isDarkMode={isDarkMode}
                onSelectProject={handleOpenModal}
              />
            </div>

            {/* 3. SKILLS SECTION */}
            <div id="section-skills" className="">
              <MobileSkillsSection isDarkMode={isDarkMode} />
            </div>

            {/* 4. AI TWIN AGENT SECTION */}
            <div id="section-assistant" className="flex flex-col">
              <MobileChatSection
                messages={assistantMessages}
                isProcessing={isAssistantProcessing}
                onQuerySubmit={handleAssistantQuery}
                onClearChat={() => setAssistantMessages([])}
                onSaveConversation={handleSaveConversation}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* 5. CONTACT SECTION */}
            <div id="section-contact" className="pb-6">
              <MobileContactSection isDarkMode={isDarkMode} />
            </div>
          </div>
        ) : (
         <HTMLFlipBookWrapper
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isJournalOpen={isJournalOpen}
            onCloseJournal={() => setIsJournalOpen(false)}
            onOpenJournal={handleOpenJournal}
            frontCover={<JournalCover onOpenJournal={handleOpenJournal} />}
            insideFrontCover={<JournalInsideFrontCover />}
            titlePage={<JournalTitlePage />}
            insideBackCover={<JournalInsideBackCover />}
            backCover={<JournalBackCover onCloseJournal={() => setIsJournalOpen(false)} />}
            pages={['overview', 'projects', 'skills', 'assistant', 'contact'].map(tab => ({
              id: tab,
              left: (
                <JournalLeftPage
                  activeTab={tab}
                  setActiveTab={setActiveTab}
                  activeProject={activeProject}
                  onSelectProject={handleSelectProject}
                  onAssistantQuery={handleAssistantQuery}
                  isAssistantProcessing={isAssistantProcessing}
                  onClearAssistantChat={() => setAssistantMessages([])}
                  onSaveAssistantConversation={handleSaveConversation}
                  hasAssistantMessages={assistantMessages.length > 0}
                />
              ),
              right: (
                <JournalRightPage
                  activeTab={tab}
                  setActiveTab={setActiveTab}
                  activeProject={activeProject}
                  onSelectProject={handleOpenModal}
                  assistantMessages={assistantMessages}
                  isAssistantProcessing={isAssistantProcessing}
                  onClearAssistantChat={() => setAssistantMessages([])}
                />
              )
            }))}
          />
        )}
      </div>

      {/* PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onOpenAgentSandbox={(prompt) => prompt && handleAssistantQuery(prompt)}
      />

      {/* BRUSH WIPE THEME TRANSITION */}
      <BrushTransition
        isTriggered={isBrushTriggered}
        onHalfway={() => setIsDarkMode(prev => !prev)}
        onComplete={() => setIsBrushTriggered(false)}
      />



    </div>
  );
}
