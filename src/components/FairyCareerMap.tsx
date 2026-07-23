import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Scroll, Wand2, ShieldCheck, CheckCircle2, ChevronDown, MapPin } from 'lucide-react';

interface TimelineNode {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  landmark: string;
  region: string;
  highlights: string[];
  xPos: 'left' | 'right';
  icon: string;
}

const CAREER_NODES: TimelineNode[] = [
  {
    year: "2022",
    title: "Started Coding",
    subtitle: "Foundational Computer Science",
    description: "Core programming logic, algorithms, and fundamental computer science concepts.",
    landmark: "The Codex of Logic",
    region: "Kingdom of Algorithms",
    highlights: ["Programming Logic", "Algorithms & CS Basics", "JavaScript Foundations"],
    xPos: "left",
    icon: "📜"
  },
  {
    year: "2024",
    title: "Started WebDev",
    subtitle: "Frontend Interfaces & Styling",
    description: "Modern frontend web interfaces, layout styling, responsive design, and interactive logic.",
    landmark: "The Enchanter's Portal",
    region: "Sea of DOM & CSS",
    highlights: ["Modern React & Tailwind", "Responsive Layouts", "Interactive Canvas UI"],
    xPos: "right",
    icon: "🏰"
  },
  {
    year: "2025",
    title: "Fullstack MERN Dev",
    subtitle: "Isolated Sessions & Gateways",
    description: "Built applications with isolated user sessions, database integrations, and secure web API gateways.",
    landmark: "The Alchemist's Forge",
    region: "Gulf of Full-Stack",
    highlights: ["MERN Architecture", "Database Modeling", "API Gateway Security"],
    xPos: "left",
    icon: "⚡"
  },
  {
    year: "2026",
    title: "Fullstack Gen AI",
    subtitle: "Autonomous Agent Reasoning",
    description: "Specialized in agentic architectures, RAG pipelines, function calling, tool use, and multi-agent reasoning graphs.",
    landmark: "The Astral Agent Spire",
    region: "Peak of Multi-Agent Systems",
    highlights: ["LangGraph & MCP", "RAG Pipelines with RRF", "Autonomous AI Agents"],
    xPos: "right",
    icon: "🧙‍♂️"
  }
];

export const FairyCareerMap: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    const currentProgress = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
    setScrollProgress(currentProgress);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // initial calculation
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="space-y-4 select-none">
      {/* SECTION TITLE & MAP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#8C8577]/30 gap-2">
        <div>
          <span className="font-typewriter text-[10px] text-[#9C3B3B] font-bold uppercase tracking-widest block">
            FAIRY MAP · ENCHANTED REALM OF GROWTH
          </span>
          <h2 className="font-journal italic text-2xl sm:text-3xl font-bold text-[#20242B]">
            Career Timeline & Growth
          </h2>
        </div>

        {/* SCROLL PROGRESS BADGE */}
        <div className="flex items-center space-x-2 bg-[#FBF7EE] border border-[#BCAE8E] px-3 py-1.5 rounded-full shadow-2xs">
          <Wand2 className="w-3.5 h-3.5 text-[#9C3B3B] animate-bounce" />
          <div className="font-typewriter text-[10px] font-bold text-[#20242B]">
            TRAVERSED: <span className="text-[#9C3B3B]">{Math.round(scrollProgress)}%</span>
          </div>
          <div className="w-12 h-1.5 bg-[#EFE6D2] rounded-full overflow-hidden border border-[#DCCFAF]">
            <div 
              className="h-full bg-gradient-to-r from-[#B08D3F] via-[#9C3B3B] to-[#5C7C74] transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* MAP PARCHMENT CONTAINER WITH CUSTOM SCROLL AREA */}
      <div className="relative rounded-xl border-2 border-[#BCAE8E] bg-[#F9F4E8] shadow-md overflow-hidden">
        {/* PARCHMENT MAP TEXTURE OVERLAYS */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #B08D3F 1px, transparent 1px), radial-gradient(circle at 20% 80%, #9C3B3B 1px, transparent 1px)`,
            backgroundSize: '36px 36px, 48px 48px'
          }}
        />

        {/* HAND-SKETCHED COMPASS ROSE IN TOP RIGHT */}
        <div className="absolute top-3 right-4 z-10 pointer-events-none opacity-85 hidden sm:flex flex-col items-center">
          <div className="relative w-14 h-14 border border-dashed border-[#BCAE8E] rounded-full flex items-center justify-center p-1 bg-[#FBF7EE]/60 backdrop-blur-2xs shadow-2xs">
            <Compass className="w-8 h-8 text-[#9C3B3B] animate-spin-slow" />
            <span className="absolute top-0 font-handwriting text-[9px] font-bold text-[#9C3B3B]">N</span>
            <span className="absolute bottom-0 font-handwriting text-[9px] font-bold text-[#8C8577]">S</span>
            <span className="absolute left-1 font-handwriting text-[9px] font-bold text-[#8C8577]">W</span>
            <span className="absolute right-1 font-handwriting text-[9px] font-bold text-[#8C8577]">E</span>
          </div>
          <span className="font-handwriting text-[10px] text-[#8C8577] mt-0.5 font-bold">
            Realm of Code
          </span>
        </div>

        {/* TOP WASHI TAPE TACK */}
        <div className="wasi-tape absolute -top-3 left-12 w-20 h-4 washi-tape rotate-[-2deg] z-20" />

        {/* SCROLLABLE MAP BODY */}
        <div 
          ref={scrollRef}
          className="max-h-[460px] sm:max-h-[500px] overflow-y-auto p-4 sm:p-6 relative z-10 space-y-8 scroll-smooth"
        >
          {/* MAP TITLE SUBTITLE EMBOSSED */}
          <div className="text-center pb-2 border-b border-dashed border-[#DCCFAF]">
            <span className="font-handwriting text-2xl text-[#9C3B3B] font-bold block">
              ~ The Hand-Drawn Odyssey of Prodip Sengupta ~
            </span>
            <p className="font-typewriter text-[10px] text-[#8C8577]">
              Scroll downwards to illuminate the golden path through time & milestone realms
            </p>
          </div>

          {/* SVG WINDING FAIRY PATH BACKGROUND */}
          <div className="relative">
            {/* CENTRAL SVG DASHED FAIRY PATH LINE */}
            <svg 
              className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-full h-[calc(100%-20px)] pointer-events-none z-0"
              preserveAspectRatio="none"
              viewBox="0 0 100 400"
            >
              {/* Base Hand-Drawn Dashed Path */}
              <path
                d="M 50 10 Q 20 80, 50 130 T 50 250 T 50 380"
                fill="none"
                stroke="#BCAE8E"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              {/* Active Golden Glow Progress Path */}
              <path
                d="M 50 10 Q 20 80, 50 130 T 50 250 T 50 380"
                fill="none"
                stroke="#9C3B3B"
                strokeWidth="4"
                strokeDasharray="400"
                strokeDashoffset={400 - (scrollProgress / 100) * 400}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>

            {/* NODES LIST */}
            <div className="space-y-8 relative z-10">
              {CAREER_NODES.map((node, idx) => {
                const isReached = (scrollProgress >= (idx / (CAREER_NODES.length - 1)) * 75) || idx === 0;
                const isSelected = selectedNode === idx;

                return (
                  <motion.div
                    key={node.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`flex flex-col ${
                      node.xPos === 'left' ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    } items-center gap-4 group cursor-pointer`}
                    onClick={() => setSelectedNode(isSelected ? null : idx)}
                  >
                    {/* CARD CONTENT */}
                    <div className="w-full sm:w-[46%]">
                      <div className={`p-4 rounded-lg transition-all duration-300 relative border ${
                        isReached
                          ? 'bg-[#FBF7EE] border-[#9C3B3B] shadow-md'
                          : 'bg-[#F5EFE4]/80 border-[#DCCFAF] opacity-75'
                      } ${isSelected ? 'ring-2 ring-[#9C3B3B]' : ''}`}>
                        {/* Washi tape accent on corner */}
                        <div className={`wasi-tape absolute -top-2 ${node.xPos === 'left' ? 'right-4' : 'left-4'} w-10 h-3 opacity-70`} />

                        {/* Node Header */}
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#DCCFAF]">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{node.icon}</span>
                            <div>
                              <span className="font-typewriter text-[10px] text-[#9C3B3B] font-bold uppercase tracking-wider block">
                                {node.year} · {node.region}
                              </span>
                              <h3 className="font-handwriting text-2xl font-bold text-[#20242B] leading-none">
                                {node.title}
                              </h3>
                            </div>
                          </div>
                          <span className="font-typewriter text-[9px] px-1.5 py-0.5 rounded bg-[#EFE6D2] text-[#8C8577] border border-[#BCAE8E]">
                            {node.landmark}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="font-journal text-xs sm:text-sm text-[#4B5566] mt-2 leading-relaxed">
                          {node.description}
                        </p>

                        {/* Highlights pills */}
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-dashed border-[#DCCFAF]">
                          {node.highlights.map((item, hIdx) => (
                            <span 
                              key={hIdx} 
                              className="inline-flex items-center space-x-1 text-[10px] font-typewriter px-2 py-0.5 rounded bg-[#EFE6D2] text-[#20242B] border border-[#BCAE8E]"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#3B6B58]" />
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* WAYPOINT SEAL / ICON IN CENTER */}
                    <div className="shrink-0 relative my-1 sm:my-0 z-20">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                        isReached
                          ? 'wax-seal scale-110 border-2 border-[#FFF8EB]'
                          : 'bg-[#DCCFAF] border-2 border-[#BCAE8E]'
                      }`}>
                        <span className="font-typewriter text-xs font-bold text-[#FBF7EE]">
                          {node.year}
                        </span>
                      </div>
                      {isReached && (
                        <Sparkles className="w-4 h-4 text-[#B08D3F] absolute -top-1 -right-1 animate-ping" />
                      )}
                    </div>

                    {/* SPACER FOR BALANCED FLEX GRID */}
                    <div className="hidden sm:block sm:w-[46%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MAP FOOTER NOTE & STAMP */}
          <div className="p-3 rounded-lg bg-[#FBF7EE] border border-[#BCAE8E] text-center space-y-1 mt-6">
            <span className="font-handwriting text-xl text-[#9C3B3B] font-bold block">
              "Every line of code is a step further across the enchanted frontier."
            </span>
            <div className="flex items-center justify-center space-x-2 font-typewriter text-[10px] text-[#8C8577]">
              <Scroll className="w-3.5 h-3.5 text-[#8C8577]" />
              <span>JOURNAL MAP ENTRY · CARTOGRAPHER: PRODIP SENGUPTA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
