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
      label: 'Me',
      description: 'Background & bio',
      icon: Smile,
      iconColor: 'text-[#0D9488]',
      prompt: "Tell me about Prodip's background, education, and full-stack engineering experience."
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Portfolio works',
      icon: Briefcase,
      iconColor: 'text-[#059669]',
      prompt: "What are Prodip's top GenAI projects and live repository highlights?"
    },
    {
      id: 'skills',
      label: 'Skills',
      description: 'Technical stack',
      icon: Layers,
      iconColor: 'text-[#7C3AED]',
      prompt: "What is Prodip's technical stack, agent framework expertise, and RAG knowledge?"
    },
    {
      id: 'fun',
      label: 'Fun',
      description: 'Hobbies & side pr-',
      icon: PartyPopper,
      iconColor: 'text-[#DB2777]',
      prompt: "What are Prodip's creative hobbies, hackathons, and personal interests?"
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Hire & connect',
      icon: UserCheck,
      iconColor: 'text-[#D97706]',
      prompt: "How can I contact or hire Prodip for engineering roles and contracts?"
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
        <div className="flex flex-col items-center space-y-0.5">
          <div className="flex items-center justify-center space-x-2 font-handwriting text-base sm:text-lg text-[#9C3B3B]">
            <span className="opacity-70">-\-</span>
            <span className="uppercase tracking-widest font-bold">CONVERSATIONAL PROFESSIONAL TWIN</span>
            <span className="opacity-70">-/-</span>
          </div>
          <div className="text-[#9C3B3B] text-sm leading-none">★</div>
        </div>

        {/* MAIN TITLE */}
        <div>
          <h2 className="font-handwriting text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20242B] tracking-tight transform -rotate-1 relative inline-block">
            Ask Prodip's AI Twin Anything
            {/* Red sketch underline under 'Prodip's' */}
            <svg className="absolute -bottom-1 left-[15%] w-[35%] h-2 text-[#9C3B3B] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q50,8 100,4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </h2>
          <p className="font-handwriting text-lg sm:text-xl text-[#20242B] mt-2 max-w-[95%] mx-auto leading-snug">
            <span className="text-[#9C3B3B] opacity-70">-\-</span> Query experience, technical projects, or rate info. Real-time answers <br className="hidden sm:block" /> written directly into the lined notebook. <span className="text-[#9C3B3B] opacity-70">-/-</span>
          </p>
        </div>

        {/* SEARCH BAR (Hand-drawn style) */}
        <div className="w-full max-w-xl mx-auto px-2 mt-4">
          <form 
            onSubmit={handleSubmit}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="relative flex items-center w-full bg-[#FBF7EE]/60 border-[2.5px] border-solid border-[#4B5566]/80 shadow-[1px_3px_6px_rgba(0,0,0,0.1)] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] p-1.5 hover:border-[#9C3B3B]/80 transition-colors"
          >
            <div className="pl-2.5 sm:pl-3 text-[#9C3B3B] shrink-0">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              placeholder="Ask me anything..."
              className="w-full px-3 py-1.5 sm:py-2 bg-transparent font-handwriting text-xl sm:text-2xl text-[#20242B] placeholder-[#4B5566]/60 focus:outline-none select-text cursor-text"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isProcessing}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#9C3B3B] border-2 border-[#5a1c1c] disabled:opacity-50 flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95 group cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#FBF7EE] group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </button>
          </form>
        </div>

        {/* ACTION BUTTONS (Hand-drawn style) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasMessages}
            className="px-3 py-1.5 bg-[#FBF7EE]/60 border-[2px] border-solid border-[#4B5566]/80 rounded-[15px_225px_15px_255px/255px_15px_225px_15px] font-handwriting text-lg sm:text-xl text-[#20242B] inline-flex items-center space-x-1.5 shadow-[1px_2px_4px_rgba(0,0,0,0.05)] transition-all hover:border-[#9C3B3B]/80 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#059669]" />
                <span className="text-[#059669]">Saved!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#9C3B3B]" />
                <span>Save Conversation</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClearChat}
            disabled={!hasMessages}
            className="px-3 py-1.5 bg-[#FBF7EE]/60 border-[2px] border-solid border-[#4B5566]/80 rounded-[225px_15px_255px_15px/15px_255px_15px_225px] font-handwriting text-lg sm:text-xl text-[#20242B] inline-flex items-center space-x-1.5 shadow-[1px_2px_4px_rgba(0,0,0,0.05)] transition-all hover:border-[#9C3B3B]/80 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-[#9C3B3B]" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* SUBTEXT with underline */}
        <div className="pt-1">
          <p className="font-handwriting text-base sm:text-lg text-[#20242B] relative inline-block">
            Grounded in <span className="relative">
              27+ full-stack GenAI projects
              <svg className="absolute -bottom-1 left-0 w-full h-1.5 text-[#9C3B3B]" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,8 100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span> & multi-agent systems
          </p>
        </div>

        {/* CATEGORIZED NAVIGATION SHORTCUT STAMPS (Hand-drawn cards) */}
        <div className="mt-4 pt-2 w-full px-1 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-2.5">
            <span className="text-[#9C3B3B] font-handwriting text-lg opacity-70">-\-</span>
            <span className="font-handwriting text-xl sm:text-2xl font-bold uppercase tracking-widest text-[#20242B]">
              QUICK CATEGORY SHORTCUTS
            </span>
            <span className="text-[#9C3B3B] font-handwriting text-lg opacity-70">-\-</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              // Mix up border radius rounding to look hand-drawn
              const borderStyles = [
                "rounded-[255px_15px_225px_15px/15px_225px_15px_255px]",
                "rounded-[15px_225px_15px_255px/255px_15px_225px_15px]",
                "rounded-[225px_15px_255px_15px/15px_255px_15px_225px]",
                "rounded-[15px_255px_15px_225px/225px_15px_255px_15px]",
                "rounded-[255px_15px_225px_15px/15px_225px_15px_255px]"
              ];
              const borderClass = borderStyles[idx % borderStyles.length];
              
              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleShortcutClick(cat.prompt)}
                  className={`p-2 sm:p-2.5 bg-[#FBF7EE]/40 border-[2px] border-solid border-[#4B5566]/70 ${borderClass} flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-[#9C3B3B]/80 shadow-[1px_2px_5px_rgba(0,0,0,0.05)] group`}
                >
                  <div className={`p-1.5 sm:p-2 mb-1 bg-[#FBF7EE] border-[1.5px] border-[#4B5566]/60 rounded-[10px_6px_10px_6px/6px_10px_6px_10px] shadow-xs ${cat.iconColor} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                  </div>
                  <span className="font-handwriting text-xl sm:text-2xl font-bold text-[#20242B] block leading-none">
                    {cat.label}
                  </span>
                  <span className="font-handwriting text-sm sm:text-base text-[#4B5566] leading-tight block mt-0.5 truncate w-full">
                    {cat.description}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
