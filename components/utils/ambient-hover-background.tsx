"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HOVER_SELECTOR = ".img-color-reveal";
const ACTIVE_ATTRIBUTE = "data-ambient-active";

/**
 * Page-wide ambient pink that follows the hovered image.
 *
 * Any element carrying `.img-color-reveal` (every `ImageReveal` tile, plus the
 * hero/press sections that apply the class directly) triggers it — the same
 * elements that already run the BW → colour image effect. Hovering or
 * keyboard-focusing one writes the tile's centre onto :root and flips
 * `data-ambient-active`, which `.page-ambient` in globals.css reads to tint
 * the whole page a fixed brand pink. The colour itself is a CSS constant
 * (`--dv-ambient-rgb`), not derived from the image — this component only
 * tracks *whether* and *where* the effect should show.
 */
export default function AmbientHoverBackground() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    let hovered: HTMLElement | null = null;
    let focused: HTMLElement | null = null;

    const resolve = (node: EventTarget | null): HTMLElement | null =>
      node instanceof Element ? node.closest<HTMLElement>(HOVER_SELECTOR) : null;

    const sync = () => {
      const target = hovered ?? focused;

      if (!target) {
        root.removeAttribute(ACTIVE_ATTRIBUTE);
        return;
      }

      const rect = target.getBoundingClientRect();
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
