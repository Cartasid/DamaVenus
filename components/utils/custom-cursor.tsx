"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], .img-color-reveal";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!pointerQuery.matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const animate = () => {
      const deltaX = targetRef.current.x - smoothRef.current.x;
      const deltaY = targetRef.current.y - smoothRef.current.y;

      smoothRef.current.x += deltaX * 0.16;
      smoothRef.current.y += deltaY * 0.16;
      outer.style.transform = `translate3d(${smoothRef.current.x - 20}px, ${smoothRef.current.y - 20}px, 0)`;

      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        rafRef.current = window.requestAnimationFrame(animate);
      } else {
        smoothRef.current = { ...targetRef.current };
        rafRef.current = 0;
      }
    };

    const startAnimation = () => {
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(animate);
      }
    };

    const show = () => {
      if (visibleRef.current) return;
      visibleRef.current = true;
      outer.style.opacity = "1";
      inner.style.opacity = "1";
    };

    const hide = () => {
      visibleRef.current = false;
      outer.style.opacity = "0";
      inner.style.opacity = "0";
      outer.classList.remove("cursor-hover");
    };

    const onPointerMove = (event: PointerEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      inner.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 4}px, 0)`;

      if (!visibleRef.current) {
        smoothRef.current = { x: event.clientX, y: event.clientY };
        outer.style.transform = `translate3d(${event.clientX - 20}px, ${event.clientY - 20}px, 0)`;
      }

      show();
      startAnimation();
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) {
        outer.classList.add("cursor-hover");
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;

      const currentInteractive = event.target.closest(INTERACTIVE_SELECTOR);
      const nextInteractive =
        event.relatedTarget instanceof Element
          ? event.relatedTarget.closest(INTERACTIVE_SELECTOR)
          : null;

      if (currentInteractive && currentInteractive !== nextInteractive) {
        outer.classList.remove("cursor-hover");
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
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
          mixBlendMode: "difference",
          willChange: "transform"
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
          transition: "opacity 0.3s",
          willChange: "transform"
        }}
      />
    </>
  );
}
