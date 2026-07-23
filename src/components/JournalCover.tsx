import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Key, Compass, Lock, Unlock } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface JournalCoverProps {
  onOpenJournal: () => void;
}

export const JournalCover: React.FC<JournalCoverProps> = ({ onOpenJournal }) => {
  const [isStrapHovered, setIsStrapHovered] = useState(false);
  const [isUntying, setIsUntying] = useState(false);

  const handleOpen = () => {
    setIsUntying(true);
    setTimeout(() => {
      onOpenJournal();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0a08] flex items-center justify-center p-4 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a281c]/30 via-[#18110b]/80 to-[#070504] pointer-events-none" />

      {/* Book Container */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: isUntying ? 1.05 : 1, opacity: isUntying ? 0 : 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-xl aspect-[1/1.38] journal-cover rounded-xl p-8 sm:p-12 flex flex-col justify-between border-2 border-[#8c714a]/40 shadow-2xl overflow-hidden cursor-pointer group"
        onClick={handleOpen}
      >
        {/* Spine line along left edge */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 bg-gradient-to-r from-[#0d0a08] via-[#2d2118] to-transparent border-r border-[#8c714a]/30" />

        {/* Golden Foil Stitched Border Frame */}
        <div className="absolute inset-4 sm:inset-6 border border-dashed border-[#B08D3F]/40 rounded-lg pointer-events-none" />

        {/* Top Cover Header */}
        <div className="relative z-10 flex justify-between items-start pt-2">
          <div className="flex items-center space-x-2 text-[#B08D3F] text-xs font-typewriter uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#B08D3F]" />
            <span>Vol. 2026 · Confidential</span>
          </div>
          {/* Wax Seal Graphic */}
          <div className="w-12 h-12 rounded-full wax-seal flex items-center justify-center text-[#fbf7ee] font-handwriting text-lg font-bold shadow-lg transform rotate-[-6deg] border border-[#d27575]/40">
            PS
          </div>
        </div>

        {/* Center Cover Title */}
        <div className="relative z-10 text-center my-auto py-8">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#d4b996] mb-1">
            Property of
          </p>
          <h1 className="font-journal text-3xl sm:text-5xl font-bold tracking-tight text-[#f3e5c8] drop-shadow-md mb-2">
            {PROFILE_DATA.name}
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B08D3F] to-transparent mx-auto my-4" />
          <p className="font-typewriter text-xs sm:text-sm uppercase tracking-widest text-[#B08D3F]">
            Field Journal & Technical Notes
          </p>
          <p className="font-journal italic text-sm text-[#a89073] mt-3">
            "{PROFILE_DATA.quote}"
          </p>
        </div>

        {/* Taped Photo Booth Strip Preview */}
        <div className="relative z-10 flex justify-between items-end">
          <div className="bg-[#EFE6D2] p-2.5 rounded shadow-lg transform -rotate-3 border border-[#DCCFAF] max-w-[170px] hidden sm:block">
            <div className="wasi-tape absolute -top-2.5 left-4 w-12 h-4 washi-tape rotate-[-4deg]" />
            <p className="font-handwriting text-xs text-[#20242B] font-bold">Oct 14, 2026</p>
            <p className="font-typewriter text-[10px] text-[#4B5566]">27+ Systems Built</p>
          </div>

          <div className="text-right font-typewriter text-xs text-[#8C8577]">
            <p className="text-[#B08D3F]">Open to Work</p>
            <p>27+ Projects · India</p>
          </div>
        </div>

        {/* THE ELASTIC BAND STRAP ACROSS THE RIGHT SIDE */}
        <motion.div
          onMouseEnter={() => setIsStrapHovered(true)}
          onMouseLeave={() => setIsStrapHovered(false)}
          className={`absolute top-0 bottom-0 right-12 sm:right-16 w-5 sm:w-6 bg-gradient-to-r from-[#171310] via-[#9C3B3B] to-[#171310] border-x border-[#c44e4e]/40 shadow-2xl z-20 transition-all duration-300 ${
            isStrapHovered ? 'scale-x-110 shadow-[0_0_15px_rgba(156,59,59,0.6)]' : ''
          }`}
        >
          {/* Tag on elastic strap */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-28 bg-[#9C3B3B] text-[#fbf7ee] text-[10px] font-typewriter px-2.5 py-1.5 rounded border border-[#e67373] shadow-lg flex items-center space-x-1.5 transform group-hover:scale-105 transition-transform">
            {isStrapHovered ? <Unlock className="w-3 h-3 text-emerald-300" /> : <Lock className="w-3 h-3 text-[#fbf7ee]" />}
            <span>Click to Untie & Open</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
