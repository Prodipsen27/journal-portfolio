import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, CheckCircle2, ArrowRight, Eye, Code2 } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectItem, ChatMessage } from '../types';
import { OverviewSection } from './OverviewSection';
import { SkillsSection } from './SkillsSection';
import { TimelineSection } from './TimelineSection';
import { FairyCareerMap } from './FairyCareerMap';
import { FunSection } from './FunSection';
import { AgentSandbox } from './AgentSandbox';
import { ContactSection } from './ContactSection';
import { AssistantRightPage } from './AssistantRightPage';

interface JournalRightPageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeProject?: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
  onOpenAgentSandbox?: (prompt?: string) => void;
  assistantMessages?: ChatMessage[];
  isAssistantProcessing?: boolean;
  onClearAssistantChat?: () => void;
}

export const JournalRightPage: React.FC<JournalRightPageProps> = ({
  activeTab,
  setActiveTab,
  activeProject,
  onSelectProject,
  onOpenAgentSandbox,
  assistantMessages = [],
  isAssistantProcessing = false,
  onClearAssistantChat
}) => {
  // IF ACTIVE TAB IS 'PROJECTS', SHOW SELECTED PROJECT DETAILS & PREVIEW IMAGE
  if (activeTab === 'projects') {
    const project = activeProject || FEATURED_PROJECTS[0];

    return (
      <div className="p-4 sm:p-6 bg-[#262320] border-l border-[#151311] rounded-r-2xl h-full min-h-0 flex flex-col relative shadow-inner">
        {/* Soft paper noise overlay for skeuomorphic texture */}
        <div 
          className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none rounded-r-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6 flex-1 overflow-y-auto min-h-0 pr-1 relative z-10"
          >
            {/* RECORD HEADER */}
            <div className="flex items-center justify-between border-b border-[#8C8577]/35 pb-3">
              <div>
                <span className="font-typewriter text-[10px] text-[#E05252] uppercase tracking-widest font-bold block">
                  SYSTEM RECORD · {project.id.toUpperCase()}
                </span>
                <span className="font-typewriter text-xs text-[#A69F90]">
                  {project.date} · {project.category}
                </span>
              </div>
              <span className="font-typewriter text-[10px] px-2 py-0.5 rounded bg-[#36322C] border border-[#524C43] text-[#EFE6D2] font-bold uppercase">
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
              <h2 className="font-journal italic text-3xl sm:text-4xl font-bold text-[#F5F2EB] leading-tight">
                {project.title}
              </h2>
              <p className="font-handwriting text-xl text-[#E05252] font-bold leading-snug">
                "{project.tagline}"
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="font-journal text-sm sm:text-base text-[#D5CFC1] leading-relaxed">
              {project.description}
            </p>

            {/* TECH STACK CHIPS */}
            <div className="space-y-1.5">
              <span className="font-typewriter text-[10px] text-[#A69F90] uppercase font-bold tracking-wider block">
                INSTRUMENTATION & FRAMEWORKS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className="font-typewriter text-[11px] px-2 py-0.5 rounded bg-[#36322C] border border-[#524C43] text-[#F5F2EB] font-bold shadow-2xs"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>

            {/* ARCHITECTURE HIGHLIGHTS */}
            {project.architectureDetails && project.architectureDetails.length > 0 && (
              <div className="p-3.5 rounded bg-[#2D2A26] border border-[#423E37] space-y-2">
                <span className="font-typewriter text-[10px] text-[#E05252] uppercase font-bold tracking-wider block">
                  ARCHITECTURAL BLUEPRINT HIGHLIGHTS:
                </span>
                <ul className="space-y-1.5">
                  {project.architectureDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2 font-journal text-xs sm:text-sm text-[#D5CFC1]">
                      <CheckCircle2 className="w-4 h-4 text-[#4FA885] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* METRICS STAMP */}
            {project.metrics && (
              <div className="p-2.5 rounded bg-[#22332A] border border-[#325A47] text-[#86C2A5] font-typewriter text-xs flex items-center space-x-2 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#4FA885] shrink-0" />
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
                  className="px-4 py-2 rounded-lg bg-[#36322C] border border-[#524C43] text-[#F5F2EB] font-handwriting text-xl font-bold hover:bg-[#423E37] transition-all flex items-center space-x-2"
                >
                  <Code2 className="w-4 h-4 text-[#E05252]" />
                  <span>test in AI sandbox →</span>
                </button>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#36322C] border border-[#524C43] text-[#A69F90] hover:text-[#F5F2EB] transition-colors"
                  title="View GitHub Repository"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#36322C] border border-[#524C43] text-[#A69F90] hover:text-[#F5F2EB] transition-colors"
                  title="View Live Demo"
                >
                  <ExternalLink className="w-5 h-5 text-[#E05252]" />
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
    return (
      <div className="p-4 sm:p-6 clean-paper rounded-r-2xl h-full min-h-0 flex flex-col justify-center items-center relative overflow-hidden">
        {/* Local cozy nature background video filling the wide white page background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
        >
          <source src="/bgVideo.mp4" type="video/mp4" />
        </video>

        {/* Full-page polaroid-style image covering the right page, floating on top of the video */}
        <div className="polaroid-card p-4 sm:p-5 pb-8 sm:pb-12 rounded bg-[#FAFAFA] border border-[#E2D9C5] shadow-xl rotate-[1.5deg] w-full max-w-[460px] aspect-[4/5] relative group z-10">
          {/* Top Washi Tape */}
          <div className="wasi-tape absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-5 washi-tape rotate-[-2deg] z-10" />

          <div className="w-full h-full bg-[#EFE6D2] rounded overflow-hidden relative border border-[#DCCFAF]">
            {/* Solid portrait image (no blend overlay on face) */}
            <img
              src="/me.png"
              alt="Prodip Sengupta"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 filter contrast-[1.03] sepia-[0.05]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none z-20" />
          </div>
          
          <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center">
            <span className="font-handwriting text-2xl text-[#20242B] font-bold block leading-tight">
              Prodip Sengupta
            </span>
            <span className="font-typewriter text-[9px] text-[#8C8577] uppercase tracking-widest mt-0.5 block">
              PORTRAIT DEPLOYMENT LOG
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Handle other tab views
  if (activeTab === 'skills' || activeTab === 'timeline') {
    return (
      <div className="p-4 sm:p-6 clean-paper rounded-r-2xl h-full min-h-0 overflow-y-auto pr-1">
        <FairyCareerMap />
      </div>
    );
  }

  if (activeTab === 'fun' || activeTab === 'sketch') {
    return (
      <div className="p-4 sm:p-6 clean-paper rounded-r-2xl h-full min-h-0 overflow-y-auto pr-1">
        <FunSection />
      </div>
    );
  }

  if (activeTab === 'contact' || activeTab === 'mail') {
    return (
      <div className="p-4 sm:p-6 clean-paper rounded-r-2xl h-full min-h-0 overflow-y-auto pr-1">
        <ContactSection />
      </div>
    );
  }

  if (activeTab === 'assistant') {
    return (
      <AssistantRightPage
        messages={assistantMessages}
        isProcessing={isAssistantProcessing}
        onClearChat={onClearAssistantChat}
      />
    );
  }

  if (activeTab === 'agent-sandbox') {
    return (
      <div className="p-4 sm:p-6 clean-paper rounded-r-2xl h-full min-h-0 overflow-y-auto pr-1">
        <AgentSandbox />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 clean-paper rounded-r-2xl h-full min-h-0 overflow-y-auto pr-1">
      <OverviewSection onNavigate={setActiveTab} onSelectProject={onSelectProject} />
    </div>
  );
};
