import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ExternalLink, 
  Smile, 
  Briefcase, 
  Layers, 
  PartyPopper, 
  UserCheck, 
  Sparkles,
  Search,
  PenTool,
  Trash2,
  Download,
  Check
} from 'lucide-react';

interface AssistantLeftPageProps {
  onQuerySubmit: (query: string) => void;
  isProcessing?: boolean;
  onClearChat?: () => void;
  onSaveConversation?: () => void;
  hasMessages?: boolean;
}

export const AssistantLeftPage: React.FC<AssistantLeftPageProps> = ({
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
      bgColor: 'bg-[#EFE6D2]/90 hover:bg-[#E2D6BB]',
      borderColor: 'border-[#BCAE8E]',
      prompt: "Tell me about Prodip's background, education, and full-stack engineering experience."
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Portfolio works',
      icon: Briefcase,
      iconColor: 'text-[#059669]',
      bgColor: 'bg-[#EFE6D2]/90 hover:bg-[#E2D6BB]',
      borderColor: 'border-[#BCAE8E]',
      prompt: "What are Prodip's top GenAI projects and live repository highlights?"
    },
    {
      id: 'skills',
      label: 'Skills',
      description: 'Technical stack',
      icon: Layers,
      iconColor: 'text-[#7C3AED]',
      bgColor: 'bg-[#EFE6D2]/90 hover:bg-[#E2D6BB]',
      borderColor: 'border-[#BCAE8E]',
      prompt: "What is Prodip's technical stack, agent framework expertise, and RAG knowledge?"
    },
    {
      id: 'fun',
      label: 'Fun',
      description: 'Hobbies & side projects',
      icon: PartyPopper,
      iconColor: 'text-[#DB2777]',
      bgColor: 'bg-[#EFE6D2]/90 hover:bg-[#E2D6BB]',
      borderColor: 'border-[#BCAE8E]',
      prompt: "What are Prodip's creative hobbies, hackathons, and personal interests?"
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Hire & connect',
      icon: UserCheck,
      iconColor: 'text-[#D97706]',
      bgColor: 'bg-[#EFE6D2]/90 hover:bg-[#E2D6BB]',
      borderColor: 'border-[#BCAE8E]',
      prompt: "How can I contact or hire Prodip for engineering roles and contracts?"
    }
  ];

  return (
    <div className="flex flex-col justify-between h-full select-none relative overflow-hidden">
      {/* TOP HEADER BAR WITH STAMP CTA */}
      <div className="flex items-center justify-between z-10 pb-3 border-b border-[#8C8577]/20">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
          <span className="font-typewriter text-[10px] text-[#8C8577] font-bold uppercase tracking-wider">
            AI TWIN DISPATCH · FIELD NOTE
          </span>
        </div>

        {/* EXTERNAL STAMP CTA LINK */}
        <a
          href="https://fastfolio.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 rounded bg-[#EFE6D2] hover:bg-[#E2D6BB] border border-[#BCAE8E] text-[#20242B] font-typewriter text-[10px] font-bold inline-flex items-center space-x-1.5 shadow-2xs hover:scale-105 transition-all"
          title="Build your AI portfolio on Fastfolio"
        >
          <Sparkles className="w-3 h-3 text-[#9C3B3B]" />
          <span>Build your AI portfolio</span>
          <ExternalLink className="w-2.5 h-2.5 text-[#8C8577]" />
        </a>
      </div>

      {/* CENTRAL COZY SEARCH / CHAT BAR WITH WATERCOLOR GLOW */}
      <div className="my-6 sm:my-10 relative z-10 max-w-xl mx-auto w-full text-center">
        {/* PARCHMENT TITLE INTRO */}
        <div className="mb-4">
          <span className="font-typewriter text-[10px] text-[#9C3B3B] font-bold uppercase tracking-widest block">
            CONVERSATIONAL PROFESSIONAL TWIN
          </span>
          <h2 className="font-journal text-2xl sm:text-3xl font-bold text-[#20242B] mt-0.5">
            Ask Prodip's AI Twin Anything
          </h2>
          <p className="font-journal text-xs sm:text-sm text-[#4B5566] italic mt-1 max-w-md mx-auto">
            Query experience, technical projects, or rate info. Real-time answers written directly into the lined notebook.
          </p>
        </div>

        {/* WATERCOLOR / AMBER GLOW BACKDROP */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#C4B5FD] opacity-40 blur-lg pointer-events-none" />

          <form 
            onSubmit={handleSubmit}
            className="relative flex items-center w-full rounded-full bg-[#FBF7EE] border-2 border-[#BCAE8E] shadow-md p-1.5 transition-all focus-within:border-[#9C3B3B] focus-within:ring-2 focus-within:ring-[#9C3B3B]/20"
          >
            <div className="pl-3 sm:pl-4 text-[#8C8577] shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#9C3B3B]" />
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full px-3 py-2 bg-transparent font-journal text-sm sm:text-base text-[#20242B] placeholder-[#8C8577]/70 focus:outline-none"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isProcessing}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#9C3B3B] hover:bg-[#b84343] disabled:opacity-40 text-[#FBF7EE] flex items-center justify-center shrink-0 shadow transition-all transform active:scale-95 group"
              aria-label="Submit query"
            >
              <ArrowRight className="w-5 h-5 text-[#FBF7EE] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>

        {/* ACTION BUTTONS: SAVE CONVERSATION & CLEAR CHAT */}
        <div className="flex items-center justify-center space-x-2.5 mt-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasMessages}
            className="px-3 py-1.5 rounded-full bg-[#EFE6D2] hover:bg-[#E2D6BB] disabled:opacity-40 border border-[#BCAE8E] text-[#20242B] font-typewriter text-[10px] font-bold inline-flex items-center space-x-1.5 shadow-2xs transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100 cursor-pointer"
            title="Save conversation as text file"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#059669]" />
                <span className="text-[#059669]">Saved Log!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#9C3B3B]" />
                <span>Save Conversation</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClearChat}
            disabled={!hasMessages}
            className="px-3 py-1.5 rounded-full bg-[#EFE6D2] hover:bg-[#FEE2E2] disabled:opacity-40 border border-[#BCAE8E] hover:border-[#FCA5A5] text-[#20242B] hover:text-[#9C3B3B] font-typewriter text-[10px] font-bold inline-flex items-center space-x-1.5 shadow-2xs transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100 cursor-pointer"
            title="Clear current notebook chat history"
          >
            <Trash2 className="w-3.5 h-3.5 text-[#9C3B3B]" />
            <span>Clear Chat</span>
          </button>
        </div>

        <p className="font-typewriter text-[10px] text-[#8C8577] mt-2">
          Grounded in 27+ full-stack GenAI engineering projects & multi-agent systems
        </p>
      </div>

      {/* CATEGORIZED NAVIGATION SHORTCUT STAMPS */}
      <div className="z-10 pt-2">
        <span className="font-typewriter text-[9px] text-[#8C8577] uppercase font-bold tracking-widest block mb-2 text-center sm:text-left">
          QUICK CATEGORY SHORTCUTS
        </span>

        {/* 5 PARCHMENT STAMP BUTTONS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleShortcutClick(cat.prompt)}
                className={`p-2.5 rounded-lg ${cat.bgColor} border ${cat.borderColor} shadow-2xs flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-[#9C3B3B] group`}
              >
                <div className={`p-1.5 rounded-md bg-[#FBF7EE] border border-[#BCAE8E] shadow-2xs mb-1.5 ${cat.iconColor} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
                </div>
                <span className="font-journal text-xs font-bold text-[#20242B] block leading-tight">
                  {cat.label}
                </span>
                <span className="font-typewriter text-[8px] text-[#8C8577] leading-tight block mt-0.5 truncate w-full">
                  {cat.description}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
