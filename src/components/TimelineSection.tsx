import React from 'react';
import { motion } from 'motion/react';
import { CAREER_TIMELINE } from '../data/portfolioData';
import { Bookmark, Code2, Layout, Server, Cpu, CheckCircle2 } from 'lucide-react';
import { JournalAILine } from './JournalAILine';

export const TimelineSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4 text-[#9C3B3B]" />;
      case 'Layout': return <Layout className="w-4 h-4 text-[#5C7C74]" />;
      case 'Server': return <Server className="w-4 h-4 text-[#B08D3F]" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-[#20242B]" />;
      default: return <Code2 className="w-4 h-4 text-[#9C3B3B]" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* SECTION HEADER */}
      <div className="pb-4 border-b border-[#8C8577]/30">
        <div className="flex items-center space-x-2">
          <Bookmark className="w-6 h-6 text-[#9C3B3B]" />
          <h2 className="font-journal text-3xl font-bold text-[#20242B]">
            Margin Notes · Growth Timeline
          </h2>
        </div>
        <p className="font-journal text-xs text-[#4B5566] mt-1">
          Chronological entries tracking evolution from CS basics to autonomous agent engineering.
        </p>
      </div>

      {/* TIMELINE MARGIN CONTAINER */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-[#9C3B3B]/40 space-y-8 my-6">
        {CAREER_TIMELINE.map((entry, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -16, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Year Stamp Badge */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-full wax-seal flex items-center justify-center shadow-md">
              <span className="font-typewriter text-xs font-bold text-[#fbf7ee]">
                {entry.year.slice(2)}
              </span>
            </div>

            {/* Sticky Note Card */}
            <div 
              style={{
                transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1deg'})`,
              }}
              className="p-5 rounded-xs bg-[#FAF4CE] dark:bg-[#282e3a] border-2 border-[#1c222c] dark:border-[#E6DFCF] border-l-[#9C3B3B] dark:border-l-[#E56B6B] shadow-[5px_5px_0px_rgba(0,0,0,0.15)] space-y-3 relative hover:-translate-y-1 hover:shadow-[7px_7px_0px_rgba(0,0,0,0.2)] transition-all duration-300"
            >
              {/* Hand-drawn paper tape tack at the top */}
              <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 w-10 h-6 bg-[#FAFAFA] dark:bg-[#EAEAEA] border-2 border-black/80 dark:border-white/90 shadow-sm rotate-[-1deg] z-10 flex flex-col justify-between overflow-hidden">
                <div className="w-full h-1 border-b border-dashed border-black/30" />
                <div className="w-full h-1 border-t border-dashed border-black/30" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#DCCFAF] dark:border-[#524933] gap-1">
                <div>
                  <span className="font-typewriter text-xs text-[#9C3B3B] dark:text-[#E56B6B] font-bold uppercase tracking-wider">
                    {entry.year} · {entry.subtitle}
                  </span>
                  <h3 className="font-journal text-xl font-bold text-[#20242B] dark:text-[#E6DFCF]">
                    {entry.title}
                  </h3>
                </div>
                <div className="p-1.5 rounded bg-[#EFE6D2] dark:bg-[#2D2A24] border border-[#BCAE8E] dark:border-[#524933] self-start sm:self-auto">
                  {getIcon(entry.iconName)}
                </div>
              </div>

              <p className="font-journal text-xs sm:text-sm text-[#4B5566] dark:text-[#B0B7C6] leading-relaxed">
                {entry.description}
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {entry.highlights.map((item, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center space-x-1 text-xs font-typewriter px-2.5 py-0.5 rounded bg-[#EFE6D2] dark:bg-[#2D2A24] text-[#20242B] dark:text-[#E6DFCF] border border-[#BCAE8E] dark:border-[#524933]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#5C7C74] dark:text-[#4ADE80]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM AI QUESTION LINE */}
      <JournalAILine />
    </motion.div>
  );
};
