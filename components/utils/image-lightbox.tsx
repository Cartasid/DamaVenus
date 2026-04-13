"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface LightboxState {
  isOpen: boolean;
  src: string;
  alt: string;
}

const initialState: LightboxState = { isOpen: false, src: "", alt: "" };

/**
 * Global lightbox that listens for custom "open-lightbox" events.
 * Any image wrapped in ImageReveal can trigger it.
 */
export default function ImageLightbox() {
  const [state, setState] = useState<LightboxState>(initialState);
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const open = useCallback((src: string, alt: string) => {
    setState({ isOpen: true, src, alt });
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setState(initialState);
      document.body.style.overflow = "";
    }, 400);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.src) open(detail.src, detail.alt ?? "");
    };
    window.addEventListener("open-lightbox", handler);
    return () => window.removeEventListener("open-lightbox", handler);
  }, [open]);

  useEffect(() => {
    if (!state.isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.isOpen, close]);

  if (!state.isOpen) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={state.alt || "Image preview"}
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: visible ? "rgba(5,5,5,0.95)" : "rgba(5,5,5,0)",
        backdropFilter: visible ? "blur(20px)" : "blur(0px)",
        transition: "background 400ms cubic-bezier(0.25,0.46,0.45,0.94), backdrop-filter 400ms cubic-bezier(0.25,0.46,0.45,0.94)",
        cursor: "zoom-out",
        padding: "2rem"
      }}
    >
      {/* Image — click anywhere to close */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          height: "85vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.92)",
          transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)"
        }}
      >
        <Image
          src={state.src}
          alt={state.alt}
          fill
          sizes="(max-width: 768px) 95vw, 85vw"
          className="img-always-color"
          style={{
            objectFit: "contain"
          }}
          priority
        />
      </div>

      {/* Alt caption */}
      {state.alt ? (
        <p
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-montserrat), system-ui, sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(200,168,126,0.4)",
            opacity: visible ? 1 : 0,
            transition: "opacity 600ms 200ms",
            whiteSpace: "nowrap",
            maxWidth: "80vw",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {state.alt}
        </p>
      ) : null}
    </div>
  );
}
