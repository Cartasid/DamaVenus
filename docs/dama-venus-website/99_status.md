# 99 Status

## Aktueller Stand
- App-Routen sind vorhanden für `/`, `/music`, `/visuals`, `/about`, `/press`, `/contact`, `/privacy`, `/imprint`, `/natuerlich` (`app/.../page.tsx`).
- `/natuerlich`: Produktseite für „Natürlich by Dama Venus“ (Haarbürste), shopähnliches Layout mit Preis (19,99 €), deaktiviertem „Kaufen“-Button und transparentem „Sold Out“-Banner über dem Produktbild. Nav-Link (♥ Natürlich, pink) in Header/Footer neben Contact verlinkt. Kein echtes Zahlungs-/Checkout-Backend vorhanden — Button ist bewusst nicht-funktional, da Produkt als ausverkauft markiert ist.
- `/natuerlich`: zweites Produkt „Natürlich by Dama Venus — Cotton Candy“ (19,99 €, Sold Out) unter dem ersten Produkt; Karussell mit zwei Fotos und einem automatisch abspielenden, stummen Loop-Video (`Naturlich2 3.mp4`). Das erste Produkt hat zusätzlich das Kampagnenfoto `Naturlich 1.jpeg`. Neue Assets sind in `content/dama-venus/assets.ts` registriert; die Galerie (`components/shop/product-gallery.tsx`) unterstützt Video-Slides.
- Kontakt-Flow ist technisch vorhanden: Formular unter `app/contact/page.tsx`/`app/contact/ContactForm.tsx`, API-Route unter `app/api/contact/route.ts`.
- SEO-Basisrouten sind vorhanden: `app/robots.ts` und `app/sitemap.ts`.
- Navigation enthält Legal-Links auf `/privacy` und `/imprint` in `content/data/navigation.data.ts`.
- `privacy` und `imprint` sind als Placeholder-Seiten vorhanden (`app/privacy/page.tsx`, `app/imprint/page.tsx`).

## Verifiziert erledigte Punkte
- Build-relevante CSS-Artefakte sind vorhanden.
- Kritische Homepage-Assets sind vorhanden.
- Historien-/Root-Cause-Passagen wurden aus dem aktiven Statusteil entfernt.
- `/natuerlich` verifiziert per Dev-Server + Browser-Screenshot (Desktop 1440px und Mobile 390px): Layout, Sold-Out-Banner, Preis, Button-Disabled-State und pinker Nav-Link rendern korrekt. `npm run typecheck` fehlerfrei.

## Echte offene Punkte
- Finale Rechtstexte für `/privacy` und `/imprint` einpflegen.
- Finale Press-/EPK- und Kontaktdaten vollständig verifizieren und ergänzen.
- Offenen Asset-/Visual-Polish für die produktive Endabnahme schließen.
- Produktentscheidung ausstehend: Soll „Natürlich by Dama Venus“ ein echtes Verkaufsprodukt werden (Payment-/Checkout-Integration, Lagerbestand) oder bleibt es dauerhaft eine Showcase-/Sold-Out-Seite? Aktuell nur Showcase ohne Backend.
- Asset-Pipeline-Regressionsrisiko dokumentiert in `03_asset_strategy.md` Kapitel 11 („Same-Extension-Kopie kann optimierte Assets regressieren“) — vor jedem Commit nach einem Pipeline-Lauf `git diff --stat` auf ungewöhnliche Byte-Sprünge prüfen.

## Nächster sinnvoller Schritt
- Einen finalen Review-/Deploy-Vorbereitungspass durchführen: Rechtstexte einpflegen, Press-/Kontaktdaten verifizieren, Asset-Polish abschließen und danach Launch-Endabnahme entscheiden.
