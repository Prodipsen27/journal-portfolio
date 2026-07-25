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
import { HanddrawnMarginOverlay } from './HanddrawnMarginOverlay';
import { ProjectActionButtons } from './ui/ProjectActionButtons';
import { useBookContext } from './book/BookContext';
import SpiralBinderSpine from './SpiralBinderSpine';

interface JournalRightPageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeProject?: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
  onOpenAgentSandbox?: (prompt?: string) => void;
  assistantMessages?: ChatMessage[];
  isAssistantProcessing?: boolean;
  onClearAssistantChat?: () => void;
  isDarkMode?: boolean;
}

export const JournalRightPage: React.FC<JournalRightPageProps> = ({
  activeTab,
  setActiveTab,
  activeProject,
  onSelectProject,
  onOpenAgentSandbox,
  assistantMessages = [],
  isAssistantProcessing = false,
  onClearAssistantChat,
  isDarkMode = false
}) => {
  const { isTransitioning } = useBookContext();
  const dk = isDarkMode;
  const pageText = dk ? 'text-[#EFE6D2]' : 'text-[#20242B]';
  const titleText = dk ? 'text-[#F3E8D5]' : 'text-[#20242B]';
  const bodyText = dk ? 'text-[#D3C5B5]' : 'text-[#4B5566]';
  const mutedText = dk ? 'text-[#B8AA98]' : 'text-[#8C8577]';
  const accentText = dk ? 'text-[#F07F75]' : 'text-[#9C3B3B]';
  const chipCls = dk
    ? 'bg-[#232936] border-[#3f4756] text-[#E8DDCA]'
    : 'bg-[#EFE6D2] border-[#BCAE8E] text-[#20242B]';
  const panelCls = dk
    ? 'bg-[#1D222C] border-[#3f4756]'
    : 'bg-[#FAFAFA] border-[#E2D9C5]';
  const metricCls = dk
    ? 'bg-[#162820] border-[#55cbb0]/40 text-[#BFEBDC]'
    : 'bg-[#EAF2ED] border-[#3B6B58]/40 text-[#2C5243]';

  // IF ACTIVE TAB IS 'PROJECTS', SHOW SELECTED PROJECT DETAILS & PREVIEW IMAGE
  if (activeTab === 'projects') {
    const project = activeProject || FEATURED_PROJECTS[0];

    return (<><div className="absolute top-0 bottom-0 left-0 -translate-x-1/2 z-50 pointer-events-none">
      <SpiralBinderSpine />
    </div><div className={`p-5 sm:p-7 space-y-6 clean-paper h-full overflow-y-auto rounded-r-2xl ${pageText}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* ================= PREMIUM PROJECT DOSSIER HEADER ================= */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-5"
            >
              {/* Top Header */}
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className={`font-typewriter uppercase tracking-[0.25em] text-[11px] ${accentText} font-bold`}>
                      Project Dossier
                    </span>
                  </motion.div>



                  <p className={`mt-2 ${mutedText} font-typewriter text-xs uppercase tracking-widest`}>
                    {project.category} • {project.date}
                  </p>
                </div>

                <motion.div
                  layoutId="live-status"
                  whileHover={isTransitioning ? undefined : { scale: 1.05 }}
                  className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 px-4 py-2"
                >
                  <span className="flex items-center gap-2 text-xs font-typewriter font-bold text-emerald-700 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE DEPLOYED
                  </span>
                </motion.div>
              </div>

              {/* Hero Preview */}
              <motion.div
                layoutId="project-preview"
                whileHover={isTransitioning ? undefined : 'hover'}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="relative rounded-3xl overflow-hidden border border-[#D9D1BF] dark:border-[#383D48] bg-white dark:bg-[#1C1F26] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              >
                {/* Animated Gradient */}
                <motion.div
                  variants={{
                    hover: {
                      opacity: 1
                    }
                  }}
                  initial={{
                    opacity: 0.35
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-[#D9C49C]/20 pointer-events-none z-10" />

                {/* Hero Image */}
                <motion.img
                  whileHover={isTransitioning ? undefined : {
                    scale: 1.05
                  }}
                  transition={{
                    duration: 1
                  }}
                  src={project.imageUrl ||
                    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"}
                  alt={project.title}
                  className="aspect-[16/9] w-full object-cover" />

                {/* Bottom Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-white/80 text-xs font-typewriter uppercase tracking-widest">
                        {project.caption || "PROJECT PREVIEW"}
                      </p>
                      <h3 className="mt-1 text-xl sm:text-2xl text-white font-bold">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <motion.a
                          whileHover={isTransitioning ? undefined : { y: -3 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="backdrop-blur-lg bg-white/15 hover:bg-white/30 border border-white/25 rounded-xl p-3 text-white transition-colors"
                          title="View Source on GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}

                      {project.demoUrl && (
                        <motion.a
                          whileHover={isTransitioning ? undefined : { y: -3 }}
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="backdrop-blur-lg bg-emerald-500/90 hover:bg-emerald-500 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-2 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/30"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shine */}
                <motion.div
                  animate={{
                    x: ["-100%", "200%"]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 pointer-events-none z-15" />
              </motion.div>
            </motion.div>

            {/* PROJECT TITLE & TAGLINE */}
            <div className="space-y-2">
              <motion.h2 layoutId="right-section-title" className={`font-journal italic text-3xl sm:text-4xl font-bold ${titleText} leading-tight`}>
                {project.title}
              </motion.h2>
              <p className="font-handwriting text-xl text-[#9C3B3B] font-bold leading-snug">
                "{project.tagline}"
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className={`font-journal text-sm sm:text-base ${bodyText} leading-relaxed`}>
              {project.description}
            </p>

            {/* TECH STACK CHIPS */}
            <div className="space-y-1.5">
              <span className={`font-typewriter text-[10px] ${mutedText} uppercase font-bold tracking-wider block`}>
                INSTRUMENTATION & FRAMEWORKS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className={`font-typewriter text-[11px] px-2 py-0.5 rounded border font-bold shadow-2xs ${chipCls}`}
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>

            {/* ARCHITECTURE HIGHLIGHTS */}
            {project.architectureDetails && project.architectureDetails.length > 0 && (
              <div className={`p-3.5 rounded border space-y-2 ${panelCls}`}>
                <span className={`font-typewriter text-[10px] ${accentText} uppercase font-bold tracking-wider block`}>
                  ARCHITECTURAL BLUEPRINT HIGHLIGHTS:
                </span>
                <ul className="space-y-1.5">
                  {project.architectureDetails.map((detail, idx) => (
                    <li key={idx} className={`flex items-start space-x-2 font-journal text-xs sm:text-sm ${bodyText}`}>
                      <CheckCircle2 className="w-4 h-4 text-[#3B6B58] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* METRICS STAMP */}
            {project.metrics && (
              <div className={`p-2.5 rounded border font-typewriter text-xs flex items-center space-x-2 shadow-2xs ${metricCls}`}>
                <Sparkles className="w-4 h-4 text-[#3B6B58] shrink-0" />
                <span className="font-bold">METRICS RECORDED: {project.metrics}</span>
              </div>
            )}


          </motion.div>
        </AnimatePresence>
      </div></>
    );
  }

  // IF ACTIVE TAB IS 'OVERVIEW' (EXACT MATCH TO REFERENCE IMAGE)
  if (activeTab === 'overview') {
    return (<><div className="absolute top-0 bottom-0 left-0 -translate-x-1/2 z-50 pointer-events-none">
      <SpiralBinderSpine />
    </div><div className={`p-5 sm:p-7 space-y-6 clean-paper w-full h-full rounded-r-2xl relative ${pageText}`}>
        {/* HAND-DRAWN MARGIN OVERLAY SKETCHES */}
        <HanddrawnMarginOverlay pageSide="right" />

        {/* MAIN SPREAD CONTAINER (Polaroid on Left, Expertise/Tools on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SECTION: POLAROID & CONTACT/LOCATION INFO (Col Span 7) */}
          <div className="lg:col-span-7 space-y-5">
            {/* POLAROID PHOTO FRAME */}
            <motion.div layoutId="profile-photo" className="polaroid-card p-3.5 pb-4 rounded-md bg-[#FAFAFA] border border-[#E2D9C5] shadow-lg relative rotate-[-1deg] group">
              {/* Top Masking Tape */}
              <div className="wasi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#E8DEC8]/80 border-t border-b border-[#D4C8B0] shadow-2xs rotate-[1deg] z-10" />

              {/* Paperclip at Top Right */}
              <div className="absolute -top-2 right-6 z-20 pointer-events-none opacity-90">
                <svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8V30C16 33.3137 13.3137 36 10 36C6.68629 36 4 33.3137 4 30V10C4 7.79086 5.79086 6 8 6C10.2091 6 12 7.79086 12 10V28C12 29.1046 11.1046 30 10 30C8.89543 30 8 29.1046 8 28V12" stroke="#5A606E" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Main Photo */}
              <div className="aspect-[4/5] bg-[#EFE6D2] rounded overflow-hidden relative border border-[#DCCFAF]">
                <img
                  src="/me.png"
                  alt="Prodip Sengupta"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.04]"
                  referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Photo Caption Area */}
              <div className="mt-3 text-center space-y-1 relative">


                <motion.h3 layoutId="profile-name" className="theme-responsive-text font-handwriting text-3xl font-bold text-[#20242B] leading-none pt-0.5">
                  Prodip Sengupta
                </motion.h3>

                <p className="font-typewriter text-[9px] text-[#7A1C1C] font-bold tracking-widest uppercase">
                  FULL-STACK GENAI ENGINEER
                </p>

                {/* Red Fingerprint Stamp at Bottom Right of Polaroid */}
                <div className="absolute right-1 bottom-0 opacity-80 pointer-events-none">
                  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" stroke="#9C3B3B" strokeWidth="1" strokeDasharray="3 3" />
                    <path d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20" stroke="#9C3B3B" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28" stroke="#9C3B3B" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M20 16C17.7909 16 16 17.7909 16 20C16 22.2091 17.7909 24 20 24" stroke="#9C3B3B" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* MOUNTAIN SKETCH & CONTACT / LOCATION INFO */}
            <div className="relative pt-2">
              {/* Background Mountain Ink Sketch */}
              <div className="absolute left-0 bottom-0 pointer-events-none opacity-20">
                <svg width="180" height="90" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 90 L50 30 L80 65 L120 15 L170 85 L190 90 Z" stroke="#3B2F23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30 60 L50 30 L65 50" stroke="#3B2F23" strokeWidth="1" />
                  <path d="M100 40 L120 15 L140 45" stroke="#3B2F23" strokeWidth="1" />
                </svg>
              </div>

              {/* Info Box */}
              <div className="p-3.5 rounded-lg bg-[#FBF7EE]/90 border border-[#DCCFAF] shadow-2xs space-y-2 relative z-10 max-w-xs ml-auto">
                <div className="flex items-center space-x-2 text-xs font-journal text-[#20242B]">
                  <span className="text-[#7A1C1C]">📍</span>
                  <span className="font-semibold">Based in India</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-journal text-[#20242B]">
                  <span className="text-[#7A1C1C]">💼</span>
                  <span className="font-semibold">Open to Opportunities</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-journal text-[#20242B]">
                  <span className="text-[#7A1C1C]">✉️</span>
                  <a href="mailto:prodipsengupta27@gmail.com" className="font-semibold text-[#7A1C1C] hover:underline truncate">
                    prodipsengupta27@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: CORE EXPERTISE & TOOLS & INFRA (Col Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* CORE EXPERTISE LIST */}
            <div className="space-y-3">
              <div className={`flex items-center space-x-1.5 font-typewriter text-xs font-bold ${titleText} border-b border-[#8C8577]/30 pb-1.5 uppercase tracking-wider`}>
                <span className="text-[#7A1C1C]">☆</span>
                <span>CORE EXPERTISE</span>
              </div>

              <ul className={`space-y-2 font-journal text-xs sm:text-sm ${pageText}`}>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#7A1C1C]">💻</span>
                  <span className="font-semibold">Full-Stack Development</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#7A1C1C]">🧠</span>
                  <span className="font-semibold">Generative AI &amp; LLMs</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#7A1C1C]">🕸️</span>
                  <span className="font-semibold">RAG &amp; Vector Search</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#7A1C1C]">🤖</span>
                  <span className="font-semibold">AI Agents &amp; Tool Calling</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#7A1C1C]">🗄️</span>
                  <span className="font-semibold">Databases &amp; Cloud</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#7A1C1C]">📐</span>
                  <span className="font-semibold">Scalable Architecture</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#7A1C1C] font-mono font-bold">&lt;/&gt;</span>
                  <span className="font-semibold">API Design &amp; Integrations</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#7A1C1C]">☁️</span>
                  <span className="font-semibold">DevOps &amp; Deployment</span>
                </li>
              </ul>
            </div>

            {/* TOOLS & INFRA GRID */}
            <div className="space-y-3 pt-2">
              <div className={`flex items-center space-x-1.5 font-typewriter text-xs font-bold ${titleText} border-b border-[#8C8577]/30 pb-1.5 uppercase tracking-wider`}>
                <span>TOOLS &amp; INFRA</span>
              </div>

              {/* 4x2 Grid of Tools */}
              <div className={`grid grid-cols-4 gap-2 text-center font-typewriter text-[10px] ${pageText}`}>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#DCCFAF] flex flex-col items-center justify-center space-y-1">
                  <span className="text-red-600 dark:text-red-400 font-bold">Git</span>
                </div>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#DCCFAF] flex flex-col items-center justify-center space-y-1">
                  <span className="text-black dark:text-white font-bold">GitHub</span>
                </div>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#DCCFAF] flex flex-col items-center justify-center space-y-1">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">Docker</span>
                </div>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#DCCFAF] flex flex-col items-center justify-center space-y-1">
                  <span className="text-black dark:text-white font-bold">Vercel</span>
                </div>

                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#DCCFAF] flex flex-col items-center justify-center space-y-1">
                  <span className="text-gray-700 dark:text-gray-300 font-bold">Render</span>
                </div>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#DCCFAF] flex flex-col items-center justify-center space-y-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Supabase</span>
                </div>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#DCCFAF] flex flex-col items-center justify-center space-y-1">
                  <span className="text-amber-800 dark:text-amber-400 font-bold">Pinecone</span>
                </div>
                <div className="p-1.5 rounded bg-[#FBF7EE] border border-[#DCCFAF] flex flex-col items-center justify-center space-y-1">
                  <span className="text-sky-600 dark:text-sky-400 font-bold">Cloudinary</span>
                </div>
              </div>
            </div>

            {/* BOTTOM RIGHT QUOTE & PAPER AIRPLANE SKETCH */}
            <motion.div layoutId="right-quote" className={`pt-4 text-center font-handwriting text-xl ${pageText} relative`}>
              <p className="italic">
                'Let's build something <br />
                intelligent together.'
              </p>

              {/* Paper Airplane Doodle */}
              <div className="absolute right-2 -bottom-2 pointer-events-none opacity-60">
                <svg width="40" height="30" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Arc flight line */}
                  <path d="M5 35 Q 25 35 35 20" stroke="#7A1C1C" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Paper airplane */}
                  <path d="M35 20 L55 5 L45 28 L38 22 Z" fill="none" stroke="#7A1C1C" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M35 20 L45 28" stroke="#7A1C1C" strokeWidth="1" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div></>
    );
  }

  // Handle other tab views
  if (activeTab === 'skills' || activeTab === 'timeline') {
    return (
        <>
        <div className="p-5 sm:p-7 clean-paper w-full h-full overflow-y-auto rounded-r-2xl">
        <FairyCareerMap />
      </div>
      <div className="absolute top-0 bottom-0 left-0 -translate-x-1/2 z-50 pointer-events-none">
          <SpiralBinderSpine />
        </div>
        </>
    );
  }

  if (activeTab === 'fun' || activeTab === 'sketch') {
    return (
      <div className="p-5 sm:p-7 clean-paper w-full h-full overflow-y-auto rounded-r-2xl">
        <FunSection />
      </div>
    );
  }

  if (activeTab === 'contact' || activeTab === 'mail') {
    return (
      <><div className="p-5 sm:p-7 clean-paper w-full h-full overflow-y-auto rounded-r-2xl">
        <ContactSection />
      </div><div className="absolute top-0 bottom-0 left-0 -translate-x-1/2 z-50 pointer-events-none">
          <SpiralBinderSpine />
        </div></>
    );
  }

  if (activeTab === 'assistant') {
    return (
      <><AssistantRightPage
        messages={assistantMessages}
        isProcessing={isAssistantProcessing}
        onClearChat={onClearAssistantChat} /><div className="absolute top-0 bottom-0 left-0 -translate-x-1/2 z-50 pointer-events-none">
          <SpiralBinderSpine />
        </div></>
    );
  }

  if (activeTab === 'agent-sandbox') {
    return (
      <div className="p-5 sm:p-7 clean-paper w-full h-full overflow-y-auto rounded-r-2xl">
        <AgentSandbox />
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-7 clean-paper w-full h-full overflow-y-auto rounded-r-2xl">
      <OverviewSection onNavigate={setActiveTab} onSelectProject={onSelectProject} />
    </div>
  );
};
