import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, ArrowRight, ExternalLink, Calendar, Tag, Check, Bookmark } from 'lucide-react';
import { PROFILE_DATA, FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { JournalAILine } from './JournalAILine';

interface OverviewSectionProps {
  onNavigate: (tab: string) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate, onSelectProject }) => {
  const topProjects = FEATURED_PROJECTS.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 relative"
    >
      {/* ENTRY HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#8C8577]/30 gap-2 font-typewriter text-xs text-[#4B5566]">
        <div className="flex items-center space-x-2">
          <Calendar className="w-3.5 h-3.5 text-[#9C3B3B]" />
          <span className="font-bold text-[#20242B]">Oct 14, 2026</span>
          <span>·</span>
          <span className="px-2 py-0.5 rounded bg-[#5C7C74]/20 text-[#2C4A42] font-semibold">#me</span>
          <span>·</span>
          <span>3 min read</span>
        </div>
        <div className="text-[11px] text-[#8C8577] italic font-handwriting text-base">
          "The Day I Started This Field Notebook"
        </div>
      </div>

      {/* TWO-COLUMN JOURNAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Main Personal Narrative Prose */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            <p className="font-handwriting text-2xl sm:text-3xl text-[#9C3B3B] font-bold leading-tight">
              "{PROFILE_DATA.quote}"
            </p>

            <p className="font-journal text-base sm:text-lg text-[#20242B] leading-relaxed">
              {PROFILE_DATA.bio}
            </p>

            <p className="font-journal text-sm sm:text-base text-[#4B5566] leading-relaxed">
              When I construct software, I treat every module like an entry in a field log—documenting decisions, testing edge cases, and ensuring every agent RAG pipeline or backend API gateway operates with clarity and speed.
            </p>
          </div>

          {/* Quick Stats Taped Note */}
          <div className="p-5 rounded-lg bg-[#FBF7EE] border border-[#DCCFAF] shadow-sm relative overflow-hidden">
            <div className="wasi-tape absolute -top-2 left-8 w-16 h-3.5 washi-tape" />
            <h3 className="font-handwriting text-xl font-bold text-[#20242B] mb-3">
              Field Log Measurements & Specs
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-typewriter text-[#20242B]">
              <div className="p-2.5 rounded bg-[#EFE6D2] border border-[#BCAE8E]">
                <p className="text-[10px] text-[#8C8577] uppercase">Experience</p>
                <p className="font-bold text-sm text-[#9C3B3B] mt-0.5">1+ Years</p>
              </div>
              <div className="p-2.5 rounded bg-[#EFE6D2] border border-[#BCAE8E]">
                <p className="text-[10px] text-[#8C8577] uppercase">Projects Shipped</p>
                <p className="font-bold text-sm text-[#5C7C74] mt-0.5">27+ Systems</p>
              </div>
              <div className="p-2.5 rounded bg-[#EFE6D2] border border-[#BCAE8E]">
                <p className="text-[10px] text-[#8C8577] uppercase">System Uptime</p>
                <p className="font-bold text-sm text-[#B08D3F] mt-0.5">99.0%</p>
              </div>
            </div>
          </div>

          {/* Core Tech Stack Taped Tags */}
          <div>
            <p className="font-handwriting text-lg text-[#20242B] font-bold mb-2">
              Primary Instruments & Tech Stack:
            </p>
            <div className="flex flex-wrap gap-2">
              {PROFILE_DATA.coreTechStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded text-xs font-typewriter bg-[#EFE6D2] text-[#20242B] border border-[#BCAE8E] shadow-sm flex items-center space-x-1"
                >
                  <span className="text-[#9C3B3B]">#</span>
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Pinned Photo Strip Avatar & Margin Doodles */}
        <div className="lg:col-span-4 space-y-6">
          {/* Taped Photo Strip Avatar */}
          <div className="polaroid-card p-4 rounded-lg transform rotate-[-2deg] relative">
            <div className="wasi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-4 washi-tape" />

            {/* Hand-drawn style Avatar Illustration */}
            <div className="aspect-[4/5] rounded bg-[#EFE6D2] border border-[#DCCFAF] flex flex-col items-center justify-center p-4 relative overflow-hidden text-center group">
              <div className="w-20 h-20 rounded-full bg-[#20242B] text-[#EFE6D2] flex items-center justify-center font-handwriting text-3xl font-bold shadow-md mb-2 border-2 border-[#B08D3F]">
                PS
              </div>
              <p className="font-handwriting text-xl text-[#20242B] font-bold">
                {PROFILE_DATA.name}
              </p>
              <p className="font-typewriter text-[11px] text-[#4B5566]">
                {PROFILE_DATA.role}
              </p>
              <div className="mt-2 text-[10px] font-typewriter text-[#9C3B3B] bg-[#9C3B3B]/10 px-2 py-0.5 rounded border border-[#9C3B3B]/30">
                ● {PROFILE_DATA.status}
              </div>
            </div>

            <p className="font-handwriting text-center text-sm text-[#8C8577] mt-3">
              "Photo booth strip pinned in notebook"
            </p>
          </div>

          {/* Margin Notes with Pencil Tallies */}
          <div className="p-4 rounded border-l-2 border-[#9C3B3B]/40 pl-4 font-journal text-xs text-[#4B5566] space-y-2 italic">
            <p className="font-handwriting text-base font-bold text-[#20242B] not-italic">
              Margin Notes:
            </p>
            <p>• Based in India, open for remote full-stack / GenAI roles globally.</p>
            <p>• Specialization in LangGraph multi-agent reasoning, RAG RRF retrieval, and Next.js / Express web systems.</p>
            <div className="pt-2 font-typewriter text-[11px] text-[#8C8577] not-italic">
              <span>Skill Tallies: </span>
              <span className="text-[#9C3B3B] font-bold">|||| |||| ||||</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED PROJECTS ENTRY PREVIEW */}
      <div className="pt-8 border-t border-[#8C8577]/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-journal text-2xl font-bold text-[#20242B] flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-[#9C3B3B]" />
            <span>Featured Project Entries</span>
          </h3>
          <button
            onClick={() => onNavigate('projects')}
            className="font-typewriter text-xs text-[#9C3B3B] hover:underline flex items-center space-x-1"
          >
            <span>Read All Entries (27+) →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`polaroid-card p-4 rounded-lg cursor-pointer transition-all ${
                idx % 2 === 0 ? 'rotate-[-1.5deg]' : 'rotate-[1.5deg]'
              }`}
            >
              <div className="wasi-tape absolute -top-2 right-4 w-12 h-3.5 washi-tape" />

              <div className="text-[10px] font-typewriter text-[#8C8577] flex items-center justify-between mb-1">
                <span>{project.date}</span>
                <span className="text-[#5C7C74] font-bold">#{project.category.toLowerCase().replace(/\s+/g, '')}</span>
              </div>

              <h4 className="font-journal text-lg font-bold text-[#20242B] mb-1 hover:text-[#9C3B3B]">
                {project.title}
              </h4>

              <p className="font-journal text-xs text-[#4B5566] line-clamp-2 mb-3">
                {project.tagline}
              </p>

              <div className="pt-2 border-t border-[#DCCFAF] flex items-center justify-between text-[10px] font-typewriter text-[#8C8577]">
                <div className="flex gap-1 flex-wrap">
                  {project.tech.slice(0, 2).map((t, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-[#EFE6D2] border border-[#BCAE8E]">
                      {t}
                    </span>
                  ))}
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#9C3B3B]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM AI QUESTION LINE */}
      <JournalAILine onOpenSandbox={(prompt) => onNavigate('agent-sandbox')} />
    </motion.div>
  );
};
