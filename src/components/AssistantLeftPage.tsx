import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Search,
  Trash2,
  Download,
  Check,
  Smile, 
  Briefcase, 
  Layers, 
  PartyPopper, 
  UserCheck
} from 'lucide-react';

interface AITwinLeftPageProps {
  onQuerySubmit: (query: string) => void;
  isProcessing?: boolean;
  onClearChat?: () => void;
  onSaveConversation?: () => void;
  hasMessages?: boolean;
}

export const AssistantLeftPage: React.FC<AITwinLeftPageProps> = ({
  onQuerySubmit,
  isProcessing = false,
  onClearChat,
  onSaveConversation,
  hasMessages = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;
    onQuerySubmit(inputValue.trim());
    setInputValue('');
  };

  const handleShortcutClick = (promptText: string) => {
    if (isProcessing) return;
    onQuerySubmit(promptText);
  };

  const handleSave = () => {
    if (onSaveConversation) {
      onSaveConversation();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const categories = [
    {
      id: 'me',
      label: 'Background',
      description: 'Background & bio',
      icon: Smile,
      iconColor: 'text-[#0D9488]',
      prompt: "Tell me about Prodip's background and engineering experience."
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Portfolio works',
      icon: Briefcase,
      iconColor: 'text-[#059669]',
      prompt: "What are his top GenAI and full-stack projects?"
    },
    {
      id: 'skills',
      label: 'Skills',
      description: 'Technical stack',
      icon: Layers,
      iconColor: 'text-[#7C3AED]',
      prompt: "What is his technical stack and agent framework expertise?"
    },
    {
      id: 'fun',
      label: 'Hobbies',
      description: 'Hobbies & side pr-',
      icon: PartyPopper,
      iconColor: 'text-[#DB2777]',
      prompt: "What are his personal interests outside of code?"
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Hire & connect',
      icon: UserCheck,
      iconColor: 'text-[#D97706]',
      prompt: "How can I contact or hire Prodip?"
    }
  ];

  return (
    <div className="flex flex-col justify-between h-full overflow-y-auto no-scrollbar select-none relative pb-2 pr-1">
      {/* INK SPLATTERS (Decorative) */}
      <div className="absolute top-4 left-2 opacity-40 pointer-events-none">
        <svg width="30" height="30" viewBox="0 0 50 50" fill="#20242B">
          <circle cx="25" cy="25" r="3" />
          <circle cx="15" cy="15" r="1.5" />
          <circle cx="35" cy="18" r="2" />
          <circle cx="18" cy="35" r="1" />
          <circle cx="32" cy="32" r="1.5" />
          <path d="M25 25 L10 10 M25 25 L38 12 M25 25 L15 40 M25 25 L40 30" stroke="#20242B" strokeWidth="0.5" strokeDasharray="1 2"/>
        </svg>
      </div>
      <div className="absolute bottom-20 left-1 opacity-40 pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 50 50" fill="#20242B">
          <circle cx="20" cy="20" r="4" />
          <circle cx="30" cy="12" r="2" />
          <circle cx="10" cy="30" r="1.5" />
        </svg>
      </div>
      
      {/* FLOWER / BRANCH SKETCH (Decorative right side) */}
      <div className="absolute bottom-10 -right-4 opacity-50 pointer-events-none hidden sm:block">
        <svg width="60" height="90" viewBox="0 0 100 150" fill="none">
          <path d="M100 150 Q80 120 70 80 T80 20" stroke="#3B2F23" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M75 100 Q60 90 50 70" stroke="#3B2F23" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M72 60 Q85 50 95 40" stroke="#3B2F23" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Small red flowers */}
          <circle cx="80" cy="20" r="3" fill="#9C3B3B" opacity="0.8"/>
          <circle cx="50" cy="70" r="3.5" fill="#9C3B3B" opacity="0.8"/>
          <circle cx="95" cy="40" r="2.5" fill="#9C3B3B" opacity="0.8"/>
        </svg>
      </div>

      <div className="relative z-10 w-full text-center space-y-4 sm:space-y-5 my-auto py-2">
        
        {/* TOP HEADER / SUBTITLE */}
        <div className="flex flex-col items-center space-y-1 mb-2">
          <div className="font-typewriter text-xs text-[#8C8577] uppercase tracking-widest font-bold">
            Interactive Agent
          </div>
        </div>

        {/* MAIN TITLE */}
        <div>
          <h2 className="font-journal text-3xl sm:text-4xl font-bold text-[#20242B] tracking-tight relative inline-block">
            AI Assistant
          </h2>
          <p className="font-journal text-sm sm:text-base text-[#4B5566] mt-2 max-w-[85%] mx-auto leading-snug">
            Ask questions about my experience, technical projects, or skills.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="w-full max-w-xl mx-auto px-2 mt-4">
          <form 
            onSubmit={handleSubmit}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="relative flex items-center w-full bg-white border border-[#DCCFAF] shadow-sm rounded-xl p-1.5 focus-within:border-[#9C3B3B] focus-within:ring-1 focus-within:ring-[#9C3B3B] transition-all"
          >
            <div className="pl-3 pr-2 text-[#8C8577] shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              placeholder="Ask me anything..."
              className="w-full px-2 py-1.5 sm:py-2 bg-transparent font-journal text-base sm:text-lg text-[#20242B] placeholder-[#8C8577]/80 focus:outline-none select-text cursor-text"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isProcessing}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#20242B] hover:bg-[#323842] text-white disabled:opacity-50 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </button>
          </form>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasMessages}
            className="px-4 py-2 bg-white border border-[#DCCFAF] rounded-lg font-journal text-sm sm:text-base text-[#20242B] inline-flex items-center space-x-2 shadow-sm transition-all hover:bg-[#FBF7EE] active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#059669]" />
                <span className="text-[#059669]">Saved</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#8C8577]" />
                <span>Save Chat</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClearChat}
            disabled={!hasMessages}
            className="px-4 py-2 bg-white border border-[#DCCFAF] rounded-lg font-journal text-sm sm:text-base text-[#20242B] inline-flex items-center space-x-2 shadow-sm transition-all hover:bg-[#FBF7EE] active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-[#8C8577]" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* SUBTEXT */}
        <div className="pt-2">
          <p className="font-journal text-sm sm:text-base text-[#4B5566]">
            Grounded in 27+ full-stack GenAI projects
          </p>
        </div>

        {/* CATEGORIZED NAVIGATION SHORTCUT STAMPS */}
        <div className="mt-6 pt-4 w-full px-1 max-w-4xl mx-auto border-t border-[#DCCFAF]/50">
          <div className="flex items-center justify-center mb-4">
            <span className="font-typewriter text-[10px] font-bold uppercase tracking-widest text-[#8C8577]">
              Suggested Topics
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleShortcutClick(cat.prompt)}
                  className="p-3 bg-white border border-[#DCCFAF] rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-[#9C3B3B]/50 hover:shadow-md group"
                >
                  <div className={`p-2 mb-2 bg-[#FBF7EE] rounded-lg ${cat.iconColor} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                  </div>
                  <span className="font-journal text-sm sm:text-base font-bold text-[#20242B] block leading-tight">
                    {cat.label}
                  </span>
                  <span className="font-journal text-xs sm:text-sm text-[#8C8577] block mt-1">
                    {cat.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
