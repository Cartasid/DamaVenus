"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import styles from "./product-gallery.module.css";

interface ProductImage {
  src: string;
  alt: string;
  label: string;
}

export default function ProductGallery({ images }: { images: readonly ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageId = useId();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const activeImage = images[activeIndex];

  if (!activeImage) return null;

  const move = (direction: number) => {
    setActiveIndex((index) => (index + direction + images.length) % images.length);
  };

  return (
    <div
      className={styles.gallery}
      role="region"
      aria-roledescription="carousel"
      aria-label="Natürlich hairbrush product images"
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <button
        id={stageId}
        type="button"
        className={styles.stage}
        aria-haspopup="dialog"
        aria-label={`Enlarge ${activeImage.label.toLowerCase()} photo`}
        onPointerDown={(event) => {
          swiped.current = false;
          touchStart.current = event.pointerType === "touch"
            ? { x: event.clientX, y: event.clientY }
            : null;
        }}
        onPointerCancel={() => { touchStart.current = null; }}
        onPointerUp={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            swiped.current = true;
            move(dx < 0 ? 1 : -1);
          }
        }}
        onClick={(event) => {
          if (swiped.current && event.detail !== 0) {
            swiped.current = false;
            return;
          }
          window.dispatchEvent(new CustomEvent("open-lightbox", {
            detail: { src: activeImage.src, alt: activeImage.alt, trigger: event.currentTarget }
          }));
        }}
      >
        {images.map((image, index) => (
          <span
            key={image.src}
            className={`${styles.slide} ${index === activeIndex ? styles.activeSlide : ""}`}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "eager"}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </span>
        ))}
        <span className={styles.expand} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
          </svg>
        </span>
      </button>

      <div className={styles.controls}>
        <div className={styles.thumbnails} role="group" aria-label="Choose product photo">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={styles.thumbnail}
              aria-label={`Show ${image.label.toLowerCase()} photo`}
              aria-controls={stageId}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <Image src={image.src} alt="" fill sizes="64px" loading="eager" className="object-contain" />
            </button>
          ))}
        </div>
        <p className={styles.caption} role="status" aria-atomic="true">
          <span className={styles.availability} aria-hidden="true">Sold Out</span>
          <span>{activeImage.label}</span>
          <span className={styles.counter}>
            <span className="sr-only">Image </span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </p>
      </div>
    </div>
  );
}
