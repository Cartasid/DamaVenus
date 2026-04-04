# DamaVenus Website

## Abschluss-Pass (2026-04-04)

- Robots-/Sitemap-Routen ergänzt und auf `siteConfig.url` ausgerichtet.
- Navigation/Footer um `Privacy` und `Imprint` erweitert, inklusive Platzhalterseiten.
- `.gitignore`/`.dockerignore` für Build-Artefakte und sensible Dateien ergänzt.
- Keyboard-only/A11y-Basis geprüft (Landmarks, Labels, Alt-Strategie, Focus Visible, Touch Targets).
- Kontakt-Flow ist aktiviert: `/contact` rendert das datengetriebene `<ContactForm />`, validiert clientseitig vor dem Request und sendet an `/api/contact`.

## Contact-Flow (aktiv)

1. Formularfelder/Labels/Helper werden aus `content/data/contact.data.ts` gerendert.
2. Clientseitig werden Werte vor dem API-Call getrimmt und auf Mindestanforderungen geprüft.
3. `POST /api/contact` führt Server-Validierung + Rate-Limit durch und sendet via konfiguriertem Provider.
4. Fehler werden UI-kompatibel mit stabilem Schema zurückgegeben: `{ ok: false, code, message }`.

## Contact ENV

- `CONTACT_PROVIDER` (`noop` | `webhook` | `resend`)
- `CONTACT_TO_EMAIL` (für Provider-Flows mit Zieladresse)
- `CONTACT_FROM_EMAIL` (nur `resend`)
- `RESEND_API_KEY` (nur `resend`)
- `CONTACT_WEBHOOK_URL` (nur `webhook`)
- `CONTACT_API_KEY` (optional, nur `webhook`)

## Verbleibende Risiken

- Build-Blocker außerhalb dieses Scopes: `Invalid CTA config for home module: press`.
- Rechtliche Inhalte auf `/privacy` und `/imprint` sind noch Platzhalter.
