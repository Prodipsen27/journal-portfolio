import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Bot, User, PenTool, Sparkles, ExternalLink,
  Smile, Briefcase, Layers, PartyPopper, UserCheck,
  Copy, Check, RefreshCw, Download, Trash2, CheckCircle2, Search
} from 'lucide-react';
import { ChatMessage } from '../types';

interface MobileChatSectionProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  onQuerySubmit: (query: string) => void;
  onClearChat: () => void;
  onSaveConversation: () => void;
  isDarkMode?: boolean;
}

const SHORTCUTS = [
  { id: 'me', label: 'Me', icon: Smile, iconColor: 'text-[#0D9488]', prompt: "Tell me about Prodip's background, education, and full-stack engineering experience." },
  { id: 'projects', label: 'Projects', icon: Briefcase, iconColor: 'text-[#059669]', prompt: "What are Prodip's top GenAI projects and live repository highlights?" },
  { id: 'skills', label: 'Skills', icon: Layers, iconColor: 'text-[#7C3AED]', prompt: "What is Prodip's technical stack, agent framework expertise, and RAG knowledge?" },
  { id: 'fun', label: 'Fun', icon: PartyPopper, iconColor: 'text-[#DB2777]', prompt: "What are Prodip's creative hobbies, hackathons, and personal interests?" },
  { id: 'contact', label: 'Contact', icon: UserCheck, iconColor: 'text-[#D97706]', prompt: "How can I contact or hire Prodip for engineering roles and contracts?" },
];

export const MobileChatSection: React.FC<MobileChatSectionProps> = ({
  messages,
  isProcessing,
  onQuerySubmit,
  onClearChat,
  onSaveConversation,
  isDarkMode = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Typewriter for latest agent message
  const latestMessage = messages[messages.length - 1];
  const isLatestAgent = latestMessage?.sender === 'agent';
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLatestAgent) {
      const fullText = latestMessage.text;
      setDisplayedText('');
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i >= fullText.length) {
          setDisplayedText(fullText);
          setIsTyping(false);
          clearInterval(interval);
        } else {
          setDisplayedText(fullText.slice(0, i));
        }
      }, 14);
      return () => clearInterval(interval);
    } else {
      setDisplayedText('');
      setIsTyping(false);
    }
  }, [latestMessage?.id, latestMessage?.text]);

  // Auto-scroll to bottom when messages or typed text changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [displayedText, messages.length, isProcessing]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val || isProcessing) return;
    onQuerySubmit(val);
    setInputValue('');
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSave = () => {
    onSaveConversation();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const bg = isDarkMode
    ? 'bg-[#1E222B] border-[#2d3240]'
    : 'bg-[#FBF7EE] border-[#DCCFAF]';
  const inputBg = isDarkMode
    ? 'bg-[#252b38] border-[#3a4155] text-[#E6DFCF] placeholder-[#6a7685]'
    : 'bg-[#FBF7EE] border-[#BCAE8E] text-[#20242B] placeholder-[#8C8577]/70';
  const msgUserBg = isDarkMode
    ? 'bg-[#2b3140] border-[#3a4155] text-[#E6DFCF]'
    : 'bg-[#EFE6D2]/90 border-[#BCAE8E] text-[#20242B]';
  const msgAgentBg = isDarkMode
    ? 'bg-[#2a2f1e] border-[#4d5e2a] text-[#e8f0d0]'
    : 'bg-[#FEF9C3]/85 border-[#FDE047] text-[#1E293B]';

  return (
    <div className={`flex flex-col h-[80vh] min-h-[500px] max-h-[780px] rounded-2xl overflow-hidden border ${bg} shadow-lg select-none`}>

      {/* HEADER */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${isDarkMode ? 'border-[#2d3240]' : 'border-[#DCCFAF]'} shrink-0`}>
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full wax-seal flex items-center justify-center text-[#FBF7EE] font-handwriting font-bold text-xs shadow">PS</div>
          <div>
            <span className="font-typewriter text-[9px] text-[#9C3B3B] font-bold uppercase tracking-widest block">AI TWIN · LIVE</span>
            <span className={`font-handwriting text-lg font-bold ${isDarkMode ? 'text-[#E6DFCF]' : 'text-[#20242B]'}`}>Prodip's AI Twin</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          {isTyping && (
            <button
              onClick={() => { if (latestMessage) { setDisplayedText(latestMessage.text); setIsTyping(false); } }}
              className="px-2 py-1 rounded text-[9px] font-typewriter font-bold bg-[#EFE6D2] border border-[#BCAE8E] text-[#9C3B3B] hover:bg-[#9C3B3B] hover:text-white transition-colors"
            >Skip</button>
          )}
          <button
            onClick={handleSave}
            disabled={messages.length === 0}
            title="Save conversation"
            className={`p-1.5 rounded transition-colors disabled:opacity-30 ${isDarkMode ? 'hover:bg-[#2d3240] text-[#A89073]' : 'hover:bg-[#EFE6D2] text-[#8C8577]'}`}
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Download className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClearChat}
            disabled={messages.length === 0}
            title="Clear chat"
            className={`p-1.5 rounded transition-colors disabled:opacity-30 ${isDarkMode ? 'hover:bg-[#2d3240] text-[#A89073]' : 'hover:bg-[#EFE6D2] text-[#8C8577]'}`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SHORTCUT PILLS (scrollable horizontal) */}
      <div className={`flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar shrink-0 border-b ${isDarkMode ? 'border-[#2d3240]' : 'border-[#DCCFAF]/50'}`}>
        {SHORTCUTS.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => onQuerySubmit(s.prompt)}
              disabled={isProcessing}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full border shrink-0 font-typewriter text-[10px] font-bold transition-all active:scale-95 disabled:opacity-40 ${
                isDarkMode
                  ? 'bg-[#252b38] border-[#3a4155] text-[#E6DFCF] hover:border-[#9C3B3B]'
                  : 'bg-[#EFE6D2]/80 border-[#BCAE8E] text-[#20242B] hover:border-[#9C3B3B]'
              }`}
            >
              <Icon className={`w-3 h-3 ${s.iconColor}`} />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* MESSAGES AREA — grows and scrolls */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ overscrollBehavior: 'contain' }}
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-inner ${isDarkMode ? 'bg-[#252b38] border-2 border-[#3a4155] text-[#A89073]' : 'bg-[#EFE6D2] border-2 border-[#DCCFAF] text-[#9C3B3B]'}`}>
              <PenTool className="w-7 h-7" />
            </div>
            <div>
              <h3 className={`font-handwriting text-2xl font-bold ${isDarkMode ? 'text-[#E6DFCF]' : 'text-[#20242B]'}`}>Ask me anything</h3>
              <p className={`font-typewriter text-[11px] mt-1 max-w-[220px] leading-relaxed ${isDarkMode ? 'text-[#6a7685]' : 'text-[#8C8577]'}`}>
                Use the shortcuts above or type your question below
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isLatest = idx === messages.length - 1;
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className={`max-w-[85%] p-3 rounded-2xl rounded-tr-sm border shadow-sm space-y-1 ${msgUserBg}`}>
                    <div className={`flex items-center space-x-1 text-[9px] font-typewriter font-bold uppercase ${isDarkMode ? 'text-[#A89073]' : 'text-[#9C3B3B]'}`}>
                      <User className="w-3 h-3" />
                      <span>You · {msg.timestamp}</span>
                    </div>
                    <p className="font-journal text-sm leading-snug">"{msg.text}"</p>
                  </div>
                </div>
              );
            }

            const textToRender = isLatest && isTyping ? displayedText : msg.text;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className={`max-w-[90%] p-3 rounded-2xl rounded-tl-sm border-2 shadow-md space-y-2 ${msgAgentBg}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm">✒️</span>
                      <span className={`font-typewriter text-[9px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#b8cc7a]' : 'text-[#9C3B3B]'}`}>
                        {isLatest && isTyping ? 'WRITING...' : 'AI TWIN'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className={`p-1 rounded transition-colors ${isDarkMode ? 'hover:bg-[#3a4820] text-[#b8cc7a]' : 'hover:bg-[#FEF08A] text-[#8C8577]'}`}
                    >
                      {copiedIndex === idx ? <Check className="w-3 h-3 text-[#059669]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="font-handwriting text-lg sm:text-xl leading-relaxed whitespace-pre-wrap">
                    {textToRender}
                    {isLatest && isTyping && (
                      <span className="inline-block animate-bounce ml-1 text-[#9C3B3B]">✒️</span>
                    )}
                  </div>
                  {msg.thoughtProcess && msg.thoughtProcess.length > 0 && (
                    <div className={`pt-2 border-t flex flex-wrap gap-1 font-typewriter text-[9px] ${isDarkMode ? 'border-[#4d5e2a] text-[#b8cc7a]' : 'border-[#FACC15]/60 text-[#713F12]'}`}>
                      <span className="font-bold">Context:</span>
                      {msg.thoughtProcess.map((tp, i) => (
                        <span key={i} className={`px-1.5 py-0.5 rounded font-medium border ${isDarkMode ? 'bg-[#3a4820] border-[#4d5e2a] text-[#b8cc7a]' : 'bg-[#FEF08A] border-[#FDE047] text-[#854D0E]'}`}>{tp}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}

        {isProcessing && (
          <div className="flex justify-start">
            <div className={`px-4 py-3 rounded-2xl rounded-tl-sm border flex items-center space-x-2 font-typewriter text-xs ${isDarkMode ? 'bg-[#2a2f1e] border-[#4d5e2a] text-[#b8cc7a]' : 'bg-[#FEF9C3]/70 border-[#FDE047] text-[#9C3B3B]'}`}>
              <PenTool className="w-4 h-4 animate-spin" />
              <span>Writing response...</span>
            </div>
          </div>
        )}
      </div>

      {/* PINNED INPUT BAR */}
      <div className={`shrink-0 px-3 py-3 border-t ${isDarkMode ? 'border-[#2d3240] bg-[#1A1D24]' : 'border-[#DCCFAF] bg-[#F5EFE4]'}`}>
        <form onSubmit={handleSubmit} className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 transition-all focus-within:border-[#9C3B3B] focus-within:ring-2 focus-within:ring-[#9C3B3B]/20 ${inputBg}`}>
          <Search className="w-4 h-4 text-[#9C3B3B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            placeholder="Ask Prodip's AI twin..."
            className="flex-1 bg-transparent font-journal text-sm focus:outline-none min-w-0 select-text cursor-text"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className="w-8 h-8 rounded-full bg-[#9C3B3B] hover:bg-[#b84343] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <div className={`flex items-center justify-center mt-1.5 font-typewriter text-[9px] gap-1 ${isDarkMode ? 'text-[#4a5568]' : 'text-[#8C8577]'}`}>
          <CheckCircle2 className="w-2.5 h-2.5 text-[#059669]" />
          <span>Real-time Gemini 3.6 Flash · 27+ GenAI projects grounded</span>
        </div>
      </div>
    </div>
  );
};
