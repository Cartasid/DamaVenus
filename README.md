# DamaVenus Website

## Abschluss-Pass (2026-04-04)

- Robots-/Sitemap-Routen ergänzt und auf `siteConfig.url` ausgerichtet.
- Navigation/Footer um `Privacy` und `Imprint` erweitert, inklusive Platzhalterseiten.
- `.gitignore`/`.dockerignore` für Build-Artefakte und sensible Dateien ergänzt.
- Keyboard-only/A11y-Basis geprüft (Landmarks, Labels, Alt-Strategie, Focus Visible, Touch Targets).

### Verbleibende Risiken

- Build-Blocker außerhalb dieses Scopes: `Invalid CTA config for home module: press`.
- Rechtliche Inhalte auf `/privacy` und `/imprint` sind noch Platzhalter.

## Layout / Design-System

- `site-container` in `app/globals.css` ist die einzige Source of Truth für globale Content-Breite und horizontale Innenabstände (Header/Main/Footer).
- Komponenten definieren dafür keine eigene `max-width`; falls nötig werden nur vertikale Spacing-Klassen pro Abschnitt ergänzt.
