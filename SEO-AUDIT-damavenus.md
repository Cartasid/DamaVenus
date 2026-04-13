# SEO-Audit: damavenus.eu

**Datum:** 13. April 2026  
**Domain:** damavenus.eu  
**Technologie:** Next.js 15.3 (Static Export), Standalone  

---

## Executive Summary

damavenus.eu hat eine **solide technische Basis** mit korrekt implementiertem Structured Data (JSON-LD @graph), sauberen URLs, und vollständigen Meta-Tags auf allen Seiten. Die gravierendste Schwäche: **die Seite ist aktuell nicht in Google indexiert** — eine `site:damavenus.eu`-Suche ergibt null Treffer. Ohne Indexierung sind alle anderen SEO-Maßnahmen wirkungslos.

**Top 3 Prioritäten:**

1. **Google Search Console einrichten und Indexierung beantragen** — ohne das wird die Seite nie gefunden
2. **Backlink-Aufbau starten** — keinerlei externe Verlinkungen erkennbar, dadurch fehlt Domain Authority
3. **Content-Strategie erweitern** — aktuell nur 8 statische Seiten, kein Blog/News-Bereich für organischen Traffic

---

## On-Page SEO Analyse

### Title Tags

| Seite | Title | Länge | Bewertung |
|-------|-------|-------|-----------|
| / | Dáma Venus \| Official Website \| Visual Author & Actress | 56 | OK — Keywords fehlen (Singer, Music) |
| /music | Music & Releases \| Dáma Venus — Alternative Pop, Trap-Pop, R&B | 62 | OK |
| /visuals | Visuals & Photography \| Dáma Venus — Editorial Portraits & Cinematic Imagery | 78 | Zu lang (max 60) |
| /about | Bio \| Dáma Venus — Singer, Visual Author & Actress from Rio de Janeiro | 70 | Zu lang (max 60) |
| /press | Press & EPK \| Dáma Venus — Bio, Images & Release Facts for Media | 65 | Leicht zu lang |
| /contact | Contact & Bookings \| Dáma Venus — Collaborations & Inquiries | 62 | OK |

### Meta Descriptions

| Seite | Länge | Bewertung |
|-------|-------|-----------|
| / | 144 | Gut, aber "Miss Americas" unklar für Suchende |
| /music | 156 | Sehr gut — enthält Streaming-Keywords |
| /visuals | 118 | Kurz, könnte Fotografie-Keywords enthalten |
| /about | 181 | Zu lang (max 160) |
| /press | 124 | Gut, klar formuliert |
| /contact | 126 | Gut |

### H1-Tags

| Seite | H1 | Problem |
|-------|-----|---------|
| / | "DÁMA VENUS" | OK als Künstlername |
| /music | "Current Chapter" | Kein Keyword — sollte "Music" oder Künstlernamen enthalten |
| /visuals | "Frames in Motion" | Kein Keyword — "Visuals" oder "Photography" fehlt |
| /about | "Born from atmosphere." | Kein Keyword — "Bio" oder Künstlername fehlt |
| /press | "Press & EPK" | OK |
| /contact | "Let's Create the Next Chapter." | Kein Keyword — "Contact" fehlt |

### On-Page Issues

| Seite | Problem | Schwere | Empfohlene Lösung |
|-------|---------|---------|-------------------|
| Alle | Nicht in Google indexiert | Kritisch | Google Search Console einrichten, Indexierung beantragen |
| / | Homepage-Title enthält kein "Singer" oder "Music" | Hoch | Title ändern: "Dáma Venus — Singer, Visual Author & Actress \| Official Site" |
| /visuals | Title zu lang (78 Zeichen) | Mittel | Kürzen: "Visuals \| Dáma Venus — Editorial Portraits & Photography" |
| /about | Title zu lang (70 Zeichen), Meta zu lang (181) | Mittel | Beides kürzen |
| /music | H1 "Current Chapter" hat keinen SEO-Wert | Mittel | H1 auf "Music & Releases" setzen |
| /about | H1 "Born from atmosphere." hat keinen SEO-Wert | Mittel | H1 auf "About Dáma Venus" oder Bio-Keywords setzen |
| Alle | Kein hreflang-Tag (Seite hat EN/PT/DE Inhalte) | Niedrig | Optional: hreflang für zukünftige Mehrsprachigkeit |
| Alle | Gleiche OG-Image für alle Seiten | Mittel | Seitenspezifische OG-Images erstellen |
| /visuals | Alt-Texte generisch ("Cinderela series lead portrait frame") | Niedrig | Künstlernamen in Alt-Texte einfügen |

---

## Technische SEO

| Check | Status | Details |
|-------|--------|---------|
| HTTPS | Pass | SSL aktiv |
| robots.txt | Pass | Allow: /, Sitemap verlinkt |
| XML-Sitemap | Pass | 8 URLs, aktuelle lastmod-Dates |
| Sitemap Priority | Warnung | Keine Priority-Werte gesetzt |
| Canonical Tags | Pass | Auf allen Seiten korrekt |
| Structured Data | Pass | JSON-LD @graph: WebSite, MusicGroup, Person, BreadcrumbList |
| Open Graph | Pass | Alle Seiten haben OG-Tags |
| Twitter Cards | Pass | summary_large_image auf allen Seiten |
| Mobile-Responsiveness | Pass | Responsive Design mit Tailwind |
| Meta Robots | Pass | index: true, follow: true, max-image-preview: large |
| Core Web Vitals | Warnung | Video (14 MB) auf /music könnte LCP beeinflussen |
| Image Optimization | Warnung | `unoptimized: true` in next.config — keine WebP/AVIF-Konvertierung |
| Google Search Console | Fehlt | Keine Verifizierung erkennbar |
| Favicon | Warnung | SVG-Favicon — manche Browser unterstützen nur ICO/PNG |
| Preconnect | Pass | Google Fonts vorgeladen |
| DNS-Prefetch | Pass | Spotify, Instagram, YouTube |

---

## Keyword-Opportunities

| Keyword | Schwierigkeit | Opportunity | Aktuelles Ranking | Intent | Empfohlener Content |
|---------|--------------|-------------|-------------------|--------|---------------------|
| dama venus | Niedrig | Hoch | Nicht indexiert | Navigational | Homepage optimieren |
| dama venus music | Niedrig | Hoch | Nicht indexiert | Navigational | /music |
| dama venus singer | Niedrig | Hoch | Nicht indexiert | Informational | /about |
| alternative pop berlin artist | Mittel | Hoch | — | Commercial | Blog-Post + /about |
| trap pop female artist | Mittel | Hoch | — | Informational | Blog-Post |
| brazilian singer berlin | Mittel | Mittel | — | Informational | /about optimieren |
| cinematic pop music 2026 | Mittel | Mittel | — | Informational | Blog-Post |
| female artist press kit download | Niedrig | Mittel | — | Transactional | /press |
| berlin music scene emerging artists | Hoch | Mittel | — | Informational | Blog-Post |
| vaporwave r&b new releases | Mittel | Mittel | — | Commercial | /music + Blog |
| visual author music artist | Niedrig | Mittel | — | Informational | /about |
| singer songwriter berlin booking | Mittel | Mittel | — | Transactional | /contact |
| electronic press kit musician | Mittel | Niedrig | — | Informational | /press |
| independent artist website | Hoch | Niedrig | — | Informational | Blog-Post |

---

## Content Gap Analyse

| Thema | Warum relevant | Empfohlenes Format | Priorität | Aufwand |
|-------|---------------|-------------------|-----------|---------|
| Blog/News-Bereich | Kein dynamischer Content für regelmäßiges Crawling | Blog-Sektion (/blog) | Hoch | Mittel |
| Release-Ankündigungen | Zeitgebundene Keywords, Social Shares | Blog-Posts pro Release | Hoch | Quick Win |
| Behind-the-Scenes Content | Long-tail Keywords, Engagement | Blog-Posts + Visuals | Mittel | Quick Win |
| Lyrics-Seiten | Hohe Suchnachfrage für Song-Lyrics | Unterseiten pro Song | Hoch | Quick Win |
| Live/Tour-Termine | Lokale SEO, Events-Schema | /shows oder /live Seite | Mittel | Quick Win |
| Discographie-Seite | Strukturierte Daten, Verlinkungen | /discography | Mittel | Mittel |
| Video-Seite (YouTube-Embeds) | Video-SEO, Verweildauer | YouTube-Embeds auf /music | Niedrig | Quick Win |
| FAQ/About erweitern | People Also Ask, Featured Snippets | FAQ-Schema auf /about | Niedrig | Quick Win |

---

## Wettbewerber-Vergleich

Vergleich mit ähnlich positionierten emerging Artists aus dem Berlin/DE-Raum:

| Dimension | damavenus.eu | Sira Faal | Typischer Emerging Artist |
|-----------|-------------|-----------|--------------------------|
| Eigene Website | Ja, professionell | Keine eigene Domain | Selten vorhanden |
| Google-Indexierung | Nicht indexiert | Über Label/Presse | Über Spotify/Socials |
| Structured Data | Vollständig (MusicGroup, Person) | — | Selten implementiert |
| Content-Tiefe | 8 statische Seiten | Verstreut über Plattformen | 3-5 Seiten |
| Blog/News | Fehlt | — | Selten |
| Backlinks | Keine erkennbar | Presse-Backlinks (Diffus, Tagesspiegel) | Über Interviews/Reviews |
| Social Signals | Spotify, Instagram, YouTube | Spotify, Instagram | Spotify, TikTok, Instagram |
| EPK/Press Kit | Professionell (/press) | Nicht vorhanden | Selten |
| Video Content | Vorhanden (selbst-gehostet) | YouTube | YouTube/Vimeo |
| SEO-Gesamtnote | B (Technik gut, Sichtbarkeit fehlt) | — | D (keine eigene Website) |

**Stärke gegenüber Wettbewerbern:** Die professionelle eigene Website mit vollständigem Structured Data und EPK ist ein erheblicher Vorteil gegenüber den meisten Emerging Artists, die sich nur auf Social Media und Streaming-Plattformen verlassen.

---

## Prioritierter Aktionsplan

### Quick Wins (diese Woche)

1. **Google Search Console einrichten** — Verifizierung über DNS-TXT oder HTML-Meta-Tag, dann Sitemap einreichen und Indexierung für alle 8 URLs beantragen. Ohne das bringt alles andere nichts. *Impact: Kritisch, Aufwand: 30 Min*

2. **Title-Tags optimieren:**
   - Homepage: "Dáma Venus — Singer & Visual Author | Official Site"
   - /visuals: "Visuals | Dáma Venus — Editorial Portraits & Photography" (kürzen auf <60 Zeichen)
   - /about: "Bio | Dáma Venus — Singer & Actress from Rio de Janeiro" (kürzen)
   *Impact: Hoch, Aufwand: 15 Min*

3. **H1-Tags mit Keywords versehen:**
   - /music: H1 von "Current Chapter" → sichtbare H1 beibehalten, aber ein `sr-only` H1 mit "Dáma Venus — Music & Releases" hinzufügen
   - /contact: Ähnlich behandeln
   *Impact: Mittel, Aufwand: 15 Min*

4. **Meta Description /about kürzen** auf unter 160 Zeichen
   *Impact: Niedrig, Aufwand: 5 Min*

5. **Bing Webmaster Tools einrichten** — zusätzliche Suchmaschine, akzeptiert Sitemap-Import von Google Search Console
   *Impact: Niedrig, Aufwand: 15 Min*

### Strategische Investments (dieses Quartal)

1. **Blog-Bereich aufbauen** (/blog) — Regelmäßige Posts zu Releases, Behind-the-Scenes, Studio-Sessions. Jeder Post ist eine neue indexierbare URL und ein Anlass für Social Shares. *Impact: Hoch, Aufwand: 2-3 Tage Setup, dann laufend*

2. **Backlink-Aufbau starten:**
   - Review-Anfragen an Musikblogs (The Review Geek hat bereits geschrieben)
   - Interviews bei lokalen Berlin-Musikpublikationen (Diffus, Flux FM, ByteFM)
   - Feature auf Emerging-Artist-Listen (Melodic Magazine, Funky Germany)
   - Filmmakers.eu-Profil mit Rückverlinkung pflegen
   *Impact: Hoch, Aufwand: Laufend*

3. **Lyrics-Seiten erstellen** — Für jeden veröffentlichten Song eine eigene Unterseite mit MusicRecording-Schema. Lyrics sind einer der meistgesuchten Musikinhalte. *Impact: Hoch, Aufwand: 1 Tag*

4. **Image Optimization aktivieren** — `unoptimized: false` in next.config oder manuell WebP-Versionen erstellen. Reduziert Ladezeit deutlich. *Impact: Mittel, Aufwand: 1-2 Stunden*

5. **Seitenspezifische OG-Images** — Jede Seite sollte ein eigenes Social-Preview-Bild haben (aktuell alle gleich). Verbessert CTR bei Social Shares. *Impact: Niedrig, Aufwand: 2-3 Stunden*

6. **Live-/Tour-Seite** (/shows) mit Event-Schema-Markup — Lokale SEO für Konzertankündigungen. *Impact: Mittel, Aufwand: Halber Tag*

---

*Audit erstellt am 13.04.2026 für damavenus.eu*
