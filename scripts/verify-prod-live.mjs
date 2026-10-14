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

function normalizeText(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'")
    .replaceAll("&apos;", "'")
    .replace(/\s+/g, " ");
}

async function fetchDocumentWithRetry(url, { attempts, delayMs, headers = {} }) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        cache: "no-store",
        headers: {
          "cache-control": "no-cache",
          "user-agent": "DamaVenus-Production-Verifier/1.1",
          ...headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return {
        body: await response.text(),
        contentType: response.headers.get("content-type") ?? "",
        vary: response.headers.get("vary") ?? "",
        markdownTokens: response.headers.get("x-markdown-tokens") ?? ""
      };
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError ?? new Error(`Unknown fetch error for ${url}`);
}

function assertCurrentHomepage(body, label) {
  const normalized = normalizeText(body);
  const missing = requiredMarkers.filter((marker) => !normalized.includes(marker));
  const stale = retiredMarkers.filter((marker) => normalized.includes(marker));

  if (missing.length || stale.length) {
    const details = [];
    if (missing.length) details.push(`missing: ${missing.join(" | ")}`);
    if (stale.length) details.push(`stale: ${stale.join(" | ")}`);
    throw new Error(`${label} serves an unexpected homepage build (${details.join("; ")})`);
  }
}

function assertHtmlRepresentation(document, label) {
  if (!document.contentType.toLowerCase().includes("text/html")) {
    throw new Error(`${label} default response is not HTML (${document.contentType || "no content-type"})`);
  }
  assertCurrentHomepage(document.body, label);
}

function assertMarkdownRepresentation(document, label) {
  if (!document.contentType.toLowerCase().startsWith("text/markdown")) {
    throw new Error(
      `${label} did not negotiate Markdown (${document.contentType || "no content-type"})`
    );
  }

  if (!document.vary.toLowerCase().split(",").map((value) => value.trim()).includes("accept")) {
    throw new Error(`${label} Markdown response is missing Vary: Accept`);
  }

  const tokenCount = Number(document.markdownTokens);
  if (!Number.isFinite(tokenCount) || tokenCount <= 0) {
    throw new Error(`${label} Markdown response is missing a valid x-markdown-tokens header`);
  }

  if (/<html\b|<body\b|<script\b/i.test(document.body)) {
    throw new Error(`${label} Markdown response still contains document/script HTML`);
  }

  assertCurrentHomepage(document.body, `${label} Markdown representation`);
}

async function verifyRepresentations(url, label, retry) {
  const html = await fetchDocumentWithRetry(url, retry);
  assertHtmlRepresentation(html, label);

  const markdown = await fetchDocumentWithRetry(url, {
    ...retry,
    headers: {
      Accept: "text/markdown, text/html;q=0.9"
    }
  });
  assertMarkdownRepresentation(markdown, label);
}

async function verifyLocal() {
  await verifyRepresentations(
    LOCAL_URL,
    `Local production endpoint ${LOCAL_URL}`,
    { attempts: 20, delayMs: 1500 }
  );
  console.log(`[live-verify] Local HTML + Markdown negotiation are current: ${LOCAL_URL}`);
}

async function verifyPublic() {
  try {
    await verifyRepresentations(
      PUBLIC_URL,
      `Public site ${PUBLIC_URL}`,
      { attempts: 5, delayMs: 2000 }
    );
    console.log(`[live-verify] Public HTML + Markdown negotiation are current: ${PUBLIC_URL}`);
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
