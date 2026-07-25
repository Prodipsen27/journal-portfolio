import React from 'react';

interface JournalBackCoverProps {
  onCloseJournal?: () => void;
}

export function JournalBackCover({ onCloseJournal }: JournalBackCoverProps) {
  return (
    <div 
      className="w-full h-full cursor-pointer bg-gradient-to-bl from-[#1F1C18] to-[#120F0D] rounded-l-xl rounded-r-md shadow-inner border border-[#3a352e] overflow-hidden relative select-none"
      onClick={onCloseJournal}
    >
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }}></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#110c0a] to-transparent z-20 shadow-[inset_2px_0_10px_rgba(0,0,0,0.5)]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border border-[#8C8577]/30 flex items-center justify-center text-[#f7e8c8] font-handwriting text-lg font-bold">
          P
        </div>
      </div>
    </div>
  );
}
