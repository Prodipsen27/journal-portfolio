import React from 'react';
import { JournalAILine } from './JournalAILine';
import { Brain, Sparkles, MapPin, CheckCircle2, ShieldCheck, Layers, FolderGit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { SealedEnvelopeContact } from './SealedEnvelopeContact';
import { AssistantLeftPage } from './AssistantLeftPage';

interface JournalLeftPageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeProject?: ProjectItem;
  onSelectProject?: (project: ProjectItem) => void;
  onOpenSandbox?: (prompt?: string) => void;
  onAssistantQuery?: (query: string) => void;
  isAssistantProcessing?: boolean;
  onClearAssistantChat?: () => void;
  onSaveAssistantConversation?: () => void;
  hasAssistantMessages?: boolean;
}

export const JournalLeftPage: React.FC<JournalLeftPageProps> = ({
  activeTab,
  setActiveTab,
  activeProject,
  onSelectProject,
  onOpenSandbox,
  onAssistantQuery,
  isAssistantProcessing = false,
  onClearAssistantChat,
  onSaveAssistantConversation,
  hasAssistantMessages = false
}) => {
  return (
    <div className={`p-4 sm:p-6 relative flex flex-col justify-between select-none rounded-t-2xl lg:rounded-tr-none lg:rounded-l-none h-full min-h-0 ${
      activeTab === 'assistant' ? 'clean-paper bg-[#FDFBF7]' : 'lined-paper'
    }`}>
      {/* RED RIBBON BOOKMARK WITH STAR AT TOP RIGHT */}
      <div className="absolute top-0 right-8 w-9 z-20 flex flex-col items-center">
        <div className="w-9 h-24 bg-gradient-to-b from-[#822E2E] via-[#9C3B3B] to-[#782828] shadow-md flex flex-col items-center justify-start pt-2 relative">
          <span className="text-[#FBF7EE] text-xs font-bold">★</span>
          {/* Ribbon V-Tail Cutout */}
          <div className="absolute -bottom-3 left-0 right-0 h-3 bg-[#9C3B3B] clip-ribbon-tail" />
        </div>
      </div>

      {/* RENDER CONTENT BASED ON ACTIVE TAB */}
      {activeTab === 'assistant' ? (
        <AssistantLeftPage 
          onQuerySubmit={(q) => onAssistantQuery && onAssistantQuery(q)} 
          isProcessing={isAssistantProcessing}
          onClearChat={onClearAssistantChat}
          onSaveConversation={onSaveAssistantConversation}
          hasMessages={hasAssistantMessages}
        />
      ) : activeTab === 'contact' ? (
        <div className="flex-1 overflow-y-auto min-h-0 pr-1">
          <SealedEnvelopeContact />
        </div>
      ) : activeTab === 'skills' || activeTab === 'timeline' ? (
        /* SKILLS TAB: SKILLS & TECHNICAL CAPABILITIES ON LINED PAPER */
        <div className="flex-1 overflow-y-auto min-h-0 pr-1 space-y-4">
          <div>
            <span className="font-typewriter text-[10px] text-[#8C8577] uppercase tracking-widest font-bold">
              FIELD LOG ENTRY · #03
            </span>
            <h1 className="font-handwriting text-3xl sm:text-4xl text-[#9C3B3B] font-bold leading-tight mt-0.5">
              Skills & Technical Capabilities
            </h1>
            <p className="font-typewriter text-[10px] sm:text-[11px] text-[#8C8577] tracking-wider mt-1">
              Recorded in pencil · Rated by production implementation depth
            </p>
          </div>

          <div className="space-y-4 mt-2">
            {/* CATEGORY 1: AI & AGENTS */}
            <div className="p-3 bg-[#EFE6D2]/80 rounded border-l-4 border-[#9C3B3B] space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#BCAE8E] pb-1">
                <span className="font-handwriting text-2xl font-bold text-[#20242B]">
                  AI & Agents
                </span>
                <span className="font-typewriter text-[9px] px-2 py-0.5 rounded bg-[#9C3B3B] text-[#FBF7EE] font-bold uppercase">
                  CORE FOCUS
                </span>
              </div>

              <div className="space-y-2.5 font-typewriter text-xs">
                {/* Skill 1 */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-[#20242B]">
                    <span>Gemini / Claude API (Function Calling)</span>
                    <span className="text-[#9C3B3B] font-handwriting text-base">95%</span>
                  </div>
                  <div className="w-full h-2 rounded bg-[#FBF7EE] border border-[#BCAE8E] overflow-hidden p-0.5 mt-0.5">
                    <div className="h-full bg-[#9C3B3B] rounded-xs" style={{ width: '95%' }} />
                  </div>
                  <p className="font-journal text-[11px] text-[#4B5566] italic mt-0.5">
                    Structured outputs, tool use, schema execution
                  </p>
                </div>

                {/* Skill 2 */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-[#20242B]">
                    <span>LangGraph JS & LangChain</span>
                    <span className="text-[#9C3B3B] font-handwriting text-base">92%</span>
                  </div>
                  <div className="w-full h-2 rounded bg-[#FBF7EE] border border-[#BCAE8E] overflow-hidden p-0.5 mt-0.5">
                    <div className="h-full bg-[#9C3B3B] rounded-xs" style={{ width: '92%' }} />
                  </div>
                  <p className="font-journal text-[11px] text-[#4B5566] italic mt-0.5">
                    Stateful agentic workflows & human-in-the-loop loops
                  </p>
                </div>

                {/* Skill 3 */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-[#20242B]">
                    <span>RAG Pipelines & pgvector (RRF)</span>
                    <span className="text-[#9C3B3B] font-handwriting text-base">92%</span>
                  </div>
                  <div className="w-full h-2 rounded bg-[#FBF7EE] border border-[#BCAE8E] overflow-hidden p-0.5 mt-0.5">
                    <div className="h-full bg-[#9C3B3B] rounded-xs" style={{ width: '92%' }} />
                  </div>
                  <p className="font-journal text-[11px] text-[#4B5566] italic mt-0.5">
                    Reciprocal Rank Fusion, hybrid vector + keyword retrieval
                  </p>
                </div>

                {/* Skill 4 */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-[#20242B]">
                    <span>Anthropic MCP / Claude Code</span>
                    <span className="text-[#9C3B3B] font-handwriting text-base">90%</span>
                  </div>
                  <div className="w-full h-2 rounded bg-[#FBF7EE] border border-[#BCAE8E] overflow-hidden p-0.5 mt-0.5">
                    <div className="h-full bg-[#9C3B3B] rounded-xs" style={{ width: '90%' }} />
                  </div>
                  <p className="font-journal text-[11px] text-[#4B5566] italic mt-0.5">
                    Model Context Protocol servers & automated development
                  </p>
                </div>
              </div>
            </div>

            {/* CATEGORY 2: FULL-STACK DEVELOPMENT */}
            <div className="p-3 bg-[#EFE6D2]/50 rounded border-l-4 border-[#5C7C74] space-y-2 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#BCAE8E] pb-1">
                <span className="font-handwriting text-xl font-bold text-[#20242B]">
                  Full-Stack Development
                </span>
                <span className="font-typewriter text-[9px] text-[#5C7C74] font-bold uppercase">
                  MERN / NEXT
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 font-typewriter text-[10px]">
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#BCAE8E]">
                  <span className="font-bold text-[#20242B] block">React & Next.js</span>
                  <span className="text-[#9C3B3B] font-bold">94%</span>
                </div>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#BCAE8E]">
                  <span className="font-bold text-[#20242B] block">Node & Express</span>
                  <span className="text-[#9C3B3B] font-bold">90%</span>
                </div>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#BCAE8E]">
                  <span className="font-bold text-[#20242B] block">MongoDB & Supabase</span>
                  <span className="text-[#9C3B3B] font-bold">88%</span>
                </div>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#BCAE8E]">
                  <span className="font-bold text-[#20242B] block">Docker & Cloud</span>
                  <span className="text-[#9C3B3B] font-bold">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'projects' ? (
        /* PROJECTS TAB: LIST OF PROJECT NAMES ON LINED PAPER */
        <div className="flex-1 overflow-y-auto min-h-0 pr-1 space-y-4">
          {/* DESKTOP-ONLY PROJECTS VIEW */}
          <div className="hidden lg:block space-y-4">
            <div>
              <span className="font-typewriter text-[10px] text-[#8C8577] uppercase tracking-widest font-bold">
                FIELD LOG ENTRY · #02
              </span>
              <h1 className="font-handwriting text-3xl sm:text-4xl text-[#9C3B3B] font-bold leading-tight mt-0.5">
                Projects
              </h1>
              <p className="font-typewriter text-[10px] sm:text-[11px] text-[#8C8577] tracking-wider mt-1">
                Select any system entry below to inspect details on right page.
              </p>
            </div>

            <div className="space-y-1.5 mt-4">
              {FEATURED_PROJECTS.map((proj, idx) => {
                const isSelected = activeProject?.id === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => onSelectProject?.(proj)}
                    className={`w-full text-left p-2 sm:p-2.5 rounded transition-all duration-200 relative group flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#EFE6D2] border-l-4 border-[#9C3B3B] shadow-sm font-bold pl-3'
                        : 'hover:bg-[#EFE6D2]/60 border-l-2 border-transparent hover:border-[#8C8577]/40'
                    }`}
                  >
                    <div className="flex items-center space-x-2 min-w-0 pr-2">
                      <span className="font-typewriter text-xs text-[#8C8577] font-normal shrink-0">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span className={`font-handwriting text-lg sm:text-xl truncate ${
                        isSelected ? 'text-[#9C3B3B] font-bold' : 'text-[#20242B] group-hover:text-[#9C3B3B]'
                      }`}>
                        {proj.title}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <span className="font-typewriter text-[8px] sm:text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#DCCFAF]/50 text-[#4B5566] font-bold">
                        {proj.category.replace('#', '')}
                      </span>
                      {isSelected && <span className="text-[#9C3B3B] text-xs">★</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE/TABLET-ONLY CAROUSEL VIEW */}
          <div className="lg:hidden flex flex-col space-y-3">
            <div>
              <span className="font-typewriter text-[9px] text-[#8C8577] uppercase tracking-widest font-bold">
                FIELD LOG ENTRY · #02
              </span>
              <h1 className="font-handwriting text-2xl text-[#9C3B3B] font-bold leading-tight mt-0.5">
                Projects Catalog
              </h1>
            </div>

            {/* TOP NAVIGATION NUMBERS */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none border-b border-[#8C8577]/20">
              {FEATURED_PROJECTS.map((proj, idx) => {
                const isSelected = activeProject?.id === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => onSelectProject?.(proj)}
                    className={`px-2.5 py-1 font-typewriter text-xs rounded border transition-all shrink-0 ${
                      isSelected
                        ? 'bg-[#9C3B3B] border-[#9C3B3B] text-[#FBF7EE] font-bold shadow-xs'
                        : 'bg-[#EFE6D2]/30 border-[#BCAE8E]/30 text-[#8C8577] hover:text-[#9C3B3B]'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </button>
                );
              })}
            </div>

            {/* CAROUSEL CARD */}
            {activeProject && (
              <div className="relative flex items-center justify-between pt-1">
                {/* Left arrow */}
                <button
                  onClick={() => {
                    const currentIdx = FEATURED_PROJECTS.findIndex(p => p.id === activeProject.id);
                    const prevIdx = currentIdx > 0 ? currentIdx - 1 : FEATURED_PROJECTS.length - 1;
                    onSelectProject?.(FEATURED_PROJECTS[prevIdx]);
                  }}
                  className="absolute left-1.5 z-20 p-2 rounded-full bg-[#EFE6D2]/95 text-[#9C3B3B] border border-[#BCAE8E] shadow-sm hover:bg-[#E2D9C5] active:scale-95 transition-transform"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Main Card */}
                <div className="w-full bg-[#FAFAFA] border border-[#E2D9C5] rounded-xl p-3 shadow-md overflow-hidden relative">
                  {/* Aspect Ratio Box for image */}
                  <div className="aspect-[16/9] w-full bg-[#EFE6D2] rounded overflow-hidden border border-[#DCCFAF] mb-2.5">
                    <img
                      src={activeProject.imageUrl}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-0.5">
                    <h3 className="font-journal italic text-lg font-bold text-[#20242B] leading-snug">
                      {activeProject.title}
                    </h3>
                    <p className="font-handwriting text-sm text-[#9C3B3B] font-bold leading-tight">
                      "{activeProject.tagline}"
                    </p>
                  </div>

                  {/* Short description */}
                  <p className="font-journal text-xs text-[#4B5566] leading-relaxed mt-2 line-clamp-3">
                    {activeProject.short || activeProject.description}
                  </p>

                  {/* Tech stack chips & action button */}
                  <div className="mt-3.5 flex items-center justify-between border-t border-[#8C8577]/15 pt-2">
                    <div className="flex flex-wrap gap-1 max-w-[60%]">
                      {activeProject.tech.slice(0, 3).map((t) => (
                        <span key={t} className="font-typewriter text-[9px] px-1.5 py-0.5 rounded bg-[#EFE6D2] text-[#20242B] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        if (onSelectProject) onSelectProject(activeProject);
                      }}
                      className="px-2.5 py-1 rounded bg-[#9C3B3B] text-white text-[11px] font-handwriting font-bold hover:bg-[#822E2E] shadow-sm flex items-center space-x-1"
                    >
                      <span>examine logic</span>
                    </button>
                  </div>
                </div>

                {/* Right arrow */}
                <button
                  onClick={() => {
                    const currentIdx = FEATURED_PROJECTS.findIndex(p => p.id === activeProject.id);
                    const nextIdx = currentIdx < FEATURED_PROJECTS.length - 1 ? currentIdx + 1 : 0;
                    onSelectProject?.(FEATURED_PROJECTS[nextIdx]);
                  }}
                  className="absolute right-1.5 z-20 p-2 rounded-full bg-[#EFE6D2]/95 text-[#9C3B3B] border border-[#BCAE8E] shadow-sm hover:bg-[#E2D9C5] active:scale-95 transition-transform"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* OVERVIEW & BIO TAB (DEFAULT / ABOUT ME) */
        <div className="flex-1 overflow-y-hidden min-h-0 pr-1 space-y-2.5 sm:space-y-3">
          <div>
            <span className="font-typewriter text-[9px] text-[#8C8577] uppercase tracking-widest font-bold">
              FIELD LOG ENTRY · #01
            </span>
            <h1 className="font-handwriting text-5xl sm:text-6xl text-[#9C3B3B] font-bold leading-none mt-3.5 mb-2.5">
              Prodip Sengupta
            </h1>
            <p className="font-typewriter text-[10px] text-[#5C7C74] font-bold uppercase tracking-wider mt-1.5">
              Full-stack GenAI Engineer
            </p>
          </div>

          {/* MOTTO IN DECORATIVE SCRIPT */}
          <div className="p-2 bg-[#EFE6D2]/60 rounded border-l-4 border-[#9C3B3B] shadow-2xs">
            <p className="font-handwriting text-lg sm:text-xl text-[#20242B] font-bold leading-snug">
              “I don’t just build apps — I build systems that think.”
            </p>
          </div>

          {/* NARRATIVE BIOGRAPHY & STYLIZED AI BRAIN ICON */}
          <div className="flex items-start space-x-2.5 bg-[#FBF7EE]/80 p-2 rounded border border-[#DCCFAF]">
            <div className="p-1.5 rounded-full bg-[#9C3B3B] text-[#FBF7EE] shrink-0 mt-0.5 shadow-sm">
              <Brain className="w-4 h-4" />
            </div>
            <p className="font-journal text-xs text-[#4B5566] leading-relaxed">
              Welcome to my working sketchbook. Here I document real-world software builds, experimental GenAI workflows, and live web systems. Flip through the tabs to explore skills, timeline, AI sandbox, and contact ledger.
            </p>
          </div>

          {/* LEDGER STAMPS / WORN LABELS */}
          <div className="grid grid-cols-2 gap-1.5 font-typewriter text-[9px]">
            <div className="p-1 rounded bg-[#EAF2ED] border border-[#3B6B58]/40 text-[#2C5243] flex items-center space-x-1 shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-[#3B6B58] shrink-0" />
              <span className="font-bold uppercase tracking-wider">OPEN TO WORK</span>
            </div>
            <div className="p-1 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[#4B5566] flex items-center space-x-1 shadow-2xs">
              <MapPin className="w-3 h-3 text-[#9C3B3B] shrink-0" />
              <span className="font-bold uppercase">INDIA (REMOTE)</span>
            </div>
            <div className="p-1 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[#4B5566] flex items-center space-x-1 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-[#5C7C74] shrink-0" />
              <span className="font-bold">UPTIME: 99.0%</span>
            </div>
            <div className="p-1 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[#4B5566] flex items-center space-x-1 shadow-2xs">
              <Layers className="w-3 h-3 text-[#B08D3F] shrink-0" />
              <span className="font-bold">27+ SYSTEMS BUILT</span>
            </div>
          </div>

          {/* STATS & CORE SKILLS */}
          <div className="space-y-2 pt-1.5 border-t border-dashed border-[#8C8577]/40">
            <div className="flex items-center justify-between">
              <h3 className="font-handwriting text-xl font-bold text-[#20242B]">
                Stats & Core Skills
              </h3>
              <span className="font-typewriter text-[8px] text-[#8C8577]">ESTIMATED DEPTH</span>
            </div>

            <div className="space-y-1.5 font-typewriter text-[11px]">
              {/* Skill Bar 1: Problem Solving */}
              <div>
                <div className="flex justify-between text-[10px] mb-0.5 font-bold text-[#20242B]">
                  <span>Problem Solving</span>
                  <span className="text-[#9C3B3B] font-handwriting text-sm">96%</span>
                </div>
                <div className="w-full h-1.5 rounded bg-[#EFE6D2] border border-[#BCAE8E] overflow-hidden p-0.5">
                  <div className="h-full bg-[#9C3B3B] rounded-xs" style={{ width: '96%' }} />
                </div>
              </div>

              {/* Skill Bar 2: Creativity */}
              <div>
                <div className="flex justify-between text-[10px] mb-0.5 font-bold text-[#20242B]">
                  <span>Creativity</span>
                  <span className="text-[#5C7C74] font-handwriting text-sm">91%</span>
                </div>
                <div className="w-full h-1.5 rounded bg-[#EFE6D2] border border-[#BCAE8E] overflow-hidden p-0.5">
                  <div className="h-full bg-[#5C7C74] rounded-xs" style={{ width: '91%' }} />
                </div>
              </div>

              {/* Skill Bar 3: Communication */}
              <div>
                <div className="flex justify-between text-[10px] mb-0.5 font-bold text-[#20242B]">
                  <span>Communication</span>
                  <span className="text-[#B08D3F] font-handwriting text-sm">88%</span>
                </div>
                <div className="w-full h-1.5 rounded bg-[#EFE6D2] border border-[#BCAE8E] overflow-hidden p-0.5">
                  <div className="h-full bg-[#B08D3F] rounded-xs" style={{ width: '88%' }} />
                </div>
              </div>
            </div>

            {/* TAPED-IN TECH STACK LIST / MARGIN NOTE */}
            <div className="mt-2 p-2 rounded bg-[#EFE6D2] border border-[#BCAE8E] shadow-2xs relative rotate-[0.5deg]">
              <div className="wasi-tape absolute -top-2 right-6 w-10 h-3 washi-tape opacity-80" />
              <span className="font-typewriter text-[8px] text-[#9C3B3B] font-bold uppercase block mb-0.5">
                INSTRUMENT STACK AT HAND:
              </span>
              <p className="font-handwriting text-base text-[#20242B] font-bold leading-tight">
                GenAI, MERN (Mongo/Express/React/Node), Next.js, JS, OpenAI, Gemini, Docker.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
