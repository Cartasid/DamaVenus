"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Marks lazy images as loaded for the existing fade-in treatment.
 * A single capture-phase listener handles current and future images without a
 * subtree MutationObserver or one listener per image.
 */
export default function ImageLoadObserver() {
  // Re-scan after each client-side navigation so lazy images that were already
  // complete (cached) when inserted are not left at opacity 0.
  const pathname = usePathname();

  useEffect(() => {
    const markLoaded = (img: HTMLImageElement) => {
      if (img.loading !== "lazy") return;
      img.dataset.loaded = "true";
      img.classList.add("loaded");
    };

    const handleImageCompletion = (event: Event) => {
      if (event.target instanceof HTMLImageElement) {
        markLoaded(event.target);
      }
    };

    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      if (img.complete) markLoaded(img);
    });

    document.addEventListener("load", handleImageCompletion, true);
    document.addEventListener("error", handleImageCompletion, true);

    return () => {
      document.removeEventListener("load", handleImageCompletion, true);
      document.removeEventListener("error", handleImageCompletion, true);
    };
  }, [pathname]);

  return null;
}
