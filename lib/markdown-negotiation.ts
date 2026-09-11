const MARKDOWN_PATHS = new Set([
  "/",
  "/music",
  "/visuals",
  "/about",
  "/press",
  "/contact",
  "/privacy",
  "/imprint"
]);

type AcceptPreference = {
  mediaType: string;
  q: number;
  order: number;
};

function parseAcceptHeader(value: string): AcceptPreference[] {
  return value
    .split(",")
    .map((entry, order) => {
      const [rawMediaType, ...rawParams] = entry.split(";");
      const mediaType = rawMediaType.trim().toLowerCase();
      let q = 1;

      for (const rawParam of rawParams) {
        const [key, rawValue] = rawParam.split("=").map((part) => part.trim());
        if (key?.toLowerCase() !== "q") continue;

        const parsed = Number(rawValue);
        q = Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0;
      }

      return { mediaType, q, order };
    })
    .filter((entry) => entry.mediaType.length > 0);
}

export function isMarkdownPath(pathname: string): boolean {
  const normalized = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
  return MARKDOWN_PATHS.has(normalized);
}

export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;

  const preferences = parseAcceptHeader(acceptHeader);
  const markdownCandidates = preferences.filter(
    (entry) => entry.mediaType === "text/markdown" || entry.mediaType === "text/*"
  );

  if (markdownCandidates.length === 0) return false;

  const markdown = markdownCandidates.reduce((best, entry) => {
    if (!best || entry.q > best.q || (entry.q === best.q && entry.order < best.order)) {
      return entry;
    }
    return best;
  }, null as AcceptPreference | null);

  if (!markdown || markdown.q <= 0) return false;

  const explicitHtml = preferences
    .filter((entry) => entry.mediaType === "text/html" || entry.mediaType === "application/xhtml+xml")
    .reduce((best, entry) => Math.max(best, entry.q), 0);
  const wildcard = preferences
    .filter((entry) => entry.mediaType === "*/*")
    .reduce((best, entry) => Math.max(best, entry.q), 0);

  // */* by itself remains HTML, matching browser/default Cloudflare behavior.
  // A wildcard only defeats an explicitly requested Markdown representation
  // when its q-value is strictly higher; an explicit Markdown tie is kept.
  return markdown.q >= explicitHtml && markdown.q >= wildcard;
}

export function estimateMarkdownTokens(markdown: string): number {
  // A deterministic approximation suitable for the optional x-markdown-tokens
  // response header. Cloudflare may replace this with its own tokenizer count.
  return Math.max(1, Math.ceil(markdown.length / 4));
}
