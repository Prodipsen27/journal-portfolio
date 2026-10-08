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
            <div>
              <span className="font-typewriter text-[9px] text-[#8C8577] font-bold uppercase tracking-widest block">
                INTERACTIVE
              </span>
              <h2 className="font-journal text-2xl sm:text-3xl font-bold text-[#20242B]">
                AI Chat Response
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isTyping && (
              <button
                onClick={skipTyping}
                className="px-2 py-1 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[10px] font-typewriter text-[#4B5566] font-bold hover:bg-[#DCCFAF] transition-colors"
              >
                Skip Typing
              </button>
            )}
            {messages.length > 0 && onClearChat && (
              <button
                onClick={onClearChat}
                className="p-1.5 rounded hover:bg-[#EFE6D2] text-[#8C8577] transition-colors"
                title="Clear chat history"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONVERSATION AREA */}
      <div ref={chatContainerRef} className="my-3 flex-1 overflow-y-auto space-y-4 pr-1 h-full">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 my-12">
            <div className="w-12 h-12 rounded-full bg-[#EFE6D2] flex items-center justify-center text-[#8C8577] shadow-sm">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-journal text-xl font-bold text-[#20242B]">
              Ready to answer your questions.
            </h3>
            <p className="font-journal text-sm text-[#8C8577] max-w-xs leading-relaxed">
              Select a topic on the left or type your own question.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isLatest = idx === messages.length - 1;

            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="p-3 px-4 rounded-lg bg-[#EFE6D2]/60 border border-[#DCCFAF] shadow-sm space-y-1 ml-4">
                  <div className="flex items-center justify-between text-[9px] font-typewriter text-[#8C8577]">
                    <span className="font-bold uppercase flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>You</span>
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="font-journal text-sm sm:text-base text-[#20242B]">
                    {msg.text}
                  </p>
                </div>
              );
            }

            const textToRender = isLatest && isTyping ? displayedText : msg.text;

            return (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-white border border-[#DCCFAF] shadow-sm space-y-3 relative mr-4"
              >
                <div className="flex items-center justify-between border-b border-[#EFE6D2] pb-2">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-[#8C8577]" />
                    <span className="font-typewriter text-[10px] font-bold text-[#4B5566] uppercase tracking-wider">
                      AI Assistant {isLatest && isTyping ? 'IS WRITING...' : ''}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(msg.text, idx)}
                    className="p-1 text-[#8C8577] hover:text-[#4B5566] transition-colors"
                    title="Copy response"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="relative font-journal text-sm sm:text-base text-[#20242B] leading-relaxed whitespace-pre-wrap">
                  {textToRender}
                  {isLatest && isTyping && (
                    <span className="inline-block animate-pulse ml-1 w-2 h-4 bg-[#20242B] align-middle" />
                  )}
                </div>

                {msg.thoughtProcess && msg.thoughtProcess.length > 0 && (
                  <div className="pt-2 border-t border-[#EFE6D2] flex flex-wrap gap-1 font-typewriter text-[9px] text-[#8C8577]">
                    <span className="font-bold">Context:</span>
                    {msg.thoughtProcess.map((tp, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-[#FBF7EE] text-[#4B5566] border border-[#DCCFAF]">
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
          <div className="p-3 rounded-lg bg-white border border-[#DCCFAF] flex items-center space-x-2 text-xs font-typewriter text-[#8C8577] mr-4 shadow-sm">
            <Bot className="w-4 h-4 animate-pulse" />
            <span>Formulating reply...</span>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="pt-2 border-t border-[#8C8577]/20 flex items-center justify-between font-typewriter text-[9px] text-[#8C8577]">
        <div className="flex items-center space-x-1">
          <CheckCircle2 className="w-3 h-3 text-[#3B6B58]" />
          <span>POWERED BY GEMINI 3.6 FLASH</span>
        </div>
        <span>FIELD LOG #04</span>
      </div>
    </div>
  );
};
