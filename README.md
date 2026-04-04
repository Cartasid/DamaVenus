# DamaVenus Website

> **Launch-Hinweis:** Not launch-ready, solange `/privacy` und `/imprint` nur Placeholder-Inhalte enthalten.

## Projektüberblick
DamaVenus ist eine Next.js-Website mit statisch gepflegter Content-Schicht (`content/data`) und einer serverseitigen Contact-API unter `app/api/contact/route.ts`.

## Architektur
- **Framework:** Next.js App Router (`app/`).
- **UI-Struktur:** Seiten und Module in `app/` und `components/`.
- **Content-Schicht:** Redaktionsdaten als TypeScript-Objekte in `content/data/`.
- **Assets:** Quellmaterial in `pics/` sowie `assets-src/dama-venus/` (nicht-public Input), aufbereitete Assets in `public/assets/dama-venus/`.
- **Deployment-Stack:** Docker-Container (App) + Nginx Reverse Proxy (Host), siehe `docs/deployment/INSTALLATION_PRODUCTION.md`.

## Lokale Entwicklung
### Paketmanager-Strategie (verbindlich)
Dieses Projekt verwendet **npm** als verbindlichen Paketmanager.

- Abhängigkeiten installieren: `npm ci`
- Entwicklung starten: `npm run dev`
- Lockfile: `package-lock.json` (muss versioniert bleiben)
- `pnpm`/`yarn` werden für dieses Repository nicht verwendet.

### Voraussetzungen
- Node.js 22
- npm (zu Node.js passend)

### Setup
1. `cp .env.example .env.local`
2. `.env.local` projektspezifisch befüllen.
3. `npm ci`
4. `npm run dev`

## Build/Start
- Produktions-Build lokal: `npm run build`
- Produktionsserver lokal: `npm run start`
- `npm run build` führt verpflichtend zuerst `prepare:dama-venus-assets` aus (`npm run prepare:dama-venus-assets && next build`).
- Fehlen priorisierte Asset-Quellen, muss die Asset-Preparation den Build mit Fehler beenden (kein stilles Weiterbauen).

## Verbindlicher Prüfpfad (Quality Gate)
`next lint` ist in dieser Repo-Konstellation ohne zusätzliche ESLint-Installation nicht zuverlässig non-interaktiv ausführbar; daher ist der verbindliche Lint-Check auf einen direkt ausführbaren TypeScript-Lintlauf umgestellt.

Vor jedem Merge/Deploy müssen diese Checks lokal im Repository erfolgreich laufen:

```bash
npm run check
npm run build:check
```

Enthaltene Scripts:
- `npm run lint` -> robuster statischer TypeScript-Lintlauf (`tsc --noEmit --pretty false`)
- `npm run typecheck` -> TypeScript-Check ohne Emit
- `npm run check` -> kombiniert Lint + Typecheck
- `npm run build:check` -> vollständiger Produktions-Build als zusätzlicher Validierungscheck

## Asset-Pipeline
Asset-Preparation erfolgt über:

```bash
node scripts/prepare-dama-venus-assets.mjs
```

Pipeline-Logik:
- Liest Quellen aus `pics/` und `assets-src/dama-venus/` (beides reine, nicht-public Input-Pfade der Pipeline).
- Schreibt optimierte Dateien nach `public/assets/dama-venus/` (dieser Pfad ist der finale Auslieferungspfad; `pics/` ist nie Auslieferung).
- Generiert Mapping-Dateien:
  - `public/assets/dama-venus/asset-map.json`
  - `public/assets/dama-venus/asset-map.ts`
- `sharp` ist die zentrale Bild-Engine für Konvertierung/Optimierung (JPEG/WebP) und Zuschnitte innerhalb der Pipeline.
- Für `.heic` prüft das Script zuerst, ob `sharp` das jeweilige Bild direkt dekodieren kann; wenn ja, ist **kein** externes Tool nötig.
- Nur wenn `sharp` ein `.heic` nicht direkt verarbeiten kann, nutzt das Script als Fallback ein externes Tool (`magick`, `convert`, `heif-convert` oder `sips`); fehlt dieses Tool, werden betroffene HEIC-Dateien als non-blocking Skip markiert.

## Content-Schicht
- Zentrale Inhaltsdaten liegen in `content/data/*.data.ts`.
- Typen liegen in `lib/types/`.
- Seiten konsumieren diese Daten direkt (kein CMS-Layer im aktuellen Codepfad).

## ENV-Variablen
Siehe `.env.example` für lokale Defaults.

Wichtige Contact-/Provider-Variablen:
- `CONTACT_PROVIDER` (`noop` | `webhook` | `resend`)
- Für `CONTACT_PROVIDER=webhook`: `CONTACT_WEBHOOK_URL` (required), `CONTACT_API_KEY` (optional), `CONTACT_TO_EMAIL` (optional)
- Für `CONTACT_PROVIDER=resend`: `RESEND_API_KEY` (required), `CONTACT_TO_EMAIL` (required), `CONTACT_FROM_EMAIL` (required)

Zusätzlich relevant:
- `NEXT_PUBLIC_SITE_URL`
- `NODE_ENV`
- `PORT`

URL-Resolution-Regel:
- Primär wird `NEXT_PUBLIC_SITE_URL` verwendet.
- Ist `NEXT_PUBLIC_SITE_URL` leer oder ungültig, fällt die App auf `https://damavenus.com` zurück.
- Für Metadaten, `robots.txt` und `sitemap.xml` wird diese zentrale Auflösung verwendet.

## Deployment-Flow
Produktionsschritte sind dokumentiert in:

- `docs/deployment/INSTALLATION_PRODUCTION.md`

Kurzablauf:
1. `.env.production` aus `.env.production.example` erzeugen und produktive Werte setzen.
2. Contact-Provider-Variablen in `.env.production` gemäß Provider setzen.
3. Vor Deploy den Prüfpfad ausführen (`npm ci`, `npm run check`, `npm run build:check`).
4. `./scripts/deploy-prod.sh` ausführen (Asset-Preparation läuft im Docker-Build über `npm run build`).
5. Nginx aktivieren und TLS via Certbot einrichten.

## Known limitations
- In-Memory Rate-Limiting der Contact-API ist nicht über Container/Instanzen hinweg geteilt.
- Contact-Provider `webhook` und `resend` benötigen korrekte ENV-Konfiguration; sonst antwortet die API mit Fehler.
- Asset-Preparation läuft im Docker-Build über `npm run build`; kein separater Host-Node-Schritt erforderlich.


## Security / Dependency Status
- Next.js wird auf **15.3.6** festgelegt (gepatchte 15.x-Linie, kein Major-Wechsel).
- Hintergrund: Entfernung der Nutzung von `next@15.3.1` (Deprecated-Hinweis) durch Upgrade auf gepatchtes 15.x-Release.
