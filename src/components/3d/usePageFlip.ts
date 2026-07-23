import { useCallback, useEffect, useRef, useState } from 'react';

export type FlipDirection = 'next' | 'prev';
export type FlipPhase = 'idle' | 'dragging' | 'settling';

interface UsePageFlipOptions {
  /** Called once a flip is committed — this is where you actually swap page content. */
  onCommit: (direction: FlipDirection) => void;
  /** Ratio of page width the pointer must travel before a released drag auto-commits. */
  commitThreshold?: number; // default 0.4
  /** px/ms — a flick faster than this commits regardless of distance travelled. */
  velocityThreshold?: number; // default 0.5
  /** ms duration for the programmatic settle animation (commit or cancel). */
  settleDuration?: number; // default 450
  disabled?: boolean;
}

interface DragState {
  pointerId: number;
  direction: FlipDirection;
  startX: number;
  startY: number;
  lastX: number;
  lastT: number;
  velocity: number; // smoothed px/ms, signed toward commit direction
}

/**
 * Drives a single flipping page's rotateY progress (0 → 180deg) via a CSS
 * custom property (--flip-progress, 0..1) so drag tracking never triggers a
 * React re-render. React state (`phase`, `direction`) only changes at the
 * few moments the UI actually needs to branch on it.
 */
export function usePageFlip({
  onCommit,
  commitThreshold = 0.4,
  velocityThreshold = 0.5,
  settleDuration = 450,
  disabled = false,
}: UsePageFlipOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null); // the page spread, used for width
  const pageRef = useRef<HTMLDivElement | null>(null); // the single flipping leaf

  const [phase, setPhase] = useState<FlipPhase>('idle');
  const [direction, setDirection] = useState<FlipDirection>('next');

  const dragRef = useRef<DragState | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingProgressRef = useRef<number | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // ---- low-level: write progress to the DOM without touching React state ----
  const writeProgress = useCallback((progress: number, curlBias = 0) => {
    const el = pageRef.current;
    if (!el) return;
    el.style.setProperty('--flip-progress', String(progress));
    // Shadow intensity peaks at progress 0.5 (page perpendicular to viewer).
    const shadow = 1 - Math.abs(progress - 0.5) * 2;
    el.style.setProperty('--flip-shadow', String(Math.max(0, shadow)));
    // Curl bias: -1 (grabbed near top) to 1 (grabbed near bottom), softened.
    el.style.setProperty('--flip-curl', String(curlBias));
  }, []);

  const scheduleWrite = useCallback(
    (progress: number, curlBias: number) => {
      pendingProgressRef.current = progress;
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (pendingProgressRef.current != null) {
          writeProgress(pendingProgressRef.current, curlBias);
        }
      });
    },
    [writeProgress]
  );

  // ---- settle animation (commit → 1, or cancel → 0) ----
  // Driven by a manual rAF tween (not WAAPI on the custom property), since
  // animating CSS custom properties smoothly via element.animate() requires
  // @property registration that isn't reliably supported everywhere yet.
  // easeOutBack-ish for commit (slight overshoot = paper settling), a firmer
  // ease for cancel (snapping back under its own stiffness).
  const easeCommit = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeCancel = (t: number) => t * t * (3 - 2 * t); // smoothstep

  const settle = useCallback(
    (from: number, to: 0 | 1, dir: FlipDirection) => {
      const el = pageRef.current;
      if (!el) return;
      setPhase('settling');

      if (prefersReducedMotion) {
        writeProgress(to);
        if (to === 1) onCommit(dir);
        writeProgress(0, 0);
        setPhase('idle');
        return;
      }

      const duration = Math.max(120, settleDuration * Math.abs(to - from));
      const ease = to === 1 ? easeCommit : easeCancel;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const progress = from + (to - from) * ease(t);
        writeProgress(progress, 0);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
          if (to === 1) onCommit(dir);
          writeProgress(0, 0);
          setPhase('idle');
        }
      };

      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    },
    [onCommit, prefersReducedMotion, settleDuration, writeProgress]
  );

  // ---- pointer handlers, bound to a drag-zone element per direction ----
  const onPointerDown = useCallback(
    (dir: FlipDirection) => (e: React.PointerEvent) => {
      if (disabled || phase !== 'idle') return;
      (e.target as Element).setPointerCapture(e.pointerId);
      dragRef.current = {
        pointerId: e.pointerId,
        direction: dir,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastT: performance.now(),
        velocity: 0,
      };
      setDirection(dir);
      setPhase('dragging');
    },
    [disabled, phase]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current;
      const containerWidth = containerRef.current?.offsetWidth ?? 1;
      if (!drag || drag.pointerId !== e.pointerId) return;

      const now = performance.now();
      const dt = Math.max(1, now - drag.lastT);
      const dx = e.clientX - drag.lastX;
      // Smooth velocity (px/ms), sign flipped so "toward commit" is positive.
      const instV = (dx / dt) * (drag.direction === 'next' ? -1 : 1);
      drag.velocity = drag.velocity * 0.7 + instV * 0.3;
      drag.lastX = e.clientX;
      drag.lastT = now;

      const traveled = drag.direction === 'next'
        ? drag.startX - e.clientX
        : e.clientX - drag.startX;
      const progress = Math.min(1, Math.max(0, traveled / (containerWidth / 2)));

      // Curl bias from vertical grab point: top half vs bottom half of page.
      const pageHeight = containerRef.current?.offsetHeight ?? 1;
      const curlBias = Math.max(-1, Math.min(1, ((drag.startY / pageHeight) - 0.5) * 2));

      scheduleWrite(progress, curlBias);
    },
    [scheduleWrite]
  );

  const endDrag = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      dragRef.current = null;

      const el = pageRef.current;
      const current = el ? parseFloat(el.style.getPropertyValue('--flip-progress') || '0') : 0;

      const shouldCommit =
        current >= commitThreshold || Math.abs(drag.velocity) >= velocityThreshold;

      settle(current, shouldCommit ? 1 : 0, drag.direction);
    },
    [commitThreshold, velocityThreshold, settle]
  );

  // ---- programmatic flip (button click, keyboard) — same settle path ----
  const flipTo = useCallback(
    (dir: FlipDirection) => {
      if (disabled || phase !== 'idle') return;
      setDirection(dir);
      writeProgress(0, 0);
      settle(0, 1, dir);
    },
    [disabled, phase, settle, writeProgress]
  );

  // ---- keyboard support ----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (disabled || phase !== 'idle') return;
      if (e.key === 'ArrowRight') flipTo('next');
      if (e.key === 'ArrowLeft') flipTo('prev');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [disabled, phase, flipTo]);

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, []);

  return {
    containerRef,
    pageRef,
    phase,
    direction,
    prefersReducedMotion,
    flipTo,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
