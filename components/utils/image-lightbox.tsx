"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";

interface LightboxState {
  isOpen: boolean;
  src: string;
  alt: string;
}

interface OpenLightboxDetail {
  src?: string;
  alt?: string;
  trigger?: HTMLElement;
}

const initialState: LightboxState = { isOpen: false, src: "", alt: "" };

/** Global accessible lightbox triggered by ImageReveal. */
export default function ImageLightbox() {
  const [state, setState] = useState<LightboxState>(initialState);
  const [visible, setVisible] = useState(false);
  const captionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef("");
  const closeTimerRef = useRef<number>(0);

  const open = useCallback((src: string, alt: string, trigger?: HTMLElement) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = 0;
    }

    returnFocusRef.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setState({ isOpen: true, src, alt });

    window.requestAnimationFrame(() => {
      setVisible(true);
      closeButtonRef.current?.focus();
    });
  }, []);

  const close = useCallback(() => {
    setVisible(false);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduceMotion ? 0 : 360;

    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setState(initialState);
      document.body.style.overflow = previousOverflowRef.current;
      returnFocusRef.current?.focus();
      closeTimerRef.current = 0;
    }, delay);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<OpenLightboxDetail>).detail;
      if (detail?.src) open(detail.src, detail.alt ?? "", detail.trigger);
    };

    window.addEventListener("open-lightbox", handler);
    return () => window.removeEventListener("open-lightbox", handler);
  }, [open]);

  useEffect(() => {
    if (!state.isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state.isOpen, close]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, []);

  if (!state.isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={state.alt || "Image preview"}
      aria-describedby={state.alt ? captionId : undefined}
      className="lightbox-backdrop"
      data-visible={visible ? "true" : "false"}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="lightbox-close"
        onClick={close}
        aria-label="Close full-size image"
      >
        Close
      </button>

      <div className="lightbox-frame">
        <Image
          src={state.src}
          alt={state.alt}
          fill
          sizes="(max-width: 768px) 96vw, 88vw"
          className="img-always-color"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {state.alt ? (
        <p id={captionId} className="lightbox-caption">
          {state.alt}
        </p>
      ) : null}
    </div>
  );
}
