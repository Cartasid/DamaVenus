"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  intensity?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function ParallaxHero({ children, intensity = 0.3, className, style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;
        if (rect.bottom < 0 || rect.top > windowH) return;
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const offset = (progress - 0.5) * intensity * rect.height;
        const firstChild = el.firstElementChild as HTMLElement | null;
        if (firstChild) {
          firstChild.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  return (
    <div ref={containerRef} className={className} style={{ ...style, overflow: "hidden" }}>
      {children}
    </div>
  );
}
