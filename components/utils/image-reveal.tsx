"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** If provided, clicking opens the lightbox with this src. */
  lightboxSrc?: string;
  /** Alt text passed to the lightbox. */
  lightboxAlt?: string;
}

interface OpenLightboxDetail {
  src: string;
  alt: string;
  trigger: HTMLElement;
}

/**
 * Wraps an image/group with the BW-to-color reveal effect.
 * When a lightbox source is present, native button semantics provide reliable
 * keyboard and assistive-technology support without additional listeners.
 */
export default function ImageReveal({
  children,
  className = "",
  style,
  lightboxSrc,
  lightboxAlt
}: ImageRevealProps) {
  const openLightbox = (trigger: HTMLElement) => {
    if (!lightboxSrc) return;

    window.dispatchEvent(
      new CustomEvent<OpenLightboxDetail>("open-lightbox", {
        detail: {
          src: lightboxSrc,
          alt: lightboxAlt ?? "",
          trigger
        }
      })
    );
  };

  const sharedClassName = `img-color-reveal ${className}`.trim();
  const sharedStyle = {
    ...style,
    cursor: lightboxSrc ? "zoom-in" : undefined
  };

  if (!lightboxSrc) {
    return (
      <div className={sharedClassName} style={sharedStyle}>
        {children}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`image-reveal-button ${sharedClassName}`}
      style={sharedStyle}
      aria-haspopup="dialog"
      aria-label={`Open full-size image${lightboxAlt ? `: ${lightboxAlt}` : ""}`}
      onClick={(event: MouseEvent<HTMLButtonElement>) => openLightbox(event.currentTarget)}
    >
      {children}
    </button>
  );
}
