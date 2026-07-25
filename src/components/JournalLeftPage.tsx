import React from 'react';
import { motion } from 'motion/react';
import { Brain, Sparkles, MapPin, CheckCircle2, ShieldCheck, Layers, FolderGit2 } from 'lucide-react';
import { FEATURED_PROJECTS, PROFILE_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { SealedEnvelopeContact } from './SealedEnvelopeContact';
import { AssistantLeftPage } from './AssistantLeftPage';
import { HanddrawnMarginOverlay } from './HanddrawnMarginOverlay';
import { SkillTreePage } from './SkillTreePage';
import SpiralBinderSpine from './SpiralBinderSpine';

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

export const JournalLeftPage: React.FC<JournalLeftPageProps> = React.memo(({
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
    <div className={`p-4 sm:p-6 relative flex flex-col justify-between min-h-[500px] select-none rounded-t-2xl lg:rounded-tr-none lg:rounded-l-none h-full ${activeTab === 'assistant' ? 'clean-paper bg-[#FDFBF7]' : 'lined-paper'
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
        <><AssistantLeftPage
          onQuerySubmit={(q) => onAssistantQuery && onAssistantQuery(q)}
          isProcessing={isAssistantProcessing}
          onClearChat={onClearAssistantChat}
          onSaveConversation={onSaveAssistantConversation}
          hasMessages={hasAssistantMessages} /><div className="absolute top-0 bottom-0 right-0 -translate-x-1/2 z-50 pointer-events-none">
            <SpiralBinderSpine />
          </div></>
      ) : activeTab === 'contact' ? (
        <><SealedEnvelopeContact/><div className="absolute top-0 bottom-0 right-0 -translate-x-1/2 z-50 pointer-events-none">
            <SpiralBinderSpine />
          </div></>
      ) : activeTab === 'skills' || activeTab === 'timeline' ? (
        <><SkillTreePage /><div className="absolute top-0 bottom-0 right-0 -translate-x-1/2 z-50 pointer-events-none">
          <SpiralBinderSpine />
        </div></>
      ) : activeTab === 'projects' ? (
        /* PROJECTS TAB: LIST OF PROJECT NAMES ON LINED PAPER */<><div className="absolute top-0 bottom-0 right-0 -translate-x-1/2 z-50 pointer-events-none">
        <SpiralBinderSpine />
      </div>
        <div className="space-y-4">
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

                  <div className="space-y-1.5 mt-4 max-h-[440px] overflow-y-auto pr-1">
                    {FEATURED_PROJECTS.map((proj, idx) => {
                      const isSelected = activeProject?.id === proj.id;
                      return (
                        <button
                          key={proj.id}
                          onClick={() => onSelectProject?.(proj)}
                          className={`w-full text-left p-2 sm:p-2.5 rounded transition-all duration-200 relative group flex items-center justify-between ${isSelected
                              ? 'bg-[#EFE6D2] border-l-4 border-[#9C3B3B] shadow-sm font-bold pl-3'
                              : 'hover:bg-[#EFE6D2]/60 border-l-2 border-transparent hover:border-[#8C8577]/40'}`}
                        >
                          <div className="flex items-center space-x-2 min-w-0 pr-2">
                            <span className="font-typewriter text-xs text-[#8C8577] font-normal shrink-0">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <span className={`font-handwriting text-lg sm:text-xl truncate ${isSelected ? 'text-[#9C3B3B] font-bold' : 'text-[#20242B] group-hover:text-[#9C3B3B]'}`}>
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
                </div></>
      ) : (
        /* OVERVIEW & BIO TAB (DEFAULT / ABOUT ME - EXACT MATCH TO REFERENCE IMAGE) */<>
<div className="absolute top-0 bottom-0 right-0 -translate-x-1/2 z-50 pointer-events-none">
                    <SpiralBinderSpine />
                  </div><div className="space-y-4 text-[#20242B] relative">
                    {/* TOP TAG & QUOTE CONTAINER */}
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 pr-4">
                      {/* Left Header Info */}
                      <div className="space-y-1 relative">
                        <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-[4px_8px_3px_6px] border border-[#8C8577]/60 font-typewriter text-[10px] text-[#20242B] opacity-80">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                          <span className="font-bold tracking-widest uppercase">FULL-STACK GENAI ENGINEER</span>
                        </div>

                        <motion.h1 layoutId="left-section-title" className="font-handwriting text-5xl sm:text-6xl lg:text-[70px] text-[#7A1C1C] font-bold tracking-tight leading-none pt-2 pb-1">
                          Prodip Sengupta
                        </motion.h1>

                        <p className="font-typewriter text-[10px] sm:text-[11px] text-[#20242B]/70 tracking-widest font-bold uppercase pl-1">
                          AI-NATIVE · FULL-STACK · PROBLEM SOLVER
                        </p>
                      </div>

                      {/* Top Right Quote (No Box, just text & underline) */}
                      <motion.div layoutId="quote" className="relative max-w-[200px] shrink-0 font-handwriting text-xl sm:text-2xl text-[#20242B] leading-tight pt-2">
                        <span className="font-serif text-3xl font-bold text-[#20242B] absolute -top-1 -left-3 opacity-80">“</span>
                        <p className="pl-2 pt-1">
                          'I don't just build apps - <br />
                          <span className="relative inline-block">
                            I build systems that think.
                            {/* Handdrawn red underline scribble */}
                            <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-[#7A1C1C] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <path d="M2,5 Q25,8 50,4 T98,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </span>
                          '
                        </p>
                        <span className="font-serif text-3xl font-bold text-[#20242B] absolute bottom-1 right-2 opacity-80 block">”</span>
                      </motion.div>
                    </div>

                    {/* MAIN NARRATIVE BIO */}
                    <p className="font-handwriting text-[17px] sm:text-[19px] text-[#383D48] leading-snug pt-2 max-w-[95%]">
                      I'm an AI-native full-stack developer focused on building production-ready applications, not demos. I specialize in <strong className="text-[#7A1C1C] font-bold">MERN, Next.js, PostgreSQL</strong> and <strong className="text-[#7A1C1C] font-bold">Supabase</strong>, combined with Generative AI technologies including <strong className="text-[#7A1C1C] font-bold">LLM agents, RAG pipelines, LangChain, MCP, vector search</strong> and <strong className="text-[#7A1C1C] font-bold">function calling</strong>. I've built AI-powered systems such as financial RAG assistants, Text-to-SQL platforms, conversational commerce agents, and agentic workflows, with a strong emphasis on scalable architecture, clean backend engineering, and real-world deployment.
                    </p>

                    {/* TECH STACK HIGHLIGHTS SECTION */}
                    <div className="space-y-3 pt-3">
                      <div className="flex items-center space-x-2">
                        <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 font-handwriting text-2xl font-bold text-[#20242B] opacity-90 border-b-[3px] border-dashed border-[#8C8577]/40">
                          <span className="text-[#7A1C1C] text-xl">✨</span>
                          <span>My Stack</span>
                        </div>
                        {/* Dotted connector line */}
                        <div className="flex-1 border-t border-dashed border-[#8C8577]/40 max-w-[120px]"></div>
                      </div>

                      {/* Tech Chips Grid */}
                      <div className="flex flex-wrap gap-2.5 font-journal text-[13px] pt-1 pb-1">
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform -rotate-2 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#41873F]" />
                          <span>Node.js</span>
                        </span>
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform rotate-1 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#00D8FF]" />
                          <span>React</span>
                        </span>
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform -rotate-1 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#000000]" />
                          <span>Next.js</span>
                        </span>
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform rotate-2 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#3178C6]" />
                          <span>TypeScript</span>
                        </span>
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform -rotate-1 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#10A37F]" />
                          <span>OpenAI</span>
                        </span>
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform rotate-1 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#8E75B2]" />
                          <span>Gemini</span>
                        </span>
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform -rotate-2 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#1C3C3C]" />
                          <span>LangChain</span>
                        </span>
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform rotate-2 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#336791]" />
                          <span>PostgreSQL</span>
                        </span>
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform -rotate-1 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#3ECF8E]" />
                          <span>Supabase</span>
                        </span>
                        <span className="px-2.5 py-1 bg-[#FAFAFA] border-2 border-white shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 text-[#20242B] font-bold text-xs transform rotate-1 hover:scale-105 transition-transform rounded">
                          <span className="w-2 h-2 rounded-full bg-[#2496ED]" />
                          <span>Docker</span>
                        </span>
                      </div>
                    </div>


                  </div></>
      )}
    </div>
  );
});
