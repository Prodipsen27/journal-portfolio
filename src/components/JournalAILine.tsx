import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, CornerDownLeft, Loader2, RefreshCw } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface InkBlot {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  splatters: Array<{ dx: number; dy: number; size: number }>;
}

interface JournalAILineProps {
  onOpenSandbox?: (prompt?: string) => void;
}

export const JournalAILine: React.FC<JournalAILineProps> = ({ onOpenSandbox }) => {
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [inkBlots, setInkBlots] = useState<InkBlot[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerInkSpill = (clientX?: number, clientY?: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    let x = clientX !== undefined ? clientX - rect.left : rect.width * 0.25;
    let y = clientY !== undefined ? clientY - rect.top : rect.height * 0.5;

    x = Math.max(10, Math.min(rect.width - 10, x));
    y = Math.max(5, Math.min(rect.height - 5, y));

    const newBlot: InkBlot = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.floor(Math.random() * 12) + 16,
      rotation: Math.floor(Math.random() * 360),
      splatters: [
        { dx: (Math.random() - 0.5) * 24, dy: (Math.random() - 0.5) * 24, size: Math.random() * 5 + 3 },
        { dx: (Math.random() - 0.5) * 32, dy: (Math.random() - 0.5) * 32, size: Math.random() * 4 + 2 },
      ]
    };

    setInkBlots(prev => [...prev.slice(-7), newBlot]);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLDivElement>) => {
    triggerInkSpill(e.clientX, e.clientY);
  };

  const handleInquire = async () => {
    if (!question.trim() || isTyping) return;

    const currentQ = question;
    setQuestion('');
    setIsTyping(true);
    setReply(null);
    setTypedText('');

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentQ })
      });

      let answerText = "";
      if (response.ok) {
        const data = await response.json();
        answerText = data.answer || data.reply || "Grounded response verified.";
      } else {
        answerText = getFallbackAnswer(currentQ);
      }

      setReply(answerText);
      typeOutResponse(answerText);
    } catch {
      const fallback = getFallbackAnswer(currentQ);
      setReply(fallback);
      typeOutResponse(fallback);
    }
  };

  const typeOutResponse = (text: string) => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(text.slice(0, index));
      index += 3;
      if (index > text.length) {
        setTypedText(text);
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 18);
  };

  const getFallbackAnswer = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes('experience') || lower.includes('background') || lower.includes('years')) {
      return `[ENTRY LOG: 2026] Prodip Sengupta holds 1+ years of full-stack engineering experience, having built and deployed 27+ systems spanning MERN e-commerce platforms, LangGraph AI agents, and RAG search pipelines.`;
    }
    if (lower.includes('project') || lower.includes('vitaltrace') || lower.includes('findoc')) {
      return `[ENTRY LOG: PROJECTS] Key systems in this journal: VitalTrace AI (health telemetry assistant), FinDoc AI (RAG SEC analyzer with pgvector RRF), and Grocery Delivery (Gemini auto-cart agent).`;
    }
    if (lower.includes('hire') || lower.includes('contact') || lower.includes('email')) {
      return `[ENTRY LOG: CONTACT] Prodip is Open to Work for 2026 roles & project contracts. Reach him directly at: prodipsengupta27@gmail.com`;
    }
    return `[ENTRY LOG: SYSTEM NOTE] Grounded answer regarding "${q}": Prodip is a Full-stack GenAI Engineer specializing in React/Next.js, Node.js API Gateways, and autonomous Gemini/Claude agent loops.`;
  };

  return (
    <div className="mt-12 pt-8 border-t border-[#8C8577]/30">
      {/* Question Input Line */}
      <div 
        ref={containerRef}
        onClick={handleInputClick}
        className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 overflow-visible"
      >
        {/* Render Ink Blots */}
        {inkBlots.map((blot) => (
          <React.Fragment key={blot.id}>
            {/* Main organic ink stain */}
            <div
              className="ink-blot-spot z-20"
              style={{
                left: `${blot.x}px`,
                top: `${blot.y}px`,
                width: `${blot.size}px`,
                height: `${blot.size * 0.85}px`,
                '--ink-rot': `${blot.rotation}deg`,
              } as React.CSSProperties}
            />
            {/* Satellite tiny droplets */}
            {blot.splatters.map((s, idx) => (
              <div
                key={idx}
                className="ink-splatter-dot z-20"
                style={{
                  left: `${blot.x + s.dx}px`,
                  top: `${blot.y + s.dy}px`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  '--ink-rot': `${blot.rotation + idx * 45}deg`,
                } as React.CSSProperties}
              />
            ))}
          </React.Fragment>
        ))}

        <div className="flex-1 relative z-10">
          <input
            type="text"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (Math.random() > 0.65) triggerInkSpill();
            }}
            onFocus={() => triggerInkSpill()}
            onKeyDown={(e) => e.key === 'Enter' && handleInquire()}
            placeholder="write a question here…"
            className="w-full py-2 px-1 ruled-question-input text-lg focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2 z-10">
          <button
            onClick={handleInquire}
            disabled={!question.trim() || isTyping}
            className="px-4 py-2 rounded bg-[#9C3B3B] text-[#fbf7ee] text-xs font-typewriter hover:bg-[#b84343] disabled:opacity-40 transition-colors shadow flex items-center space-x-1.5"
          >
            {isTyping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CornerDownLeft className="w-3.5 h-3.5" />}
            <span>Inquire</span>
          </button>
        </div>
      </div>

      {/* Typewriter Response Block */}
      <AnimatePresence>
        {(typedText || isTyping) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded bg-[#EFE6D2] border border-[#BCAE8E] shadow-sm relative overflow-hidden"
          >
            <div className="wasi-tape absolute -top-2 left-6 w-16 h-3.5 washi-tape opacity-80" />
            <div className="flex items-center justify-between text-[11px] font-typewriter text-[#8C8577] mb-2 pb-1 border-b border-[#DCCFAF]">
              <span className="flex items-center space-x-1 text-[#9C3B3B] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>TYPEWRITER REPLY</span>
              </span>
              <span>OCT 2026 LOG</span>
            </div>
            <p className="font-typewriter text-xs sm:text-sm text-[#20242B] leading-relaxed whitespace-pre-wrap">
              {typedText}
              {isTyping && <span className="inline-block w-2 h-4 bg-[#9C3B3B] ml-1 animate-pulse" />}
            </p>

            {onOpenSandbox && !isTyping && (
              <div className="mt-3 pt-2 text-right">
                <button
                  onClick={() => onOpenSandbox(typedText)}
                  className="text-[10px] font-typewriter text-[#9C3B3B] hover:underline flex items-center space-x-1 ml-auto"
                >
                  <Terminal className="w-3 h-3" />
                  <span>Open Full AI Reasoning Graph →</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
