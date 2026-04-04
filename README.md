# DamaVenus Website

## Betriebsstand (synchron zu `docs/dama-venus-website/99_status.md`)

### Aktueller Stand
- Seitenrouten vorhanden: `/`, `/music`, `/visuals`, `/about`, `/press`, `/contact`, `/privacy`, `/imprint`.
- SEO-Basis vorhanden: `robots.ts` und `sitemap.ts` mit Domain aus `siteConfig.url`.
- Navigation enthält Legal-Links auf `/privacy` und `/imprint`.
- Kontaktformular und Contact-API-Route sind implementiert.

### Verifizierte Erledigungen
- Privacy-/Imprint-Seiten sind angelegt.
- Robots-/Sitemap-Routen sind implementiert.
- Legal-Links in Navigation sind umgesetzt.

### Offene Punkte
- Bekannter Build-Blocker: `Invalid CTA config for home module: press`.
- `/privacy` und `/imprint` enthalten aktuell Placeholder-Texte.
- Finale Press-/EPK-/Link-Fakten sind noch nicht vollständig final.

### Nächste Schritte
1. CTA-Konfiguration Home/Press konsistent machen (Build-Blocker beheben).
2. Rechtstexte für Privacy/Imprint finalisieren.
3. Finalen Build-/QA-Pass durchführen.
