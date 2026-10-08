import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Bot, User, Sparkles, ExternalLink,
  Smile, Briefcase, Layers, PartyPopper, UserCheck,
  Copy, Check, RefreshCw, Download, CheckCircle2, Search, MessageSquare
} from 'lucide-react';
import { ChatMessage } from '../types';

interface MobileChatSectionProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  onQuerySubmit: (query: string) => void;
  onClearChat: () => void;
  onSaveConversation: () => void;
}

const SHORTCUTS = [
  { id: 'me', label: 'Background', icon: Smile, iconColor: 'text-indigo-600', prompt: "Tell me about Prodip's background and engineering experience." },
  { id: 'projects', label: 'Projects', icon: Briefcase, iconColor: 'text-blue-600', prompt: "What are his top GenAI and full-stack projects?" },
  { id: 'skills', label: 'Skills', icon: Layers, iconColor: 'text-purple-600', prompt: "What is his technical stack and agent framework expertise?" },
  { id: 'fun', label: 'Hobbies', icon: PartyPopper, iconColor: 'text-pink-600', prompt: "What are his personal interests outside of code?" },
  { id: 'contact', label: 'Contact', icon: UserCheck, iconColor: 'text-orange-600', prompt: "How can I contact or hire Prodip?" },
];

export const MobileChatSection: React.FC<MobileChatSectionProps> = ({
  messages,
  isProcessing,
  onQuerySubmit,
  onClearChat,
  onSaveConversation,
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

  const bg = 'bg-white border-gray-200';
  const inputBg = 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400';
  const msgUserBg = 'bg-gray-100 border-gray-200 text-gray-900';
  const msgAgentBg = 'bg-white border-gray-200 text-gray-800';

  return (
    <div className={`flex flex-col h-[80vh] min-h-[500px] max-h-[780px] rounded-xl overflow-hidden border ${bg} shadow-lg select-none`}>

      {/* HEADER */}
      <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">AI Assistant</span>
            <span className="text-sm font-semibold text-gray-900">Prodip's Assistant</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          {isTyping && (
            <button
              onClick={() => { if (latestMessage) { setDisplayedText(latestMessage.text); setIsTyping(false); } }}
              className="px-2 py-1 rounded text-[10px] font-semibold bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200 transition-colors"
            >Skip</button>
          )}
          <button
            onClick={handleSave}
            disabled={messages.length === 0}
            title="Save conversation"
            className="p-1.5 rounded transition-colors disabled:opacity-30 hover:bg-gray-100 text-gray-500"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-green-600" /> : <Download className="w-4 h-4" />}
          </button>
          <button
            onClick={onClearChat}
            disabled={messages.length === 0}
            title="Clear chat"
            className="p-1.5 rounded transition-colors disabled:opacity-30 hover:bg-gray-100 text-gray-500"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SHORTCUT PILLS (scrollable horizontal) */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar shrink-0 border-b border-gray-100">
        {SHORTCUTS.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => onQuerySubmit(s.prompt)}
              disabled={isProcessing}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-40 text-xs font-medium whitespace-nowrap shadow-sm"
            >
              <Icon className={`w-3.5 h-3.5 ${s.iconColor}`} />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* MESSAGES AREA — grows and scrolls */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50/50"
        style={{ overscrollBehavior: 'contain' }}
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
            <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">How can I help?</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-[220px] mx-auto">
                Ask a question about Prodip's projects, experience, or skills.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isLatest = idx === messages.length - 1;
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className={`max-w-[85%] p-3.5 rounded-2xl rounded-tr-sm border shadow-sm space-y-1.5 ${msgUserBg}`}>
                    <div className="flex items-center space-x-1 text-[10px] font-semibold uppercase text-gray-500">
                      <User className="w-3 h-3" />
                      <span>You</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{msg.text}</p>
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
                <div className={`max-w-[90%] p-4 rounded-2xl rounded-tl-sm border shadow-sm space-y-3 ${msgAgentBg}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <Bot className="w-3 h-3" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        {isLatest && isTyping ? 'Writing...' : 'Assistant'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-400 transition-colors"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {textToRender}
                    {isLatest && isTyping && (
                      <span className="inline-block animate-pulse ml-1 w-1.5 h-4 bg-blue-600 align-middle"></span>
                    )}
                  </div>
                  {msg.thoughtProcess && msg.thoughtProcess.length > 0 && (
                    <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-1.5 text-[10px]">
                      <span className="font-semibold text-gray-500 py-0.5">Sources:</span>
                      {msg.thoughtProcess.map((tp, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full font-medium bg-gray-100 border border-gray-200 text-gray-600">
                          {tp}
                        </span>
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
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200 bg-white shadow-sm flex items-center space-x-3 text-sm text-gray-500">
              <Bot className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>Analyzing...</span>
            </div>
          </div>
        )}
      </div>

      {/* PINNED INPUT BAR */}
      <div className="shrink-0 p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 ${inputBg}`}>
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            placeholder="Ask a question..."
            className="flex-1 bg-transparent text-sm focus:outline-none min-w-0 select-text cursor-text"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-center mt-2 text-[10px] text-gray-400 gap-1 font-medium">
          <CheckCircle2 className="w-3 h-3 text-green-500" />
          <span>Powered by Gemini 3.6 Flash</span>
        </div>
      </div>
    </div>
  );
};
