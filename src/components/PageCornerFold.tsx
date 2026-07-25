import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageCornerFoldProps {
  isHovered: boolean;
  corner?: 'bottom-right' | 'bottom-left';
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

/**
 * PageCornerFold component renders a solid dark-red paper corner fold with visible text on top of the fold.
 */
export const PageCornerFold: React.FC<PageCornerFoldProps> = ({
  isHovered,
  corner = 'bottom-right',
  onClick,
  className = '',
}) => {
  const isRight = corner === 'bottom-right';

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          onClick={onClick}
          className={`absolute bottom-0 ${isRight ? 'right-0' : 'left-0'} z-40 cursor-pointer pointer-events-auto ${className}`}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: 72, height: 72, opacity: 1 }}
          exit={{ width: 0, height: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 25,
          }}
        >
          {/* Dark Red Shadow underneath the lifted paper corner */}
          <div
            className="absolute inset-0 bg-[#3A0808] blur-[2px]"
            style={{
              clipPath: isRight
                ? 'polygon(100% 0%, 100% 100%, 0% 100%)'
                : 'polygon(0% 0%, 0% 100%, 100% 100%)',
            }}
          />

          {/* Solid Red Folded Paper Flap */}
          <div
            className={`absolute inset-0 bg-[#9C2A2A] ${
              isRight
                ? 'border-b border-l border-[#6A1B1B] shadow-[-3px_3px_8px_rgba(60,10,10,0.6)]'
                : 'border-b border-r border-[#6A1B1B] shadow-[3px_3px_8px_rgba(60,10,10,0.6)]'
            }`}
            style={{
              clipPath: isRight
                ? 'polygon(0% 0%, 100% 0%, 0% 100%)'
                : 'polygon(100% 0%, 0% 0%, 100% 100%)',
            }}
          />

          {/* Text Layer (Placed ON TOP of the folded flap, unclipped) */}
          <div
            className={`absolute inset-0 flex pointer-events-none ${
              isRight ? 'items-start justify-start pt-3 pl-3' : 'items-start justify-end pt-3 pr-3'
            }`}
          >
            <span
              className={`font-handwriting text-[13px] font-extrabold text-[#FFFDF8] tracking-widest select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transform ${
                isRight ? '-rotate-45' : 'rotate-45'
              }`}
            >
              Flip
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
