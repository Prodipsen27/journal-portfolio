import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, Sparkles, RefreshCw, PenTool, CheckCircle2, Copy, Check } from 'lucide-react';
import { ChatMessage } from '../types';

interface AssistantRightPageProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  onClearChat?: () => void;
}

export const AssistantRightPage: React.FC<AssistantRightPageProps> = ({
  messages,
  isProcessing,
  onClearChat
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Latest AI message typing animation
  const latestMessage = messages[messages.length - 1];
  const isLatestAgent = latestMessage && latestMessage.sender === 'agent';

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll ref for journal conversation container
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLatestAgent) {
      const fullText = latestMessage.text;
      setDisplayedText('');
      setIsTyping(true);

      let currentLength = 0;
      // Stream 1 character per tick (~18ms) for authentic pen writing typewriter reveal
      const interval = setInterval(() => {
        currentLength += 1;
        if (currentLength >= fullText.length) {
          setDisplayedText(fullText);
          setIsTyping(false);
          clearInterval(interval);
        } else {
          setDisplayedText(fullText.slice(0, currentLength));
        }
      }, 18);

      return () => clearInterval(interval);
    } else {
      setDisplayedText('');
      setIsTyping(false);
    }
  }, [latestMessage?.id, latestMessage?.text]);

  // Keep journal scrolled to bottom as handwritten response streams in
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayedText, messages.length, isProcessing]);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const skipTyping = () => {
    if (isLatestAgent && latestMessage) {
      setDisplayedText(latestMessage.text);
      setIsTyping(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-[500px] h-full lined-paper rounded-r-2xl select-none flex flex-col justify-between relative">
      {/* HEADER */}
      <div>
        <div className="pb-3 border-b border-[#8C8577]/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full wax-seal flex items-center justify-center text-[#FBF7EE] font-handwriting font-bold text-sm shadow">
              PS
            </div>
            <div>
              <span className="font-typewriter text-[9px] text-[#9C3B3B] font-bold uppercase tracking-widest block">
                LINED NOTEBOOK LOG · AI TWIN
              </span>
              <h2 className="font-handwriting text-2xl sm:text-3xl font-bold text-[#20242B]">
                Handwritten Response Journal
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isTyping && (
              <button
                onClick={skipTyping}
                className="px-2 py-1 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[10px] font-typewriter text-[#9C3B3B] font-bold hover:bg-[#9C3B3B] hover:text-[#FBF7EE] transition-colors"
              >
                Skip Typing
              </button>
            )}
            {messages.length > 0 && onClearChat && (
              <button
                onClick={onClearChat}
                className="p-1.5 rounded hover:bg-[#EFE6D2] text-[#8C8577] hover:text-[#9C3B3B] transition-colors"
                title="Clear notebook chat history"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONVERSATION AREA ON LINED JOURNAL PAGE */}
      <div ref={chatContainerRef} className="my-3 flex-1 overflow-y-auto space-y-4 pr-1 max-h-[390px]">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 my-12">
            <div className="w-16 h-16 rounded-full bg-[#EFE6D2] border-2 border-[#DCCFAF] flex items-center justify-center text-[#9C3B3B] shadow-inner">
              <PenTool className="w-8 h-8" />
            </div>
            <h3 className="font-handwriting text-3xl font-bold text-[#20242B]">
              "Ask anything on the left page..."
            </h3>
            <p className="font-typewriter text-xs text-[#8C8577] max-w-xs leading-relaxed">
              Inquiries will be answered directly on this lined paper, highlighted in yellow marker as the AI twin writes in fountain pen.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isLatest = idx === messages.length - 1;

            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="p-2.5 px-3.5 rounded-md bg-[#EFE6D2]/90 border border-[#BCAE8E] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-[9px] font-typewriter text-[#8C8577]">
                    <span className="font-bold uppercase text-[#9C3B3B] flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>QUERY ASKED</span>
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="font-journal text-sm font-bold text-[#20242B]">
                    "{msg.text}"
                  </p>
                </div>
              );
            }

            // AGENT HANDWRITTEN REPLY INSIDE HIGHLIGHTED BOX
            const textToRender = isLatest && isTyping ? displayedText : msg.text;

            return (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                /* HIGHLIGHTED BOX ON LINED PAGE */
                className="p-4 rounded-xl bg-[#FEF9C3]/85 border-2 border-[#FDE047] shadow-md space-y-2.5 relative backdrop-blur-xs"
              >
                {/* HIGHLIGHTED BOX HEADER TAG */}
                <div className="flex items-center justify-between border-b border-[#FACC15]/60 pb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-base">✒️</span>
                    <span className="font-typewriter text-[10px] font-bold text-[#9C3B3B] uppercase tracking-wider">
                      PRODIP'S AI TWIN {isLatest && isTyping ? 'IS WRITING...' : 'RESPONSE'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(msg.text, idx)}
                    className="p-1 text-[#8C8577] hover:text-[#9C3B3B] transition-colors"
                    title="Copy handwritten response"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-[#3B6B58]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* HANDWRITTEN TEXT DIRECTLY ON LINED PAGE INSIDE HIGHLIGHT BOX */}
                <div className="relative font-handwriting text-xl sm:text-2xl text-[#1E293B] font-semibold leading-relaxed whitespace-pre-wrap">
                  {textToRender}
                  {isLatest && isTyping && (
                    <span className="inline-block animate-bounce ml-1 text-[#9C3B3B] text-xl">
                      ✒️
                    </span>
                  )}
                </div>

                {/* GROUNDED CONTEXT FOOTER TAGS */}
                {msg.thoughtProcess && msg.thoughtProcess.length > 0 && (
                  <div className="pt-2 border-t border-[#FACC15]/60 flex flex-wrap gap-1 font-typewriter text-[9px] text-[#713F12]">
                    <span className="font-bold text-[#854D0E]">Grounded Context:</span>
                    {msg.thoughtProcess.map((tp, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-[#FEF08A] text-[#854D0E] font-medium border border-[#FDE047]">
                        {tp}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })
        )}

        {isProcessing && (
          <div className="p-3.5 rounded-xl bg-[#FEF9C3]/70 border border-[#FDE047] flex items-center space-x-3 text-xs font-typewriter text-[#9C3B3B]">
            <PenTool className="w-4 h-4 animate-spin text-[#9C3B3B]" />
            <span>Formulating handwritten reply on lined page...</span>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="pt-2 border-t border-[#8C8577]/20 flex items-center justify-between font-typewriter text-[9px] text-[#8C8577]">
        <div className="flex items-center space-x-1">
          <CheckCircle2 className="w-3 h-3 text-[#3B6B58]" />
          <span>REAL-TIME GEMINI 3.6 FLASH TWIN</span>
        </div>
        <span>FIELD LOG #04</span>
      </div>
    </div>
  );
};
