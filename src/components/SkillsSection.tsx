import React from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Bookmark, Sparkles, Check } from 'lucide-react';
import { JournalAILine } from './JournalAILine';

export const SkillsSection: React.FC = () => {
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
            Inside Back Cover · Skills & Instruments
          </h2>
        </div>
        <p className="font-journal text-xs text-[#4B5566] mt-1">
          A list taped into the notebook detailing technologies and reasoning frameworks.
        </p>
      </div>

      {/* TAPED-IN INSIDE BACK COVER PAPER SHEET */}
      <div className="p-6 sm:p-8 rounded-lg bg-[#FBF7EE] border-2 border-[#DCCFAF] shadow-md relative overflow-hidden">
        {/* Corner Washi Tape Straps */}
        <div className="wasi-tape absolute -top-3 left-8 w-20 h-4 washi-tape rotate-[-2deg]" />
        <div className="wasi-tape absolute -top-3 right-8 w-20 h-4 washi-tape rotate-[2deg]" />

        {/* Handwritten Cover Title */}
        <div className="mb-8 border-b border-dashed border-[#BCAE8E] pb-4">
          <h3 className="font-handwriting text-3xl sm:text-4xl text-[#9C3B3B] font-bold">
            "Things I Reach for Daily & Mastered"
          </h3>
          <p className="font-typewriter text-xs text-[#8C8577]">
            Recorded in pencil · Graded by practical implementation depth
          </p>
        </div>

        {/* Skill Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <h4 className="font-handwriting text-2xl font-bold text-[#20242B] flex items-center space-x-2 border-b border-[#DCCFAF] pb-2">
                <span className="w-2 h-2 rounded-full bg-[#9C3B3B]" />
                <span>{category.title}</span>
              </h4>

              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => {
                  // Convert percentage to pencil tally mark count
                  const tallyCount = Math.round(skill.percentage / 10);
                  const tallies = "|||| ".repeat(Math.floor(tallyCount / 5)) + "|".repeat(tallyCount % 5);

                  return (
                    <div key={skillIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-journal font-bold text-[#20242B] flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-[#5C7C74]" />
                          <span>{skill.name}</span>
                        </span>
                        <span className="font-typewriter text-xs font-bold text-[#9C3B3B]">
                          {tallies}
                        </span>
                      </div>

                      {/* Pencil Underline instead of dashboard progress bar */}
                      <div className="w-full border-b-2 border-dotted border-[#8C8577]/40 pt-1" />

                      {skill.description && (
                        <p className="font-journal text-xs text-[#4B5566] italic pl-5">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ARCHITECTURAL SPECIALIZATION STAMPS */}
        <div className="mt-10 pt-6 border-t-2 border-[#DCCFAF] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-xs font-typewriter">
            <p className="font-bold text-[#9C3B3B]">LangGraph JS</p>
            <p className="text-[11px] text-[#4B5566]">Multi-agent graphs with cyclic memory</p>
          </div>
          <div className="p-3 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-xs font-typewriter">
            <p className="font-bold text-[#5C7C74]">pgvector RRF</p>
            <p className="text-[11px] text-[#4B5566]">Hybrid dense vector & keyword RAG</p>
          </div>
          <div className="p-3 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-xs font-typewriter">
            <p className="font-bold text-[#B08D3F]">Gemini Function API</p>
            <p className="text-[11px] text-[#4B5566]">Structured tools & schema parsing</p>
          </div>
          <div className="p-3 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-xs font-typewriter">
            <p className="font-bold text-[#20242B]">MERN + Next.js</p>
            <p className="text-[11px] text-[#4B5566]">Server streaming & isolated JWT auth</p>
          </div>
        </div>
      </div>

      {/* BOTTOM AI QUESTION LINE */}
      <JournalAILine />
    </motion.div>
  );
};
