import { useCallback, useEffect, useRef, useState } from 'react';
import type React from 'react';

export type FlipDirection = 'next' | 'prev';
export type FlipPhase = 'idle' | 'dragging' | 'settling';

interface UsePageFlipOptions {
  onCommit: (direction: FlipDirection) => void;
  commitThreshold?: number;
  velocityThreshold?: number;
  settleDuration?: number;
  disabled?: boolean;
}

interface DragState {
  pointerId: number;
  direction: FlipDirection;
  startX: number;
  startY: number;
  lastX: number;
  lastT: number;
  velocity: number;
  moved: boolean;
}

export function usePageFlip({
  onCommit,
  commitThreshold = 0.4,
  velocityThreshold = 0.5,
  settleDuration = 450,
  disabled = false,
}: UsePageFlipOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [phase, setPhase] = useState<FlipPhase>('idle');
  const [direction, setDirection] = useState<FlipDirection>('next');

  const dragRef = useRef<DragState | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingProgressRef = useRef<number | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const writeProgress = useCallback((progress: number, curlBias = 0) => {
    const el = pageRef.current;
    const container = containerRef.current;
    if (!el) return;

    const shadow = 1 - Math.abs(progress - 0.5) * 2;
    const values = {
      '--flip-progress': String(progress),
      '--flip-shadow': String(Math.max(0, shadow)),
      '--flip-curl': String(curlBias),
    };

    Object.entries(values).forEach(([name, value]) => {
      el.style.setProperty(name, value);
      container?.style.setProperty(name, value);
    });
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
    [writeProgress],
  );

  const easeCommit = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeCancel = (t: number) => t * t * (3 - 2 * t);

  const settle = useCallback(
    (from: number, to: 0 | 1, dir: FlipDirection) => {
      if (!pageRef.current) return;
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
          return;
        }

        rafRef.current = null;
        if (to === 1) onCommit(dir);
        writeProgress(0, 0);
        setPhase('idle');
      };

      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    },
    [onCommit, prefersReducedMotion, settleDuration, writeProgress],
  );

  const onPointerDown = useCallback(
    (dir: FlipDirection) => (event: React.PointerEvent) => {
      if (disabled || phase !== 'idle') return;

      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = {
        pointerId: event.pointerId,
        direction: dir,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastT: performance.now(),
        velocity: 0,
        moved: false,
      };
      setDirection(dir);
      setPhase('dragging');
    },
    [disabled, phase],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      const drag = dragRef.current;
      const containerWidth = containerRef.current?.offsetWidth ?? 1;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const now = performance.now();
      const dt = Math.max(1, now - drag.lastT);
      const dx = event.clientX - drag.lastX;
      const instantVelocity = (dx / dt) * (drag.direction === 'next' ? -1 : 1);

      drag.velocity = drag.velocity * 0.7 + instantVelocity * 0.3;
      drag.lastX = event.clientX;
      drag.lastT = now;
      drag.moved = drag.moved || Math.abs(event.clientX - drag.startX) > 4;

      const traveled = drag.direction === 'next'
        ? drag.startX - event.clientX
        : event.clientX - drag.startX;
      const progress = Math.min(1, Math.max(0, traveled / (containerWidth / 2)));

      const pageHeight = containerRef.current?.offsetHeight ?? 1;
      const curlBias = Math.max(-1, Math.min(1, ((drag.startY / pageHeight) - 0.5) * 2));

      scheduleWrite(progress, curlBias);
    },
    [scheduleWrite],
  );

  const endDrag = useCallback(
    (event: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      dragRef.current = null;

      const current = pageRef.current
        ? parseFloat(pageRef.current.style.getPropertyValue('--flip-progress') || '0')
        : 0;
      const isClick = !drag.moved && current < 0.02;
      const shouldCommit =
        isClick || current >= commitThreshold || Math.abs(drag.velocity) >= velocityThreshold;

      settle(current, shouldCommit ? 1 : 0, drag.direction);
    },
    [commitThreshold, settle, velocityThreshold],
  );

  const flipTo = useCallback(
    (dir: FlipDirection) => {
      if (disabled || phase !== 'idle') return;

      setDirection(dir);
      writeProgress(0, 0);
      settle(0, 1, dir);
    },
    [disabled, phase, settle, writeProgress],
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.tagName === 'SELECT' || 
        (activeEl as HTMLElement).isContentEditable
      )) {
        return;
      }
      if (disabled || phase !== 'idle') return;
      if (event.key === 'ArrowRight') flipTo('next');
      if (event.key === 'ArrowLeft') flipTo('prev');
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [disabled, flipTo, phase]);

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
