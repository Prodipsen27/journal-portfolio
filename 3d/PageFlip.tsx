import React from 'react';
import { usePageFlip, FlipDirection } from './usePageFlip';

interface PageFlipProps {
  /** Content of the page currently facing the reader (visible pre-flip). */
  renderFront: (direction: FlipDirection) => React.ReactNode;
  /** Content revealed on the back of the flipping leaf — i.e. the incoming page. */
  renderBack: (direction: FlipDirection) => React.ReactNode;
  /** Content of the static page underneath, shown once the flip completes. */
  renderUnderlay?: (direction: FlipDirection) => React.ReactNode;
  onCommit: (direction: FlipDirection) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * A two-page-spread flip. Drag from either bottom (or top) corner to turn;
 * click the invisible edge zones or use arrow keys as fallback triggers.
 * Progress is driven by the --flip-progress CSS var set in usePageFlip —
 * no per-frame React re-render.
 */
export const PageFlip: React.FC<PageFlipProps> = ({
  renderFront,
  renderBack,
  renderUnderlay,
  onCommit,
  disabled,
  className = '',
}) => {
  const { containerRef, pageRef, phase, direction, flipTo, dragHandlers } = usePageFlip({
    onCommit,
    disabled,
  });

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
      style={{ perspective: '2000px' }}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      onPointerCancel={dragHandlers.onPointerCancel}
    >
      {/* Static page beneath — what's left once the flip completes */}
      {renderUnderlay && (
        <div className="absolute inset-0">{renderUnderlay(direction)}</div>
      )}

      {/* Current front page — hidden once flip fully commits, via CSS */}
      <div
        className="absolute inset-0"
        style={{
          opacity: phase === 'idle' ? 1 : undefined,
          visibility: 'visible',
        }}
      >
        {renderFront(direction)}
      </div>

      {/* The flipping leaf itself */}
      <div
        ref={pageRef}
        className="page-flip-leaf absolute inset-0"
        style={
          {
            '--flip-progress': 0,
            '--flip-shadow': 0,
            '--flip-curl': 0,
            transformOrigin: direction === 'next' ? 'left center' : 'right center',
            transformStyle: 'preserve-3d',
            transform:
              'rotateY(calc(var(--flip-progress) * ' +
              (direction === 'next' ? '-180deg' : '180deg') +
              '))',
            pointerEvents: phase === 'idle' ? 'none' : 'auto',
          } as React.CSSProperties
        }
      >
        {/* front face of the leaf */}
        <div
          className="absolute inset-0 bg-[#EFE6D2]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {renderFront(direction)}
          {/* fold shadow gradient, intensity driven by --flip-shadow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                direction === 'next'
                  ? 'linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.35) 100%)'
                  : 'linear-gradient(270deg, transparent 60%, rgba(0,0,0,0.35) 100%)',
              opacity: 'var(--flip-shadow)' as unknown as number,
            }}
          />
        </div>

        {/* back face of the leaf — the incoming page */}
        <div
          className="absolute inset-0 bg-[#EFE6D2]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {renderBack(direction)}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                direction === 'next'
                  ? 'linear-gradient(270deg, transparent 60%, rgba(0,0,0,0.35) 100%)'
                  : 'linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.35) 100%)',
              opacity: 'var(--flip-shadow)' as unknown as number,
            }}
          />
        </div>

        {/* corner curl highlight — biased by grab point via --flip-curl */}
        <div
          className="pointer-events-none absolute inset-y-0 w-10"
          style={{
            [direction === 'next' ? 'right' : 'left']: 0,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.15), transparent 40%, transparent 60%, rgba(0,0,0,0.12))',
            opacity: 'var(--flip-shadow)' as unknown as number,
            transform: 'skewY(calc(var(--flip-curl) * 3deg))',
          }}
        />
      </div>

      {/* Cast shadow onto the page beneath, synced to fold shadow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(60% 100% at 50% 50%, rgba(0,0,0,0.25), transparent 70%)',
          opacity: 'var(--flip-shadow, 0)' as unknown as number,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Drag zones — invisible hit areas at the corners, ~15% of width */}
      <button
        aria-label="Next page"
        className="absolute right-0 bottom-0 w-[15%] h-1/2 cursor-grab active:cursor-grabbing bg-transparent"
        onPointerDown={dragHandlers.onPointerDown('next')}
        onClick={() => flipTo('next')}
        disabled={disabled}
      />
      <button
        aria-label="Previous page"
        className="absolute left-0 bottom-0 w-[15%] h-1/2 cursor-grab active:cursor-grabbing bg-transparent"
        onPointerDown={dragHandlers.onPointerDown('prev')}
        onClick={() => flipTo('prev')}
        disabled={disabled}
      />
    </div>
  );
};
