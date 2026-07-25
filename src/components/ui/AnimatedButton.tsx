import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export interface AnimatedButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'success' | 'paper' | 'github';
  className?: string;
  showArrow?: boolean;
  expandGithubText?: string;
}

const variants = {
  primary:
    'bg-gradient-to-br from-[#B34747] via-[#9C3B3B] to-[#7F2626] border border-[#D98787]/40 text-[#FBF7EE] shadow-lg shadow-[#9C3B3B]/30 hover:shadow-xl hover:shadow-[#9C3B3B]/45',
  success:
    'bg-gradient-to-br from-[#4F7A5A] via-[#386347] to-[#284933] border border-[#72A07D]/40 text-white shadow-lg shadow-[#4F7A5A]/30 hover:shadow-xl hover:shadow-[#4F7A5A]/45',
  paper:
    'bg-[#F6F0E4] dark:bg-[#252A34] border border-[#CDBD97] dark:border-[#383D48] text-[#20242B] dark:text-[#FBF7EE] shadow-md hover:shadow-lg',
  github:
    'bg-white/80 dark:bg-[#1E222B] border border-[#DCD3C1] dark:border-[#383D48] text-[#20242B] dark:text-white shadow-md hover:shadow-lg hover:border-[#20242B] dark:hover:border-white'
};

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  icon,
  href,
  onClick,
  variant = 'primary',
  className = '',
  showArrow = true,
  expandGithubText = 'View Source'
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Magnetic hover coordinates
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 25 };
  const magneticX = useSpring(rawX, springConfig);
  const magneticY = useSpring(rawY, springConfig);

  // Cursor glow position inside button
  const [glowPos, setGlowPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Ripple effect state
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Magnetic displacement (limit to max ~5px)
    const distDeltaX = (e.clientX - centerX) * 0.15;
    const distDeltaY = (e.clientY - centerY) * 0.15;
    rawX.set(Math.max(-6, Math.min(6, distDeltaX)));
    rawY.set(Math.max(-6, Math.min(6, distDeltaY)));

    // Relative percentage for radial glow
    const posX = ((e.clientX - rect.left) / rect.width) * 100;
    const posY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: posX, y: posY });
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      setRipples((prev) => [...prev, { x: clickX, y: clickY, id: Date.now() }]);
    }
    if (onClick) onClick();
  };

  // Remove ripples after animation completes
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  const isGithubVariant = variant === 'github';

  const content = (
    <motion.div
      ref={buttonRef}
      style={{
        x: shouldReduceMotion ? 0 : magneticX,
        y: shouldReduceMotion ? 0 : magneticY
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
      className={`group relative overflow-hidden flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-journal font-semibold text-sm select-none cursor-pointer transition-all duration-300 ${variants[variant]} ${
        variant === 'success' && !shouldReduceMotion ? 'animate-pulse-subtle' : ''
      } ${className}`}
    >
      {/* Dynamic Cursor Follower Radial Glow */}
      {isHovered && (
        <span
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60"
          style={{
            background: `radial-gradient(circle 65px at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.35), transparent 70%)`
          }}
        />
      )}

      {/* Sweeping Metallic Shine Effect */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full pointer-events-none" />

      {/* Interactive Click Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/40 pointer-events-none animate-ripple"
          style={{
            left: r.x,
            top: r.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Icon with Spring Motion */}
      {icon && (
        <motion.div
          whileHover={shouldReduceMotion ? {} : { rotate: 8, scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 500 }}
          className="relative z-10 shrink-0"
        >
          {icon}
        </motion.div>
      )}

      {/* Children / Label */}
      {children && <span className="relative z-10 font-bold tracking-wide">{children}</span>}

      {/* GitHub Variant Hover Expansion Label */}
      {isGithubVariant && (
        <span className="relative z-10 max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-out font-bold text-xs">
          {expandGithubText}
        </span>
      )}

      {/* Bouncing Arrow Indicator for non-GitHub buttons */}
      {!isGithubVariant && showArrow && (
        <motion.div
          className="relative z-10 shrink-0"
          animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </motion.div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-block no-underline"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={handleClick} className="inline-block text-left border-none bg-transparent p-0">
      {content}
    </button>
  );
};

export default AnimatedButton;
