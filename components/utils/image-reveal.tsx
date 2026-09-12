"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";

import { ambientAccentBySrc } from "@/content/data/ambient-accents.generated";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** If provided, clicking opens the lightbox with this src. */
  lightboxSrc?: string;
  /** Alt text passed to the lightbox. */
  lightboxAlt?: string;
  /**
   * Public asset path used to look up the ambient hover colour.
   * Defaults to `lightboxSrc`, which already points at the displayed image.
   */
  accentSrc?: string;
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
  lightboxAlt,
  accentSrc
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
  // Drives the page-wide ambient hover background. Unknown assets simply get no
  // attribute, which leaves the page background untouched.
  const ambientAccent = ambientAccentBySrc[accentSrc ?? lightboxSrc ?? ""];

  if (!lightboxSrc) {
    return (
      <div className={sharedClassName} style={sharedStyle} data-ambient-accent={ambientAccent}>
        {children}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`image-reveal-button ${sharedClassName}`}
      style={sharedStyle}
      data-ambient-accent={ambientAccent}
      aria-haspopup="dialog"
      aria-label={`Open full-size image${lightboxAlt ? `: ${lightboxAlt}` : ""}`}
      onClick={(event: MouseEvent<HTMLButtonElement>) => openLightbox(event.currentTarget)}
    >
      {children}
    </button>
  );
}
