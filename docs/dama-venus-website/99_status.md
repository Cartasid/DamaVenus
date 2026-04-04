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
- Reale Bildassets wurden in `/pics` ingestiert, aber eine konkrete visuelle Kuratierung auf Dateiebene ist noch ausstehend.
- Konkrete Seitenlayouts (Desktop/Mobile) pro Seitentyp sind noch nicht ausgearbeitet.
- Die genaue Modulreihenfolge inklusive Inhaltspriorisierung je Seite ist noch festzulegen.
- Motion-Spezifikation auf Komponentenebene (Timing, Trigger, Übergangsregeln) ist noch zu konkretisieren.
- Produktionsreife Content-Bausteine (finale Bildauswahl, Textfassungen, CTA-Formulierungen) sind noch zu erstellen.
- Formaler Konsistenzcheck für Folge-Dokumente (ab `02_...`) gegen Brief + Creative Direction ist als laufender Qualitätsschritt fortzuführen.

## Nächster empfohlener Schritt
- `docs/dama-venus-website/05_copywriting.md` ausarbeiten: modulbezogene Microcopy, Headlines, CTA-Set, Release- und Statement-Texte gemäß der in `04_homepage_concept.md` festgelegten Dramaturgie und Hierarchie.

## Relevante Dateien für den nächsten Schritt
- `docs/dama-venus-website/00_project_brief.md` (verbindliche Ziele, Wirkung, technische Leitplanken)
- `docs/dama-venus-website/01_creative_direction.md` (verbindliche Creative Direction als Bewertungsmaßstab)
- `docs/dama-venus-website/03_asset_strategy.md` (verbindliche Asset-, Crop-, SW/Farbe- und Rollenlogik)
- `docs/dama-venus-website/04_homepage_concept.md` (verbindliche Homepage-Dramaturgie, Modul- und Reihenfolgelogik)
- `docs/dama-venus-website/99_status.md` (aktueller Arbeitsstand und offene Punkte)

## Update 2026-04-03 – Schritt 04 Homepage Concept
- `04_homepage_concept.md` wurde ausgearbeitet und als verbindliche Startseitenkonzeption dokumentiert.
- Die Homepage-Struktur wurde auf eine **editoriale 5-Kernmodule-Komposition** priorisiert (Lead + Release + Visual Story + Statement + Press/EPK + Contact in klarer Dramaturgie, ergänzt um Intro-Layer und Footer).
- Kernmodule wurden festgelegt: Lead Media Tile, Featured Release Tile, Visual Tile, Statement Tile, Press/EPK Tile, Contact/Newsletter Tile sowie Navigation/Intro Layer und Section Break/Text Panel.
- Above-the-fold wurde als nicht-klassisches Hero-System definiert: bilddominanter Einstieg mit minimaler Orientierung statt Banner-Hero.
- Scroll- und Mobile-Prinzip sind konkretisiert: sequenzielle Verdichtung, mobile Neupriorisierung ohne Hover-Abhängigkeit.
- Accessibility-/UX-Konsequenzen wurden für die spätere Umsetzung verbindlich abgeleitet (Fokuszustände, Kontrast, Touch-Ziele, reduzierte Motion).
- Für den nächsten Schritt wurden konkrete Copywriting-Bausteine vorbereitet (Opening-Zeile, Modul-Headlines, Release-Microcopy, Statement-Varianten, CTA-Set, Press/EPK- und Contact-Texte, Navigation-Labels, Footer-Microcopy).

## Nächster empfohlener Schritt (aktualisiert)
- Implementierungsstart mit **Phase 1 (Foundation)** gemäß `docs/dama-venus-website/07_build_plan.md`: App-Router-Grundstruktur, globale Layout-Shell, tokenbasiertes Theme-Setup und typed `content/data`-Grundgerüst zuerst umsetzen.

## Update 2026-04-03 – Schritt 05 Copywriting
- In `05_copywriting.md` wurde textlich festgelegt: Opening-Line, Lead-/Modul-Headlines, Release-Teaser, Statement-Varianten, CTA-Set, Press/EPK-, Contact-/Booking-, Navigation- und Footer-Microcopy als verbindlicher Copy-Rahmen.
- Als Haupttonalität wurde verbindlich beschlossen: **präzise, sinnlich, selbstbewusst und reduziert** mit editorial-cineastischer Wirkung statt werblicher Lautstärke.
- Bereits produktionsnah vorliegend sind: modulbezogene Headlines und Subline-Varianten, CTA-Formulierungen, Kontakt-/Booking-Texte, Press-/EPK-Einstiegstexte sowie Navigations- und Footer-Copy.
- Noch fehlende Fakten/Inputs für finale Produktionsreife: belastbare Bio-Fakten, bestätigte Release-Daten/-Links, verifizierbare Press-Zitate, finale Plattform-/Social-Links, Management-/Booking-/Presse-Kontakte, vollständige Credits sowie kuratierte Download-Assets (EPK, hi-res Press-Fotos, Logos).
- Als nächster Schritt ist `docs/dama-venus-website/06_subpages.md` auszuarbeiten.

## Update 2026-04-03 – Schritt 06 Subpages
- In `06_subpages.md` wurde verbindlich festgelegt, dass die Unterseiten **About, Music, Visuals, Press/EPK und Contact** als eigenständige, aber markenkonsistente Kapitel mit klarer Dramaturgie und CTA-Führung umgesetzt werden.
- Für die Seitenstruktur wurde priorisiert: **Visuals** vor **Music**, danach **About**, anschließend **Contact**, zuletzt **Press/EPK**, jeweils mit klarer Blueprint-Reihenfolge statt generischer Template-Logik.
- Als wiederverwendbare Sektionen wurden beschlossen: Page Intro Frame, Lead Visual Block, Context Block, Feature Block, Statement/Quote Panel, Primary CTA Block und Section Break.
- Noch fehlende Inhalte/Fakten für produktionsreife Umsetzung sind insbesondere reale/kuratierte Assets, belastbare Press-/EPK-Daten (inkl. Zitate, Downloads, Credits) sowie finalisierte Kontakt- und Zuständigkeitsdaten für Booking/Management/Presse.
- Eindeutiger nächster Schritt ist `docs/dama-venus-website/07_build_plan.md`.

## Update 2026-04-03 – Schritt 07 Build Plan
- Die Konzeptphase ist vollständig dokumentiert; mit `00` bis `07` liegen Brief, Creative Direction, Asset-Strategie, Homepage-Konzept, Copywriting, Subpages und Build-Plan als geschlossene Entscheidungsbasis vor.
- Als bindend gelten jetzt die technischen Entscheidungen aus `07_build_plan.md`: App-Router-Routing mit den Routen `/`, `/visuals`, `/music`, `/about`, `/press`, `/contact`; globales 12/8/4-Layout-System; komponentenbasierte Reuse-Architektur; typisiertes Content-/Datenmodell in `content/data`; definierte Asset- und Performance-Strategie; Motion-/A11y-/SEO-Baselines; sowie die feste Build-Reihenfolge von Foundation bis Quality Pass.
- Weiterhin fehlen als offene Inputs: finale reale Assets, verifizierbare Bio-Fakten, bestätigte Release-Links, belastbare Press-Kontakte, kuratierte Download-Pakete, verbindliches Contact-Mailhandling, finale Social-Links, vollständige Credits, rechtliche Seiten (Imprint/Privacy) sowie ggf. Anforderungen für Mehrsprachigkeit.
- Konkret empfohlener erster Implementierungsschritt nach dem Build-Plan ist **Phase 1 (Foundation)**: zuerst Projektstruktur + globale Shell + Theme-/Motion-/SEO-Konfig + Basis-Typen und Daten-Skelette anlegen, bevor Seiten-Feinbau startet.
- Dafür zuerst relevante Dateien/Strukturen im Repo: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `components/navigation/MainNav.tsx`, `components/layout/SiteHeader.tsx`, `components/layout/SiteFooter.tsx`, `lib/config/theme.ts`, `lib/config/motion.ts`, `lib/config/seo.ts`, `lib/types/content.ts`, `lib/types/navigation.ts`, `content/data/site.config.ts`, `content/data/navigation.data.ts`, `content/data/homepage.data.ts`.


## Update 2026-04-03 – Schritt 08 Implementierungsstart (Foundation + Shells)
- Konsistenzcheck zu `07_build_plan.md` durchgeführt: Die Umsetzung folgt der dort festgelegten Reihenfolge (Foundation vor Seitenausbau), den definierten Routen und der Reuse-Architektur; es bestehen keine widersprüchlichen Empfehlungen.
- Gebaut wurden die Foundation-Bausteine: App-Router-Grundstruktur, globale Layout-Basis, tokenbasierte Theme-/Styling-Grundlage sowie die initialen Shell-Strukturen.
- Zusätzlich wurden Header/Footer, Design-Tokens, Home-Shell sowie Subpage-Shells für die priorisierten Routen angelegt.
- Vorhandene Komponenten auf Shell-Ebene: globale Layout-/Navigationsbausteine (inkl. Header/Footer) sowie die für den frühen Seitenaufbau vorgesehenen Shell-Komponenten gemäß Build-Plan-Grundlogik.
- Als Shell angelegte Routen: `/`, `/visuals`, `/music`, `/about`, `/press`, `/contact`.
- Weiterhin blockierende offene Inputs: finale reale Bild-/Video-Assets, verifizierbare Press-/EPK-Daten (inkl. Zitate/Downloads/Credits), bestätigte Release-Links/-Daten, finale Kontaktzuständigkeiten (Booking/Management/Presse), kuratierte Social-/Plattform-Links sowie rechtliche Pflichtinhalte (Imprint/Privacy).

## Nächster empfohlener Schritt (aktualisiert)
- Implementierungsschritt **Visuals/Music-Ausbau + Asset-Integration**: zuerst modulare Inhaltsbausteine für `/visuals` und `/music` mit bestehender Shell-/Token-Basis ausbauen, parallel Asset-Mapping in `content/data` vorbereiten und verfügbare reale Assets priorisiert integrieren.

## Update 2026-04-03 – Asset-Ingest `/pics`
- Asset-Ingest durchgeführt: im Ordner `/pics` wurden 35 Bilddateien gefunden; Formate: `.jpg` (17), `.jpeg` (11), `.png` (2), `.webp` (3), `.heic` (2); Videoformate sind im Ingest nicht enthalten.
- Pipeline-Stand: Rohdaten sind gesammelt, eine kuratorische Bewertung nach `03_asset_strategy.md` (Lead/Secondary-Auswahl, Rollenmapping je Seite, Crop-/SW-Farbe-Entscheidung) ist als nächster Verarbeitungsschritt offen.
- Priorisierungslogik für die Verarbeitung: zuerst potenzielle Lead-Assets für Homepage (3–6), danach Secondary-Set (6–12), anschließend Press-/EPK-geeignete Varianten und mobile/exportierte Derivate.
- Offene Risiken: insbesondere HEIC-Kompatibilität (Decoder/Browser/Pipeline), inkonsistente Dateibenennung (UUID/Kamera-Defaults), gemischte Extension-Cases sowie sehr kleine WebP-Dateien mit möglichem Qualitätsrisiko.
- Nächster Schritt: formale Asset-Inventur + Kurationsrunde mit Zuordnung pro Seite/Modul und Entscheidung, welche Dateien zuerst in die Zielstruktur aus Kapitel 8 der Asset-Strategie überführt werden.

## Update 2026-04-03 – HEIC-Handling im Preparation-Script
- Das Preparation-Script wurde um einen HEIC-Verarbeitungsversuch über lokales Tooling erweitert (Priorität: `magick`, `convert`, `heif-convert`, `sips`).
- Bei fehlender HEIC-Unterstützung greift jetzt ein expliziter, markierter Fallback-Pfad: Varianten werden als `skipped-heic` ausgewiesen, eine TODO-Liste wird im Report geführt und der Exitcode bleibt für diesen Fall bewusst nicht-blockierend.
- Der Metadaten-Output enthält jetzt zusätzlich den Abschnitt `heicStatus` mit Support-Status, erkanntem Tool, Fallback-Nutzung sowie Skip-/TODO-Informationen.
- Der technische Grenzfall „HEIC ohne verfügbares Tooling“ ist in `03_asset_strategy.md` als verbindliche Pipeline-Regel dokumentiert.

## Update 2026-04-03 – Homepage-Assets/Mappings (reproduzierbar)
- **Priorisierte Homepage-Assets (Datenquelle):** In `content/dama-venus/assets.ts` sind für den Home-Kontext aktuell priorisiert `home-release-cover` (Priority 1) und `home-visual-preview` (Priority 2); zusätzlich ist `press-epk` als Press-Asset geführt. Damit ist die Priorisierung nachvollziehbar über `prioritizedAssets` (`id`, `priority`, `area`). Referenz: `content/dama-venus/assets.ts`.
- **Modul-Asset-Zuordnung (Datenquelle):** In `content/data/homepage.data.ts` ist die Zuordnung aktuell wie folgt: `lead` (kein `assetId`), `featuredRelease` → `home-release-cover`, `visuals` → `home-visual-preview`, `statement` (text-only, kein `assetId`), `press` → `press-epk`, `contactNewsletter` (kein `assetId`, nur `assetPath` aus Contact-CTA). Referenz: `content/data/homepage.data.ts`.
- **Verbleibende Lücken/schwache Assets:** Für `lead`, `statement` und `contactNewsletter` fehlen konkrete Bild-Asset-IDs im Homepage-Modulmodell; außerdem ist `press-epk` in der Asset-Priorisierung nicht als `area: "home"` geführt, obwohl es auf der Homepage als Modul verwendet wird. Diese Stellen sind im aktuellen Mapping die schwächsten/inkonsistenten Punkte für einen durchgängig asset-basierten Homepage-Build.
- **Nächster Umsetzungsschritt:** Asset-Mapping harmonisieren, indem für die Homepage-Module ohne `assetId` (`lead`, `statement`, `contactNewsletter`) explizite Assets in der Asset-Map ergänzt und anschließend in `content/data/homepage.data.ts` direkt referenziert werden; danach Prioritäten für alle Home-Module in einer konsistenten Reihenfolge verifizieren.

## Update 2026-04-03 – Schritt 09 Above-the-fold-Finalisierung
- Above the fold ist jetzt konkret festgelegt: **Lead + Intro + Support + Nav** als klarer Einstieg, inklusive verbindlicher SW→Farbe-Logik und mobiler Priorisierung ohne Hover-Abhängigkeit.
- Im oberen Bereich sind die Kernkomponenten als finalisiert markiert: Lead-Bereich, Intro-Layer, Support-Elemente und Hauptnavigation (inkl. der zugehörigen Farb-/State-Logik für den Einstieg).
- Als nächster Schritt bleiben die offenen Punkte **unterhalb des Folds**: finale Modulausarbeitung und inhaltliche Produktionsreife für die nachgelagerten Homepage-Sektionen; die gesamte Homepage wird damit explizit **nicht** als vollständig final markiert.

## Update 2026-04-03 – Schritt 09a Konkretisierung Above the fold
1. **Konkret finaler Above-the-fold-Inhalt**
   - Der Einstieg ist als zweispaltige First-View-Komposition umgesetzt: links die Lead-Fläche, rechts die eingebettete Orientierung.
   - In der Lead-Fläche stehen Name/Lead („Dama Venus“), Brand-Descriptor und Intro-Statement („Where image becomes frequency.“) als Intro-Layer direkt auf dem Asset.
   - Rechts ist eine Support-Kachel (aktuell priorisiert über `featuredRelease`) inklusive CTA eingebunden.
   - Die Navigation ist above the fold eingebettet („Home Orientierung“) und nutzt die zentralen `navigationItems` statt separater Hero-Navigation.
   - Die SW/Farb-Logik ist zustandsbasiert an Asset-Metadaten gekoppelt (u. a. `swColorMode`, `overlaySuitability`) und steuert Grayscale-/Kontrastklassen für Lead/Support.
   - Mobile-Verhalten bleibt priorisiert ohne Hover-Abhängigkeit: Orientierung + Support bleiben als eigenständige Blöcke, Interaktion ist per Link/Touch verfügbar.
2. **Finalisierte Komponenten und Datenquellen**
   - Finalisiert in `app/page.tsx`: Auswahl-Logik für Lead/Support-Module, Intro-Overlay, eingebettete Navigation sowie CTA-/Asset-Rendering für den Above-the-fold-Bereich.
   - Finalisiert in `app/globals.css`: Klassen für `first-impression-*`, `home-composition` und Interaktions-/Fokuszustände der eingebetteten First-View-Elemente.
   - Finalisierte Datenquellen in `content/data`: `homepage.data.ts` (Intro + Core-Module inkl. SW/Farb-Hinweisen), `navigation.data.ts` (Nav-Items) und `site.config.ts` (Brand-Descriptor + Asset-Mapping).
3. **Explizit offene Punkte unterhalb des Folds (nicht finalisiert)**
   - Die restlichen Homepage-Module/Sequenzen unterhalb des Einstiegs bleiben weiterhin offen in Detailausbau und Produktionsreife (Content-Finalisierung, Asset-Kuration, Feintuning je Modul).
   - Insbesondere die vollständige dramaturgische Sequenz nach dem Einstieg ist nicht als final abgenommen; abgeschlossen ist ausschließlich die Above-the-fold-Definition.

## Update 2026-04-03 – Schritt 09b Home-Module unterhalb des Folds (Status konkretisiert)
1. **Fertig umgesetzte Home-Module unterhalb des Folds**
   - Als umgesetzt/funktional eingebunden gelten aktuell die Sektionen: **Featured Release**, **Visual Story**, **Statement**, **Press/EPK** und **Contact/Newsletter** (jeweils als eigene Homepage-Abschnitte unterhalb des Above-the-fold-Einstiegs).
2. **Konkret eingebundene produktionsnahe Copy aus `05_copywriting.md`**
   - Featured Release: „**Current Chapter**“ + „**New music, framed in shadow and light.**“ + CTA „**Listen Now**“.
   - Visual Story: „**Frames in Motion**“ + „**Portraits, details, and atmosphere—curated in sequence.**“ + CTA „**View Visuals**“.
   - Statement: „**I don’t chase volume. I shape presence.**“.
   - Press/EPK: „**Press & EPK**“ + „**Images, bio, and release facts for press inquiries.**“ + CTA „**Open EPK**“.
   - Contact/Newsletter: „**Let’s Create the Next Chapter.**“ + „**For bookings, collaborations, and selected requests.**“ (CTA derzeit „Send Inquiry“ als funktionsfähige Kontaktführung).
3. **Weiterhin vorläufig / nicht final**
   - Finale Asset-Kuration pro Modul (inkl. endgültiger Auswahl/Abnahme der Bild-/Visual-Varianten) bleibt offen.
   - Faktische Endstände für Press/EPK/Bio/Release-Details, verifizierte Kontakt-/Zuständigkeitsdaten sowie vollständige Credits/Downloads sind weiterhin nicht vollständig finalisiert.
   - Motion-Details und Feintuning je Sektion sind noch nicht als final abgenommen.
4. **Nächster Umsetzungsschritt**
   - Nächster konkreter Schritt ist ein gezielter **Polishing-Pass** für die unterhalb-des-Folds-Module: Motion-Feintuning, Accessibility-/Kontrast-/Fokus-Review sowie Performance-Pass (Assets, Loading, Rendering) vor finaler Abnahme.

## Update 2026-04-03 – Schritt 09c Qualitätsstatus Homepage (Review-Ready)
1. **Umgesetzte Qualitätsverbesserungen (konkret)**
   - **Responsive:** Above-the-fold-Komposition und unterhalb-des-Folds-Module sind in ihrer mobilen/desktopseitigen Priorisierung konsistent geführt; Interaktionen bleiben ohne Hover-Abhängigkeit nutzbar.
   - **Accessibility (A11y):** Fokuszustände, Kontrastführung und Touch-/Interaktionsziele wurden im Homepage-Flow gezielt nachgeschärft und als Qualitätskriterium angewendet.
   - **Motion:** Motion-Verhalten wurde für ruhige, reduzierte Übergänge abgestimmt; übermäßige Bewegung wurde zugunsten Lesbarkeit/Orientierung reduziert.
   - **Bildlogik:** Die SW→Farbe-Dramaturgie sowie die zustandsbasierte Asset-/Overlay-Logik wurden konsistent auf den Home-Einstieg und die Modulführung angewendet.
2. **Jetzt reviewfähig/stabil**
   - **Above-the-fold** ist reviewfähig/stabil (Lead + Intro + Support + eingebettete Navigation inkl. Zustands-/Farblogik).
   - Unterhalb des Folds sind die Module **Featured Release**, **Visual Story**, **Statement**, **Press/EPK** und **Contact/Newsletter** als reviewfähige/stabile Basis umgesetzt.
3. **Offene Restpunkte (explizit getrennt)**
   - **Finale Asset-Kuration:** Endgültige Auswahl/Abnahme der Bild- und Visual-Varianten pro Modul ist noch offen.
   - **Press-/EPK-Daten:** Verifizierte Press-Zitate, belastbare Release-/Bio-Enddaten, vollständige Credits/Downloads und finale Pressekontakte sind noch nicht final.
   - **Polish-Restarbeiten:** Letztes Motion-/A11y-/Performance-Feintuning vor finaler Gesamtfreigabe bleibt ausstehend.
4. **Nächster empfohlener Schritt**
   - Mit Priorität die Seite **`/visuals`** als nächste Produktionsseite ausarbeiten (Modul-Feinschnitt + Asset-Kuration + Qualitäts-Pass), danach **`/music`** anschließen.

## Update 2026-04-03 – Schritt 10 Music-Datenbasis finalisiert
- `content/data/music.data.ts` wurde von einer einfachen Hero-/Single-Struktur auf eine erweiterbare, release-zentrierte Datenbasis umgestellt: Intro, CTA-Label-Set, `featuredReleaseId`, strukturierte `releases`, `visualReleases` sowie Status-/Typ-/Prioritätslogik (`active`, `coming-soon`, `single`, `visual-release`, `upcoming`).
- Pro Music-Eintrag sind jetzt konsistent modelliert: `title`, `subtitle`, `releaseType`, `status`, `releaseDate`/`year`, `shortText`, `coverAsset`, optionales `alternateVisualAsset`, `listeningLinks`, optionale `watchLinks`, `primaryCta` und optionale `secondaryCta`.
- Die Asset-Zuordnung für Music wurde in `content/dama-venus/assets.ts` konkret ergänzt (`music-current-chapter-cover`, `music-current-chapter-visual`, `music-midnight-signal-cover`, `music-afterglow-cut-cover`, `music-nocturne-line-visual`) inkl. Alt-Entwürfen, Crop-/Fokus-Hinweisen, SW/Farbe- und Overlay-Eignung.
- Die Route `/music` nutzt jetzt die neue Datenstruktur und rendert daraus die vorbereitenden Module „Featured Release“, „Selected Releases“ und „Visual Releases“, ohne Release-Daten hart in JSX zu verdrahten.
- Priorisierte Releases im aktuellen Stand: `current-chapter` (featured, Prio 1), `midnight-signal` (selected, Prio 2), `afterglow-cut` (coming soon, Prio 3), `nocturne-line-visual` (visual release, Prio 4).
- Weiterhin fehlende Inhalte: verifizierte finale Plattform-URLs pro realem Release, final kuratierte Musik-spezifische Bildmaster in `public/assets/dama-venus/music/`, belastbare veröffentlichte Metadaten (exakte Credits/ISRC/Label-Infos) und finale Video-URLs.
- Nächster Schritt: finale visuelle Ausgestaltung und Modul-Politur der Music-Seite auf Basis der jetzt stabilen Daten-/Asset-Struktur.

## Update 2026-04-03 – Schritt 10a `/music` Status konkretisiert (final/nahezu final)
1. **Auf `/music` jetzt final bzw. nahezu final**
   - Finalisiert sind die Modulbausteine **Intro**, **Featured Release**, **Selected Releases** und **Visual Releases (Watch-Führung)** als reproduzierbare Seitenstruktur auf Datenbasis.
   - Das **CTA-Muster** ist seitenweit konsistent: primäre Listen-/Watch-Aktionen als `first-impression-cta`, sekundäre Aktionen kontextabhängig als ergänzende Links.
   - Die **Mobile-/A11y-Basis** ist stabil gesetzt: Fokuszustände, Touch-Targets, reduzierte Motion-Fallbacks und nicht-hover-abhängige Bedienbarkeit sind als Basis vorhanden.
2. **Stabilisierte Komponenten/Patterns (konkret, mit Pfaden + Modulen)**
   - `app/music/page.tsx`: Modulstruktur und Rendering für `intro`, `featured`, `selected-releases`, `visual-releases` inkl. CTA-/Asset-Logik über Datenquellen.
   - `content/data/music.data.ts`: stabiles Music-Datenmodell mit `musicIntro`, `musicReleases`, `musicVisualReleases`, `musicData` sowie `featuredReleaseId` und `ctaLabels`.
   - `content/dama-venus/assets.ts`: stabilisierte Asset-IDs und Priorisierung für Music (`music-current-chapter-cover`, `music-current-chapter-visual`, `music-midnight-signal-cover`, `music-afterglow-cut-cover`, `music-nocturne-line-visual`).
   - `app/globals.css`: wiederverwendbares Interaktions-/A11y-Pattern über `first-impression-cta`, `focus-token` und `prefers-reduced-motion`-Regeln.
3. **Restpunkte (klar getrennt)**
   - **Fehlende finale Links/Assets:** finale Plattform-URLs je Release, finale Watch-/Video-URLs, final kuratierte Bildmaster unter `public/assets/dama-venus/music/`.
   - **Verbleibendes Fine-Tuning:** letztes visuelles Polishing (Abstände/Hierarchie), CTA-Text-Feinschliff pro Release-Status, abschließender Motion-/Kontrast-Feinschnitt vor Finalabnahme.
4. **Expliziter nächster Schritt**
   - Nächster Umsetzungsschritt ist die **Vorbereitung und Finalisierung der Visuals-Datenbasis** (strukturiertes Modul-/Asset-Mapping für `/visuals` inkl. finaler Watch-/Gallery-Referenzen), bevor der abschließende Gesamt-Polish von Music + Visuals durchgeführt wird.

## Update 2026-04-03 – Schritt 11 Visuals-Datenbasis strukturiert/finalisiert
1. **Welche Visuals-Struktur jetzt existiert**
   - In `content/data/visuals.data.ts` liegt jetzt eine strukturierte, komponentenfähige Datenbasis vor:
     - `visualsIntro` (Page Intro Frame),
     - `visualsEntries` (kuratierte Einträge mit Typ/Rolle/Priorität/Layout),
     - `visualsData.groups` (featured series, image groups, standalone portraits, stills, linked visuals),
     - `visualsData.renderingModules` für spätere Ausspielung in `grid`, `series-section`, `large-image-block`, `editorial-image-row`, `linked-visual-module`.
   - Pro Eintrag sind konsistent modelliert: `title`, optionale `subtitle`, `type`, `assets`, `shortText` (nur wenn nötig), `order`, `priority`, `layoutWeight`, `cropFocusHint`, `bwColorSuitability`, `altTextNotes`, sowie Funktionsrolle (`lead`, `supporting`, `quiet-spacer`).
2. **Welche Assets priorisiert wurden**
   - Visuals-Priorisierung in `content/dama-venus/assets.ts` ergänzt (Bereich `area: "visuals"`), inkl. kuratorischer Rollen-/Modulzuordnung:
     - Lead/Serie: `visuals-cinderela-lead-241`, `visuals-cinderela-frame-243`, `visuals-cinderela-frame-288`
     - Supporting/Editorial-Row: `visuals-uuid-6824`, `visuals-cinderela-landscape-210`, `visuals-uuid-3493`
     - Standalone Portrait: `visuals-portrait-tamiris-12`
     - Quiet Stills/Spacer: `visuals-still-unnamed-1`, `visuals-still-unnamed-2`, `visuals-still-unnamed-3`
     - Linked Visual: `visuals-linked-current-chapter`
   - Eignungslogik ist pro Asset gepflegt (`cropHint`, `focusHint`, `swColorMode`, `overlaySuitability`, `role`, `priority`).
3. **Welche Bildgruppen festgelegt wurden**
   - `featured visual series`: Cinderela Series (dramatischer Hauptträger)
   - `image groups`: Night Signals (Color-Akzent) + Still Fragments (ruhiger Spacer-Block)
   - `standalone portraits`: Tamiris Portrait
   - `stills`: drei quadratische atmosphärische Still-Frames
   - `optional linked visual`: Current Chapter Visual Link
4. **Welche Lücken bleiben**
   - Finale visuelle Qualitätsabnahme auf Pixel-/Retuscheebene ist noch offen (der Schritt fokussiert Struktur + Zuordnung).
   - HEIC-Dateien (`IMG_7138.HEIC`, `IMG_7221.HEIC`) sind weiterhin nicht als priorisierte Visuals-Webassets eingebunden.
   - Finale Export-/Derivatstrecke in `public/assets/dama-venus/visuals/` bleibt als nachgelagerter Produktionsschritt offen.
5. **Nächster Schritt**
   - Als nächstes soll die **Visuals-Seite final gebaut** werden: modulare UI-Ausspielung auf Basis der neuen Datenstruktur (Series/Rows/Large-Block/Linked-Module), abschließendes visuelles Polishing, A11y-/Kontrast-Feinschliff und finaler Performance-Pass.

## Update 2026-04-03 – Schritt 11a `/visuals` Status konkretisiert (final/nahezu final)
1. **Auf `/visuals` jetzt final bzw. nahezu final**
   - Nahezu final stehen die Modulblöcke **Intro**, **Featured Series**, **Image Groups**, **Standalone Portraits**, **Stills** und **Linked Visual** als reproduzierbare Seitenstruktur auf Datenbasis.
   - Final bzw. stabil ist die kuratorische Reihenfolge (Lead → Supporting → Quiet Spacer) inklusive priorisierter Bildgruppen und Rollenlogik für die Ausspielung.
2. **Stabile Komponenten/Patterns (konkret, mit Pfaden)**
   - `app/visuals/page.tsx`: stabile Modulausspielung für Intro, Gruppen-/Serienlogik und Linked-Visual-Modul auf Basis der Visuals-Daten.
   - `content/data/visuals.data.ts`: stabiles Visuals-Datenmodell (`visualsIntro`, `visualsEntries`, `visualsData.groups`, `visualsData.renderingModules`) als zentrale Struktur.
   - `content/dama-venus/assets.ts`: stabile Asset-IDs/Prioritäten und Rollenhinweise für den Bereich `area: "visuals"`.
   - `app/globals.css`: stabile Interaktions-/A11y-Patterns (inkl. Fokus- und Reduced-Motion-Basis), auf die `/visuals` mit aufsetzt.
3. **Offene Restpunkte (klar getrennt)**
   - **Letzte Asset-Exports:** finale Derivate/Exports für `public/assets/dama-venus/visuals/` und finale Qualitätsabnahme einzelner Bildvarianten.
   - **Endpolish:** letzter visueller Feinschliff (Spacing/Hierarchie), abschließender A11y-/Kontrast-Check und finaler Performance-Pass.
4. **Expliziter nächster Schritt**
   - Nach Abschluss des Visuals-Polish folgt die Umsetzung der nächsten Seiten in dieser Reihenfolge: **About**, danach **Press**, danach **Contact**.

## Update 2026-04-03 – Schritt 12 About-Datenbasis strukturiert/priorisiert
1. **Welche About-Datenstruktur jetzt existiert**
   - Für `/about` liegt jetzt ein strukturiertes Modell mit den Bereichen **Intro**, **Bio**, **Key Statements** und **Visual-Module** vor.
   - Die Struktur trennt klar zwischen textlicher Einführung, Bio-Ebenen, inhaltlichen Kernstatements und modularem Visual-Einstieg inkl. Support-Visuals.
2. **Welche Texte priorisiert wurden**
   - Priorisiert sind **short** und **medium** Bio-Texte als primäre Ausspielung für den ersten About-Build.
   - **Optional long** bleibt als nachgelagerte Erweiterung vorgesehen und wird erst mit finaler Faktenlage produktionsreif gesetzt.
   - Key Statements sind als priorisierte Kernbotschaften für die About-Seite gesetzt und in fester Reihenfolge vorgesehen.
3. **Welche Assets priorisiert wurden**
   - **Einstieg (Entry/Lead):** primäres Intro-Porträt als visuelle Hauptführung für den About-Einstieg.
   - **Support:** unterstützende ruhige Visuals zur atmosphärischen Ergänzung des Intro-/Bio-Bereichs.
   - **Sekundär:** ein zusätzliches Reserve-/Secondary-Visual als fallbackfähige Ergänzung mit niedrigerer Priorität.
4. **Explizit fehlende Fakten/Inhalte**
   - Verifizierte Bio-Facts (belastbare biografische Eckdaten) fehlen weiterhin.
   - Finale Credits, verifizierbare Zitate und formal bestätigte Quellenangaben sind noch nicht vollständig finalisiert.
5. **Nächster Schritt**
   - Im nächsten Schritt erfolgt der finale Build der Seite **`/about`** auf Basis der jetzt priorisierten Daten-, Text- und Asset-Struktur.

## Update 2026-04-04 – Metadata/SEO-Status konkretisiert
1. **Finalisierte Metadata-/SEO-Bereiche**
   - Die grundlegenden Metadata-/SEO-Bereiche sind als finalisiert markiert: Seitentitel-/Beschreibungssystem, robots-/Canonical-Basis sowie die konsistente metadata-getriebene Ausspielung über die bestehenden Seitenrouten.
2. **Vorhandene OG-/Sharing-Grundlage**
   - Eine funktionale OG-/Sharing-Grundlage ist vorhanden und als technische Basis gesetzt (inkl. strukturierter OG-Metadaten als Ausgangspunkt für Link-Previews).
3. **Offene technische Seitendetails**
   - Weiterhin offen sind die finalen technischen Seitendetails: finale OG-Routebilder je Seite, verbindliche Produktions-URL/Domain sowie finale Icon-/App-Icon-Fassungen für den produktiven Rollout.
4. **Nächster finaler Review-/Cleanup-Pass**
   - Vor finaler Gesamtfreigabe ist ein expliziter letzter Review-/Cleanup-Pass vorgesehen, mit Fokus auf Metadata-/OG-Konsistenz, technische Endabnahme und Bereinigung verbliebener Platzhalter.

## Update 2026-04-03 – Schritt 12a `/about` Status konkretisiert (final/nahezu final)
1. **Auf `/about` jetzt final bzw. nahezu final**
   - **Intro-Frame/oberer Einstieg:** stabil umgesetzt mit klarer About-Einstiegsstruktur (Label, Headline, Intro-Text) als reproduzierbarer Startpunkt.
   - **Lead-Portrait-Integration:** primäres Lead-Portrait ist integriert und wird über das Asset-Mapping robust ausgesteuert.
   - **Bio-Hierarchie (short/medium):** short- und medium-Bio sind als priorisierte Text-Hierarchie gesetzt und konsistent in der Seite verankert.
   - **CTA-Endpunkt:** der primäre Endpunkt ist stabil auf die Kontaktführung gesetzt (`/contact`).
2. **Stabile Komponenten/Datenquellen (mit Pfaden)**
   - `app/about/page.tsx`
   - `content/data/about.data.ts`
   - `content/data/site.config.ts` (Asset-Map-Referenzierung)
   - `content/dama-venus/assets.ts` (About-Asset-IDs/-Priorisierung)
3. **Offene Restpunkte (klar getrennt)**
   - **Finale Fact-Validierung:** belastbare/verifizierte Bio-Fakten, Quellen, Credits und ggf. zitierfähige Details sind noch final zu bestätigen.
   - **Letzter Visual-/Contrast-Feinschliff:** abschließender Polishing-Pass für visuelle Feingewichtung, Kontrast und finale Qualitätsabnahme bleibt ausstehend.
4. **Expliziter nächster Schritt**
   - Nächster Umsetzungsschritt ist die **Vorbereitung und Umsetzung von `Press/EPK`**.

## Update 2026-04-03 – Schritt 13 Press-/EPK-Struktur konkretisiert
1. **Press-/EPK-Struktur + Datenmodell (jetzt vorhanden)**
   - Für Press/EPK liegt eine benannte Blockstruktur in `pressEpkBlocks` vor: `pageIntro`, `artistSummary`, `veryShortBio`, `shortBio`, `pressReadyDescription`, `featuredPressImages`, `musicListeningLinks`, `videoVisualLinks`, `socialStreamingLinks`, `contactBlock`, `downloads`.
   - Das Datenmodell pro Block ist konsistent über `id`, `title`, `shortDescriptor`, `body`, `linkedAssets`, `order`, `priority`, `ctaLabel`, `target` und optional `isPrimaryVisible` abgebildet.
   - Zusätzlich ist `pressMaterials` als Material-/Download-Modell vorhanden (u. a. `type`, `accessMode`, `url`, `notes`, Asset-Referenz).
2. **Priorisierte Inhalte/Assets (inkl. primär/sekundär)**
   - Primär priorisierte Press-Blöcke: `pageIntro`, `artistSummary`, `veryShortBio`, `featuredPressImages`, `contactBlock`.
   - Sekundär priorisierte Press-Blöcke: `shortBio`, `pressReadyDescription`, `musicListeningLinks`, `videoVisualLinks`, `socialStreamingLinks`, `downloads`.
   - Priorisierte Press-Assets (Reihenfolge): `press-featured-portrait-primary` (Prio 1), `press-featured-portrait-secondary` (Prio 2), `press-editorial-landscape` (Prio 3), `press-detail-still` (Prio 4), `press-epk` (Prio 5).
3. **Fehlende Downloads/Links (explizit offen)**
   - Externe finale Download-Auslieferung des EPK ist noch offen; aktuell ist der Zugriff als Anfrage-/Kontaktpfad geführt.
   - Finale externe Listening-/Video-/Social-Links für einen publikationsreifen Press-Linkblock sind weiterhin offen und noch nicht als belastbare Endlinks abgeschlossen.
4. **Nächster Schritt**
   - Im nächsten Schritt soll die Seite **`/press` final gebaut bzw. polished** werden (finale UI-Ausspielung, Feinschliff, finale Link-/Download-Anbindung).
5. **Reproduzierbare Referenzdateien für den Nachfolge-Schritt**
   - `content/data/press.data.ts`
   - `content/dama-venus/assets.ts`
   - `app/press/page.tsx`

## Update 2026-04-03 – Schritt 13a `/press` Status konkretisiert (final/nahezu final)
1. **Auf `/press` final bzw. nahezu final umgesetzt (konkrete Sektionen)**
   - Als final/nahezu final umgesetzt gelten die Sektionen **Intro**, **Press/EPK Overview**, **Press Assets/Downloads**, **Press Facts/Bio-Snapshot** und **Press Contact/Inquiry-CTA** als konsistente Seitenstruktur.
2. **Stabile Komponenten/Patterns (konkret, mit Dateien)**
   - `app/press/page.tsx`: stabile Modulausspielung und Sektionenreihenfolge für `/press`.
   - `content/data/press.data.ts`: stabiles Datenmodell für Press/EPK-Inhalte, Faktenblöcke, Download-/Link-Referenzen und Kontaktführung.
   - `app/globals.css`: wiederverwendete, stabile Interaktions-/A11y-Patterns (Fokuszustände, Reduced-Motion-Basis), die auf `/press` konsistent genutzt werden.
3. **Offene Restpunkte**
   - **Finale externe Links:** letzte Verifizierung/Freigabe für externe Press-/Plattform-/Referenz-Links.
   - **Download-Auslieferung:** finale Bereitstellung und Prüfung der Download-Artefakte inkl. stabiler Auslieferungspfade.
   - **Finaler Qualitäts-Pass:** letzter A11y-/Mobile-/Polish-Durchlauf vor Gesamtfreigabe.
4. **Expliziter nächster Schritt**
   - Als nächster Umsetzungsschritt folgt die **Vorbereitung und Finalisierung von `/contact`**.

## Update 2026-04-03 – Schritt 14 Contact-Struktur konkretisiert
1. **Welche Contact-Struktur jetzt existiert**
   - Aktuell ist auf `/contact` eine klare Basisstruktur umgesetzt: **Intro (Headline + Subhead)** und **primäre CTA**.
   - Intro/Scope sind gesetzt über „Let’s Create the Next Chapter.“ und „For bookings, collaborations, and selected requests.“; die primäre Aktion ist ein Inquiry-CTA.
   - **Formularfelder** und **Success-State** sind als nächster Ausbauschritt vorgesehen, aber noch nicht als finaler UI-/Datenflow auf der Route umgesetzt.
   - Als optionaler Kontaktpfad ist derzeit der direkte Mail-Entry aktiv; zusätzliche dedizierte Pfade (z. B. getrennte Flows für Booking vs. Press) sind noch nicht final ausgeroutet.
2. **Welche Felder/Texte final festgelegt wurden**
   - Final festgelegt für den aktuellen Contact-Stand sind: Headline „Let’s Create the Next Chapter.“, Subhead „For bookings, collaborations, and selected requests.“ und CTA-Label „Send Inquiry“.
   - Der aktuell gesetzte CTA-Zielpfad ist `mailto:booking@damavenus.com`.
   - Für Formularfelder selbst liegt im aktuellen Build noch kein final implementiertes Feldset vor; finalisiert ist derzeit der Copy-/CTA-Rahmen für den Kontakt-Einstieg.
3. **Welche realen Kontaktinformationen noch fehlen**
   - Es fehlen weiterhin belastbar bestätigte, produktionsreife Kontaktendpunkte für **Booking** und **Press** (inkl. finaler Verantwortlichkeiten).
   - Optional benötigte, aber noch nicht bestätigte Angaben: dedizierte Telefonnummer sowie klare Routing-Regeln für unterschiedliche Inquiry-Typen (z. B. Booking, Press, Kollaboration).
   - Für den endgültigen Betrieb sind damit noch Freigaben zu Mail-Adressen, Zuständigkeiten und Response-/Weiterleitungslogik erforderlich.
4. **Klarer nächster Schritt**
   - Nächster konkreter Umsetzungsschritt ist der **finale UI-Build der `/contact`-Seite** inklusive echter Submit-Logik, Success-State und produktionsreifer Mail-/Routing-Anbindung.

## Update 2026-04-04 – Schritt 14a `/contact` Status konkretisiert (final/nahezu final)
1. **Was auf `/contact` jetzt final bzw. nahezu final ist**
   - Als final/nahezu final umgesetzt gelten **Intro**, **Scope**, **Formular**, **Success-State** und **sekundäre Kontaktpfade** als zusammenhängender Contact-Flow.
   - Intro/Scope bleiben konsistent mit der gesetzten Kontaktführung („Let’s Create the Next Chapter.“ / „For bookings, collaborations, and selected requests.“) und sind in die finale Seitenlogik eingebettet.
   - Das Formular ist als primärer Einstiegspfad stabil gesetzt; der Success-State ist als klarer Abschluss des Inquiry-Flows vorhanden.
   - Sekundärpfade sind als ergänzende Kontaktführung neben dem Primärformular verfügbar.
2. **Stabile Felder/Komponenten (konkret, mit Pfaden)**
   - `app/contact/page.tsx`: stabile Seitenausspielung für Intro, Scope, Formularbereich, Success-State und sekundäre Kontaktpfade.
   - `content/data/contact.data.ts`: stabile Datenbasis für Contact-Copy, Feld-/CTA-Konfiguration und Zustände.
   - `app/globals.css`: stabile Interaktions-/A11y-Basis (u. a. Fokuszustände/Reduced-Motion), auf die der Contact-Flow aufsetzt.
3. **Offene Restpunkte (klar getrennt)**
   - **Finale Routing-/Mail-Endpunkte:** letzte Verifizierung/Freigabe produktionsreifer Zieladressen und Routing-Regeln je Inquiry-Typ.
   - **Backend-Submit (optional/falls erforderlich):** finale Entscheidung und ggf. Anbindung eines serverseitigen Submit-/Dispatch-Flows.
   - **Finale Betriebsfreigabe:** abschließende Prüfung von Zuständigkeiten, Response-Handling und Weiterleitungslogik.
4. **Expliziter nächster Schritt**
   - Nach Abschluss der `/contact`-Restpunkte folgt ein **siteweiter Polish-Pass** (konsistenter Feinschliff über alle Seiten inkl. A11y/Motion/Performance vor Gesamtfreigabe).

## Update 2026-04-04 – Globaler UI-Konsistenzabgleich (visuell)
1. **Bereinigte globale visuelle Inkonsistenzen (konkret)**
   - Uneinheitliche CTA-Darstellungen wurden auf ein konsistentes Muster vereinheitlicht (primäre CTA-Logik und sekundäre Link-Führung seitenübergreifend gleichartig).
   - Unterschiedliche Fokus-/Interaktionsdarstellungen wurden auf ein gemeinsames Global-Pattern zusammengeführt.
   - Abweichende SW→Farbe-/Overlay-Ausspielungen zwischen Seitenmodulen wurden auf die definierte zustandsbasierte Bildlogik harmonisiert.
2. **Codeweit konsistent getroffene Designentscheidungen**
   - Das Interaktionsmuster bleibt durchgängig: ruhige Übergänge, keine Hover-Pflicht für Kerninteraktion, klare Priorität für Lesbarkeit und Orientierung.
   - Das visuelle System bleibt einheitlich: tokenbasierte Farb-/Kontrastführung und konsistente CTA-Hierarchie über die Hauptseiten.
   - Die dramaturgische Bildsprache bleibt konsistent angewendet: SW→Farbe als bewusstes Steuerungsprinzip statt isolierter Einzeleffekte.
3. **Offene Qualitätsbereiche als überprüfbare QA-Checkliste**
   - [ ] Fokusführung: Tastatur-Navigation prüfbar ohne Fokusverlust über alle Primärpfade (`/`, `/visuals`, `/music`, `/about`, `/press`, `/contact`).
   - [ ] States: Hover/Focus/Active/Disabled pro interaktivem Element vollständig und visuell eindeutig umgesetzt.
   - [ ] Motion/Reduced Motion: `prefers-reduced-motion` reduziert Transition/Animation ohne Funktionsverlust in allen Kernmodulen.
   - [ ] Formular-UX: Formular auf `/contact` prüfbar bzgl. Fehlermeldungen, Success-State, Feldvalidierung und klarer Submission-Rückmeldung.

## Nächster empfohlener Schritt (aktualisiert)
- Expliziter nächster Schritt ist ein **Accessibility- und Interaktionsqualitäts-Pass** mit Fokus auf **Fokusführung**, **States**, **Motion/Reduced Motion** und **Formular-UX** inklusive QA-Abnahme gegen die obige Checkliste.

## Update 2026-04-04 – OG-Bildbasis (globaler Fallback)
- Gewählte Strategie: **statisches Default-Asset** über `public/og-default.svg` mit globaler Referenz in `app/layout.tsx` (`metadata.openGraph.images` + `metadata.twitter.images`).
- Absicherung ergänzt: Alle vorhandenen Seiten-Metadaten (`/`, `/about`, `/music`, `/visuals`, `/press`, `/contact`) referenzieren zusätzlich explizit dasselbe Default-OG-Bild, sodass ein funktionierender Fallback pro Route gewährleistet bleibt.
- Optionale route-spezifische OG-Bilder bleiben möglich, indem pro Route später `openGraph.images`/`twitter.images` auf ein eigenes Asset überschrieben wird.
- Es wurde **keine** halbfertige per-Route-OG-Logik eingeführt; der globale Fallback ist durchgängig funktionsfähig.


## Update 2026-04-04 – Next.js 15.x Sicherheits-/Deprecation-Fix
- `next` wurde in `package.json` von `15.3.1` auf `15.3.6` angehoben (gepatchte, kompatible 15.x-Version; kein Major-Wechsel).
- Ziel des Updates: Deprecated-Hinweis für `15.3.1` eliminieren und auf gepatchter 15.x-Linie bleiben.
- App-Router-/Metadata-Kompatibilitätsprüfung wurde für `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` sowie Seiten mit `export const metadata` durchgeführt; es waren keine API-Anpassungen erforderlich.

