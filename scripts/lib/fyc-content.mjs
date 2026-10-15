const dateReference = /\b20\d{2}\b|\b\d+(?:st|nd|rd|th)\s+GRAMMY/i;
const textMetadata = /^(?:description|keywords|author|creator|application-name|(?:og|twitter):(?:title|description|image:alt))$/i;
const structuredTextKeys = new Set([
  'name', 'alternatename', 'headline', 'alternativeheadline', 'description',
  'text', 'caption', 'articlebody', 'keywords', 'award', 'awards',
  'copyrightyear', 'datepublished', 'datecreated', 'datemodified',
]);

/** FYC editorial findings must never prevent publication of a correction. */
export async function reportFycReview(review, warn = console.warn) {
  try {
    await review();
  } catch (error) {
    warn(`FYC-Hinweis (Deployment wird fortgesetzt): ${error instanceof Error ? error.message : String(error)}`);
  }
}

function decodeEntities(value) {
  return value
    .replace(/&#(x[0-9a-f]+|\d+);?/gi, (entity, code) => {
      const point = code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code);
      return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    })
    .replace(/&nbsp;/gi, ' ')
    .replace(/&reg;/gi, '®')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? decodeEntities(match[1] ?? match[2]) : null;
}

function plainText(markup) {
  return decodeEntities(markup
    .replace(/<\/?(?:p|div|section|article|main|header|footer|h[1-6]|li|br)\b[^>]*>/gi, ' ')
    .replace(/<[^>]*>/g, ''))
    .replace(/\s+/g, ' ').trim();
}

function check(value, source) {
  const match = String(value).match(dateReference);
  if (!match) return;
  const start = Math.max(0, match.index - 45);
  const context = String(value).slice(start, match.index + match[0].length + 65);
  throw new Error(`Unzulässiger FYC-Inhalt (${source}): ${JSON.stringify(match[0])} in ${JSON.stringify(context)}`);
}

/** Check published copy, not numeric module IDs, URLs, dimensions or SVG paths. */
export function assertNoFycDateReferences(html) {
  const withoutComments = html.replace(/<!--[\s\S]*?-->/g, '');

  for (const match of withoutComments.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    if (attribute(match[1], 'type')?.toLowerCase() !== 'application/ld+json') continue;
    const walk = (value, key = '') => {
      if (Array.isArray(value)) value.forEach(item => walk(item, key));
      else if (value && typeof value === 'object') Object.entries(value).forEach(([name, item]) => walk(item, name));
      else if (structuredTextKeys.has(key.toLowerCase())) check(value, `JSON-LD: ${key}`);
    };
    walk(JSON.parse(match[2]));
  }

  // Framework scripts contain Flight payloads and arbitrary numeric module IDs.
  // Their actual rendered content is checked below, including streamed metadata.
  const markup = withoutComments.replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  for (const [tag] of markup.matchAll(/<meta\b[^>]*>/gi)) {
    const name = attribute(tag, 'name') ?? attribute(tag, 'property');
    if (name && textMetadata.test(name)) check(attribute(tag, 'content') ?? '', `Metadaten: ${name}`);
  }
  for (const [, title] of markup.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi)) {
    check(plainText(title), 'Titel');
  }
  for (const [tag] of markup.matchAll(/<[a-z][^>]*>/gi)) {
    for (const name of ['alt', 'title', 'aria-label', 'aria-description']) {
      const value = attribute(tag, name);
      if (value) check(value, `Attribut: ${name}`);
    }
  }
  const body = markup.match(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/i)?.[1]
    ?? markup.replace(/<head\b[^>]*>[\s\S]*?<\/head\s*>/gi, '');
  check(plainText(body), 'Seitentext');
}
