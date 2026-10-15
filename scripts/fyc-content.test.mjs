import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assertNoFycDateReferences, reportFycReview } from './lib/fyc-content.mjs';

test('FYC findings are advisory and do not block publication', async () => {
  const warnings = [];
  await assert.doesNotReject(() => reportFycReview(async () => {
    throw new Error('FYC entry number found');
  }, value => warnings.push(value)));
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Deployment wird fortgesetzt.*FYC entry number found/);
});

test('a clean FYC review emits no warning', async () => {
  const warnings = [];
  await reportFycReview(async () => {}, value => warnings.push(value));
  assert.deepEqual(warnings, []);
});

test('technical years in Next.js payloads, URLs, dimensions and SVG paths are not campaign copy', () => {
  assert.doesNotThrow(() => assertNoFycDateReferences(`
    <html><head>
      <script src="/_next/static/chunks/2027-abcd.js"></script>
      <meta property="og:image:width" content="2026">
      <meta property="og:image" content="https://example.com/2028/cover.jpg">
      <script type="application/ld+json">{"name":"Kitsune Pt 2","width":2026,"url":"https://example.com/2027"}</script>
    </head><body>
      <p>For Your GRAMMY® Consideration</p>
      <img width="2000" src="/2026/cover.jpg" alt="Kitsune Pt 2">
      <svg viewBox="0 0 2026 2000"><path d="M 2027 2028 L 2029 2030"/></svg>
      <style>.example { z-index: 2026 }</style>
      <script>self.__next_f.push([1,"module:I[2026,[2000,2027],true]"])</script>
    </body></html>
  `));
});

for (const [name, html] of [
  ['visible year', '<p>For Your 2027 GRAMMY® Consideration</p>'],
  ['awards edition', '<p>69th GRAMMY® Awards</p>'],
  ['title', '<head><title>FYC 2027</title></head>'],
  ['description', '<meta name="description" content="For Your 2027 Consideration">'],
  ['social preview', "<meta property='og:title' content='69th GRAMMY® Awards'>"],
  ['image description', '<img src="/cover.jpg" alt="FYC 2027">'],
  ['accessible label', '<button aria-label="FYC 2027">Recording</button>'],
  ['structured data', '<script type="application/ld+json">{"headline":"FYC 2027"}</script>'],
  ['footer year', '<footer>© 2026 Dama Venus</footer>'],
  ['SVG text', '<svg><text>FYC 2027</text></svg>'],
  ['entity encoded year', '<p>FYC 20&#50;7</p>'],
  ['year split across inline tags', '<p>FYC <span>20</span><span>27</span></p>'],
]) {
  test(`campaign date reference rejected in ${name}`, () => {
    assert.throws(() => assertNoFycDateReferences(html), /Unzulässiger FYC-Inhalt.*(?:20\d{2}|69th GRAMMY)/);
  });
}

test('failure identifies the public source and actual match', () => {
  assert.throws(
    () => assertNoFycDateReferences('<meta name="description" content="FYC 2027">'),
    /Metadaten: description.*"2027".*FYC 2027/,
  );
});
