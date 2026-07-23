import React, { useEffect, useRef, useCallback } from 'react';

interface PageFlipOverlayProps {
  isFlipping: boolean;
  direction: 'left-to-right' | 'right-to-left';
  onFlipComplete: () => void;
  onMidFlip?: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const SLICE_COUNT = 18;
const TOTAL_DURATION = 700; // ms

// Easing helpers (t in [0,1])
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
function easeInCubic(t: number): number {
  return t * t * t;
}
function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
// Spring: reaches 180° with a small overshoot (~1.8°) then settles
function springOvershoot(t: number): number {
  if (t < 0.85) return easeOutExpo(t / 0.85);
  const s = (t - 0.85) / 0.15; // 0→1 in overshoot window
  return 1 + Math.sin(s * Math.PI) * 0.018;
}

// ─── Component ───────────────────────────────────────────────────────────────
export const PageFlipOverlay: React.FC<PageFlipOverlayProps> = ({
  isFlipping,
  direction,
  onFlipComplete,
  onMidFlip,
}) => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const spineRef      = useRef<HTMLDivElement>(null);
  const shadowRef     = useRef<HTMLDivElement>(null);
  const highlightRef  = useRef<HTMLDivElement>(null);
  const edgeRef       = useRef<HTMLDivElement>(null);
  const sliceRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef        = useRef<number>(0);
  const startTimeRef  = useRef<number>(0);
  const swappedRef    = useRef<boolean>(false);
  const soundPlayedRef = useRef<boolean>(false);

  const isRTL = direction === 'right-to-left';

  const playPageFlipSound = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    try {
      const ctx = new AudioContext();
      
      // 1. Paper rustling noise
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.Q.setValueAtTime(2.0, ctx.currentTime);
      
      filter.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.12);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.32);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      // 2. Low-frequency whump for page landing
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.28);
      
      oscGain.gain.setValueAtTime(0.001, ctx.currentTime + 0.1);
      oscGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.18);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
      
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      
      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.35);
      
      osc.start(ctx.currentTime + 0.1);
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('AudioContext playback blocked or failed:', e);
    }
  }, []);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const rawT = Math.min(elapsed / TOTAL_DURATION, 1);

    // Phase fractions:
    // 0.00–0.11 Lift (80ms), 0.11–0.60 Main rotate, 0.60–0.89 Flatten, 0.89–1.00 Overshoot
    const liftEnd   = 0.11;
    const rotateEnd = 0.60;

    // Base rotation angle 0 → 180 with spring overshoot
    const baseAngle = springOvershoot(rawT) * 180;

    // Lift phase: translateZ + rotateX
    let liftZ = 0;
    let liftX = 0;
    if (rawT <= liftEnd) {
      const p = rawT / liftEnd;
      liftZ = easeOutExpo(p) * 10;
      liftX = easeOutExpo(p) * 2;
    } else if (rawT <= rotateEnd) {
      const p = (rawT - liftEnd) / (rotateEnd - liftEnd);
      liftZ = (1 - easeInCubic(p)) * 10;
      liftX = (1 - easeInCubic(p)) * 2;
    }

    // Curl strength peaks at mid-flip (sin curve)
    const curveStrength = Math.sin(rawT * Math.PI) * 22;

    // Apply slice transforms
    sliceRefs.current.forEach((slice, i) => {
      if (!slice) return;
      const frac = i / (SLICE_COUNT - 1); // 0=hinge edge → 1=free edge
      const sliceCurl = curveStrength * Math.pow(frac, 1.6);
      let sliceAngle = baseAngle + (isRTL ? sliceCurl : -sliceCurl);
      sliceAngle = Math.max(0, Math.min(183, sliceAngle));

      // Brightness: cos gives 1 at 0°/180°, 0 at 90°
      const angleDeg = isRTL ? sliceAngle : 180 - sliceAngle;
      const brightness = 0.72 + 0.28 * Math.abs(Math.cos((angleDeg * Math.PI) / 180));

      const localAngle = isRTL ? -sliceAngle : sliceAngle - 180;

      slice.style.transform = `rotateY(${localAngle}deg) translateZ(${liftZ * (1 - frac * 0.3)}px) rotateX(${liftX * (1 - frac)}deg)`;
      slice.style.filter = `brightness(${brightness.toFixed(3)})`;
    });

    // Dynamic shadow driven by sin(angle)
    if (shadowRef.current) {
      const a = (baseAngle * Math.PI) / 180;
      const sinA = Math.sin(a);
      shadowRef.current.style.opacity = (sinA * 0.35).toFixed(3);
      shadowRef.current.style.filter  = `blur(${(8 + sinA * 14).toFixed(1)}px)`;
      const xOff = isRTL ? -(sinA * 35) : sinA * 35;
      shadowRef.current.style.transform = `translateX(${xOff.toFixed(1)}%)`;
    }

    // Moving ambient highlight
    if (highlightRef.current) {
      const a = (baseAngle * Math.PI) / 180;
      const sinA = Math.sin(a);
      highlightRef.current.style.opacity = (sinA * 0.22).toFixed(3);
      const hlX = isRTL ? 50 - sinA * 30 : 50 + sinA * 30;
      highlightRef.current.style.left = `${hlX.toFixed(1)}%`;
    }

    // Spine compression
    if (spineRef.current) {
      const scale = 1 - 0.016 * Math.sin((baseAngle * Math.PI) / 180);
      spineRef.current.style.transform = `scaleX(${scale.toFixed(4)})`;
    }

    // Paper edge thickness
    if (edgeRef.current) {
      edgeRef.current.style.opacity = (Math.sin((baseAngle * Math.PI) / 180) * 0.9).toFixed(3);
    }

    // Content swap guard — fires exactly once at mid-flip
    if (!swappedRef.current && baseAngle >= 90) {
      swappedRef.current = true;
      onMidFlip?.();
    }

    // Trigger page flip sound around 82 degrees
    if (!soundPlayedRef.current && baseAngle >= 82) {
      soundPlayedRef.current = true;
      playPageFlipSound();
    }

    if (rawT < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Snap to final flat state
      sliceRefs.current.forEach((slice) => {
        if (!slice) return;
        slice.style.transform = `rotateY(${isRTL ? -180 : 0}deg)`;
        slice.style.filter    = 'brightness(1)';
      });
      if (shadowRef.current)    shadowRef.current.style.opacity    = '0';
      if (highlightRef.current) highlightRef.current.style.opacity = '0';
      if (spineRef.current)     spineRef.current.style.transform   = 'scaleX(1)';
      if (edgeRef.current)      edgeRef.current.style.opacity      = '0';
      onFlipComplete();
    }
  }, [isRTL, onFlipComplete, onMidFlip, playPageFlipSound]);

  useEffect(() => {
    if (!isFlipping) return;
    swappedRef.current   = false;
    soundPlayedRef.current = false;
    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isFlipping, animate]);

  if (!isFlipping) return null;

  const slices = Array.from({ length: SLICE_COUNT }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-hidden"
      style={{ perspective: '2000px', perspectiveOrigin: '50% 50%' }}
    >
      {/* Spine compression wrapper */}
      <div ref={spineRef} className="absolute inset-0" style={{ transformOrigin: '50% 50%' }}>

        {/* Contact shadow on opposite page */}
        <div
          ref={shadowRef}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: '15%',
            right: '15%',
            background: 'radial-gradient(ellipse 40% 90% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 100%)',
            opacity: 0,
            willChange: 'opacity, filter, transform',
          }}
        />

        {/* Moving ambient highlight reflection */}
        <div
          ref={highlightRef}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            width: '12%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)',
            opacity: 0,
            willChange: 'opacity, left',
          }}
        />

        {/* 18 vertical page slices — the curl illusion */}
        {slices.map((i) => {
          const frac   = i / (SLICE_COUNT - 1);
          const sliceW = 100 / SLICE_COUNT;
          const leftPct = frac * 100 - sliceW / 2;

          return (
            <div
              key={i}
              ref={(el) => { sliceRefs.current[i] = el; }}
              className="absolute top-0 bottom-0 overflow-hidden select-none"
              style={{
                left:               `${leftPct}%`,
                width:              `${sliceW + 0.5}%`,
                transformOrigin:    isRTL ? '0% 50%' : '100% 50%',
                transformStyle:     'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange:         'transform, filter',
                zIndex:             isRTL ? SLICE_COUNT - i : i,
              }}
            >
              {/* Front face */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor:    i % 2 === 0 ? '#FBF7EE' : '#FAF6EC',
                  backfaceVisibility: 'hidden',
                  backgroundImage:    `linear-gradient(${isRTL ? '270deg' : '90deg'}, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.06) 100%)`,
                }}
              >
                {/* Ruled lines on middle slice for paper texture */}
                {i === Math.floor(SLICE_COUNT / 2) && (
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #8C8577 23px, #8C8577 24px)',
                    }}
                  />
                )}
              </div>

              {/* Back face */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor:    '#FDFBF7',
                  backfaceVisibility: 'hidden',
                  transform:          'rotateY(180deg)',
                  backgroundImage:    `linear-gradient(${isRTL ? '90deg' : '270deg'}, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.0) 100%)`,
                }}
              />
            </div>
          );
        })}

        {/* Paper edge — thickness strip at free edge */}
        <div
          ref={edgeRef}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            width:      '2px',
            left:       isRTL ? '100%' : '0',
            background: 'linear-gradient(180deg, #e8e0cc 0%, #c9bfa6 50%, #e8e0cc 100%)',
            opacity:    0,
            willChange: 'opacity',
            zIndex:     SLICE_COUNT + 1,
          }}
        />
      </div>
    </div>
  );
};


