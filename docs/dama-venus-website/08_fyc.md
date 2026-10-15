# FYC: sources, implementation and publication checks

## Source material

The page uses the existing package
`pics/Dama_Venus_FYC_Send_To_Member_v5_Safe_Font`:

- `02_COPY_PASTE_TEXT/PORTAL_COPY_READY.txt` supplies the artist, recording,
  category, description and recording URL `https://youtu.be/h6OUAxJmKRw`.
- `WEBSITE_DESCRIPTION.txt` supplies the first-person perspective, desire and
  connection, recurring “no drama, no stress” refrain, and nocturnal imagery.
- `OPT_OUT_ONLY.txt` supplies the `STOP FYC` email instructions.
- `01_PORTAL_UPLOAD_IMAGES/Dama_Venus_Kitsune_Pt2_FYC_Landscape_2400x1350.jpg`
  is displayed whole, without a crop or new artwork. The asset registry ensures
  it is prepared and included in the production standalone image.
- `Dama_Venus_Final_FYC_Copy_EN.pdf` confirms the public copy. Neither this PDF
  nor the private submitting-member guide is published as a download.

The owner supplied entry number `011293`, Web ID `10149486`, one-stop rights,
pending BMI application and Berlin base information explicitly for this page.
The private guide says **“Keep Entry Number 011293 and Web ID 10149486 private”**
and **“Do not add the Entry Number, Web ID, Academy logo, or any request for
votes.”** The current implementation follows the owner's explicit website
instruction to display the two identifiers. This discrepancy needs attention
when reviewing public FYC presentation; these IDs do not establish a nomination
or independently verify acceptance of the entry.

## Research status — 15 October 2026

The provided material has been read, including both PDFs. It distinguishes
public FYC copy from private submission instructions and calls for verification
of the accepted entry, awards cycle, category and artist spelling. The site
therefore uses “For Your GRAMMY® Consideration”, does not call the artist a
nominee, does not display an Academy logo, and makes no request for votes,
exchange of votes, incentives, chart-position claims or comparisons with other
artists. The copy describes the recording itself and invites listening.

**Current official online rules have not yet been verified.** Requests to the
Recording Academy were blocked by the cloud environment's egress proxy with
HTTP 403 before reaching the destination. The user's requested all-domain
network access has been saved in the environment configuration draft; saving
alone does not activate it. Do not describe this draft as Academy-approved or
as a completed current-cycle compliance review.

Official research starting points, to retrieve after network activation:

- https://www.recordingacademy.com/awards/rules-guidelines
- https://www.recordingacademy.com/awards/voting-process

Review the current cycle's rulebook and solicitation/campaign rules, including
public FYC wording, use of identifiers and trademarks, eligible release dates,
submission acceptance, and the distinction between first-round voting for
nominations and final-round voting for winners. No cycle dates or nomination
status are inferred on the page. BMI application status and sync rights are
artist-supplied information, separate from Grammy eligibility or nomination.

## Listening and page metadata

The exact title and description requested by the owner are implemented using
Next.js metadata with an absolute title and canonical `/fyc`. The page is also
in the sitemap and the existing HTML/Markdown negotiation route list.

YouTube's privacy-enhanced iframe is created only after a click. `playsinline=1`
supports inline mobile playback; `rel=0` limits recommendations rather than
guaranteeing their complete removal. `iv_load_policy=3` requests hidden legacy
annotations. No parameter guarantees uncompressed audio or changes the
provider's encoding. The page does not make either promise.

Amazon uses the existing official album ID `B0HC3YQYTN` in its embed endpoint.
The Amazon integration's **live playback is unverified while network access is
blocked**. Preview length, login and availability belong to Amazon. All
providers retain visible direct links; switching providers unmounts the old
iframe to stop simultaneous playback. No provider iframe loads on initial
page view. No analytics, social widgets or third-party media assets are loaded
by the FYC component before activation.

The owner additionally supplied the direct Spotify track link
`https://open.spotify.com/intl-de/track/0aZbNd2vuGDZKKDKPO6vDD`.
The Spotify option embeds that exact track ID using Spotify's dark 152px player;
it does not search for or infer a different recording. Clicking a provider
button loads that provider immediately. Spotify's real playback, account and
region behavior also require the pending external check.

Per the owner's later instruction, there are no Drive links, fabricated archive
buttons, WAV uploads, or promises that absent master/instrumental files exist.
The closing action is a recording/sync contact email, and the privacy page
describes the optional embedded services.

## Deployment and Cloudflare

The route and artwork can be verified locally and in the standalone build.
Publishing a PR does not deploy `https://damavenus.eu/fyc`.

No Cloudflare account, zone binding or API credentials are available in this
environment. Consequently no cache purge, Bot Fight Mode change, AI Labyrinth
change, or verification of those settings has been performed. After the page
is deployed, use the existing zone dashboard to verify those settings and
purge the cache as requested. Then verify public `/fyc` returns HTTP 200 with
the new page, its image returns 200, the canonical is correct, and both players
work from an ordinary visitor session. Bot protections and AI Labyrinth do
not guarantee that every automated client is blocked or that desired crawlers
can index the page; verify the intended crawling behavior separately.
