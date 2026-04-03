# 07 Build Plan

## 1. Ziel dieses Dokuments
Dieses Dokument übersetzt die freigegebenen Strategie-, Design-, Content- und Subpage-Dokumente in einen konkret umsetzbaren Build-Plan für eine Next.js-Implementierung. Es legt Reihenfolge, Abhängigkeiten, Dateistruktur, Reuse-Logik, Ready-/Done-Gates und QA-Kriterien so fest, dass die Website ohne Interpretationsspielraum umgesetzt werden kann.

## 2. Umsetzungsprinzipien
1. **Image-first vor UI-first:** Jede Seite wird von Bilddramaturgie und Leseflächen aus gedacht; UI bleibt bewusst reduziert.
2. **SW→Farbe dramaturgisch steuern:** Einstieg und Übergänge primär monochrom, Farbakzente nur an narrativen Peaks.
3. **Feste Markenpalette strikt anwenden:** Keine zusätzlichen Markenfarben außerhalb der festgelegten fünf Farbtöne.
4. **A11y ist Build-Kriterium, nicht Nacharbeit:** Kontrast, Fokusführung, semantische Struktur und Reduced Motion sind pro Komponente Pflicht.
5. **Route-Priorität nach Markenwirkung:** Visuals/Music zuerst produktionsreif, danach About, Contact, Press/EPK.
6. **Content-Modelle vor Pixel-Arbeit:** Erst Datenstruktur/Copy-Slots/Asset-Mapping definieren, dann UI bauen.
7. **Komponenten-Reuse vor Seitensonderlogik:** Intro-, Feature-, CTA- und Section-Patterns werden systematisch wiederverwendet.

## 3. Empfohlene Projektstruktur
Empfohlene Struktur für Next.js App Router:

- `app/`
  - `layout.tsx` (globale Shell: Skip-Link, Header, Main, Footer)
  - `page.tsx` (Homepage)
  - `about/page.tsx`
  - `music/page.tsx`
  - `visuals/page.tsx`
  - `press/page.tsx`
  - `contact/page.tsx`
  - `globals.css`
- `components/`
  - `layout/` (`SiteHeader.tsx`, `SiteFooter.tsx`, `PageIntroFrame.tsx`, `SectionBreak.tsx`)
  - `media/` (`LeadVisualBlock.tsx`, `VisualSequence.tsx`, `ImageTile.tsx`, `OverlayText.tsx`)
  - `content/` (`ContextBlock.tsx`, `FeatureBlock.tsx`, `StatementPanel.tsx`, `PrimaryCtaBlock.tsx`)
  - `navigation/` (`MainNav.tsx`, `MobileNavDrawer.tsx`, `SkipLink.tsx`)
  - `forms/` (`InquiryForm.tsx`)
- `content/data/`
  - `site.config.ts`
  - `navigation.data.ts`
  - `homepage.data.ts`
  - `about.data.ts`
  - `music.data.ts`
  - `visuals.data.ts`
  - `press.data.ts`
  - `contact.data.ts`
- `assets/`
  - `images/` (`home/`, `about/`, `music/`, `visuals/`, `press/`, `contact/`)
  - `epk/` (Downloads)
- `lib/`
  - `hooks/` (`useReducedMotion.ts`, `useActiveSection.ts`)
  - `types/` (`content.ts`, `asset.ts`, `navigation.ts`)
  - `config/` (`theme.ts`, `motion.ts`, `seo.ts`)
  - `utils/` (`image.ts`, `a11y.ts`)

Entscheidung: Datengetriebene Seitenstruktur (`content/data`) wird verpflichtend genutzt, damit Copy-/Asset-Iteration ohne Komponentenumbau möglich bleibt.

## 4. Seiten- und Routing-Plan
Primäre Routen:
- `/` → Home (dramaturgische Leitbühne)
- `/visuals` → Kuratierte visuelle Sequenzen
- `/music` → Current Chapter + ausgewählte Releases
- `/about` → Positionierung/Haltung
- `/press` → Press & EPK
- `/contact` → Booking/Kollaboration

Routing-Prinzipien:
1. Keine Untermenü-Tiefenstruktur in v1.
2. Jede Route hat exakt eine H1 und klaren Primary CTA.
3. Navigation-Reihenfolge bleibt global konsistent: Home, Visuals, About, Services (als Homepage-Sektion), Contact.
4. Press/EPK bleibt eigenständige Route, wird aber primär über Home/Visuals/Music mitgeführt.

Initialinhalt pro Route (Definition of Ready):
- **Home:** Intro-Line, 5 Kernmodule, CTA-Set, Lead-Asset-Mapping.
- **Visuals:** 1 Signature-Frame + 2 Sequenzcluster + 1 CTA-Endpunkt.
- **Music:** 1 Featured Release + 2–4 Selected Releases + Listen-CTA.
- **About:** 1 Lead-Portrait + Kurzprofil + Arbeitsweise + CTA.
- **Press:** Materialliste + Access-Logik + Press Contact.
- **Contact:** Scope-Text + primärer Anfrageweg + valide Kontaktdaten.

## 5. Layout-System
Verbindliche Umsetzung des dokumentierten Rasters:
1. **Desktop:** 12 Spalten, max. 1440, 64 Außenabstand, 24 Gutter.
2. **Tablet:** 8 Spalten, 40 Außenabstand, 20 Gutter.
3. **Mobile:** 4 Spalten, 20 Außenabstand, 16 Gutter.

Layout-Regeln in der Umsetzung:
- Sektionen sind als wiederverwendbare Layout-Container implementiert (`Section`, `SectionInner`).
- Vertikaler Rhythmus nutzt die definierte 8pt-Skala; Sektionen wechseln bewusst zwischen dichter und luftiger Taktung.
- Bildmodule erhalten immer mindestens eine freie Atemraum-Zone ohne Overlay.
- Keine Route bekommt ein Sonderraster; Unterschiede entstehen über Modulgewichtung, nicht über neues Grid.

## 6. Komponentenarchitektur
Wiederverwendbare Kernkomponenten (v1):
1. `PageIntroFrame` (Label + H1 + Micro-Statement)
2. `LeadVisualBlock` (dominantes Bild mit Overlay-Regel)
3. `FeatureBlock` (Release/EPK/Schlüsselinhalt)
4. `ContextBlock` (kurzer Kontexttext)
5. `VisualSequence` (narrative Bildabfolge statt Zufallsgrid)
6. `StatementPanel` (Haltungsverdichtung)
7. `PrimaryCtaBlock` (eine primäre Aktion)
8. `SectionBreak` (Rhythmuswechsel)

Reuse-Entscheidungen pro Seite:
- **Home:** nutzt 1–8 vollständig.
- **Visuals:** nutzt 1,2,5,6,7,8 (kein schwerer Textblock).
- **Music:** nutzt 1,2,3,4,7,8.
- **About:** nutzt 1,2,4,6,7.
- **Press:** nutzt 1,3,4,7.
- **Contact:** nutzt 1,4,7 (+ `InquiryForm`).

## 7. Content- und Datenmodell
Vorgabe: Inhalte werden nicht hardcoded in Seitenkomponenten, sondern typisiert in `content/data` gepflegt.

Pflicht-Modelle:
- `NavItem`: `label`, `href`, `isPrimary`.
- `Cta`: `label`, `href`, `variant`, `context`.
- `MediaAssetRef`: `id`, `src`, `alt`, `role` (decorative/informative), `cropHints`, `swColorCategory`.
- `SectionContent`: `id`, `label`, `headline`, `body`, `cta`, `assets`, `themeTone`.
- `ReleaseItem`: `title`, `status`, `description`, `platformLinks`, `coverAssetId`.
- `PressMaterialItem`: `type`, `title`, `accessMode`, `url`, `notes`.

Inhaltsregeln:
1. Jede Section referenziert Assets über IDs (kein direkter Datei-Hardlink in JSX).
2. Alt-Rollen sind pro Asset verpflichtend gesetzt.
3. CTA-Hierarchie wird im Datenmodell validierbar gehalten (genau eine Primary pro Hauptsektion).

## 8. Asset-Integration
Ordner- und Benennungslogik:
- Lead-Assets: `assets/images/<route>/lead-*.{webp|avif}`
- Secondary-Assets: `assets/images/<route>/secondary-*.{webp|avif}`
- Portrait/Tall-Varianten mit Suffix (`-4x5`, `-3x4`, `-16x9`).

Integrationsablauf:
1. Asset-Ingest mit Bewertungsprotokoll (Markenfit, Crop-Stabilität, SW/Farbe-Eignung).
2. Zuordnung zu Rollen (Lead/Primary/Secondary/Reserve).
3. Mapping in `content/data/*.data.ts`.
4. Erst danach Komponenten-Feintuning.

Blocker-Handling:
- Ohne reale Lead-Assets werden Platzhalter mit identischem Format-/Crop-Verhalten genutzt.
- SW/Farbe-Kategorie pro Asset wird bereits mit Platzhalter-Flag gepflegt, damit spätere Umstellung ohne Strukturänderung möglich bleibt.

## 9. Bild- und Performance-Plan
1. Next Image-Komponente für alle inhaltlich relevanten Bilder.
2. `priority` nur für above-the-fold Lead-Visual pro Route.
3. Responsive `sizes` je Modulklasse (Lead, Feature, Tile).
4. Moderne Formate (AVIF/WebP), fallbackfähig.
5. LQIP/Blur Placeholder für große Bildflächen.
6. Keine autoplay-lastigen Hintergrundvideos in v1.
7. Vor Veröffentlichung: Page-Weight-Audit pro Route und Optimierung der größten zwei Assets.

Performance-Ziele (v1):
- LCP-Bereich durch Lead-Bild kontrollieren.
- CLS vermeiden durch feste Aspect-Ratio-Container.
- Script-Budget niedrig halten (Motion nur dort, wo narrativ nötig).

## 10. Styling-Umsetzungsplan
Styling-Strategie:
1. Design-Tokens in `lib/config/theme.ts` als Single Source (Farben, Spacing, Typo-Rollen).
2. Tailwind wird tokenbasiert genutzt (keine ad-hoc Farbabweichungen).
3. Typo-Rollen werden komponentenseitig als feste Varianten abgebildet (H1/H2/H3/H4, Body, Label, CTA).
4. Overlay-Varianten sind als benannte Stylesystem-Zustände definiert (`gradient-soft`, `gradient-strong`, `scrim-subtle`).
5. Dark Stage bleibt globaler Grundzustand; helle Flächen nur als gezielte Leseflächen, nicht als Seitengrund.

Nicht zulässig:
- Freie Farberweiterungen außerhalb der Markenpalette.
- Seitenspezifische Typo-Sonderregeln ohne dokumentierte Ausnahme.

## 11. Motion-Umsetzungsplan
Motion-Prinzip: hochwertig reduziert, orientierend, nicht dekorativ.

Komponentenbezogene Motion:
1. Intro/Section-Eintritt: sanftes Fade/Translate mit kurzer Dauer.
2. Bildwechsel in Sequenzen: weiche Übergänge ohne harte Zoom-Effekte.
3. CTA/Interaktionen: präzise State-Wechsel mit klarer Fokuswahrnehmung.
4. Navigation: ruhiger Reveal/Hide ohne Layout-Sprünge.

SW→Farbe-Motion:
- Farbe wird als dramaturgische Öffnung in ausgewählten Key-Modulen getriggert (nicht global auf allen Bildern).
- Keine aggressive Filteranimation; Übergänge bleiben subtil und kontrolliert.

Reduced-Motion-Fallback:
- Alle Übergänge auf minimalen Opacity-Wechsel reduzieren.
- Keine parallaxartigen Bewegungen.

## 12. Accessibility-Umsetzungsplan
Pflichtmaßnahmen:
1. Skip-Link vor Header.
2. Semantische Landmarken (`header`, `main`, `footer`, `nav`, `section` mit sinnvollen Überschriften).
3. Sichtbarer Fokusindikator auf allen Interaktionen.
4. Tastaturbedienbarkeit für Navigation, Drawer und Formulare.
5. Kontrastprüfung für Text auf Bild inkl. Overlay-Nachschärfung.
6. Formularfelder mit sichtbaren Labels, Fehlertexten und ARIA-Zuordnung.
7. Alt-Text-Qualitätsregel: dekorative Assets leeres `alt`, inhaltliche Assets präzise beschreibend.

A11y-Gates vor Done:
- Keine Heading-Level-Sprünge.
- Kein interaktives Element ohne Focus- und Hover-Äquivalent.
- Primäre User-Journey (Home → Visuals/Music → Contact) vollständig per Tastatur nutzbar.

## 13. SEO-/Metadata-Plan
Pro Route wird ein eigener Metadata-Satz gepflegt:
- `title`
- `description`
- `openGraph` (Titel, Beschreibung, Bild)
- `twitter` (Card + Bild)
- `alternates` bei späterer Mehrsprachigkeit

SEO-Umsetzung:
1. Jede Route erhält eindeutige, nicht generische Title/Description-Varianten.
2. Press/EPK und Contact werden auf klare Intent-Keywords optimiert.
3. Bilder mit inhaltlicher Relevanz erhalten konsistente Dateinamen und Alt-Kontext.
4. Canonical-Logik über zentrale Konfigurationsdatei.

## 14. Reihenfolge der Implementierung
1. **Foundation:** Projektstruktur, globale Layout-Shell, Token-/Config-Basis.
2. **Datenmodelle:** `types` + `content/data` Grundgerüst inkl. Navigation/CTA.
3. **Globale Komponenten:** Header, Footer, Skip-Link, Section-Grundbausteine.
4. **Homepage v1:** alle Kernmodule mit Platzhalter-Assets.
5. **Visuals-Route:** Sequenzlogik und Bilddramaturgie.
6. **Music-Route:** Featured Release + Selected Releases.
7. **About-Route:** Positionierungsseite.
8. **Contact-Route:** Conversion-Flow mit Inquiry-Form.
9. **Press-Route:** Materialien/Access/Press Contact.
10. **Polish:** Motion-Tuning, A11y-Checks, Performance-Pass, SEO-Metadaten finalisieren.

## 15. Umsetzungsphasen mit Deliverables
### Phase 1 – Foundation
**Deliverables:** Routing-Gerüst, globale Shell, Theme-/Motion-/SEO-Konfig, Grundtypen.

### Phase 2 – Core Components
**Deliverables:** Intro, LeadVisual, Feature, Context, Statement, CTA, Navigation, Footer.

### Phase 3 – Home + Visuals + Music
**Deliverables:** drei priorisierte Routen mit realer Komponentenreuse und Platzhalter-/oder ersten Realassets.

### Phase 4 – About + Contact + Press
**Deliverables:** restliche Routen, Inquiry-Flow, Press-Material-Struktur.

### Phase 5 – Quality Pass
**Deliverables:** A11y-Protokoll, Performance-Protokoll, SEO-/Metadata-Abnahme, finaler Markenfit-Review.

## 16. Offene Inputs / Blocker
1. Final kuratierte reale Assets (Lead + Secondary) fehlen weiterhin.
2. Verifizierte Release-Daten und Plattformlinks für Music fehlen teilweise.
3. Verlässliche Press-/EPK-Inhalte (Zitate, Downloadpakete, Credits) fehlen.
4. Verbindliche Kontaktzuständigkeiten (Booking/Management/Press) müssen final bestätigt werden.
5. Finale rechtliche Pflichtinhalte (Imprint/Privacy-Texte) sind noch nicht eingebracht.

Blocker-Regel:
- Seiten dürfen mit Platzhalterstruktur gebaut werden, aber nicht als „abgenommen“ markiert, solange Pflichtinputs aus 1–5 fehlen.

## 17. QA- und Review-Checkliste
### Marken- und Dramaturgie-Check
- SW→Farbe-Logik in Reihenfolge und Intensität konsistent.
- Bilddominanz vorhanden, UI-Lautstärke niedrig.
- Palette strikt eingehalten.

### Struktur- und Reuse-Check
- Komponenten werden seitenübergreifend wiederverwendet.
- Keine Route mit Sonder-Layout ohne Begründung.
- CTA-Hierarchie pro Sektion eindeutig.

### Responsive-Check
- Mobile Crop-Stabilität für Lead-/Portrait-Assets.
- Touch-Ziele und Leselängen auf kleinen Viewports belastbar.
- Keine Hover-Abhängigkeit für Kernaktionen.

### A11y-Check
- Tastaturpfad, Fokusindikatoren, Semantik, Kontrast, Formularlabels.
- Reduced Motion umgesetzt und funktional.

### Performance-Check
- LCP-Bild optimiert, feste Aspect Ratios, keine unnötigen Skripte.
- Kritische Bilder in geeigneten Formaten und Größen.

### Content-/SEO-Check
- Route-spezifische Metadata vollständig.
- Headline-Hierarchie konsistent.
- Alt-Texte und Linktexte sinnvoll/konkret.

## 18. Definition of Done
Eine Route gilt erst als „Done“, wenn alle Punkte erfüllt sind:
1. Inhaltlich vollständig gemäß Blueprint und CTA-Logik.
2. Asset-Rollen korrekt gemappt (Lead/Primary/Secondary) inkl. Alt-Rolle.
3. Responsive Verhalten auf Mobile/Tablet/Desktop geprüft.
4. A11y-Gates bestanden (Kontrast, Fokus, Tastatur, Semantik, Reduced Motion).
5. Performance-Basis erfüllt (optimierte Leitbilder, stabile Layouts).
6. Metadata gesetzt und inhaltlich eindeutig.
7. Markenfit-Review bestanden (dunkel, editorial, cineastisch, hochwertig, reduziert).

Projektweite Done-Definition:
- Alle sechs Routen sind gemäß obiger Kriterien abgenommen.
- Offene Inputs aus Kapitel 16 sind entweder geliefert oder als explizit nicht-blockierend freigegeben.

## 19. Empfohlener nächster Schritt nach diesem Dokument
Direkt im Anschluss **Phase 1 (Foundation)** starten und parallel einen **Asset Intake Sprint** durchführen:
1. Projektstruktur und Datenmodelle gemäß Kapitel 3/7 anlegen.
2. Homepage-Routing + globale Navigation/Footer implementieren.
3. Gleichzeitig reale Asset-Erstrunde kuratieren und gemäß Kapitel 8 in Rollen mappen.

Damit wird sichergestellt, dass technische Basis und visuelle Produktionsgrundlage synchron wachsen und keine spätere Re-Architektur nötig wird.
