"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        zIndex: 100,
        pointerEvents: "none"
      }}
    >
      <div
        ref={progressRef}
        style={{
          height: "100%",
          width: "100%",
          background: "linear-gradient(to right, #FF00FF, #FF66FF)",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 80ms linear",
          willChange: "transform"
        }}
      />
    </div>
  );
}
