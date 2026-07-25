import React from 'react';

interface JournalCoverProps {
  onOpenJournal?: () => void;
}

export function JournalCover({ onOpenJournal }: JournalCoverProps) {
  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing group relative bg-gradient-to-br from-[#1F1C18] to-[#120F0D] rounded-r-xl rounded-l-md shadow-inner border border-[#3a352e] overflow-hidden select-none"
    >
      {/* Spine edge styling */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#110c0a] to-transparent z-20 shadow-[inset_-2px_0_10px_rgba(0,0,0,0.5)]"></div>
      
      {/* Leather Texture Overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }}></div>

      {/* Book Edge (Pages) showing on the right slightly */}
      <div className="absolute right-0 top-1 bottom-1 w-2 bg-[#e6d9c3] rounded-r-sm z-0 shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)]"></div>

      {/* Cover Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 ml-4 pointer-events-none">
        <div className="w-full h-full border-2 border-[#8C2121]/30 p-2 rounded-sm">
          <div className="w-full h-full border border-[#8C2121]/20 rounded-sm flex flex-col items-center justify-center relative">
            
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#8C2121]/40"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#8C2121]/40"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#8C2121]/40"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#8C2121]/40"></div>

            <h1 className="font-playfair text-4xl md:text-5xl text-[#FBF7EE] text-center mb-6 tracking-wider">
              Prodip<br />Sengupta
            </h1>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#8C2121] to-transparent mb-6"></div>

            <p className="font-mono text-sm tracking-[0.2em] text-[#8C8577] text-center uppercase">
              Field Journal &<br/>Portfolio
            </p>
            
            <div className="absolute bottom-12 mt-12 px-6 py-2 border border-[#8C8577]/30 text-[#8C8577] text-xs font-mono tracking-widest rounded-full group-hover:bg-[#8C2121]/10 group-hover:text-[#FBF7EE] group-hover:border-[#8C2121]/50 transition-colors">
              SLIDE TO OPEN &rarr;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

