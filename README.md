# DamaVenus Website

## Completion pass (2026-04-04)

- Robots and sitemap routes were added and aligned with `siteConfig.url`.
- Navigation and footer were extended with `Privacy` and `Imprint`, including placeholder pages.
- `.gitignore` and `.dockerignore` were updated for build artifacts and sensitive files.
- Keyboard-only and accessibility baseline checks were completed (landmarks, labels, alt strategy, focus-visible, touch targets).

### Remaining risks

- Build-Blocker außerhalb dieses Scopes: `Invalid CTA config for home module: press`.
- Rechtliche Inhalte auf `/privacy` und `/imprint` sind noch Platzhalter.

## Design-System / Tokens

- Ungültige Klasse `text-foreground` wurde entfernt; für About-Statements wird jetzt das vorhandene Token `text-primary` verwendet.
- Repo-weiter Check auf `text-foreground`: keine verbleibenden Verwendungen.
