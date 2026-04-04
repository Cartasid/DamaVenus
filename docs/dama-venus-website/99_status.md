# 99 Status

## Aktueller Stand (faktenbasiert, Code-gegenprüfbar)
- Next.js-App-Routen sind vorhanden für `/`, `/music`, `/visuals`, `/about`, `/press`, `/contact`, `/privacy`, `/imprint`.  
  Code: `app/page.tsx`, `app/music/page.tsx`, `app/visuals/page.tsx`, `app/about/page.tsx`, `app/press/page.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/imprint/page.tsx`.
- SEO-Basisrouten sind vorhanden: `app/robots.ts` und `app/sitemap.ts` nutzen `siteConfig.url` als Basisdomain.
- Navigation enthält Legal-Links (`/privacy`, `/imprint`) in `content/data/navigation.data.ts`.
- Kontakt-Flow ist technisch vorhanden: UI unter `app/contact/page.tsx`/`app/contact/ContactForm.tsx`, API unter `app/api/contact/route.ts`.
- Der aktuelle Build-Blocker bleibt bestehen: In `content/data/homepage.data.ts` wird bei CTA-Abweichung explizit `Invalid CTA config for home module: press` geworfen.

## Verifizierte Erledigungen
- Privacy- und Imprint-Seiten sind angelegt (derzeit Placeholder-Inhalte).
- Robots- und Sitemap-Routen sind implementiert.
- Navigation wurde um Privacy/Imprint ergänzt.
- Kontaktformular inkl. Submit-Route ist im Code vorhanden.

## Offene Punkte
- Build ist derzeit nicht durchgängig grün, solange die CTA-Validierung für das Home-Modul `press` fehlschlägt (`content/data/homepage.data.ts`).
- Rechtstexte auf `/privacy` und `/imprint` sind Placeholder und nicht produktionsreif.
- Finale externe Inhalte/Fakten (z. B. verifizierte Press-/EPK-Daten, finale Release-/Profil-Links) sind weiterhin abhängig von fachlicher Freigabe und in den Datendateien nur teilweise finalisiert.

## Nächste Schritte
1. CTA-Konfiguration im Home-/Press-Datenmodell konsistent machen, sodass der bekannte Build-Blocker entfällt.
2. Rechtstexte für `/privacy` und `/imprint` fachlich/juristisch final einpflegen.
3. Danach finalen Build-/QA-Pass fahren (inkl. A11y/SEO-Checks), erst dann Gesamtstatus auf „final“ setzen.

## Historie (nur konsistente, nicht widersprüchliche Einträge)
- 2026-04-04: SEO/Legal-Basis ergänzt (`app/robots.ts`, `app/sitemap.ts`, `app/privacy/page.tsx`, `app/imprint/page.tsx`, Legal-Links in Navigation).
- 2026-04-04: Bekannter Build-Blocker dokumentiert: `Invalid CTA config for home module: press` (in `content/data/homepage.data.ts`).
