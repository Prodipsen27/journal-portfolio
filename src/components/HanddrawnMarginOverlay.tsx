import React, { useMemo } from 'react';

interface HanddrawnMarginOverlayProps {
  pageSide?: 'left' | 'right';
  className?: string;
}

export const HanddrawnMarginOverlay: React.FC<HanddrawnMarginOverlayProps> = ({
  pageSide = 'left',
  className = ''
}) => {
  // Generate stable random placements for margin doodles
  const marginDoodles = useMemo(() => {
    return [
      // Top margin doodle: hand-sketched starburst
      {
        id: 'starburst',
        style: pageSide === 'left' ? { top: '8px', left: '12px' } : { top: '8px', right: '16px' },
        svg: (
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="text-[#9C3B3B] dark:text-[#E56B6B] opacity-40">
            <path d="M20 4 L20 36 M4 20 L36 20 M8 8 L32 32 M32 8 L8 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        )
      },
      // Side margin doodle: curly spiral arrow
      {
        id: 'spiralArrow',
        style: pageSide === 'left' ? { top: '45%', left: '4px' } : { top: '35%', right: '4px' },
        svg: (
          <svg width="32" height="48" viewBox="0 0 40 60" fill="none" className="text-[#6B6459] dark:text-[#A69F90] opacity-35">
            <path d="M10,15 C25,5 35,25 20,35 C10,40 15,55 30,50" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 2" />
            <path d="M24,44 L32,51 L33,40" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      },
      // Bottom margin doodle: hand-sketched crown / spark doodle with clip-path
      {
        id: 'marginSpark',
        style: pageSide === 'left' ? { bottom: '16px', left: '18px' } : { bottom: '16px', right: '22px' },
        svg: (
          <div className="relative">
            <svg width="36" height="24" viewBox="0 0 50 30" fill="none" className="text-[#B08D3F] opacity-45">
              <path d="M5,25 L15,10 L25,22 L35,8 L45,25 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="15" cy="7" r="2" fill="currentColor" />
              <circle cx="35" cy="5" r="2" fill="currentColor" />
            </svg>
            {/* CSS clip-path torn tape fragment overlay */}
            <div 
              className="absolute -bottom-2 -left-2 w-8 h-3 bg-[#9C3B3B]/20 border-t border-b border-[#9C3B3B]/40 opacity-50"
              style={{
                clipPath: 'polygon(0% 20%, 15% 0%, 85% 10%, 100% 0%, 95% 80%, 80% 100%, 10% 90%)',
                transform: 'rotate(-5deg)'
              }}
            />
          </div>
        )
      },
      // Organic margin bracket doodle using CSS clip-path
      {
        id: 'bracketClip',
        style: pageSide === 'left' ? { top: '25%', left: '2px' } : { top: '65%', right: '2px' },
        svg: (
          <div 
            className="w-4 h-16 border-l-2 border-t-2 border-b-2 border-[#9C3B3B]/50 dark:border-[#E56B6B]/50 opacity-40"
            style={{
              clipPath: 'polygon(0% 0%, 100% 10%, 60% 50%, 100% 90%, 0% 100%)',
              borderRadius: '2px'
            }}
          />
        )
      },
      // Decorative ink splatter doodle
      {
        id: 'inkSplatter',
        style: pageSide === 'left' ? { top: '75%', left: '8px' } : { top: '15%', right: '8px' },
        svg: (
          <svg width="24" height="24" viewBox="0 0 30 30" fill="currentColor" className="text-[#20242B] dark:text-[#E6DFCF] opacity-25">
            <circle cx="12" cy="12" r="5" />
            <circle cx="20" cy="8" r="2" />
            <circle cx="6" cy="18" r="1.5" />
            <circle cx="22" cy="20" r="2" />
            <path d="M12 12 Q 18 16 22 20" stroke="currentColor" strokeWidth="1" />
          </svg>
        )
      }
    ];
  }, [pageSide]);

  return (
    <div className={`absolute inset-0 pointer-events-none z-20 overflow-hidden ${className}`}>
      {marginDoodles.map((doodle) => (
        <div key={doodle.id} className="absolute transition-opacity duration-300 select-none" style={doodle.style}>
          {doodle.svg}
        </div>
      ))}
    </div>
  );
};
