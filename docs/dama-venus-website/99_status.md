# 99 Status

## Entscheidung Rechtstexte (2026-04-04)
- Es werden **vorerst keine finalen Rechtstexte** eingepflegt.
- Die Website ist damit im aktuellen Zustand explizit **not launch-ready**.
- `/privacy` und `/imprint` bleiben als Placeholder-Seiten im Projekt, werden aber bei Placeholder-Status nicht über die Sitemap für Indexierung priorisiert.

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
- Finale produktive Kontakt-Dispatch-Konfiguration ist noch umgebungsabhängig (Provider/Secrets wie `CONTACT_PROVIDER`, `CONTACT_WEBHOOK_URL`, `RESEND_API_KEY` in `app/api/contact/route.ts`).
- Mehrere externe Ziel-Links in den Daten sind derzeit generisch bzw. vorläufig (z. B. Plattform-Links in `content/data/music.data.ts`), daher vor Go-live fachlich zu finalisieren.
- Press-Downloads sind weiterhin „on request“ modelliert (`accessMode: "request"` in `content/data/press.data.ts`), kein finaler direkter Download-Pfad hinterlegt.

## Nächste Schritte
1. Produktionswerte für Kontakt-Provider und Secrets setzen und den `/api/contact`-Flow end-to-end testen.
2. Finale externe Release-/Video-/Plattform-Links in den Datenquellen ersetzen und gegenprüfen.
3. Press-Download-Strategie finalisieren (weiterhin „on request“ oder feste Download-Artefakte mit stabilen Pfaden).

## Historie (gekürzt)
- **2026-04-03:** Konzept-/Strukturphase und Seitenausbau für Home, Music, Visuals, About, Press, Contact dokumentiert.
- **2026-04-04:** Metadata/SEO-Status und OG-Fallback konsolidiert.
- Detailverläufe der Einzelschritte wurden zugunsten dieses kompakten Ist-Stands entfernt.
