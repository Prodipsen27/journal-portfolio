import React from 'react';
import { BookOpen, FolderGit2, Code2, Mail, Plus } from 'lucide-react';

interface JournalSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewEntry?: () => void;
}

export const JournalSidebar: React.FC<JournalSidebarProps> = ({
  activeTab,
  setActiveTab,
  onNewEntry
}) => {
  const navItems = [
    { id: 'overview', code: '01.', label: 'About me', fullLabel: 'About me', icon: BookOpen },
    { id: 'projects', code: '02.', label: 'PROJECTS', fullLabel: 'SELECTED WORKS', icon: FolderGit2 },
    { id: 'fun', code: '03.', label: 'SKETCH', fullLabel: 'SKETCHBOOK', icon: Code2 },
    { id: 'contact', code: '04.', label: 'MAIL', fullLabel: 'ARCHIVE', icon: Mail }
  ];

  return (
    <aside className="w-full md:w-20 lg:w-24 bg-[#7A2828] text-[#FBF7EE] flex flex-row md:flex-col justify-between items-center py-3 px-3 md:py-6 md:px-0 border-b-2 md:border-b-0 md:border-r-2 border-[#591C1C] rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl shadow-xl relative z-20 select-none">
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
      <nav className="flex flex-row md:flex-col items-center md:items-stretch space-x-1 md:space-x-0 md:space-y-3 px-1 my-0 md:my-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (activeTab === 'overview' && item.id === 'overview');

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`py-2 px-2.5 md:py-3 md:px-2 rounded-md md:rounded-r-none md:rounded-l-md flex flex-col items-center justify-center transition-all duration-200 relative group ${
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

      {/* Bottom Button: NEW ENTRY */}
      <div className="px-1 md:px-2 md:w-full">
        <button
          onClick={onNewEntry}
          className="py-1.5 px-2 md:py-2.5 md:px-1 bg-[#1A1615] hover:bg-[#2A2422] text-[#FBF7EE] rounded border border-[#3D3330] flex flex-row md:flex-col items-center justify-center shadow transition-colors group space-x-1 md:space-x-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#9C3B3B] group-hover:scale-110 transition-transform md:mb-0.5" />
          <span className="font-typewriter text-[8px] font-bold tracking-wider text-center uppercase leading-none">
            NEW<span className="hidden md:inline"><br /></span>ENTRY
          </span>
        </button>
      </div>
    </aside>
  );
};
