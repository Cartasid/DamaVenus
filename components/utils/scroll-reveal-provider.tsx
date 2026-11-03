"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  // Re-run on every client-side navigation: the layout persists, so a mount-only
  // effect would never observe the .reveal elements of newly rendered pages,
  // leaving them at opacity 0 (blank sections).
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal, .reveal-fade").forEach((el) => {
        el.setAttribute("data-revealed", "true");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.setAttribute("data-revealed", "true");

            // Stagger children marked with reveal-child
            const staggerChildren = el.querySelectorAll<HTMLElement>(".reveal-child");
            staggerChildren.forEach((child, i) => {
              child.style.transitionDelay = `${i * 0.08}s`;
              child.setAttribute("data-revealed", "true");
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-fade").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
