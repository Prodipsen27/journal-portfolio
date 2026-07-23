import React from 'react';
import { Search, Sparkles, Send, Menu, X, Terminal, FileText } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface HeaderBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onNavigate: (tab: string) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  searchQuery,
  setSearchQuery,
  mobileMenuOpen,
  setMobileMenuOpen,
  onNavigate
}) => {
  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pt-2 pb-4">
      {/* Mobile Toggle & Chapter Label */}
      <div className="w-full md:w-auto flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-lg embossed-button flex items-center space-x-2"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#d4af37]" /> : <Menu className="w-5 h-5 text-[#d4af37]" />}
          <span className="font-serif-classic text-sm">Menu</span>
        </button>

        {/* Brand Title for Mobile */}
        <div className="lg:hidden text-right">
          <h2 className="font-serif-classic text-lg font-bold text-[#2e2319]">
            {PROFILE_DATA.name}
          </h2>
          <p className="text-[10px] uppercase font-cinzel text-[#735c45]">
            Full-stack GenAI
          </p>
        </div>
      </div>

      {/* Central Parchment Search Bar (Matching Search bar in screenshot) */}
      <div className="w-full md:max-w-md relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, skills, tech (e.g. Gemini, Next.js, RAG)..."
          className="w-full py-2.5 pl-4 pr-10 rounded-xl parchment-input text-sm font-sans tracking-wide transition-all shadow-sm"
        />
        <Search className="absolute right-3.5 top-3 w-4 h-4 text-[#8a7057] pointer-events-none" />
      </div>

      {/* Right Top Action Buttons (Matching "New Entry" embossed pill button from image) */}
      <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
        <button
          onClick={() => onNavigate('agent-sandbox')}
          className="embossed-button px-4 py-2 rounded-xl text-xs font-serif-classic font-semibold tracking-wider flex items-center space-x-2 border border-[#59493c]"
        >
          <Terminal className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Ask AI Agent</span>
        </button>

        <button
          onClick={() => onNavigate('contact')}
          className="embossed-button px-5 py-2.5 rounded-xl text-sm font-serif-classic font-bold tracking-wider flex items-center space-x-2 border border-[#8c714a] shadow-md group"
        >
          <Sparkles className="w-4 h-4 text-[#d4af37] group-hover:rotate-12 transition-transform" />
          <span className="text-[#f7ebd9]">Contact & Hire</span>
        </button>
      </div>
    </header>
  );
};
