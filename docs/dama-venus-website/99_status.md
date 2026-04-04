# 99 Status

## Current State (Ist-Stand)

### Assets
- Asset-Mapping ist im Code aktiv und wird zentral über `content/dama-venus/assets.ts` + `content/data/site.config.ts` aufgelöst.
- Homepage-, Music-, Visuals-, About- und Press-Assets sind referenziert; für `/visuals` werden teils weiterhin direkte `/pics`-Dateien verwendet.
- Asset-Kuration ist funktional, aber nicht vollständig produktionsfinal (insb. finale Exporte/Derivate und QA pro Zielkanal).

### Routing
- Aktive App-Routes im Bestand: `/`, `/visuals`, `/music`, `/about`, `/press`, `/contact`.
- Navigation ist konsistent auf diese Routen ausgerichtet.
- Frühere IA-Begriffe wie „Portfolio“ oder „Leistungen“ sind **nicht** der aktuelle Code-Stand.

### Contact
- `/contact` enthält Intro, Formularfelder, Submit-Button, Success-State-Markup und sekundäre Kontaktpfade.
- Primäre Kontaktadresse ist aktuell `booking@damavenus.com`; Press-Pfad ist als `/press` plus `press@damavenus.com` geführt.
- Technisch ist es derzeit ein UI-Formflow ohne serverseitige Submit-/Dispatch-Logik.

### SEO
- Basis-Metadata ist umgesetzt (global + je Route): Title, Description, Canonical, OpenGraph, Twitter.
- `metadataBase`, Manifest und Icons sind global konfiguriert.
- JSON-LD/Schema ist aktuell nicht implementiert.

### A11y
- Skip-Link, `focus-visible`-Styles und `prefers-reduced-motion`-Fallbacks sind vorhanden.
- Formfelder haben Labels/Helper-Text; Statusbereich ist als `aria-live` markiert.
- Ein vollständiger seitenübergreifender QA-Durchlauf (Keyboard-Flow, Kontrast, Formularfehlerzustände) ist noch offen.

### Deployment
- Eine Produktions-URL ist in `site.config` gesetzt (`https://damavenus.com`).
- Im Repo ist kein klarer Deployment-Workflow (z. B. Vercel/Netlify/GitHub Actions) dokumentiert.
- Deployment-Readiness ist daher nur teilweise belegbar (Build-Skripte vorhanden, Betriebsprozess nicht dokumentiert).

## Open Issues (nur aktuell offen)

| Thema | Owner | Impact | Next Action |
|---|---|---|---|
| Finale Asset-Derivate & Qualitätsabnahme (`/visuals`, `/music`, `/press`) | Design + Content | Mittel bis hoch (visuelle Qualität, Performance-Konsistenz) | Finale Exportstrecke in `public/assets/...` abschließen und pro Modul QA-Check dokumentieren. |
| Verifizierte finale Fakten/Links (Bio, Releases, Press, Social, Downloads) | Content/PR | Hoch (inhaltliche Verlässlichkeit, Veröffentlichungsreife) | Enddaten freigeben und Datenfiles (`about`, `music`, `press`) auf verifizierte Werte einfrieren. |
| Contact-Flow Backend-Entscheidung (UI-only vs. echter Submit/Dispatch) | Product + Tech | Mittel (operativer Kontaktprozess, Response-Handling) | Zielarchitektur festlegen und bei Bedarf serverseitige Submission + Routingregeln implementieren. |
| SEO-Finalisierung (OG-Bilder je Seite, optional JSON-LD) | SEO + Tech | Mittel (Sharing-Qualität, Rich Results-Potenzial) | Finale OG-Assets bereitstellen und Schema-Einführung gegen verfügbare Faktenlage entscheiden. |
| Deployment-Dokumentation/Betriebsfreigabe | Tech/Ops | Mittel (Release-Sicherheit, Reproduzierbarkeit) | Zielplattform + Rollout-Schritte + Verantwortlichkeiten in kurzer Deployment-Runbook-Datei festhalten. |
| Siteweiter A11y/Interaction QA-Pass | QA + Frontend | Mittel (Zugänglichkeit, finale Abnahme) | Checkliste für Fokusführung, States, Reduced Motion und Formular-UX durchtesten und protokollieren. |

## Chronology (verdichtet)
- **2026-04-03**: Konzeptphase (`00`–`07`) abgeschlossen; Foundation + Seiten-Shells für alle Kernrouten umgesetzt.
- **2026-04-03**: Home, Music, Visuals, About und Press iterativ auf datengetriebene Module umgestellt; Asset-Mapping stark ausgebaut.
- **2026-04-04**: Contact-Seite auf Formularstruktur + sekundäre Kontaktpfade konkretisiert.
- **2026-04-04**: Metadata/SEO-Basisstand dokumentiert; JSON-LD weiterhin bewusst zurückgestellt.
- **2026-04-04**: Globaler visueller Konsistenzabgleich dokumentiert; Restaufgaben auf QA/Finalisierung fokussiert.

---

**Hinweis zur Konsistenzbereinigung:**
Dieser Status priorisiert den realen Codebestand. Veraltete Aussagen (z. B. „Contact-Form noch nicht umgesetzt“, alte IA-Begriffe wie „Portfolio/Leistungen“ als aktive Hauptrouten, oder bereits überholte Zwischenstände) wurden aus dem Hauptstatus entfernt und in die verdichtete Chronology überführt.
