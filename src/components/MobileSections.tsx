import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github, ExternalLink, MapPin, Mail, Linkedin,
  Copy, Check, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Cpu, Server, Layout, Code2,
  Bookmark, Send, Sparkles, Filter, CheckCircle2
} from 'lucide-react';
import { PROFILE_DATA, FEATURED_PROJECTS, SKILL_CATEGORIES, CAREER_TIMELINE } from '../data/portfolioData';
import { ProjectItem } from '../types';

// ─── Shared Section Header ───────────────────────────────────────────
const TIMELINE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Code2, Layout, Server, Cpu,
};

function SectionHeader({ title, sub, isDark }: { title: string; sub: string; isDark?: boolean }) {
  return (
    <div className="mb-4">
      <span className="font-typewriter text-[10px] font-bold uppercase tracking-widest text-[#9C3B3B]">{sub}</span>
      <h2 className={`font-handwriting text-3xl font-bold mt-0.5 ${isDark ? 'text-[#E6DFCF]' : 'text-[#20242B]'}`}>{title}</h2>
    </div>
  );
}

interface SectionProps { isDarkMode?: boolean; }

// ══════════════════════════════════════════════════════════════
// 1. ABOUT SECTION
// ══════════════════════════════════════════════════════════════
export const MobileAboutSection: React.FC<SectionProps> = ({ isDarkMode = false }) => {
  const dk = isDarkMode;
  const card  = dk ? 'bg-[#1D222C] border-[#3f4756]' : 'bg-[#FBF7EE] border-[#DCCFAF]';
  const stat  = dk ? 'bg-[#232936] border-[#3f4756] text-[#E8DDCA]' : 'bg-[#EFE6D2] border-[#BCAE8E] text-[#20242B]';
  const muted = dk ? 'text-[#B8AA98]' : 'text-[#8C8577]';
  const link  = dk ? 'bg-[#1D222C] border-[#3f4756] text-[#E6DFCF] hover:border-[#9C3B3B]' : 'bg-[#FBF7EE] border-[#DCCFAF] text-[#20242B] hover:border-[#9C3B3B]';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <SectionHeader title="About Me" sub="Field Log · Personal Dossier" isDark={dk} />

      {/* 1. COMPACT HERO POLAROID (Only Photo + Name + Role + Status) */}
      <div className="flex justify-center py-1">
        <div className="w-full max-w-[320px]">
          <div className={`polaroid-card p-2.5 pb-3.5 rounded-xl border shadow-lg relative rotate-[-1deg] group ${
            dk ? 'bg-[#1D222C] border-[#3f4756]' : 'bg-[#FAFAFA] border-[#E2D9C5]'
          }`}>
            {/* Top Masking Tape */}
            <div className={`wasi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 border-t border-b shadow-2xs rotate-[1deg] z-10 ${
              dk ? 'bg-[#3f4756]/80 border-[#5A606E]' : 'bg-[#E8DEC8]/80 border-[#D4C8B0]'
            }`} />

            {/* Paperclip at Top Right */}
            <div className="absolute -top-2 right-5 z-20 pointer-events-none opacity-90">
              <svg width="22" height="38" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8V30C16 33.3137 13.3137 36 10 36C6.68629 36 4 33.3137 4 30V10C4 7.79086 5.79086 6 8 6C10.2091 6 12 7.79086 12 10V28C12 29.1046 11.1046 30 10 30C8.89543 30 8 29.1046 8 28V12" stroke={dk ? '#A69F90' : '#5A606E'} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Photo */}
            <div className={`aspect-[4/5] rounded-lg overflow-hidden relative border ${
              dk ? 'bg-[#161A23] border-[#3f4756]' : 'bg-[#EFE6D2] border-[#DCCFAF]'
            }`}>
              <img
                src="/me.png"
                alt="Prodip Sengupta"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.04]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Photo Caption Area (Name & Role Only) */}
            <div className="mt-2.5 text-center space-y-1">
              <h3 className={`font-handwriting text-2xl font-bold leading-none ${dk ? 'text-[#F3E8D5]' : 'text-[#20242B]'}`}>
                Prodip Sengupta
              </h3>
              <p className={`font-typewriter text-[10px] font-bold uppercase tracking-widest ${dk ? 'text-[#F07F75]' : 'text-[#9C3B3B]'}`}>
                {PROFILE_DATA.role}
              </p>
              <div className="flex items-center justify-center gap-1.5 pt-1 font-typewriter text-[10px]">
                <MapPin className="w-3 h-3 text-[#9C3B3B]" />
                <span className={dk ? 'text-[#E8DDCA]' : 'text-[#8C8577]'}>{PROFILE_DATA.location}</span>
                <span className="mx-0.5 text-[#8C8577]">·</span>
                <span className="w-2 h-2 rounded-full bg-[#059669] inline-block animate-pulse" />
                <span className="text-[#059669] font-bold">Open to work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FIELD STATS ROW */}
  <div className="grid grid-cols-3 gap-3 pt-2">
  {[
    {
      href: PROFILE_DATA.github,
      icon: Github,
      accent: "#9C3B3B",
      external: true,
    },
    {
      href: PROFILE_DATA.linkedin,
      icon: Linkedin,
      accent: "#0A66C2",
      external: true,
    },
    {
      href: `mailto:${PROFILE_DATA.email}`,
      icon: Mail,
      accent: "#D97706",
      external: false,
    },
  ].map(({ href, icon: Icon, accent, external }, i) => (
    <a
      key={i}
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`
        group relative aspect-square overflow-hidden
        rounded-2xl border
        ${link}
        flex items-center justify-center
        transition-all duration-300
        active:scale-95
        hover:-rotate-2
        hover:-translate-y-1
      `}
      style={{
        boxShadow: `
          0 2px 6px rgba(0,0,0,.15),
          0 0 0 1px ${accent}22,
          0 0 16px ${accent}25
        `,
      }}
    >
      {/* Sticker shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />

      {/* Circular glow */}
      <div
        className="absolute w-10 h-10 rounded-full blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: accent }}
      />

      {/* Pin */}
      <span
        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
        style={{ background: accent }}
      />

      {/* Icon */}
      <Icon
        className="relative z-10 w-5 h-5 transition-all duration-300 group-hover:scale-110"
        style={{ color: accent }}
      />

      {/* Tape corners */}
      <div className="absolute -top-1 left-2 w-6 h-2 rotate-[-18deg] bg-[#F3E6C9]/60 rounded-sm" />
      <div className="absolute -bottom-1 right-2 w-6 h-2 rotate-[18deg] bg-[#F3E6C9]/60 rounded-sm" />
    </a>
  ))}
</div>
      {/* 3. DEDICATED QUOTE CARD */}
      <div className={`rounded-2xl border p-4 shadow-sm relative border-l-4 border-l-[#9C3B3B] ${card}`}>
        <span className={`font-serif text-3xl font-bold absolute -top-1 left-2 opacity-30 ${dk ? 'text-[#E8C8A0]' : 'text-[#9C3B3B]'}`}>“</span>
        <blockquote className={`font-handwriting text-lg sm:text-xl font-bold leading-snug pl-4 pr-2 pt-1 ${dk ? 'text-[#E8C8A0]' : 'text-[#9C3B3B]'}`}>
          {PROFILE_DATA.quote}
        </blockquote>
        <span className={`font-serif text-3xl font-bold absolute bottom-0 right-3 opacity-30 ${dk ? 'text-[#E8C8A0]' : 'text-[#9C3B3B]'}`}>”</span>
      </div>

      {/* 4. BIO CARD (LEFT-ALIGNED NARRATIVE BIO) */}
      <div className={`rounded-2xl border p-5 shadow-md space-y-3 ${card}`}>
        <div className="flex items-center gap-2 border-b border-dashed border-[#8C8577]/30 pb-2">
          <span className="font-typewriter text-[10px] font-bold uppercase tracking-widest text-[#9C3B3B]">
            FIELD LOG ENTRY · NARRATIVE BIO
          </span>
        </div>
        <p className={`font-handwriting text-base sm:text-lg font-semibold leading-relaxed ${dk ? 'text-[#FBF7EE]' : 'text-[#20242B]'}`}>
          I'm an AI-native full-stack developer focused on building production-ready applications, not demos. I specialize in <strong className={dk ? 'text-[#F07F75]' : 'text-[#9C3B3B]'}>MERN, Next.js, PostgreSQL</strong>, and <strong className={dk ? 'text-[#F07F75]' : 'text-[#9C3B3B]'}>Supabase</strong>, combined with Generative AI technologies including <strong className={dk ? 'text-[#F07F75]' : 'text-[#9C3B3B]'}>LLM agents, RAG, LangChain, LangGraph, MCP, vector search</strong>, and <strong className={dk ? 'text-[#F07F75]' : 'text-[#9C3B3B]'}>function calling</strong>. I've built AI-powered systems such as financial RAG assistants, Text-to-SQL platforms, conversational commerce agents, and agentic workflows, with a strong emphasis on scalable architecture, clean backend engineering, and real-world deployment.
        </p>
      </div>

      {/* 5. TECH STACK CHIPS */}
      <div className={`rounded-2xl border p-5 shadow-md ${card}`}>
        <div className="flex items-center space-x-2 mb-3">
          <div className={`inline-flex items-center space-x-1.5 px-2 py-0.5 font-handwriting text-2xl font-bold opacity-90 border-b-[3px] border-dashed border-[#8C8577]/40 ${dk ? 'text-[#FBF7EE]' : 'text-[#20242B]'}`}>
            <span className="text-[#E56B6B] text-xl">✨</span>
            <span>Core Stack</span>
          </div>
          <div className="flex-1 border-t border-dashed border-[#8C8577]/40 max-w-[120px]" />
        </div>

        {/* Tech Chips Grid */}
        <div className="flex flex-wrap gap-2.5 font-journal text-[13px] pt-1 pb-1">
          {[
            { name: 'Node.js', color: '#41873F' },
            { name: 'React', color: '#00D8FF' },
            { name: 'Next.js', color: dk ? '#FFFFFF' : '#000000' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'OpenAI', color: '#10A37F' },
            { name: 'Gemini', color: '#8E75B2' },
            { name: 'LangChain', color: dk ? '#A3B8B8' : '#1C3C3C' },
            { name: 'PostgreSQL', color: '#336791' },
            { name: 'Supabase', color: '#3ECF8E' },
            { name: 'Docker', color: '#2496ED' },
          ].map((chipItem, i) => (
            <span key={chipItem.name} className={`px-2.5 py-1 border-2 shadow-[1px_2px_4px_rgba(0,0,0,0.15)] flex items-center space-x-1.5 font-bold text-xs transform hover:scale-105 transition-transform rounded ${
              i % 2 === 0 ? '-rotate-1' : 'rotate-1'
            } ${
              dk ? 'bg-[#232936] border-[#3f4756] text-[#FBF7EE]' : 'bg-[#FAFAFA] border-white text-[#20242B]'
            }`}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chipItem.color }} />
              <span>{chipItem.name}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════
// 2. PROJECTS SECTION (Matching Desktop Features & Filter)
// ══════════════════════════════════════════════════════════════
interface MobileProjectsSectionProps extends SectionProps {
  onSelectProject: (p: ProjectItem) => void;
}

export const MobileProjectsSection: React.FC<MobileProjectsSectionProps> = ({ isDarkMode = false, onSelectProject }) => {
  const dk = isDarkMode;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [idx, setIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const startX = useRef(0);

  const categories = ['All', 'AI & Agents', 'Full Stack', 'Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || (selectedCategory === 'AI & Agents' && (p.category.includes('AI') || p.category.includes('Agent'))));

  const projects = filteredProjects.length > 0 ? filteredProjects : FEATURED_PROJECTS;

  const currentIdx = Math.min(idx, projects.length - 1);
  const p = projects[currentIdx] || FEATURED_PROJECTS[0];

  const prev = () => {
    setIdx(i => (i - 1 + projects.length) % projects.length);
    setIsExpanded(false);
  };
  const next = () => {
    setIdx(i => (i + 1) % projects.length);
    setIsExpanded(false);
  };
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  // Dark mode colors matching desktop (JournalRightPage) - much darker
  const card = dk ? 'bg-[#1C1F26] border-[#383D48]' : 'bg-[#FBF7EE] border-[#DCCFAF]';
  const chip = dk ? 'bg-[#232936] border-[#3f4756] text-[#E8DDCA]' : 'bg-[#EFE6D2] border-[#BCAE8E] text-[#4B5566]';
  const nav  = dk ? 'bg-[#1D222C] border-[#3f4756] text-[#E6DFCF]' : 'bg-[#FBF7EE] border-[#DCCFAF] text-[#20242B]';
  const panelCls = dk ? 'bg-[#1D222C] border-[#3f4756]' : 'bg-[#FAFAFA] border-[#E2D9C5]';
  const metricCls = dk ? 'bg-[#162820] border-[#55cbb0]/40 text-[#BFEBDC]' : 'bg-[#EAF2ED] border-[#3B6B58]/40 text-[#2C5243]';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-end justify-between">
        <SectionHeader title="Projects" sub={`Portfolio · ${projects.length} Works`} isDark={dk} />
        <span className={`font-typewriter text-[10px] mb-4 ${dk ? 'text-[#6a7685]' : 'text-[#8C8577]'}`}>{currentIdx + 1}/{projects.length}</span>
      </div>

      {/* CATEGORY FILTER PILLS (Matching Desktop Filter) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setIdx(0);
              setIsExpanded(false);
            }}
            className={`px-3 py-1 rounded-full font-typewriter text-[10px] font-bold border transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#9C3B3B] text-white border-[#9C3B3B] shadow-sm'
                : dk
                ? 'bg-[#1D222C] text-[#E8DDCA] border-[#3f4756] hover:border-[#9C3B3B]'
                : 'bg-[#FBF7EE] text-[#4B5566] border-[#DCCFAF] hover:border-[#9C3B3B]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DOT INDICATORS */}
      <div className="flex gap-1.5 justify-center py-1">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIdx(i);
              setIsExpanded(false);
            }}
            className={`h-1.5 rounded-full transition-all ${i === currentIdx ? 'bg-[#9C3B3B] w-5' : `w-1.5 ${dk ? 'bg-[#3f4756]' : 'bg-[#DCCFAF]'}`}`}
          />
        ))}
      </div>

      {/* PROJECT DOSSIER CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onTouchStart={onTouchStart} 
          onTouchEnd={onTouchEnd}
          className={`rounded-2xl border p-4 sm:p-5 shadow-md space-y-4 ${card}`}
        >
          {/* ================= PREMIUM PROJECT DOSSIER HEADER ================= */}
          <div className="space-y-3">
            {/* Top Header Row */}
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-typewriter uppercase tracking-[0.2em] text-[10px] text-[#9C3B3B] font-bold">
                    Project Dossier
                  </span>
                </div>
                <p className={`mt-1 font-typewriter text-[10px] uppercase tracking-widest ${dk ? 'text-[#A69F90]' : 'text-[#8C8577]'}`}>
                  {p.category} • {p.date}
                </p>
              </div>

              <div className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 px-3 py-1">
                <span className="flex items-center gap-1.5 text-[10px] font-typewriter font-bold text-emerald-700 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE DEPLOYED
                </span>
              </div>
            </div>

            {/* Hero Preview Card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#D9D1BF] dark:border-[#383D48] bg-white dark:bg-[#1C1F26] shadow-lg group">
              <div className="aspect-[16/9] w-full overflow-hidden relative">
                <img
                  src={p.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"; }}
                />

                {/* Bottom Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 sm:p-4">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="text-white/80 text-[9px] font-typewriter uppercase tracking-widest">
                        {p.caption || "PROJECT PREVIEW"}
                      </p>
                      <h3 className="mt-0.5 text-base sm:text-xl text-white font-bold leading-tight">
                        {p.title}
                      </h3>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="backdrop-blur-lg bg-white/20 hover:bg-white/35 border border-white/30 rounded-lg p-2 text-white transition-colors"
                          title="View Source on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {p.demoUrl && (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="backdrop-blur-lg bg-emerald-500/90 hover:bg-emerald-500 rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-500/30"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sweep Shine */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 pointer-events-none z-15"
                />
              </div>
            </div>
          </div>

          {/* PROJECT TITLE & TAGLINE */}
          <div className="space-y-1">
            <h2 className={`font-journal italic text-2xl font-bold leading-tight ${dk ? 'text-[#E6DFCF]' : 'text-[#20242B]'}`}>
              {p.title}
            </h2>
            <p className="font-handwriting text-base text-[#9C3B3B] font-bold leading-snug">
              "{p.tagline}"
            </p>
          </div>

          {/* COLLAPSIBLE TOGGLE BUTTON */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full py-2.5 px-3 rounded-xl border font-typewriter text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-2xs ${
              isExpanded
                ? 'bg-[#9C3B3B] text-white border-[#9C3B3B]'
                : dk
                ? 'bg-[#232936] text-[#E6DFCF] border-[#3f4756] hover:border-[#9C3B3B]'
                : 'bg-[#EFE6D2] text-[#20242B] border-[#BCAE8E] hover:border-[#9C3B3B]'
            }`}
          >
            <span>{isExpanded ? 'Collapse Dossier Details' : 'Expand Dossier Details'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* EXPANDABLE DOSSIER DETAILS SECTION */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-4 pt-2 overflow-hidden"
              >
                {/* DESCRIPTION */}
                <p className={`font-journal text-xs sm:text-sm leading-relaxed ${dk ? 'text-[#D3C5B5]' : 'text-[#4B5566]'}`}>
                  {p.description}
                </p>

                {/* TECH STACK CHIPS */}
                <div className="space-y-1.5">
                  <span className={`font-typewriter text-[9px] uppercase font-bold tracking-wider block ${dk ? 'text-[#E8DDCA]' : 'text-[#8C8577]'}`}>
                    INSTRUMENTATION & FRAMEWORKS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((techItem) => (
                      <span
                        key={techItem}
                        className={`font-typewriter text-[10px] px-2 py-0.5 rounded font-bold ${chip}`}
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ARCHITECTURE HIGHLIGHTS */}
                {p.architectureDetails && p.architectureDetails.length > 0 && (
                  <div className={`p-3 rounded-xl border space-y-2 ${panelCls}`}>
                    <span className={`font-typewriter text-[9px] ${dk ? 'text-[#F07F75]' : 'text-[#9C3B3B]'} uppercase font-bold tracking-wider block`}>
                      ARCHITECTURAL BLUEPRINT HIGHLIGHTS:
                    </span>
                    <ul className="space-y-1.5">
                      {p.architectureDetails.map((detail, idx) => (
                        <li key={idx} className={`flex items-start space-x-2 font-journal text-xs ${dk ? 'text-[#D3C5B5]' : 'text-[#4B5566]'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3B6B58] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* METRICS STAMP */}
                {p.metrics && (
                  <div className={`p-2.5 rounded-xl border text-xs flex items-center space-x-2 ${metricCls}`}>
                    <Sparkles className="w-4 h-4 text-[#3B6B58] shrink-0" />
                    <span className="font-typewriter font-bold text-[11px]">METRICS RECORDED: {p.metrics}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* PREV / NEXT NAVIGATION CONTROLS */}
      <div className="flex gap-3 pt-1">
        <button onClick={prev} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-typewriter text-[11px] font-bold transition-all active:scale-95 ${nav}`}>
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <button onClick={next} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-typewriter text-[11px] font-bold transition-all active:scale-95 ${nav}`}>
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════
// 3. SKILLS SECTION (Matching Desktop SkillTree & Progress Bars)
// ══════════════════════════════════════════════════════════════
export const MobileSkillsSection: React.FC<SectionProps> = ({ isDarkMode = false }) => {
  const dk   = isDarkMode;
  const card = dk ? 'bg-[#1D222C] border-[#3f4756]' : 'bg-[#FBF7EE] border-[#DCCFAF]';
  const muted = dk ? 'text-[#B8AA98]' : 'text-[#8C8577]';
  const chip = dk ? 'bg-[#232936] border-[#3f4756] text-[#E8DDCA]' : 'bg-[#EFE6D2] border-[#BCAE8E] text-[#4B5566]';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <SectionHeader title="Skills & Timeline" sub="Technical Matrix · Experience" isDark={dk} />

      {/* SKILL CATEGORIES & PROGRESS BARS */}
      {SKILL_CATEGORIES.map((cat) => (
        <div key={cat.title} className={`rounded-2xl border p-4 shadow-sm space-y-4 ${card}`}>
          <p className={`font-typewriter text-[9px] font-bold uppercase tracking-widest ${muted}`}>{cat.title}</p>
          {cat.skills.map((sk) => (
            <div key={sk.name}>
              <div className="flex justify-between items-end mb-1">
                <div className="flex-1 mr-2">
                  <span className={`font-journal text-xs font-semibold ${dk ? 'text-[#E6DFCF]' : 'text-[#20242B]'}`}>{sk.name}</span>
                  <p className={`font-typewriter text-[9px] mt-0.5 leading-tight ${muted}`}>{sk.description}</p>
                </div>
                <span className="font-typewriter text-[10px] font-bold text-[#9C3B3B] shrink-0">{sk.percentage}%</span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${dk ? 'bg-[#2d3240]' : 'bg-[#EFE6D2]'}`}>
                <motion.div
                  initial={{ width: 0 }} 
                  animate={{ width: `${sk.percentage}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#9C3B3B] via-[#B8906E] to-[#5C7C74]"
                />
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* CAREER TIMELINE */}
      <div className={`rounded-2xl border p-4 shadow-sm ${card}`}>
        <p className={`font-typewriter text-[9px] font-bold uppercase tracking-widest mb-4 ${muted}`}>Career Timeline</p>
        <div className="relative pl-7">
          <div className={`absolute left-3 top-0 bottom-0 w-px ${dk ? 'bg-[#3f4756]' : 'bg-[#DCCFAF]'}`} />
          {CAREER_TIMELINE.map((entry) => {
            const Icon = TIMELINE_ICONS[entry.iconName] || Cpu;
            return (
              <div key={entry.year} className="relative mb-5 last:mb-0">
                <div className={`absolute -left-7 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${dk ? 'bg-[#1D222C] border-[#9C3B3B]' : 'bg-[#FBF7EE] border-[#9C3B3B]'}`}>
                  <Icon className="w-3 h-3 text-[#9C3B3B]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-typewriter text-[9px] font-bold text-[#9C3B3B]">{entry.year}</span>
                    <span className={`font-journal text-sm font-bold ${dk ? 'text-[#E6DFCF]' : 'text-[#20242B]'}`}>{entry.title}</span>
                  </div>
                  <p className={`font-typewriter text-[9px] uppercase tracking-wider mb-1 ${muted}`}>{entry.subtitle}</p>
                  <p className={`font-journal text-xs leading-relaxed mb-2 ${dk ? 'text-[#B8B0A0]' : 'text-[#4B5566]'}`}>{entry.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.highlights.map(h => (
                      <span key={h} className={`px-2 py-0.5 rounded-full border font-typewriter text-[9px] font-bold ${chip}`}>{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════
// 4. CONTACT SECTION (Matching Desktop Dispatch & Form)
// ══════════════════════════════════════════════════════════════
export const MobileContactSection: React.FC<SectionProps> = ({ isDarkMode = false }) => {
  const dk = isDarkMode;
  const card  = dk ? 'bg-[#1D222C] border-[#3f4756]' : 'bg-[#FBF7EE] border-[#DCCFAF]';
  const inputCls = dk
    ? 'bg-[#232936] border-[#3f4756] text-[#E8DDCA] placeholder-[#4a5568] focus:border-[#9C3B3B]'
    : 'bg-white border-[#BCAE8E] text-[#20242B] placeholder-[#8C8577]/70 focus:border-[#9C3B3B]';
  const muted = dk ? 'text-[#B8AA98]' : 'text-[#8C8577]';
  const lnk   = dk ? 'bg-[#232936] border-[#3f4756] text-[#E6DFCF] hover:border-[#9C3B3B]' : 'bg-[#EFE6D2] border-[#BCAE8E] text-[#20242B] hover:border-[#9C3B3B]';

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [emailCopied, setEmailCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PROFILE_DATA.email}?subject=Portfolio Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`;
    window.open(mailto, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <SectionHeader title="Contact" sub="Get in Touch · Sealed Dispatch" isDark={dk} />

      {/* ENVELOPE CARD */}
      <div className={`rounded-2xl border p-5 shadow-sm space-y-4 ${card}`}>
        {/* Envelope Art */}
        <div className={`relative rounded-xl overflow-hidden h-28 flex items-center justify-center ${dk ? 'bg-[#232936]' : 'bg-[#EFE6D2]'}`}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${dk ? '#3f4756' : '#DCCFAF'} 50%, transparent 50%)` }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(225deg, ${dk ? '#3f4756' : '#DCCFAF'} 50%, transparent 50%)` }} />
          <div className="relative z-10 text-center">
            <div className="text-4xl">✉️</div>
            <p className={`font-typewriter text-[10px] font-bold uppercase tracking-widest mt-1 ${muted}`}>Official Dispatch</p>
          </div>
        </div>

        {/* Email Copy Row */}
        <div className="flex items-center gap-2">
          <div className={`flex-1 px-3 py-2.5 rounded-xl border font-typewriter text-xs truncate ${dk ? 'bg-[#232936] border-[#3f4756] text-[#E8DDCA]' : 'bg-white border-[#BCAE8E] text-[#20242B]'}`}>
            {PROFILE_DATA.email}
          </div>
          <button 
            onClick={copyEmail} 
            className="px-3.5 py-2.5 rounded-xl bg-[#9C3B3B] hover:bg-[#b84343] text-white font-typewriter text-[10px] font-bold flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
          >
            {emailCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {emailCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Social Profile Links */}
        <div className="grid grid-cols-2 gap-2">
          <a 
            href={PROFILE_DATA.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-2 p-3 rounded-xl border font-typewriter text-[10px] font-bold transition-all active:scale-95 ${lnk}`}
          >
            <Github className="w-4 h-4 shrink-0" />
            <span className="truncate">GitHub Profile</span>
          </a>
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 p-3 rounded-xl border font-typewriter text-[10px] font-bold transition-all active:scale-95 ${dk ? 'bg-[#232936] border-[#3f4756] text-[#E6DFCF] hover:border-[#0A66C2]' : 'bg-[#EFE6D2] border-[#BCAE8E] text-[#20242B] hover:border-[#0A66C2]'}`}
          >
            <Linkedin className="w-4 h-4 text-[#0A66C2] shrink-0" />
            <span className="truncate">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className={`rounded-2xl border p-5 shadow-sm ${card}`}>
        <p className={`font-typewriter text-[9px] font-bold uppercase tracking-widest mb-4 ${muted}`}>Send a Message</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`font-typewriter text-[9px] uppercase tracking-wider block mb-1 ${muted}`}>Name</label>
              <input 
                type="text" 
                required 
                value={form.name} 
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                className={`w-full px-3 py-2.5 rounded-xl border font-journal text-sm focus:outline-none focus:ring-2 focus:ring-[#9C3B3B]/20 transition-colors ${inputCls}`} 
              />
            </div>
            <div>
              <label className={`font-typewriter text-[9px] uppercase tracking-wider block mb-1 ${muted}`}>Email</label>
              <input 
                type="email" 
                required 
                value={form.email} 
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@email.com"
                className={`w-full px-3 py-2.5 rounded-xl border font-journal text-sm focus:outline-none focus:ring-2 focus:ring-[#9C3B3B]/20 transition-colors ${inputCls}`} 
              />
            </div>
          </div>
          <div>
            <label className={`font-typewriter text-[9px] uppercase tracking-wider block mb-1 ${muted}`}>Message</label>
            <textarea 
              required 
              rows={4} 
              value={form.message} 
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Tell me about your project or opportunity..."
              className={`w-full px-3 py-2.5 rounded-xl border font-journal text-sm focus:outline-none focus:ring-2 focus:ring-[#9C3B3B]/20 transition-colors resize-none ${inputCls}`} 
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-[#9C3B3B] hover:bg-[#b84343] text-white font-typewriter text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
          >
            {sent ? <><Check className="w-4 h-4" /> Email App Opened!</> : <><Send className="w-4 h-4" /> Send via Email</>}
          </button>
        </form>
      </div>

      {/* AVAILABILITY BADGE */}
      <div className={`rounded-2xl border p-4 flex items-center gap-3 shadow-sm ${card}`}>
        <div className="w-10 h-10 rounded-full wax-seal flex items-center justify-center text-[#FBF7EE] font-handwriting font-bold text-base shrink-0">PS</div>
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            <span className="font-typewriter text-[9px] font-bold uppercase text-[#059669]">Available Now</span>
          </div>
          <p className={`font-journal text-xs ${dk ? 'text-[#B8B0A0]' : 'text-[#4B5566]'}`}>
            Open to full-time roles, contracts &amp; collaborations
          </p>
        </div>
      </div>
    </motion.div>
  );
};
