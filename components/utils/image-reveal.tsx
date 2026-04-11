"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** If provided, clicking opens the lightbox with this src */
  lightboxSrc?: string;
  /** Alt text passed to lightbox */
  lightboxAlt?: string;
  /** Intersection threshold for auto-reveal (0-1). Default 0.6 */
  threshold?: number;
  /** Delay in ms before color reveal after entering viewport. Default 400 */
  revealDelay?: number;
}

/**
 * Wraps an image/group with the BW→Color reveal effect.
 * - Adds IntersectionObserver for scroll-triggered color reveal
 * - Optionally opens lightbox on click
 */
export default function ImageReveal({
  children,
  className = "",
  style,
  lightboxSrc,
  lightboxAlt,
  threshold = 0.6,
  revealDelay = 400
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver for viewport-triggered color reveal
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            el.setAttribute("data-in-view", "true");
          }, revealDelay);
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [threshold, revealDelay]);

  const handleClick = () => {
    if (!lightboxSrc) return;
    window.dispatchEvent(
      new CustomEvent("open-lightbox", {
        detail: { src: lightboxSrc, alt: lightboxAlt ?? "" }
      })
    );
  };

  return (
    <div
      ref={ref}
      className={`img-color-reveal ${className}`}
      style={{
        ...style,
        cursor: lightboxSrc ? "zoom-in" : undefined
      }}
      onClick={lightboxSrc ? handleClick : undefined}
      role={lightboxSrc ? "button" : undefined}
      tabIndex={lightboxSrc ? 0 : undefined}
      aria-label={lightboxSrc ? `View ${lightboxAlt ?? "image"} in full size` : undefined}
      onKeyDown={lightboxSrc ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } } : undefined}
    >
      {children}
    </div>
  );
}
