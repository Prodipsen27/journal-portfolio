import React from 'react';
import { JournalAILine } from './JournalAILine';
import { Brain, Sparkles, MapPin, CheckCircle2, ShieldCheck, Layers, FolderGit2 } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';

interface JournalLeftPageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeProject?: ProjectItem;
  onSelectProject?: (project: ProjectItem) => void;
  onOpenSandbox?: (prompt?: string) => void;
}

export const JournalLeftPage: React.FC<JournalLeftPageProps> = ({
  activeTab,
  setActiveTab,
  activeProject,
  onSelectProject,
  onOpenSandbox
}) => {
  return (
    <div className="p-5 sm:p-8 relative flex flex-col justify-between min-h-[640px] select-none lined-paper rounded-t-2xl lg:rounded-tr-none lg:rounded-l-none h-full">
      {/* RED RIBBON BOOKMARK WITH STAR AT TOP RIGHT */}
      <div className="absolute top-0 right-8 w-9 z-20 flex flex-col items-center">
        <div className="w-9 h-24 bg-gradient-to-b from-[#822E2E] via-[#9C3B3B] to-[#782828] shadow-md flex flex-col items-center justify-start pt-2 relative">
          <span className="text-[#FBF7EE] text-xs font-bold">★</span>
          {/* Ribbon V-Tail Cutout */}
          <div className="absolute -bottom-3 left-0 right-0 h-3 bg-[#9C3B3B] clip-ribbon-tail" />
        </div>
      </div>

      {/* RENDER CONTENT BASED ON ACTIVE TAB */}
      {activeTab === 'projects' ? (
        /* PROJECTS TAB: LIST OF PROJECT NAMES ON LINED PAPER */
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
      ) : (
        /* OVERVIEW & BIO TAB (DEFAULT / ABOUT ME) */
        <div className="space-y-5">
          <div>
            <span className="font-typewriter text-[10px] text-[#8C8577] uppercase tracking-widest font-bold">
              FIELD LOG ENTRY · #01
            </span>
            <h1 className="font-handwriting text-3xl sm:text-4xl text-[#9C3B3B] font-bold leading-tight mt-0.5">
              Overview & Bio.
            </h1>
          </div>

          {/* MOTTO IN DECORATIVE SCRIPT */}
          <div className="p-3 bg-[#EFE6D2]/60 rounded border-l-4 border-[#9C3B3B] shadow-2xs">
            <p className="font-handwriting text-xl sm:text-2xl text-[#20242B] font-bold leading-snug">
              “I don’t just build apps — I build systems that think.”
            </p>
          </div>

          {/* NARRATIVE BIOGRAPHY & STYLIZED AI BRAIN ICON */}
          <div className="flex items-start space-x-3 bg-[#FBF7EE]/80 p-2.5 rounded border border-[#DCCFAF]">
            <div className="p-2 rounded-full bg-[#9C3B3B] text-[#FBF7EE] shrink-0 mt-1 shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <p className="font-journal text-xs sm:text-sm text-[#4B5566] leading-relaxed">
              I build fast, scalable web applications with AI agents and full-stack architectures. Driven by a deep passion for natural language interfaces, multi-agent graphs, and tactile digital craftsmanship.
            </p>
          </div>

          {/* LEDGER STAMPS / WORN LABELS */}
          <div className="grid grid-cols-2 gap-2 font-typewriter text-[10px]">
            <div className="p-1.5 rounded bg-[#EAF2ED] border border-[#3B6B58]/40 text-[#2C5243] flex items-center space-x-1.5 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B6B58] shrink-0" />
              <span className="font-bold uppercase tracking-wider">OPEN TO WORK</span>
            </div>
            <div className="p-1.5 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[#4B5566] flex items-center space-x-1.5 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#9C3B3B] shrink-0" />
              <span className="font-bold uppercase">INDIA (REMOTE)</span>
            </div>
            <div className="p-1.5 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[#4B5566] flex items-center space-x-1.5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5C7C74] shrink-0" />
              <span className="font-bold">UPTIME: 99.0%</span>
            </div>
            <div className="p-1.5 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[#4B5566] flex items-center space-x-1.5 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#B08D3F] shrink-0" />
              <span className="font-bold">27+ SYSTEMS BUILT</span>
            </div>
          </div>

          {/* STATS & CORE SKILLS */}
          <div className="space-y-3 pt-2 border-t border-dashed border-[#8C8577]/40">
            <div className="flex items-center justify-between">
              <h3 className="font-handwriting text-2xl font-bold text-[#20242B]">
                Stats & Core Skills
              </h3>
              <span className="font-typewriter text-[9px] text-[#8C8577]">ESTIMATED DEPTH</span>
            </div>

            <div className="space-y-2 font-typewriter text-xs">
              {/* Skill Bar 1: Problem Solving */}
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-bold text-[#20242B]">
                  <span>Problem Solving</span>
                  <span className="text-[#9C3B3B] font-handwriting text-base">96%</span>
                </div>
                <div className="w-full h-2 rounded bg-[#EFE6D2] border border-[#BCAE8E] overflow-hidden p-0.5">
                  <div className="h-full bg-[#9C3B3B] rounded-xs" style={{ width: '96%' }} />
                </div>
              </div>

              {/* Skill Bar 2: Creativity */}
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-bold text-[#20242B]">
                  <span>Creativity</span>
                  <span className="text-[#5C7C74] font-handwriting text-base">91%</span>
                </div>
                <div className="w-full h-2 rounded bg-[#EFE6D2] border border-[#BCAE8E] overflow-hidden p-0.5">
                  <div className="h-full bg-[#5C7C74] rounded-xs" style={{ width: '91%' }} />
                </div>
              </div>

              {/* Skill Bar 3: Communication */}
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-bold text-[#20242B]">
                  <span>Communication</span>
                  <span className="text-[#B08D3F] font-handwriting text-base">88%</span>
                </div>
                <div className="w-full h-2 rounded bg-[#EFE6D2] border border-[#BCAE8E] overflow-hidden p-0.5">
                  <div className="h-full bg-[#B08D3F] rounded-xs" style={{ width: '88%' }} />
                </div>
              </div>
            </div>

            {/* TAPED-IN TECH STACK LIST / MARGIN NOTE */}
            <div className="mt-3 p-2.5 rounded bg-[#EFE6D2] border border-[#BCAE8E] shadow-2xs relative rotate-[0.5deg]">
              <div className="wasi-tape absolute -top-2 right-6 w-12 h-3.5 washi-tape opacity-80" />
              <span className="font-typewriter text-[9px] text-[#9C3B3B] font-bold uppercase block mb-1">
                INSTRUMENT STACK AT HAND:
              </span>
              <p className="font-handwriting text-lg text-[#20242B] font-bold leading-tight">
                GenAI, MERN (Mongo/Express/React/Node), Next.js, JS, OpenAI, Gemini, Docker.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM RULED AI PROMPT INPUT LINE */}
      <div className="mt-6">
        <JournalAILine onOpenSandbox={onOpenSandbox} />
      </div>
    </div>
  );
};
