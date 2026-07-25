import React from 'react';

export const SpiralBinderSpine: React.FC = () => {
  // 8 evenly spaced binder rings along the vertical spine fold
  const ringPositions = [7, 19, 31, 43, 55, 67, 79, 91];

  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 pointer-events-none z-40">
      {/* 1. Deep Spine Crease Shadow */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/35 via-black/20 to-black/5 opacity-80" />
      
      {/* 2. Central Paper Fold Divider Line */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/40 dark:bg-white/20" />

      {/* 3. Metallic Binder Clips */}
      {ringPositions.map((posPercent, idx) => (
        <div
          key={idx}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${posPercent}%` }}
        >
          {/* Paper Punch Hole Shadow Backdrop */}
          <div className="w-10 sm:w-11 h-4 sm:h-4.5 rounded-full bg-[#1A1614] dark:bg-[#0B0C0E] border border-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_3px_6px_rgba(0,0,0,0.4)] flex items-center justify-center p-0.5">
            
            {/* Metallic Ring Capsule (Dark Metallic in Light mode, Bronze Metallic in Dark mode) */}
            <div className="w-full h-full rounded-full relative overflow-hidden transition-all duration-300 bg-gradient-to-b from-[#4B5362] via-[#232730] to-[#12151B] dark:from-[#E6C280] dark:via-[#B8860B] dark:to-[#5C4008] border border-[#161920] dark:border-[#F5D77F] shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
              
              {/* Metallic Shine Highlight */}
              <div className="absolute top-0.5 left-1.5 right-1.5 h-0.5 bg-gradient-to-r from-transparent via-white/60 dark:via-[#FFF2C2] to-transparent" />
              
              {/* Lower Edge Shadow Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/40 dark:bg-amber-950/70" />
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default SpiralBinderSpine;
