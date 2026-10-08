import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { JournalCover } from './components/JournalCover';
import { JournalSidebar } from './components/JournalSidebar';
import { JournalLeftPage } from './components/JournalLeftPage';
import { JournalRightPage } from './components/JournalRightPage';
import { ProjectItem, ChatMessage } from './types';
import { usePageFlipSound } from './hooks/usePageFlipSound';
import { DeskBackground } from './components/DeskBackground';
import { FEATURED_PROJECTS } from './data/portfolioData';

// Dynamic imports for code splitting
const HTMLFlipBookWrapper = React.lazy(() => import('./components/HTMLFlipBookWrapper').then(m => ({ default: m.HTMLFlipBookWrapper })));
const MobileChatSection = React.lazy(() => import('./components/MobileChatSection').then(m => ({ default: m.MobileChatSection })));
const MobileAboutSection = React.lazy(() => import('./components/MobileSections').then(m => ({ default: m.MobileAboutSection })));
const MobileProjectsSection = React.lazy(() => import('./components/MobileSections').then(m => ({ default: m.MobileProjectsSection })));
const MobileSkillsSection = React.lazy(() => import('./components/MobileSections').then(m => ({ default: m.MobileSkillsSection })));
const MobileContactSection = React.lazy(() => import('./components/MobileSections').then(m => ({ default: m.MobileContactSection })));
const ProjectDetailModal = React.lazy(() => import('./components/ProjectDetailModal').then(m => ({ default: m.ProjectDetailModal })));
const JournalInsideFrontCover = React.lazy(() => import('./components/JournalInsideFrontCover').then(m => ({ default: m.JournalInsideFrontCover })));
const JournalTitlePage = React.lazy(() => import('./components/JournalTitlePage').then(m => ({ default: m.JournalTitlePage })));
const JournalInsideBackCover = React.lazy(() => import('./components/JournalInsideBackCover').then(m => ({ default: m.JournalInsideBackCover })));
const JournalBackCover = React.lazy(() => import('./components/JournalBackCover').then(m => ({ default: m.JournalBackCover })));

import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { playPageFlipSound } = usePageFlipSound();
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeProject, setActiveProject] = useState<ProjectItem>(FEATURED_PROJECTS[0]);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() => 
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    let timeoutId: any = null;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 1024);
      }, 100);
    };
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

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

  const handleOpenJournal = useCallback(() => {
    setActiveTab('overview');
    setIsJournalOpen(true);
  }, []);

  const triggerTabChange = useCallback((nextTab: string) => {
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
  }, [activeTab, playPageFlipSound]);


  // Assistant State
  const [assistantMessages, setAssistantMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: "Hello! I am Prodip's AI Assistant. Ask me anything about his projects, experience, or availability.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      thoughtProcess: ['System Initialized', 'Context Loaded']
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
        body: JSON.stringify({ query: queryText, history: assistantMessages })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.reply || data.answer || "I am grounded in Prodip's engineering experience.";
        const agentMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          thoughtProcess: data.thoughtProcess || ['Gemini 3.6 Flash'],
          sources: data.sources || ['Knowledge Base']
        };
        setAssistantMessages(prev => [...prev, agentMsg]);
      } else {
        throw new Error('Fallback response');
      }
    } catch {
      setTimeout(() => {
        let answer = "";
        let thoughts = ["Local Query Matcher"];
        const lower = queryText.toLowerCase();

        if (lower.includes('background') || lower.includes('me') || lower.includes('bio') || lower.includes('education')) {
          answer = "Prodip Sengupta is a Full-Stack GenAI Engineer based in India with over 1 year of hands-on experience building autonomous agents, multi-agent reasoning graphs (LangGraph JS), and production web applications. He holds a Computer Science background and has completed 27+ end-to-end full-stack projects.";
          thoughts.push("Matched Profile Context");
        } else if (lower.includes('project') || lower.includes('repo') || lower.includes('code')) {
          answer = "Prodip's top featured projects include:\n\n1. VitalTrace AI — Multi-Agent Health & Medical Records Assistant\n2. FinDoc AI — RAG SEC Filing Analyst with pgvector RRF\n3. Grocery Delivery Platform — MERN App with Gemini AI Cart Agent\n4. MenuOS AI — Restaurant Ordering System with Gemini Concierge\n5. Aurality — Full-stack Web3/Web2 Music Streaming Platform.";
          thoughts.push("Matched Project Catalog");
        } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('rag') || lower.includes('agent')) {
          answer = "Prodip's core technical stack encompasses:\n\n• AI & Agents: Gemini API (Function Calling), LangGraph JS & LangChain, RAG Pipelines & pgvector (RRF), Anthropic MCP.\n• Frontend: React 19, Next.js, Tailwind CSS v4, Motion.\n• Backend & Databases: Node.js, Express, MongoDB, PostgreSQL, Docker, Cloud Run.";
          thoughts.push("Matched Technical Stack");
        } else if (lower.includes('fun') || lower.includes('interest') || lower.includes('hobby')) {
          answer = "When Prodip isn't designing multi-agent graphs, he enjoys hacking on high-frequency API tools, participating in AI hackathons, exploring ambient electronic music, and sketching interactive UI physics visualizers!";
          thoughts.push("Matched Interests");
        } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('work')) {
          answer = "Prodip is currently Open to Work for full-time remote roles and contracts!\n\n• Email: prodipsengupta27@gmail.com\n• GitHub: github.com/prodipsen27\n• LinkedIn: linkedin.com/in/prodipsen27\n\nYou can also head over to the CONTACT tab to send a direct message.";
          thoughts.push("Matched Contact Info");
        } else {
          answer = `Thanks for asking! Prodip Sengupta is a GenAI Engineer specializing in autonomous multi-agent reasoning and full-stack web applications. Feel free to ask more specific questions about his projects or skills!`;
          thoughts.push("General Synthesis");
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
  const handleSelectProject = useCallback((project: ProjectItem) => {
    setActiveProject(project);
    setActiveTab('projects');
  }, []);

  const handleOpenModal = useCallback((project: ProjectItem) => {
    setModalProject(project);
  }, []);

  const handleClearAssistantChat = useCallback(() => {
    setAssistantMessages([]);
  }, []);

  const handleSaveConversation = useCallback(() => {
    if (assistantMessages.length === 0) return;
    const content = assistantMessages
      .map(m => `[${m.timestamp}] ${m.sender === 'user' ? 'VISITOR' : "ASSISTANT"}:\n${m.text}\n`)
      .join('\n----------------------------------------\n\n');
    
    const blob = new Blob([`PRODIP SENGUPTA - CONVERSATION LOG\nSaved: ${new Date().toLocaleString()}\n\n========================================\n\n${content}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prodip_assistant_log_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [assistantMessages]);

  const bookPages = useMemo(() => {
    const tabs = ['overview', 'projects', 'skills', 'assistant', 'contact'];
    return tabs.map(tab => ({
      id: tab,
      left: (
        <JournalLeftPage
          activeTab={tab}
          setActiveTab={setActiveTab}
          activeProject={activeProject}
          onSelectProject={handleSelectProject}
          onAssistantQuery={handleAssistantQuery}
          isAssistantProcessing={isAssistantProcessing}
          onClearAssistantChat={handleClearAssistantChat}
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
          onClearAssistantChat={handleClearAssistantChat}
        />
      )
    }));
  }, [
    activeProject,
    handleSelectProject,
    handleAssistantQuery,
    isAssistantProcessing,
    handleClearAssistantChat,
    handleSaveConversation,
    assistantMessages,
    handleOpenModal
  ]);

  return (
    <div className="h-screen w-screen overflow-hidden text-[#20242B] p-0 sm:p-6 md:p-10 flex items-center justify-center relative transition-colors duration-300">
      {/* DESK BACKGROUND */}
      <DeskBackground isJournalOpen={isJournalOpen} />

      {/* ALWAYS VISIBLE MOBILE NAVBAR */}
      <div className="block md:hidden w-full relative z-30">
        <JournalSidebar
          activeTab={activeTab}
          setActiveTab={triggerTabChange}
          onCloseJournal={() => setIsJournalOpen(false)}
        />
      </div>

      {/* MAIN TWO-PAGE OPEN NOTEBOOK WITH SPINE SIDEBAR */}
      <div 
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
           <React.Suspense fallback={<div className="p-10 text-center text-[#c4b5a3]">Loading...</div>}>
            {/* 1. ABOUT SECTION */}
            <div id="section-overview" className="">
              <MobileAboutSection />
            </div>

            {/* 2. PROJECTS SECTION */}
            <div id="section-projects" className="">
              <MobileProjectsSection
                onSelectProject={handleOpenModal}
              />
            </div>

            {/* 3. SKILLS SECTION */}
            <div id="section-skills" className="">
              <MobileSkillsSection />
            </div>

            {/* 4. AI TWIN AGENT SECTION */}
            <div id="section-assistant" className="flex flex-col">
              <MobileChatSection
                messages={assistantMessages}
                isProcessing={isAssistantProcessing}
                onQuerySubmit={handleAssistantQuery}
                onClearChat={handleClearAssistantChat}
                onSaveConversation={handleSaveConversation}
              />
            </div>

            {/* 5. CONTACT SECTION */}
            <div id="section-contact" className="pb-6">
              <MobileContactSection />
            </div>
           </React.Suspense>
          </div>
        ) : (
         <React.Suspense fallback={<div className="h-full w-full flex items-center justify-center text-[#e8ded1]">Loading Journal...</div>}>
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
              pages={bookPages}
            />
         </React.Suspense>
        )}
      </div>

      {/* PROJECT DETAIL MODAL */}
      <React.Suspense fallback={null}>
        <ProjectDetailModal
          project={modalProject}
          onClose={() => setModalProject(null)}
          onOpenAgentSandbox={(prompt) => prompt && handleAssistantQuery(prompt)}
        />
      </React.Suspense>

    </div>
  );
}
