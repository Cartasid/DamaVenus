"use client";

import { useRef } from "react";

interface VideoRevealProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

export default function VideoReveal({ src, className = "", style, "aria-label": ariaLabel }: VideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnter() {
    videoRef.current?.play().catch(() => {});
  }

  function handleLeave() {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }

  return (
    <div
      className={`video-bw-reveal relative overflow-hidden ${className}`}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
