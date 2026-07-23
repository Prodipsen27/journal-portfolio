import React from 'react';
import { 
  User, 
  Cpu, 
  History, 
  FolderGit2, 
  Terminal, 
  Mail, 
  Sparkles,
  MapPin,
  Clock,
  Briefcase
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview & Bio', icon: User, chapter: 'Chapter 01' },
    { id: 'skills', label: 'Skills & Capabilities', icon: Cpu, chapter: 'Chapter 02' },
    { id: 'timeline', label: 'Career Timeline', icon: History, chapter: 'Chapter 03' },
    { id: 'projects', label: 'Featured Projects', icon: FolderGit2, chapter: 'Chapter 04', badge: '9' },
    { id: 'agent-sandbox', label: 'AI System Agent', icon: Terminal, chapter: 'Chapter 05', badge: 'Interactive' },
    { id: 'contact', label: 'Contact & Hire', icon: Mail, chapter: 'Chapter 06' },
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <aside 
      className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen w-72 leather-sidebar flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-[#3a3028] text-[#d6c7b2]
      `}
    >
      {/* Top Header / Branding */}
      <div>
        <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-[#3e342b]">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3a2f26] to-[#1e1814] border border-[#8c714a] flex items-center justify-center shadow-inner relative group">
            <Sparkles className="w-6 h-6 text-[#d4af37] animate-pulse" />
            <div className="absolute inset-0 rounded-lg bg-[#d4af37]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="font-serif-classic text-2xl font-bold tracking-wide text-[#f2e6d8] leading-tight">
              Prodip Sengupta
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#a88f6d] font-cinzel">
              GenAI Engineer
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6 p-3 rounded-lg bg-[#241d18] border border-[#483b2f] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[#e0d3c1] font-medium">Open to Work</span>
          </div>
          <span className="text-[#9c8466] text-[10px] font-mono">2026 Ready</span>
        </div>

        {/* Section Chapter Links (Stylized like the Image List) */}
        <div className="mb-2">
          <p className="text-[11px] font-cinzel uppercase tracking-widest text-[#85705a] mb-3 px-2">
            Past Memories & Logs
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`
                    w-full text-left py-2.5 px-3 rounded-md transition-all duration-200 flex items-center justify-between group relative
                    ${isActive 
                      ? 'bg-[#2d241d] text-[#f7ead9] shadow-md border-l-2 border-[#c8a368]' 
                      : 'text-[#a3907a] hover:text-[#ebdccb] hover:bg-[#231b15]'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#d4af37]' : 'text-[#7d6954] group-hover:text-[#c8a368]'}`} />
                    <span className="font-serif-classic text-lg tracking-wide">
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                      isActive 
                        ? 'bg-[#8c6d3d] text-[#fbf4ea]' 
                        : 'bg-[#2b221a] text-[#8e7a64] border border-[#3d3126]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Profile Quick Stats */}
      <div className="pt-4 border-t border-[#3e342b] space-y-2 text-xs text-[#998570]">
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-[#8c714a]" />
            <span>India</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-[#8c714a]" />
            <span>1+ Yrs Exp</span>
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] pt-1 text-[#b5a18a] font-mono">
          <span>27+ Projects</span>
          <span className="text-emerald-400">99% Uptime</span>
        </div>
      </div>
    </aside>
  );
};
