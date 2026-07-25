import React from 'react';

export function JournalTitlePage() {
  return (
    <div className="w-full h-full bg-[#FDFBF7] p-10 flex flex-col justify-between border-l border-[#DCCFAF] relative select-none">
      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/vintage-paper.png")' }}></div>

      <div className="my-auto text-center space-y-6">
        <div className="font-mono text-xs text-[#9C3B3B] tracking-[0.3em] uppercase">
          Volume 01 • Confidential
        </div>

        <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-[#1A1816] tracking-wide leading-tight">
          PRODIP<br />SENGUPTA
        </h1>

        <div className="w-16 h-0.5 bg-[#9C3B3B] mx-auto" />

        <p className="font-typewriter text-sm text-[#4B5563] tracking-widest uppercase">
          Full-Stack GenAI Engineer
        </p>

        <p className="font-journal text-xs text-[#6B7280] italic max-w-xs mx-auto leading-relaxed">
          "Building production-grade AI agents, RAG systems, & scalable web applications."
        </p>
      </div>

      <div className="flex justify-between items-center font-mono text-[10px] text-[#9CA3AF] border-t border-[#E5E7EB] pt-4">
        <span>FIELD LOGS</span>
        <span>2024–2026 EDITION</span>
      </div>
    </div>
  );
}
