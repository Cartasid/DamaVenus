# DamaVenus Website

## Asset-Pipeline (verpflichtend vor Build/Deploy)

Die Dama-Venus-Assets werden deterministisch über `scripts/prepare-dama-venus-assets.mjs` erzeugt.
Der Schritt ist verpflichtend in den Build integriert:

- `npm run prepare:dama-venus-assets`
- `npm run build` führt automatisch zuerst `npm run prepare:dama-venus-assets` aus.

### Eingaben / Ausgaben

- **Input:** `pics/**` (zulässige Endungen: `.jpg`, `.jpeg`, `.png`, `.webp`, `.heic`)
- **Output (generiert):** `public/assets/dama-venus/**`
  - Der Pipeline-Report liegt in:
    - `public/assets/dama-venus/asset-map.json`
    - `public/assets/dama-venus/asset-map.ts`
- **Kompatibilität zu `content/dama-venus/assets.ts`:**
  - Die Pipeline liest alle `finalPath`/`sourcePath`-Paare aus `content/dama-venus/assets.ts`.
  - Für jeden Eintrag wird die Datei exakt unter `finalPath` erzeugt (Kopie oder Format-Konvertierung aus `sourcePath`).
  - Fehlt ein `sourcePath`, wird der Eintrag im Pipeline-Report als `missing-source` markiert.

### HEIC-Unterstützung und Fallback

Die Pipeline versucht HEIC-Verarbeitung in folgender Reihenfolge:

1. `sharp` (direkt)
2. Externe Tools (erstes verfügbares):
   - `magick`
   - `convert`
   - `heif-convert`
   - `sips`

Wenn kein HEIC-Tooling verfügbar ist:

- HEIC-Dateien aus der generischen `pics`-Verarbeitung werden als *non-blocking skip* markiert.
- HEIC-Dateien, die ohne verfügbares Tooling nicht verarbeitet werden können, werden im Pipeline-Report markiert.

Für CI/Server ohne HEIC-Tooling gilt daher:

- Entweder HEIC-Tooling installieren (z. B. ImageMagick/libheif), **oder**
- alle referenzierten Pflicht-Assets in nicht-HEIC-Form bereitstellen.

### Reproduzierbarkeit

Deterministische Erzeugung wird sichergestellt durch:

- stabile Sortierung der Quell-Dateien,
- feste Naming-Regeln und Varianten-Profile,
- versionierte Zielnamen im Pipeline-Output,
- verpflichtende Ausführung vor jedem Build (`npm run build`).

## Abschluss-Pass (2026-04-04)

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
