"use client";

import type { ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** If provided, clicking opens the lightbox with this src */
  lightboxSrc?: string;
  /** Alt text passed to lightbox */
  lightboxAlt?: string;
}

/**
 * Wraps an image/group with the BW→Color reveal effect.
 * - BW default state, color on hover, back to BW on mouse-leave
 * - Optionally opens lightbox on click
 */
export default function ImageReveal({
  children,
  className = "",
  style,
  lightboxSrc,
  lightboxAlt
}: ImageRevealProps) {
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
      className={`img-color-reveal ${className}`}
      style={{
        ...style,
        cursor: lightboxSrc ? "zoom-in" : undefined
      }}
      onClick={lightboxSrc ? handleClick : undefined}
      role={lightboxSrc ? "button" : undefined}
      tabIndex={lightboxSrc ? 0 : undefined}
      aria-label={lightboxSrc ? `View ${lightboxAlt ?? "image"} in full size` : undefined}
      onKeyDown={
        lightboxSrc
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
