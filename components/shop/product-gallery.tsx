"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import styles from "./product-gallery.module.css";

interface ProductImage {
  /** Still image; for a video slide it is the poster and the thumbnail. */
  src: string;
  alt: string;
  label: string;
  /** Turns the slide into a muted, looping video that plays automatically. */
  video?: { src: string; type: string };
  /** How long automatic rotation stays on this slide, in ms. */
  dwell?: number;
}

const ROTATION_DELAY = 7000;
const TRANSITION_DURATION = 1400;

function SlideVideo({ image, video, active, playing }: {
  image: ProductImage;
  video: NonNullable<ProductImage["video"]>;
  active: boolean;
  playing: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!active && ref.current) ref.current.currentTime = 0;
  }, [active]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (active && playing) {
      // Autoplay can still be refused by the browser; the poster stays visible then.
      element.play().catch(() => undefined);
    } else {
      element.pause();
    }
  }, [active, playing]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-contain"
      poster={image.src}
      aria-label={image.alt}
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={video.src} type={video.type} />
    </video>
  );
}

export default function ProductGallery({ images, label = "Natürlich hairbrush product images" }: {
  images: readonly ProductImage[];
  label?: string;
}) {
  // Two copies at either end keep the neighbouring previews visible at the loop boundary.
  const cloneCount = Math.min(2, images.length);
  const [position, setPosition] = useState(cloneCount);
  const [animated, setAnimated] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [automatic, setAutomatic] = useState(true);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [videoToggled, setVideoToggled] = useState(false);
  const stageId = useId();
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rotationButtonRef = useRef<HTMLButtonElement>(null);
  const transitionRef = useRef(false);
  const framesRef = useRef<number[]>([]);
  const loadedSources = useRef(new Set<string>());
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const activeIndex = (position - cloneCount + images.length) % images.length;
  const activeImage = images[activeIndex];
  const playing = automatic && motionAllowed && inView && pageVisible && !hovered && imagesReady;
  // Videos start on their own unless reduced motion is requested; a click flips that default.
  const videoPlaying = (motionAllowed !== videoToggled) && inView && pageVisible;
  const dwell = activeImage?.dwell ?? ROTATION_DELAY;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setMotionAllowed(!query.matches);
      if (query.matches) setAutomatic(false);
    };
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    query.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
    }, { threshold: [0, 0.35] });
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => {
      query.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
      framesRef.current.forEach((frame) => window.cancelAnimationFrame(frame));
    };
  }, []);

  const finishTransition = useCallback(() => {
    if (!transitionRef.current || !images.length) return;
    const realPosition = cloneCount + (position - cloneCount + images.length) % images.length;
    const finish = () => {
      transitionRef.current = false;
      setTransitioning(false);
    };
    if (realPosition === position) {
      finish();
      return;
    }
    const restoreImageFocus = document.activeElement === trackRef.current?.querySelector('button[tabindex="0"]');
    setAnimated(false);
    setPosition(realPosition);
    framesRef.current = [window.requestAnimationFrame(() => {
      framesRef.current.push(window.requestAnimationFrame(() => {
        setAnimated(true);
        finish();
        if (restoreImageFocus) trackRef.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
      }));
    })];
  }, [cloneCount, images.length, position]);

  const move = useCallback((direction: number) => {
    if (transitionRef.current || images.length < 2) return;
    if (!motionAllowed) {
      setPosition((current) => cloneCount + (current - cloneCount + direction + images.length) % images.length);
      return;
    }
    transitionRef.current = true;
    setTransitioning(true);
    setPosition((current) => current + direction);
  }, [cloneCount, images.length, motionAllowed]);

  useEffect(() => {
    if (!playing || transitioning || !animated || images.length < 2) return;
    const timer = window.setTimeout(() => move(1), dwell);
    return () => window.clearTimeout(timer);
  }, [animated, dwell, images.length, move, playing, position, transitioning]);

  useEffect(() => {
    if (!transitioning) return;
    // Settle even if a browser suppresses transitionend while the tab is hidden.
    const timer = window.setTimeout(finishTransition, TRANSITION_DURATION + 150);
    return () => window.clearTimeout(timer);
  }, [finishTransition, transitioning]);

  useEffect(() => {
    if (motionAllowed || !images.length) return;
    framesRef.current.forEach((frame) => window.cancelAnimationFrame(frame));
    transitionRef.current = false;
    setTransitioning(false);
    setAnimated(true);
    setPosition((current) => cloneCount + (current - cloneCount + images.length) % images.length);
  }, [cloneCount, images.length, motionAllowed]);

  if (!activeImage) return null;

  const manualMove = (direction: number) => {
    setAutomatic(false);
    move(direction);
  };
  const slides = [...images.slice(-cloneCount), ...images, ...images.slice(0, cloneCount)];

  return (
    <div
      ref={galleryRef}
      className={styles.gallery}
      data-animated={animated}
      style={{ "--carousel-transition": `${TRANSITION_DURATION}ms` } as CSSProperties}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(true); }}
      onPointerLeave={(event) => { if (event.pointerType !== "touch") setHovered(false); }}
      onFocusCapture={(event) => {
        if (!rotationButtonRef.current?.contains(event.target)) setAutomatic(false);
      }}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          manualMove(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div
        id={stageId}
        className={styles.stage}
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
            manualMove(dx < 0 ? 1 : -1);
          }
        }}
      >
        <div
          ref={trackRef}
          className={styles.track}
          style={{ "--carousel-position": position } as CSSProperties}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget && event.propertyName === "transform") finishTransition();
          }}
        >
          {slides.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={`${styles.slide} ${index === position ? styles.activeSlide : index < position ? styles.previousSlide : styles.nextSlide}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${(index - cloneCount + images.length) % images.length + 1} of ${images.length}`}
              aria-hidden={index !== position}
            >
              <button
                type="button"
                className={styles.imageButton}
                style={image.video ? { cursor: "pointer" } : undefined}
                tabIndex={index === position ? 0 : -1}
                aria-haspopup={index === position && !image.video ? "dialog" : undefined}
                aria-label={image.video
                  ? index === position
                    ? `Play or pause ${image.label.toLowerCase()} video`
                    : `Show ${image.label.toLowerCase()} video`
                  : `Enlarge ${image.label.toLowerCase()} photo`}
                onClick={(event) => {
                  if (swiped.current && event.detail !== 0) {
                    swiped.current = false;
                    return;
                  }
                  if (transitionRef.current) return;
                  if (index !== position) {
                    manualMove(index < position ? -1 : 1);
                    return;
                  }
                  setAutomatic(false);
                  if (image.video) {
                    setVideoToggled((current) => !current);
                    return;
                  }
                  window.dispatchEvent(new CustomEvent("open-lightbox", {
                    detail: { src: image.src, alt: image.alt, trigger: event.currentTarget }
                  }));
                }}
              >
                {image.video ? (
                  <SlideVideo image={image} video={image.video} active={index === position} playing={videoPlaying} />
                ) : (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === cloneCount}
                    loading={index === cloneCount ? undefined : "eager"}
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-contain"
                    onLoad={() => {
                      loadedSources.current.add(image.src);
                      if (loadedSources.current.size === new Set(images.filter((item) => !item.video).map((item) => item.src)).size) setImagesReady(true);
                    }}
                  />
                )}
                {!image.video && (
                  <span className={styles.expand} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
        <button type="button" className={`${styles.arrow} ${styles.previous}`} aria-label="Previous product photo" aria-controls={stageId} aria-disabled={transitioning} onClick={() => manualMove(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="m14 6-6 6 6 6" />
          </svg>
        </button>
        <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Next product photo" aria-controls={stageId} aria-disabled={transitioning} onClick={() => manualMove(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="m10 6 6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.selection}>
          <div className={styles.thumbnails} role="group" aria-label="Choose product photo">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={styles.thumbnail}
                aria-label={`Show ${image.label.toLowerCase()} ${image.video ? "video" : "photo"}`}
                aria-controls={stageId}
                aria-pressed={index === activeIndex}
                aria-disabled={transitioning}
                onClick={() => {
                  setAutomatic(false);
                  if (index !== activeIndex) move(index - activeIndex);
                }}
              >
                <Image src={image.src} alt="" fill sizes="64px" loading="eager" className="object-contain" />
                {image.video && (
                  <span className={styles.videoBadge} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 6 9 6-9 6Z" /></svg>
                  </span>
                )}
              </button>
            ))}
          </div>
          <button
            ref={rotationButtonRef}
            type="button"
            className={styles.rotation}
            aria-controls={stageId}
            disabled={!motionAllowed}
            aria-label={!motionAllowed ? "Automatic rotation is off for reduced motion" : automatic ? "Pause automatic image rotation" : "Play automatic image rotation"}
            onClick={() => setAutomatic((current) => !current)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              {automatic && motionAllowed ? <path d="M9 6v12M15 6v12" /> : <path d="m9 5 10 7-10 7Z" />}
            </svg>
          </button>
        </div>
        <p className={styles.caption} role="status" aria-live={automatic ? "off" : "polite"} aria-atomic="true">
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
