# DamaVenus Website

## Abschluss-Pass (2026-04-04)

- Robots-/Sitemap-Routen ergänzt und auf `siteConfig.url` ausgerichtet.
- Navigation/Footer um `Privacy` und `Imprint` erweitert, inklusive Platzhalterseiten.
- `.gitignore`/`.dockerignore` für Build-Artefakte und sensible Dateien ergänzt.
- Keyboard-only/A11y-Basis geprüft (Landmarks, Labels, Alt-Strategie, Focus Visible, Touch Targets).

### Verbleibende Risiken

- Build-Blocker außerhalb dieses Scopes: `Invalid CTA config for home module: press`.
- Rechtliche Inhalte auf `/privacy` und `/imprint` sind noch Platzhalter.

## Design-System / Tokens

- Ungültige Klasse `text-foreground` wurde entfernt; für About-Statements wird jetzt das vorhandene Token `text-primary` verwendet.
- Repo-weiter Check auf `text-foreground`: keine verbleibenden Verwendungen.
