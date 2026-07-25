import React from 'react';

export function JournalInsideBackCover() {
  return (
    <div className="w-full h-full bg-[#FAF7F0] p-8 flex flex-col justify-between border-l border-[#DCCFAF] relative select-none">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/vintage-paper.png")' }}></div>

      <div className="my-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#8C2121]/30 mx-auto flex items-center justify-center text-[#8C2121] font-bold font-handwriting text-xl">
          P
        </div>
        <h3 className="font-journal text-lg font-bold text-[#20242B]">End of Journal</h3>
        <p className="font-typewriter text-xs text-[#6B7280] max-w-xs mx-auto">
          Thank you for exploring the expedition field log.
        </p>
      </div>

      <div className="text-center font-mono text-[10px] text-[#8C8577]">
        ALL RIGHTS RESERVED • PRODIP SENGUPTA
      </div>
    </div>
  );
}
