"use client";

import { useEffect } from "react";

/**
 * Observes all lazy-loaded images and adds a "loaded" class when they finish loading.
 * This enables smooth CSS fade-in transitions instead of abrupt pop-in.
 */
export default function ImageLoadObserver() {
  useEffect(() => {
    const markLoaded = (img: HTMLImageElement) => {
      img.classList.add("loaded");
    };

    // Handle images already in the DOM
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        markLoaded(img);
      } else {
        img.addEventListener("load", () => markLoaded(img), { once: true });
      }
    });

    // Handle dynamically added images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            node.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
              if (img.complete && img.naturalWidth > 0) {
                markLoaded(img);
              } else {
                img.addEventListener("load", () => markLoaded(img), { once: true });
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
