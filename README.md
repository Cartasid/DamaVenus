# DamaVenus Website

## 1) Projektüberblick & Ziel der Website
Diese Repository enthält die offizielle Dama-Venus-Website als inhaltsgetriebene, visuell-fokussierte Next.js-App mit den Hauptseiten **Home, Visuals, Music, About, Press und Contact**.

Ziel der Website:
- Markenpräsenz („Music. Image. Presence.“) konsistent ausspielen.
- Inhalte über ein typed Content-Modell (`content/data`) zentral pflegen.
- Asset-basierte Seitenmodule über ein zentrales Asset-Mapping (`assetMap`) steuern.
- Kontaktführung für Booking/Press/Collaboration bereitstellen.

---

## 2) Tech-Stack
- **Framework:** Next.js (App Router)
- **UI:** React
- **Styling:** Tailwind CSS + globale Styles in `app/globals.css`
- **Language/Typing:** TypeScript (strict)
- **Build Tooling:** Next Build Pipeline
- **Asset Pipeline:** eigenes Node-Skript `scripts/prepare-dama-venus-assets.mjs`
- **PostCSS:** `tailwindcss` + `autoprefixer`

Kern-Architektur:
- Routing über `app/*` (App Router).
- Wiederverwendbare Layout-Komponenten in `components/layout/*`.
- Seiten-/Modul-Content getrennt von Rendering in `content/data/*`.
- Priorisierte Asset-Liste in `content/dama-venus/assets.ts`.

---

## 3) Lokaler Start
### Voraussetzungen
- Node.js (LTS empfohlen)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Startet die App lokal im Dev-Modus.

### Production Build
```bash
npm run build
```
Erzeugt den Produktions-Build.

### Production Start
```bash
npm run start
```
Startet den zuvor erzeugten Build.

### Lint / Checks
```bash
npm run lint
```
Führt `next lint` aus.

---

## 4) Asset-Pipeline
Die Asset-Pipeline wird über `scripts/prepare-dama-venus-assets.mjs` ausgeführt.

### Input-Ordner
- `pics/`

### Unterstützte Input-Formate
- `.jpg`, `.jpeg`, `.png`, `.webp`, `.heic`

### Output-Struktur
- Root: `public/assets/dama-venus/`
- Varianten pro Bereich:
  - `public/assets/dama-venus/<bereich>/<variant>/...`
- Mapping-Artefakte:
  - `public/assets/dama-venus/asset-map.json`
  - `public/assets/dama-venus/asset-map.ts`

### Skriptaufruf
```bash
node scripts/prepare-dama-venus-assets.mjs
```

### HEIC-Hinweise
Das Skript versucht HEIC-Verarbeitung mit lokaler Tool-Priorität:
1. `magick`
2. `convert`
3. `heif-convert`
4. `sips`

Wenn keines der Tools verfügbar ist:
- HEIC-Dateien werden als `skipped-heic` markiert (non-blocking).
- `heicStatus` + TODO-Hinweise landen im Mapping.
- Der Lauf bleibt für diesen Fall bewusst nicht-blockierend.

---

## 5) Content-Struktur
### `content/data`
Zentrale, typisierte Inhaltsquellen pro Bereich, z. B.:
- `homepage.data.ts`
- `visuals.data.ts`
- `music.data.ts`
- `about.data.ts`
- `press.data.ts`
- `contact.data.ts`
- `navigation.data.ts`
- `site.config.ts`

### `content/dama-venus/assets.ts`
Enthält `prioritizedAssets` als kuratierte Asset-Liste mit Metadaten (z. B. Bereich, Priorität, Crop-/Focus-Hints, Rolle, SW/Farb-Eignung).

### AssetMap-Prinzip
In `content/data/site.config.ts` wird aus `prioritizedAssets` die zentrale `assetMap` erzeugt:
- Key = `asset.id`
- Value = normierte Asset-Metadaten (`src`, `alt`, `priority`, `swColorMode`, `overlaySuitability`, …)

Seiten-/Moduldaten referenzieren Assets über `assetId` statt direkter Hardcodierung, wodurch Zuordnung und Pflege zentralisiert bleiben.

---

## 6) Deployment-Überblick
### Build-/Runtime-Anforderungen
- Build: `npm run build`
- Runtime: `npm run start` (Node.js Runtime)

### ENV
- Aktueller Code verwendet **keine** `process.env`-Variablen.
- Betriebsrelevante Basiswerte (z. B. Website-URL) sind derzeit statisch in `content/data/site.config.ts` hinterlegt.

### Host-Hinweise
- Geeignet für typische Next.js-Hoster (z. B. Node-basierte Deployments).
- Für Produktion sollten Domain-/URL-Werte konsistent zur Zielumgebung gepflegt werden.
- Statische Assets müssen unter `public/` vollständig mit ausgerollt werden.

---

## 7) ENV-Tabelle (Pflicht/Optional)
> Stand aktuell: keine aktive ENV-Auswertung im Anwendungscode.

| Variable | Pflicht | Zweck | Status |
|---|---|---|---|
| _keine_ | Nein | Es werden aktuell keine ENV-Variablen ausgelesen. | Aktiv |

### Contact-Flow (wichtig)
- Der Contact-Flow ist aktuell content-/UI-basiert (Felder + Success-Container in der Seite).
- Es gibt derzeit keine serverseitige Submit-ENV im Code (kein aktives `process.env` für Contact-Dispatch).
- Kontaktziele werden aktuell über Content/Mailto-Pfade geführt.

---

## 8) Bekannte Restpunkte / Limitierungen
- **Contact Backend Dispatch:** Es ist noch kein produktionsreifer serverseitiger Submit-/Routing-Flow über ENV im Code verdrahtet.
- **Finale Kontakt-Endpunkte:** Verbindliche Betriebsfreigaben für Routing/Weiterleitung je Inquiry-Typ sind als Restpunkt dokumentiert.
- **HEIC ohne Tooling:** Ohne lokales HEIC-Tool werden HEIC-Dateien in der Pipeline übersprungen (non-blocking).
- **Asset-Finalisierung:** Finale Kurations-/Export- und Polishing-Schritte sind projektseitig noch als Restarbeiten geführt.
- **Finale technische SEO-Details:** OG-Routebilder/produktive Domain-/Icon-Endstände sind noch als offene Endabnahmepunkte beschrieben.
