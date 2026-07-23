import React from 'react';
import { BookOpen, FolderGit2, Cpu, Bot, Mail } from 'lucide-react';

interface JournalSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewEntry?: () => void;
  onCloseJournal?: () => void;
}

export const JournalSidebar: React.FC<JournalSidebarProps> = ({
  activeTab,
  setActiveTab,
  onCloseJournal,
}) => {
  const navItems = [
    { id: 'overview', code: '01.', label: 'About me', fullLabel: 'About me', icon: BookOpen },
    { id: 'projects', code: '02.', label: 'PROJECTS', fullLabel: 'SELECTED WORKS', icon: FolderGit2 },
    { id: 'skills', code: '03.', label: 'SKILLS', fullLabel: 'SKILLS & TIMELINE', icon: Cpu },
    { id: 'assistant', code: '04.', label: 'ASSISTANT', fullLabel: 'AI TWIN AGENT', icon: Bot },
    { id: 'contact', code: '05.', label: 'CONTACT', fullLabel: 'GET IN TOUCH', icon: Mail }
  ];

  const handleSidebarClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    onCloseJournal?.();
  };

  return (
    <aside 
      onClick={handleSidebarClick}
      title="Click red leather spine to close journal"
      className="w-full md:w-20 lg:w-24 md:h-full shrink-0 bg-[#7A2828] hover:bg-[#702323] transition-colors cursor-pointer text-[#FBF7EE] flex flex-row md:flex-col justify-between items-center py-3 px-3 md:py-6 md:px-0 border-b-2 md:border-b-0 md:border-r-2 border-[#591C1C] rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl shadow-xl relative z-20 select-none"
    >
      {/* Top Section: Title Logo */}
      <div className="flex flex-row md:flex-col items-center space-x-2 md:space-x-0 md:space-y-2">
        <div className="md:writing-mode-vertical md:rotate-180 font-handwriting text-xl md:text-2xl font-bold tracking-wide text-[#FBF7EE]/90">
          The Journal
        </div>
        <span className="hidden md:block font-typewriter text-[9px] uppercase tracking-widest text-[#DCCFAF]/70 font-bold pt-1">
          INDEX
        </span>
      </div>

      {/* Navigation Tabs Stack */}
      <nav className="flex flex-row md:flex-col items-center md:items-stretch space-x-1 md:space-x-0 md:space-y-3 px-1 my-0 md:my-6 overflow-x-auto max-w-[calc(100vw-120px)] sm:max-w-none no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (activeTab === 'overview' && item.id === 'overview');

          return (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(item.id);
              }}
              className={`py-1.5 px-2 sm:py-2 sm:px-2.5 md:py-3 md:px-2 rounded-md md:rounded-r-none md:rounded-l-md flex flex-col items-center justify-center transition-all duration-200 relative group shrink-0 ${
                isActive
                  ? 'bg-[#FBF7EE] text-[#20242B] font-bold shadow-md md:translate-x-1 border border-[#BCAE8E]'
                  : 'text-[#FBF7EE]/80 hover:text-[#FFFFFF] hover:bg-[#8F3333]'
              }`}
            >
              {/* Active Tab Extension Indicator for Desktop */}
              {isActive && (
                <div className="hidden md:block absolute right-[-6px] top-0 bottom-0 w-2 bg-[#FBF7EE] z-30" />
              )}

              <Icon className={`w-4 h-4 md:w-5 md:h-5 mb-0.5 md:mb-1 ${isActive ? 'text-[#9C3B3B]' : 'text-[#FBF7EE]/90'}`} />
              <span className={`tracking-wider font-bold ${
                item.id === 'overview' 
                  ? 'font-handwriting text-[11px] md:text-xs text-center leading-tight' 
                  : 'font-typewriter text-[8px] md:text-[9px] uppercase'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Accent Stamp */}
      <div 
        onClick={() => onCloseJournal?.()} 
        className="px-1 md:px-2 flex justify-center cursor-pointer hover:scale-105 transition-transform" 
        title="Close journal"
      >
        <div className="w-8 h-8 rounded-full wax-seal flex items-center justify-center text-[#FBF7EE] font-handwriting text-xs font-bold shadow-md">
          PS
        </div>
      </div>
    </aside>
  );
};
