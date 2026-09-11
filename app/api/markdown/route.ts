import { NextRequest } from "next/server";
import {
  estimateMarkdownTokens,
  isMarkdownPath
} from "@/lib/markdown-negotiation";

export const dynamic = "force-dynamic";

const PUBLIC_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://damavenus.eu").replace(/\/$/, "");
const INTERNAL_ORIGIN =
  process.env.DAMA_VENUS_INTERNAL_ORIGIN ??
  `http://127.0.0.1:${process.env.PORT ?? "3000"}`;

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&#x27;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function stripTags(value: string): string {
  return decodeEntities(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function extractAttribute(tag: string, attribute: string): string | null {
  const match = tag.match(new RegExp(`${attribute}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? decodeEntities(match[1]) : null;
}

function extractMeta(html: string, key: string): string | null {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    const name = extractAttribute(tag, "name") ?? extractAttribute(tag, "property");
    if (name?.toLowerCase() !== key.toLowerCase()) continue;
    return extractAttribute(tag, "content");
  }
  return null;
}

function extractCanonical(html: string, pathname: string): string {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    if (extractAttribute(tag, "rel")?.toLowerCase() !== "canonical") continue;
    const href = extractAttribute(tag, "href");
    if (href) return new URL(href, PUBLIC_ORIGIN).toString();
  }
  return new URL(pathname, `${PUBLIC_ORIGIN}/`).toString();
}

function absoluteHref(href: string): string {
  if (/^(?:mailto:|tel:|https?:)/i.test(href)) return href;
  if (href.startsWith("#")) return href;
  try {
    return new URL(href, `${PUBLIC_ORIGIN}/`).toString();
  } catch {
    return href;
  }
}

function htmlToMarkdown(html: string, pathname: string): string {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? stripTags(titleMatch[1]) : "Dáma Venus";
  const description = extractMeta(html, "description") ?? "Official Dáma Venus website.";
  const canonical = extractCanonical(html, pathname);

  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => decodeEntities(match[1].trim()))
    .filter(Boolean);

  let body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;

  body = body
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, "")
    .replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, "");

  // Links are converted before general tag stripping so agents keep the
  // destination graph without needing to parse HTML attributes.
  body = body.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (full, attrs, inner) => {
    const href = extractAttribute(`<a ${attrs}>`, "href");
    const label = stripTags(inner);
    if (!label) return "";
    return href ? `[${label}](${absoluteHref(href)})` : label;
  });

  for (let level = 6; level >= 1; level -= 1) {
    const hashes = "#".repeat(level);
    body = body.replace(
      new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi"),
      (_, inner) => `\n\n${hashes} ${stripTags(inner)}\n\n`
    );
  }

  body = body
    .replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
      const text = stripTags(inner);
      return text ? `\n\n> ${text}\n\n` : "";
    })
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => {
      const text = stripTags(inner);
      return text ? `\n- ${text}` : "";
    })
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|section|article|main|aside|header|ul|ol|form)>/gi, "\n\n")
    .replace(/<(?:p|div|section|article|main|aside|header|ul|ol|form)\b[^>]*>/gi, "\n\n")
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<input\b[^>]*>/gi, "")
    .replace(/<textarea\b[^>]*>[\s\S]*?<\/textarea>/gi, "")
    .replace(/<select\b[^>]*>[\s\S]*?<\/select>/gi, "")
    .replace(/<[^>]+>/g, " ");

  body = decodeEntities(body)
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `canonical: ${JSON.stringify(canonical)}`,
    "---"
  ].join("\n");

  const structuredData = jsonLd.length
    ? `\n\n## Structured Data\n\n${jsonLd.map((value) => `\`\`\`json\n${value}\n\`\`\``).join("\n\n")}`
    : "";

  return `${frontmatter}\n\n${body}${structuredData}\n`;
}

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("path") ?? "/";

  if (!isMarkdownPath(pathname)) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const internalUrl = new URL(pathname, `${INTERNAL_ORIGIN}/`);
  const htmlResponse = await fetch(internalUrl, {
    redirect: "follow",
    cache: "no-store",
    headers: {
      Accept: "text/html",
      "Cache-Control": "no-cache",
      "User-Agent": "DamaVenus-Markdown-Renderer/1.0",
      "X-Dama-Markdown-Internal": "1"
    }
  });

  if (!htmlResponse.ok) {
    return new Response(`Unable to render ${pathname}: HTTP ${htmlResponse.status}\n`, {
      status: htmlResponse.status,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const contentType = htmlResponse.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("text/html")) {
    return new Response(`Unable to render ${pathname}: origin did not return HTML\n`, {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const html = await htmlResponse.text();
  const markdown = htmlToMarkdown(html, pathname);

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      Vary: "Accept",
      "X-Markdown-Tokens": String(estimateMarkdownTokens(markdown)),
      "X-Original-Tokens": String(estimateMarkdownTokens(html))
    }
  });
}
