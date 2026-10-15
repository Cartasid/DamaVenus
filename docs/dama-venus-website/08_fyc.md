# FYC page: review against the supplied rules

## Review basis

All five pages of the owner-supplied `grammy.pdf` (FYC Rules and Policies), and
the FYC wording in the accompanying Bongo Boy Records email, were reviewed.
The supplied PDF's SHA-256 is
`a41f29f76405f6abb4dbb56609005c1956f040a08892be740a986ad5b1cf8419`.
It is a review source, not a website download; its reproduction restriction is
respected. This document summarises the checks without republishing the PDF.

The recording's artist, title, category, description and YouTube link come from
`pics/Dama_Venus_FYC_Send_To_Member_v5_Safe_Font/02_COPY_PASTE_TEXT`.
Spotify and Amazon links were supplied by the owner. The landscape campaign
artwork from `01_PORTAL_UPLOAD_IMAGES` is displayed whole. Visual review found
the artist/title/category, the correctly marked GRAMMY® name, the artist's
portrait and opt-out contact; no Academy logo, entry identifiers, campaign year,
chart/stream/sales figures or nomination claim. The artist-name typography is
identification, not a personal sign-off or autograph.

## Website checks

| PDF requirement | Implementation |
| --- | --- |
| Proprietary entry, category and ballot numbers excluded (pp. 2–3) | Entry number and Web ID removed from the public data model, visible page and serialized data; no numbered FYC section labels. |
| Short, unembellished recording information (p. 2) | Artist, recording, full category name and one factual paragraph based on the supplied recording description. |
| No exaggeration, comparative claims or personal pleas (pp. 2–3) | Removed voting-member listening appeal, promotional slogan, sync/rights sales section and compliance/fidelity claims. Playback controls are neutral navigation labels. |
| Proper name-only GRAMMY® use; no Academy logo (pp. 2–3) | Correct spelling/registered mark in headings, metadata and image descriptions; supplied artwork visually checked. |
| No awards year or telecast number (p. 3) | No cycle/date labels or year in the FYC footer. The regular footer is no longer passed as hidden serialized FYC content. |
| No unsupported nomination/award claims or statistics (pp. 2–3) | None displayed. Category remains “Best Rap Performance”; the page does not assert nomination, award or verified entry acceptance. |
| Product artwork and listening links permitted (p. 2) | Existing artwork plus optional YouTube, Spotify and Amazon players and direct links to the recording. |
| Opt-out required for FYC communications, including websites (p. 2) | Top opt-out link, explicit bottom opt-out button and visible email/subject instructions; metadata descriptions and supplied artwork also include opt-out details. |
| Academy guidelines link permitted (p. 2) | Public voting and solicitation guidelines link, labelled as an external Academy resource without a logo or endorsement claim. |

The generated production HTML is checked for mandatory opt-out and source
links, forbidden identifiers/legacy claims, year/telecast references, trademark
formatting and opt-out descriptions in search/social metadata. The campaign
artwork must be present at its full 2400×1350 dimensions in the standalone
runtime. Browser checks also inspect the rendered page and Markdown response.
These checks guard against specific regressions; they are not a general-purpose
or authoritative certification of every possible FYC tactic.

## Recording presentation

The YouTube privacy-enhanced player, the owner-supplied Spotify track
`0aZbNd2vuGDZKKDKPO6vDD`, and Amazon album `B0HC3YQYTN` load only after activation.
Switching provider replaces the previous iframe. Direct recording links remain
available; no WAV upload, Drive folder, incentive, gift, subscription offer or
third-party member-list acquisition is implemented.

Provider interfaces are controlled by those providers. Preview duration, login,
region availability, video recommendations, advertising and provider-displayed
statistics cannot be certified from this source repository. No fidelity promise
or false guarantee that recommendations are disabled is made. External player
playback and the Academy destination URL remain unverified because the cloud
egress proxy returns HTTP 403 before reaching those hosts. The supplied PDF,
rather than an inaccessible online rulebook, is the basis of this review.

## Other campaign activity and entry status

The PDF also covers gifts and hospitality, event tickets, mailings to Academy
offices, telephone lobbying, third-party member-list vendors, member-hosted
activity and duplicate/miscategorised posts in the Academy's own FYC feature
(pp. 3–5). A website edit does not validate or authorise any of those activities.
No messages, portal submissions or distribution to members were performed.

The owner/submitting member must verify accepted-entry status, creator credits,
category and use of the Academy's portal against the actual entry. The site
does not invent missing credits, assert eligibility or identify a voting cycle.
The Academy retains authority over interpretation and compliance; the supplied
PDF identifies `awards@grammy.com` for questions and advance review. This change
does not claim Academy approval or guarantee an entry cannot be disqualified.

## Reusable factual communication

If the owner prepares a separate FYC message, keep its own opt-out with it:

> For Your GRAMMY® Consideration
>
> Dama Venus — Kitsune Pt 2
>
> Best Rap Performance

> “Kitsune Pt 2” features first-person lyrics about desire and connection, a
> recurring “no drama, no stress” refrain, and imagery of constellations,
> lanterns and midnight.

> Recording: https://youtu.be/h6OUAxJmKRw
>
> FYC page: https://damavenus.eu/fyc
>
> Guidelines: https://www.recordingacademy.com/awards/voting-and-solicitation-guidelines
>
> FYC opt-out: contact@damavenus.eu; subject: STOP FYC.

## Publication

The corrective PR updates the FYC implementation merged through PR #198.
Merging the correction and deploying the new build are required before the live
site shows the changes; clearing Cloudflare alone does not publish them.
No Cloudflare access or production-server session is available here.
Cache changes, firewall settings and public production HTTP status are not
claimed as verified by this work.
