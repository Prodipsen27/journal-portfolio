import React from 'react';
import { motion } from 'motion/react';
import { Book, Bookmark, Sparkles, BookOpen, User, Cpu, History, FolderGit2, Terminal, Mail, Lock } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface JournalNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCloseJournal: () => void;
}

export const JOURNAL_TABS = [
  { id: 'overview', label: 'Me', tag: '#me', date: 'Oct 14', icon: User, chapter: 'Entry 01' },
  { id: 'projects', label: 'Projects', tag: '#projects', date: 'Oct 20', icon: FolderGit2, chapter: 'Entry 02', badge: '27+' },
  { id: 'skills', label: 'Skills', tag: '#skills', date: 'Inside Cover', icon: Cpu, chapter: 'Entry 03' },
  { id: 'assistant', label: 'Assistant', tag: '#assistant', date: 'AI Twin', icon: Terminal, chapter: 'Entry 04', badge: 'AI' },
  { id: 'contact', label: 'Contact', tag: '#contact', date: 'Postcard', icon: Mail, chapter: 'Entry 05' },
];

export const JournalNav: React.FC<JournalNavProps> = ({
  activeTab,
  setActiveTab,
  onCloseJournal
}) => {
  const activeIndex = JOURNAL_TABS.findIndex((tab) => tab.id === activeTab);

  return (
    <header className="relative w-full mb-6">
      {/* Top Banner / Notebook Spine Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-[#8C8577]/30 pb-4 gap-3">
        {/* Left Title & Status */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full wax-seal flex items-center justify-center text-[#fbf7ee] font-handwriting font-bold text-base shadow-md">
            PS
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-journal font-bold text-xl sm:text-2xl text-[#20242B]">
                {PROFILE_DATA.name}'s Field Journal
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-typewriter bg-[#5C7C74]/20 text-[#2C4A42] border border-[#5C7C74]/40">
                #2026-LOG
              </span>
            </div>
            <p className="font-handwriting text-sm text-[#4B5566]">
              {PROFILE_DATA.role} · {PROFILE_DATA.location}
            </p>
          </div>
        </div>

        {/* Right Action: Close Journal / Toggle Cover */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onCloseJournal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#20242B] text-[#EFE6D2] hover:bg-[#343a46] text-xs font-typewriter transition-colors shadow"
            title="Close notebook to view cover"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#B08D3F]" />
            <span>Close Journal</span>
          </button>
        </div>
      </div>

      {/* PAPERCLIP TABS ROW (Sticky along top) */}
      <div className="flex items-center space-x-2 overflow-x-auto pt-4 pb-2 no-scrollbar">
        {JOURNAL_TABS.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                paperclip-tab px-3.5 py-2 rounded-t-lg flex items-center space-x-2 text-xs font-typewriter whitespace-nowrap relative transition-all duration-200
                ${isActive ? 'active z-10 -translate-y-1' : 'hover:-translate-y-0.5 text-[#20242B]'}
              `}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#fbf7ee]' : 'text-[#8C8577]'}`} />
              <span className="font-medium">{tab.label}</span>
              <span className={`text-[10px] ${isActive ? 'text-[#EFE6D2]' : 'text-[#8C8577]'}`}>
                {tab.tag}
              </span>

              {tab.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-[#fbf7ee] text-[#9C3B3B]' : 'bg-[#5C7C74] text-white'
                }`}>
                  {tab.badge}
                </span>
              )}

              {/* Active Tab Paperclip Visual Accent */}
              {isActive && (
                <motion.div
                  layoutId="activeClip"
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#B08D3F] rounded-t-sm shadow-sm"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* BOOKMARK RIBBON TRACKER ON RIGHT EDGE */}
      <div className="hidden lg:block absolute -right-6 top-0 bottom-0 w-4 pointer-events-none z-20">
        <motion.div
          animate={{ y: activeIndex * 38 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-4 h-28 ribbon-bookmark rounded-b-md shadow-xl flex flex-col items-center justify-end pb-2"
        >
          <Bookmark className="w-3 h-3 text-[#fbf7ee]" />
        </motion.div>
      </div>
    </header>
  );
};
