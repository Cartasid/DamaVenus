"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      inner.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      if (!visibleRef.current) {
        visibleRef.current = true;
        outer.style.opacity = "1";
        inner.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      outer.style.opacity = "0";
      inner.style.opacity = "0";
    };

    const onHover = () => {
      outer.classList.add("cursor-hover");
    };
    const onUnhover = () => {
      outer.classList.remove("cursor-hover");
    };

    const attachHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button'], .img-color-reveal").forEach((el) => {
        el.addEventListener("mouseenter", onHover);
        el.addEventListener("mouseleave", onUnhover);
      });
    };

    const animate = () => {
      smoothRef.current.x += (posRef.current.x - smoothRef.current.x) * 0.12;
      smoothRef.current.y += (posRef.current.y - smoothRef.current.y) * 0.12;
      outer.style.transform = `translate(${smoothRef.current.x - 20}px, ${smoothRef.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(animate);
    attachHoverListeners();

    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(attachHoverListeners, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="custom-cursor-outer"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(200,168,126,0.35)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s",
          mixBlendMode: "difference"
        }}
      />
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "rgba(200,168,126,0.7)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "opacity 0.3s"
        }}
      />
    </>
  );
}
