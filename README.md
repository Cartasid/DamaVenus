# DamaVenus Website

## Completion pass (2026-04-04)

- Robots and sitemap routes were added and aligned with `siteConfig.url`.
- Navigation and footer were extended with `Privacy` and `Imprint`, including placeholder pages.
- `.gitignore` and `.dockerignore` were updated for build artifacts and sensitive files.
- Keyboard-only and accessibility baseline checks were completed (landmarks, labels, alt strategy, focus-visible, touch targets).

### Remaining risks

- Build-Blocker außerhalb dieses Scopes: `Invalid CTA config for home module: press`.
- Rechtliche Inhalte auf `/privacy` und `/imprint` sind noch Platzhalter.

## Fonts (Next.js + Tailwind)

- Der Ladeweg läuft über `next/font/google` in `app/layout.tsx` mit `Inter` und `Space_Grotesk`.
- Die Fonts werden als CSS-Variablen (`--font-inter`, `--font-space-grotesk`) auf dem `<body>` gesetzt.
- `tailwind.config.ts` referenziert diese Variablen in `fontFamily.sans` und `fontFamily.display`.
- Datenschutz/Hosting-Verhalten: Bei `next/font/google` lädt Next.js die Google-Fonts zur Build-Zeit und hostet die Font-Dateien anschließend lokal aus der eigenen App (kein Runtime-Fetch vom Browser zu Google Fonts).
- Fallback-Reihenfolge:
  - `sans`: `var(--font-inter)` → `system-ui` → `sans-serif`
  - `display`: `var(--font-space-grotesk)` → `var(--font-inter)` → `system-ui` → `sans-serif`
