import React, { useState, useRef } from 'react';
import { JournalCover } from './components/JournalCover';
import { JournalSidebar } from './components/JournalSidebar';
import { JournalLeftPage } from './components/JournalLeftPage';
import { JournalRightPage } from './components/JournalRightPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SumieBackground } from './components/SumieBackground';
import { PageFlipSpread } from './components/PageFlipSpread';

import { FEATURED_PROJECTS } from './data/portfolioData';
import { ProjectItem, ChatMessage } from './types';

export default function App() {
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('projects');
  const [activeProject, setActiveProject] = useState<ProjectItem>(FEATURED_PROJECTS[0]);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  const TAB_ORDER = ['overview', 'projects', 'skills', 'assistant', 'contact'];

  const lastScrollTime = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const triggerTabChange = (nextTab: string) => {
    if (nextTab === activeTab) return;
    setActiveTab(nextTab);
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
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, [contenteditable="true"]')) {
      return;
    }

    const direction = e.deltaY > 0 ? 'down' : 'up';
    if (canScrollElement(target, direction)) {
      return; // Let the container scroll inside the page
    }

    const now = Date.now();
    if (now - lastScrollTime.current < 900) return;

    const threshold = 35;
    if (Math.abs(e.deltaY) < threshold) return;

    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (direction === 'down') {
      if (currentIndex < TAB_ORDER.length - 1) {
        triggerTabChange(TAB_ORDER[currentIndex + 1]);
        lastScrollTime.current = now;
      }
    } else {
      if (currentIndex > 0) {
        triggerTabChange(TAB_ORDER[currentIndex - 1]);
        lastScrollTime.current = now;
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
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
  if (!isJournalOpen) {
    return <JournalCover onOpenJournal={() => setIsJournalOpen(true)} />;
  }

  return (
    <div className="min-h-screen text-[#20242B] p-2 sm:p-6 md:p-10 flex items-center justify-center relative overflow-x-hidden">
      {/* JAPANESE SUMI-E INK WASH BACKGROUND WITH RED RISING SUN */}
      <SumieBackground />

      {/* MAIN TWO-PAGE OPEN NOTEBOOK WITH SPINE SIDEBAR */}
      <div 
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full max-w-[1400px] md:h-[720px] md:max-h-[90vh] flex flex-col md:flex-row shadow-2xl rounded-2xl my-2 overflow-hidden"
      >
        {/* LEFT LEATHER SPINE SIDEBAR */}
        <JournalSidebar
          activeTab={activeTab}
          setActiveTab={triggerTabChange}
          onCloseJournal={() => setIsJournalOpen(false)}
        />

        {/* TWO-PAGE SPREAD CONTAINER */}
        <PageFlipSpread
          pageKey={activeTab}
          leftPage={
            <JournalLeftPage
              activeTab={activeTab}
              setActiveTab={triggerTabChange}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onAssistantQuery={handleAssistantQuery}
              isAssistantProcessing={isAssistantProcessing}
              onClearAssistantChat={() => setAssistantMessages([])}
              onSaveAssistantConversation={handleSaveConversation}
              hasAssistantMessages={assistantMessages.length > 0}
            />
          }
          rightPage={
            <JournalRightPage
              activeTab={activeTab}
              setActiveTab={triggerTabChange}
              activeProject={activeProject}
              onSelectProject={handleOpenModal}
              assistantMessages={assistantMessages}
              isAssistantProcessing={isAssistantProcessing}
              onClearAssistantChat={() => setAssistantMessages([])}
            />
          }
        />
      </div>

      {/* PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onOpenAgentSandbox={(prompt) => prompt && handleAssistantQuery(prompt)}
      />

    
    </div>
  );
}
