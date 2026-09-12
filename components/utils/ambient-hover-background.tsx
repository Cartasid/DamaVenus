"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ACCENT_ATTRIBUTE = "data-ambient-accent";
const ACTIVE_ATTRIBUTE = "data-ambient-active";

const rgbCache = new Map<string, string>();

/** "#d51670" → "213 22 112" (space-separated for `rgb(... / <alpha>)`). */
function toRgbTriplet(hex: string): string | null {
  const key = hex.trim();
  const cached = rgbCache.get(key);
  if (cached) return cached;

  const match = /^#([0-9a-f]{6})$/i.exec(key);
  if (!match) return null;

  const value = Number.parseInt(match[1], 16);
  const triplet = `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
  rgbCache.set(key, triplet);
  return triplet;
}

/**
 * Page-wide ambient colour that follows the hovered image.
 *
 * Elements opt in by carrying `data-ambient-accent="#rrggbb"` (set by
 * `ImageReveal` from the generated accent map). Hovering or focusing such an
 * element writes the colour plus the tile centre onto :root, where the
 * `.page-ambient` layer picks them up. The existing BW → colour image reveal is
 * untouched; this only adds a background layer behind all content.
 */
export default function AmbientHoverBackground() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    let hovered: HTMLElement | null = null;
    let focused: HTMLElement | null = null;

    const resolve = (node: EventTarget | null): HTMLElement | null =>
      node instanceof Element ? node.closest<HTMLElement>(`[${ACCENT_ATTRIBUTE}]`) : null;

    const sync = () => {
      const target = hovered ?? focused;
      const triplet = target ? toRgbTriplet(target.getAttribute(ACCENT_ATTRIBUTE) ?? "") : null;

      if (!target || !triplet) {
        // Keep the last hue so the tint fades out in its own colour.
        root.removeAttribute(ACTIVE_ATTRIBUTE);
        return;
      }

      const rect = target.getBoundingClientRect();
      root.style.setProperty("--dv-ambient-rgb", triplet);
      root.style.setProperty("--dv-ambient-x", `${Math.round(rect.left + rect.width / 2)}px`);
      root.style.setProperty("--dv-ambient-y", `${Math.round(rect.top + rect.height / 2)}px`);
      root.setAttribute(ACTIVE_ATTRIBUTE, "true");
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = resolve(event.target);
      if (target === hovered) return;
      hovered = target;
      sync();
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!hovered) return;
      const next = resolve(event.relatedTarget);
      if (next === hovered) return;
      hovered = next;
      sync();
    };

    const handleFocusIn = (event: FocusEvent) => {
      focused = resolve(event.target);
      sync();
    };

    const handleFocusOut = () => {
      focused = null;
      sync();
    };

    const handleWindowBlur = () => {
      hovered = null;
      focused = null;
      sync();
    };

    const pointerCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (pointerCapable) {
      document.addEventListener("pointerover", handlePointerOver);
      document.addEventListener("pointerout", handlePointerOut);
    }
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      if (pointerCapable) {
        document.removeEventListener("pointerover", handlePointerOver);
        document.removeEventListener("pointerout", handlePointerOut);
      }
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("blur", handleWindowBlur);
      root.removeAttribute(ACTIVE_ATTRIBUTE);
    };
    // Re-running on navigation resets a tint whose source tile no longer exists.
  }, [pathname]);

  return (
    <div className="page-ambient" aria-hidden="true">
      <div className="page-ambient__glow" />
    </div>
  );
}
