# DamaVenus Website

## Abschluss-Pass (2026-04-04)

- Robots-/Sitemap-Routen ergänzt und auf `siteConfig.url` ausgerichtet.
- Navigation/Footer um `Privacy` und `Imprint` erweitert, inklusive Platzhalterseiten.
- `.gitignore`/`.dockerignore` für Build-Artefakte und sensible Dateien ergänzt.
- Keyboard-only/A11y-Basis geprüft (Landmarks, Labels, Alt-Strategie, Focus Visible, Touch Targets).

### Verbleibende Risiken

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
