import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Download, Github, Linkedin, Compass, Sparkles } from 'lucide-react';
import { BookOpen, FolderGit2, Cpu, Bot, Mail, Sun, Moon } from 'lucide-react';

interface JournalSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewEntry?: () => void;
  onCloseJournal?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

// Leather Bookmark Tab Navigation Component
const LeatherBookmarkTab: React.FC<{
  item: { id: string; code: string; label: string; fullLabel: string; icon: React.FC<{ className?: string }>; preview: string };
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full">
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{
          x: isActive ? -18 : isHovered ? -10 : 0,
          scale: isActive ? 1.04 : isHovered ? 1.02 : 1,
          rotate: isActive ? -2 : isHovered ? -1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`w-full py-2.5 px-3 rounded-l-xl rounded-r-none flex items-center justify-start space-x-2 relative cursor-pointer select-none transition-colors duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-[#8C2121] via-[#731B1B] to-[#591414] text-[#FBF7EE] border-t-2 border-b-2 border-l-2 border-[#D4AF37] shadow-[-6px_4px_14px_rgba(0,0,0,0.5)] z-20'
            : 'bg-gradient-to-r from-[#4A1414]/90 to-[#380E0E]/90 text-[#FBF7EE]/80 border-l-2 border-y border-[#BCAE8E]/30 hover:text-white shadow-[-3px_2px_8px_rgba(0,0,0,0.3)] z-10'
        }`}
      >
        {/* Stitched Leather Edge Detail */}
        <div className="absolute top-1 bottom-1 left-1 border-r border-dashed border-[#BCAE8E]/40 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 flex items-center space-x-2 w-full">
          <motion.div
            animate={{ rotate: isActive ? [0, -8, 0] : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-[#FBF7EE]/80'}`} />
          </motion.div>
          <span className="font-journal text-xs md:text-sm font-bold tracking-wide truncate">
            {isActive && <span className="text-[#D4AF37] mr-1 font-mono">★</span>}
            {item.label}
          </span>
        </div>

        {/* Extended Leather Tail Flap Overlapping onto Book Spine */}
        {isActive && (
          <div className="absolute -right-2 top-0 bottom-0 w-3 bg-[#8C2121] rounded-r-sm z-30 shadow-[2px_0_6px_rgba(0,0,0,0.3)]" />
        )}
      </motion.button>

      {/* Mini Paper Preview Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && !isActive && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-4 w-44 p-2.5 rounded-lg bg-[#FAFAFA] text-[#20242B] border border-[#DCCFAF] shadow-2xl z-50 pointer-events-none"
          >
            <div className="flex items-center space-x-1 mb-1 text-[9px] font-typewriter font-bold text-[#9C3B3B] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>{item.code} {item.fullLabel}</span>
            </div>
            <p className="font-journal text-[11px] leading-tight text-[#4B5566]">
              {item.preview}
            </p>
            {/* Paper Corner Fold Detail */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-[#EFE6D2] border-b border-l border-[#DCCFAF] rounded-bl-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const JournalSidebar: React.FC<JournalSidebarProps> = ({
  activeTab,
  setActiveTab,
  onCloseJournal,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const navItems = [
    { id: 'overview', code: '01.', label: 'About', fullLabel: 'About Me', icon: BookOpen, preview: 'Personal Dossier, Bio & Core Metrics' },
    { id: 'projects', code: '02.', label: 'Projects', fullLabel: 'Selected Works', icon: FolderGit2, preview: 'Classified Files & 9 AI Systems' },
    { id: 'skills', code: '03.', label: 'Skills', fullLabel: 'Matrix & Timeline', icon: Cpu, preview: 'Technical Skills & Career Expedition' },
    { id: 'assistant', code: '04.', label: 'AI Twin', fullLabel: 'AI Twin Agent', icon: Bot, preview: 'Interactive RAG Agent Sandbox' },
    { id: 'contact', code: '05.', label: 'Contact', fullLabel: 'Sealed Dispatch', icon: Mail, preview: 'Send a Message & Hire' }
  ];

  // Calculate compass rotation based on active tab index
  const activeIdx = navItems.findIndex(i => i.id === activeTab);
  const compassDegree = (activeIdx >= 0 ? activeIdx : 0) * 72;
  const activeItem = navItems[activeIdx >= 0 ? activeIdx : 0];

  return (
    <>
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="hidden md:flex w-24 lg:w-28 md:-translate-x-10 bg-gradient-to-b from-[#5c1c1c] via-[#6e2020] to-[#4a1414] text-[#FBF7EE] flex-col justify-between items-center py-5 px-0 md:border-r border-[#3a0d0d] rounded-l-2xl shadow-2xl relative z-20 select-none overflow-visible"
      >
        {/* Top Section: Red Wax Seal Stamp with "P", Animated Compass & Theme Toggle */}
        <div className="flex flex-col items-center space-y-2 mb-2">
          <motion.button
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            onClick={(e) => {
              e.stopPropagation();
              onCloseJournal?.();
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#802222] via-[#661818] to-[#3d0b0b] border-2 border-[#b88f51]/70 flex items-center justify-center text-[#f7e8c8] font-handwriting text-2xl font-bold shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_4px_8px_rgba(0,0,0,0.5)] transform -rotate-6 cursor-pointer hover:scale-110 hover:rotate-0 transition-all duration-300 relative group"
            title="Close Journal (Return to Cover)"
          >
            <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">P</span>
          </motion.button>

          {/* Animated Rotating Expedition Compass */}
          <motion.div
            animate={{ rotate: compassDegree }}
            transition={{ type: 'spring', stiffness: 180, damping: 15 }}
            className="p-1 text-[#D4AF37] hover:scale-110 transition-transform cursor-pointer"
            title="Expedition Journal Compass"
          >
            <Compass className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
          </motion.div>

          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ rotate: 18, scale: 1.15 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleTheme?.();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#f7e8c8]/80 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#f7e8c8]" />}
          </motion.button>
        </div>

        {/* Navigation Tabs Stack with Leather Bookmark Tabs */}
        <nav className="flex flex-col items-stretch space-y-2 px-1 my-2 no-scrollbar w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id || (activeTab === 'overview' && item.id === 'overview');

            return (
              <LeatherBookmarkTab
                key={item.id}
                item={item}
                isActive={isActive}
                onClick={() => setActiveTab(item.id)}
              />
            );
          })}
        </nav>

        {/* Bottom Footer Section: Resume Button & Social Links */}
        <div className="flex flex-col items-center space-y-3 pt-3 w-full px-2">
          {/* Resume Button */}
          <motion.a
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-2 rounded-md bg-[#3d0f0f] hover:bg-[#2e0a0a] border border-[#b88f51]/50 text-[#f7e8c8] font-journal text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-md transition-all group"
          >
            <Download className="w-3.5 h-3.5 text-[#b88f51] group-hover:translate-y-0.5 transition-transform" />
            <span>Resume</span>
          </motion.a>

          {/* Social Icons Row */}
          <div className="flex items-center justify-center space-x-2.5 text-[#f7e8c8]/80 text-xs">
            <motion.a
              whileHover={{ scale: 1.25, rotate: 6 }}
              href="https://github.com/prodipsen27"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFFFF] transition-colors p-1"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.25, rotate: -6 }}
              href="https://linkedin.com/in/prodipsen27"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFFFF] transition-colors p-1"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.25, rotate: 6 }}
              href="mailto:prodipsengupta27@gmail.com"
              className="hover:text-[#FFFFFF] transition-colors p-1"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

      
      </motion.aside>

      <motion.aside
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="md:hidden fixed top-0 left-0 right-0 z-40 text-[#FBF7EE] select-none"
      >
        <div className="bg-gradient-to-r from-[#4a1414] via-[#6e2020] to-[#4a1414] border-b border-[#b88f51]/30 rounded-t-none md:rounded-t-2xl shadow-[0_10px_28px_rgba(30,10,10,0.42)] px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseJournal?.();
              }}
              className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-[#802222] via-[#661818] to-[#3d0b0b] border border-[#d1a868]/80 flex items-center justify-center text-[#f7e8c8] font-handwriting text-xl font-bold shadow-[inset_0_2px_4px_rgba(255,255,255,0.18),0_4px_10px_rgba(0,0,0,0.35)] -rotate-6"
              title="Close Journal"
              aria-label="Close journal"
            >
              P
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-typewriter text-[10px] text-[#d4af37]">{activeItem.code}</span>
                <h1 className="font-journal text-base font-bold tracking-wide truncate">
                  {activeItem.fullLabel}
                </h1>
              </div>
              <p className="font-typewriter text-[10px] leading-tight text-[#f7e8c8]/72 truncate">
                {activeItem.preview}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3d0f0f]/75 border border-[#b88f51]/40 flex items-center justify-center text-[#f7e8c8] active:scale-95 transition-transform"
                title="Resume"
                aria-label="Open resume"
              >
                <Download className="w-4 h-4 text-[#d4af37]" />
              </a>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTheme?.();
                }}
                className="w-10 h-10 rounded-full bg-[#3d0f0f]/75 border border-[#b88f51]/40 flex items-center justify-center text-[#f7e8c8] active:scale-95 transition-transform"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      <nav
        className="md:hidden fixed left-3 right-3 bottom-3 z-50 rounded-2xl border border-[#b88f51]/45 bg-[#421111]/95 text-[#FBF7EE] shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-md px-2 py-2"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
        aria-label="Portfolio sections"
      >
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (activeTab === 'overview' && item.id === 'overview');

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative min-w-0 h-14 rounded-xl px-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#20242B]'
                    : 'text-[#f7e8c8]/78 active:bg-white/10'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.fullLabel}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobileActiveDock"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#8C2121] via-[#731B1B] to-[#591414] border-2 border-[#D4AF37] shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  />
                )}
                <Icon className={`relative z-10 w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-[#f7e8c8]/90'}`} />
                <span className={`relative z-10 w-full truncate text-center font-typewriter text-[10px] font-bold leading-none ${isActive ? 'text-[#D4AF37]' : 'text-[#f7e8c8]/90'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

