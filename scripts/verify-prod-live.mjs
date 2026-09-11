#!/usr/bin/env node

const LOCAL_URL = process.env.DAMA_VENUS_VERIFY_LOCAL_URL ?? "http://127.0.0.1:3000/";
const PUBLIC_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://damavenus.eu/";
const REQUIRE_PUBLIC = process.env.DAMA_VENUS_REQUIRE_PUBLIC_VERIFY === "1";

const requiredMarkers = [
  "High-Performance Avant-Garde Rap",
  "Building musical worlds connecting art & visuals",
  "Strategic Access",
  "Latest Official Release",
  "Lonely Berlin"
];

const retiredMarkers = [
  "Alternative Pop Trap-Pop R&B Vaporwave",
  "Frames in Motion",
  "Let’s Create the Next Chapter."
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeHtml(html) {
  return html
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'")
    .replaceAll("&apos;", "'")
    .replace(/\s+/g, " ");
}

async function fetchHtmlWithRetry(url, { attempts, delayMs }) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        cache: "no-store",
        headers: {
          "cache-control": "no-cache",
          "user-agent": "DamaVenus-Production-Verifier/1.0"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError ?? new Error(`Unknown fetch error for ${url}`);
}

function assertCurrentHomepage(html, label) {
  const normalized = normalizeHtml(html);
  const missing = requiredMarkers.filter((marker) => !normalized.includes(marker));
  const stale = retiredMarkers.filter((marker) => normalized.includes(marker));

  if (missing.length || stale.length) {
    const details = [];
    if (missing.length) details.push(`missing: ${missing.join(" | ")}`);
    if (stale.length) details.push(`stale: ${stale.join(" | ")}`);
    throw new Error(`${label} serves an unexpected homepage build (${details.join("; ")})`);
  }
}

async function verifyLocal() {
  const html = await fetchHtmlWithRetry(LOCAL_URL, { attempts: 20, delayMs: 1500 });
  assertCurrentHomepage(html, `Local production endpoint ${LOCAL_URL}`);
  console.log(`[live-verify] Local production endpoint is current: ${LOCAL_URL}`);
}

async function verifyPublic() {
  try {
    const html = await fetchHtmlWithRetry(PUBLIC_URL, { attempts: 5, delayMs: 2000 });
    assertCurrentHomepage(html, `Public site ${PUBLIC_URL}`);
    console.log(`[live-verify] Public site is current: ${PUBLIC_URL}`);
  } catch (error) {
    if (REQUIRE_PUBLIC) {
      throw error;
    }
    console.warn(
      `[live-verify] Public verification could not be completed: ${error.message}. ` +
        "Set DAMA_VENUS_REQUIRE_PUBLIC_VERIFY=1 to make this fatal."
    );
  }
}

await verifyLocal();
await verifyPublic();
