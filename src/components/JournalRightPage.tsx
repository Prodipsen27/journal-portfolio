import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, CheckCircle2, ArrowRight, Eye, Code2 } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { OverviewSection } from './OverviewSection';
import { SkillsSection } from './SkillsSection';
import { TimelineSection } from './TimelineSection';
import { FunSection } from './FunSection';
import { AgentSandbox } from './AgentSandbox';
import { ContactSection } from './ContactSection';

interface JournalRightPageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeProject?: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
  onOpenAgentSandbox?: (prompt?: string) => void;
}

export const JournalRightPage: React.FC<JournalRightPageProps> = ({
  activeTab,
  setActiveTab,
  activeProject,
  onSelectProject,
  onOpenAgentSandbox
}) => {
  // IF ACTIVE TAB IS 'PROJECTS', SHOW SELECTED PROJECT DETAILS & PREVIEW IMAGE
  if (activeTab === 'projects') {
    const project = activeProject || FEATURED_PROJECTS[0];

    return (
      <div className="p-6 sm:p-10 space-y-6 clean-paper min-h-full rounded-r-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* RECORD HEADER */}
            <div className="flex items-center justify-between border-b border-[#8C8577]/20 pb-3">
              <div>
                <span className="font-typewriter text-[10px] text-[#9C3B3B] uppercase tracking-widest font-bold block">
                  SYSTEM RECORD · {project.id.toUpperCase()}
                </span>
                <span className="font-typewriter text-xs text-[#8C8577]">
                  {project.date} · {project.category}
                </span>
              </div>
              <span className="font-typewriter text-[10px] px-2 py-0.5 rounded bg-[#EFE6D2] border border-[#DCCFAF] text-[#4B5566] font-bold uppercase">
                STATUS: LIVE DEPLOYED
              </span>
            </div>

            {/* PREVIEW IMAGE & POLAROID FRAME */}
            <div className="polaroid-card p-4 rounded bg-[#FAFAFA] border border-[#E2D9C5] shadow-md relative rotate-[-0.5deg] group">
              {/* Top Washi Tape */}
              <div className="wasi-tape absolute -top-3 right-8 w-20 h-4 washi-tape rotate-[2.5deg] z-10" />

              <div className="aspect-[16/9] sm:aspect-[21/10] bg-[#EFE6D2] rounded overflow-hidden relative border border-[#DCCFAF]">
                <img
                  src={project.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                
                {/* Image Overlay Label */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white font-typewriter text-[10px] drop-shadow-md">
                  <span>PREVIEW CAPTION</span>
                  <span className="uppercase">{project.caption || `FILE_${project.id.toUpperCase()}.JPG`}</span>
                </div>
              </div>

              <div className="mt-2.5 text-center">
                <span className="font-handwriting text-lg text-[#20242B] font-bold block">
                  {project.title} — Technical Proof & Architecture
                </span>
              </div>
            </div>

            {/* PROJECT TITLE & TAGLINE */}
            <div className="space-y-2">
              <h2 className="font-journal italic text-3xl sm:text-4xl font-bold text-[#20242B] leading-tight">
                {project.title}
              </h2>
              <p className="font-handwriting text-xl text-[#9C3B3B] font-bold leading-snug">
                "{project.tagline}"
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="font-journal text-sm sm:text-base text-[#4B5566] leading-relaxed">
              {project.description}
            </p>

            {/* TECH STACK CHIPS */}
            <div className="space-y-1.5">
              <span className="font-typewriter text-[10px] text-[#8C8577] uppercase font-bold tracking-wider block">
                INSTRUMENTATION & FRAMEWORKS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className="font-typewriter text-[11px] px-2 py-0.5 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[#20242B] font-bold shadow-2xs"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>

            {/* ARCHITECTURE HIGHLIGHTS */}
            {project.architectureDetails && project.architectureDetails.length > 0 && (
              <div className="p-3.5 rounded bg-[#FAFAFA] border border-[#E2D9C5] space-y-2">
                <span className="font-typewriter text-[10px] text-[#9C3B3B] uppercase font-bold tracking-wider block">
                  ARCHITECTURAL BLUEPRINT HIGHLIGHTS:
                </span>
                <ul className="space-y-1.5">
                  {project.architectureDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2 font-journal text-xs sm:text-sm text-[#4B5566]">
                      <CheckCircle2 className="w-4 h-4 text-[#3B6B58] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* METRICS STAMP */}
            {project.metrics && (
              <div className="p-2.5 rounded bg-[#EAF2ED] border border-[#3B6B58]/40 text-[#2C5243] font-typewriter text-xs flex items-center space-x-2 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#3B6B58] shrink-0" />
                <span className="font-bold">METRICS RECORDED: {project.metrics}</span>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectProject(project)}
                className="px-4 py-2 rounded-lg bg-[#9C3B3B] text-[#FBF7EE] font-handwriting text-xl font-bold hover:bg-[#822E2E] transition-all shadow-sm flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>examine logic modal</span>
              </button>

              {onOpenAgentSandbox && (
                <button
                  onClick={() => onOpenAgentSandbox(`Analyze architecture and build a custom component inspired by ${project.title}`)}
                  className="px-4 py-2 rounded-lg bg-[#EFE6D2] border border-[#BCAE8E] text-[#20242B] font-handwriting text-xl font-bold hover:bg-[#E2D9C5] transition-all flex items-center space-x-2"
                >
                  <Code2 className="w-4 h-4 text-[#9C3B3B]" />
                  <span>test in AI sandbox →</span>
                </button>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#FAFAFA] border border-[#E2D9C5] text-[#4B5566] hover:text-[#20242B] transition-colors"
                  title="View GitHub Repository"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // IF ACTIVE TAB IS 'OVERVIEW'
  if (activeTab === 'overview') {
    const project1 = FEATURED_PROJECTS[0]; // The Neural Archivist
    const project2 = FEATURED_PROJECTS[1]; // Ink & Pixel

    return (
      <div className="p-6 sm:p-10 space-y-10 clean-paper min-h-full rounded-r-2xl">
        {/* PRODIP'S DUMMY PORTRAIT CARD & WELCOME STAMP */}
        <motion.section 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-5 rounded-xl bg-[#FAFAFA]/90 border border-[#E2D9C5] shadow-sm relative space-y-4"
        >
          {/* Top Washi Tape */}
          <div className="wasi-tape absolute -top-3 left-8 w-20 h-4 washi-tape rotate-[-1.5deg] z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            {/* Polaroid Photo Frame of Prodip */}
            <div className="sm:col-span-5">
              <div className="polaroid-card p-2.5 rounded bg-[#FAFAFA] border border-[#E2D9C5] shadow-md rotate-[-2deg] relative group">
                <div className="aspect-[4/5] bg-[#EFE6D2] rounded overflow-hidden relative border border-[#DCCFAF]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                    alt="Prodip Sengupta"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03] sepia-[0.1]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="mt-2 text-center">
                  <span className="font-handwriting text-base font-bold text-[#20242B] block leading-tight">
                    Prodip Sengupta
                  </span>
                  <span className="font-typewriter text-[9px] text-[#8C8577] uppercase tracking-wider block">
                    FOUNDER & FULL-STACK AI DEV
                  </span>
                </div>
              </div>
            </div>

            {/* Welcome & Philosophy Copy */}
            <div className="sm:col-span-7 space-y-3">
              <span className="font-typewriter text-[10px] text-[#9C3B3B] font-bold uppercase tracking-wider">
                FIELD JOURNAL · ENTRY LOG #01
              </span>
              <h2 className="font-journal italic text-2xl sm:text-3xl font-bold text-[#20242B]">
                "Welcome to my working sketchbook."
              </h2>
              <p className="font-journal text-xs sm:text-sm text-[#4B5566] leading-relaxed">
                Here I document real-world software builds, experimental GenAI workflows, and live web apps. Select any project entry on the left to inspect architecture and test ideas in real time.
              </p>
              <div className="pt-1 flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab('projects')}
                  className="font-handwriting text-xl text-[#9C3B3B] hover:text-[#b84343] transition-colors border-b border-[#9C3B3B] pb-0.5"
                >
                  view all projects →
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FEATURED HIGHLIGHTS */}
        <motion.article 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="font-typewriter text-xs text-[#8C8577] uppercase tracking-wider font-bold">
            {project1.date} · {project1.category}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5">
              <div 
                onClick={() => { setActiveTab('projects'); onSelectProject(project1); }}
                className="polaroid-card p-3 rounded bg-[#FAFAFA] border border-[#E2D9C5] shadow-md relative rotate-[-1.5deg] group cursor-pointer"
              >
                <div className="wasi-tape absolute -top-3 right-4 w-16 h-4 washi-tape rotate-[3deg] z-10" />
                <div className="aspect-[4/3] bg-[#EFE6D2] rounded overflow-hidden relative border border-[#DCCFAF]">
                  <img
                    src={project1.imageUrl}
                    alt={project1.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter sepia-[0.25]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-2.5 text-center">
                  <span className="font-typewriter text-[10px] text-[#8C8577] uppercase font-bold">
                    {project1.caption}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h2 
                onClick={() => { setActiveTab('projects'); onSelectProject(project1); }}
                className="font-journal italic text-3xl font-semibold text-[#20242B] cursor-pointer hover:text-[#9C3B3B] transition-colors"
              >
                {project1.title}
              </h2>
              <p className="font-journal text-sm text-[#4B5566] leading-relaxed">
                {project1.description}
              </p>
              <div>
                <button
                  onClick={() => { setActiveTab('projects'); onSelectProject(project1); }}
                  className="font-handwriting text-2xl text-[#9C3B3B] hover:text-[#b84343] transition-colors border-b border-[#9C3B3B] pb-0.5"
                >
                  examine entry →
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    );
  }

  // Handle other tab views
  if (activeTab === 'skills') {
    return (
      <div className="p-6 sm:p-10 clean-paper min-h-full rounded-r-2xl">
        <SkillsSection />
      </div>
    );
  }

  if (activeTab === 'timeline') {
    return (
      <div className="p-6 sm:p-10 clean-paper min-h-full rounded-r-2xl">
        <TimelineSection />
      </div>
    );
  }

  if (activeTab === 'fun' || activeTab === 'sketch') {
    return (
      <div className="p-6 sm:p-10 clean-paper min-h-full rounded-r-2xl">
        <FunSection />
      </div>
    );
  }

  if (activeTab === 'contact' || activeTab === 'mail') {
    return (
      <div className="p-6 sm:p-10 clean-paper min-h-full rounded-r-2xl">
        <ContactSection />
      </div>
    );
  }

  if (activeTab === 'agent-sandbox') {
    return (
      <div className="p-6 sm:p-10 clean-paper min-h-full rounded-r-2xl">
        <AgentSandbox />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 clean-paper min-h-full rounded-r-2xl">
      <OverviewSection onNavigate={setActiveTab} onSelectProject={onSelectProject} />
    </div>
  );
};
