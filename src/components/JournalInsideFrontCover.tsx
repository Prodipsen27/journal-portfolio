import React from 'react';

export function JournalInsideFrontCover() {
  return (
    <div className="w-full h-full bg-[#FAF7F0] p-8 flex flex-col justify-between border-r border-[#DCCFAF] relative select-none">
      {/* Endpaper marbled/textured pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/vintage-paper.png")' }}></div>

      {/* Top Ex Libris Bookplate Stamp */}
      <div className="border-2 border-[#8C2121]/30 p-4 rounded text-center my-auto bg-[#FDFBF7] shadow-sm relative">
        <span className="font-mono text-xs text-[#8C2121] tracking-widest uppercase block mb-1">Ex Libris</span>
        <h2 className="font-playfair text-2xl font-bold text-[#20242B]">Prodip Sengupta</h2>
        <p className="font-journal text-xs text-[#6B7280] italic mt-1">Full-Stack GenAI Expedition Field Journal</p>
        <div className="w-12 h-0.5 bg-[#8C2121]/40 mx-auto my-3" />
        <p className="font-mono text-[10px] text-[#9CA3AF]">EST. 2024 • INDIA</p>
      </div>

      {/* Bottom Edition Note */}
      <div className="text-center font-mono text-[10px] text-[#8C8577] tracking-wider uppercase">
        Personal Dossier & Architectural Logs
      </div>
    </div>
  );
}
