"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  tag?: "h1" | "h2" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  delayMs?: number;
};

export default function HeroTextReveal({
  text,
  tag: Tag = "h1",
  className,
  style,
  id,
  delayMs = 0
}: Props) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.querySelectorAll<HTMLSpanElement>(".hero-word").forEach((word) => {
        word.style.opacity = "1";
        word.style.transform = "none";
      });
      return;
    }

    const timeout = setTimeout(() => {
      el.querySelectorAll<HTMLSpanElement>(".hero-word").forEach((word, i) => {
        word.style.transitionDelay = `${i * 0.08}s`;
        word.style.opacity = "1";
        word.style.transform = "translateY(0)";
      });
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [delayMs]);

  const words = text.split(" ");

  return (
    <Tag
      ref={containerRef as React.Ref<HTMLHeadingElement>}
      id={id}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <span key={i} className="hero-word-wrapper" style={{ display: "inline-block", overflow: "hidden" }}>
          <span
            className="hero-word"
            style={{
              display: "inline-block",
              opacity: 0,
              transform: "translateY(100%)",
              transition: "opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
