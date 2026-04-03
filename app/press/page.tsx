import Link from "next/link";
import { pressEpkBlocks } from "@/content/data/press.data";
import { assetMap } from "@/content/data/site.config";

const primaryBlockIds = ["veryShortBio", "featuredPressImages", "contactBlock"];
const secondaryBlockIds = ["shortBio", "pressReadyDescription", "musicListeningLinks", "videoVisualLinks", "socialStreamingLinks", "downloads"];

const secondaryLinkGroups: Array<{ purpose: "listen" | "watch" | "social" | "download"; blockIds: string[] }> = [
  { purpose: "listen", blockIds: ["musicListeningLinks"] },
  { purpose: "watch", blockIds: ["videoVisualLinks"] },
  { purpose: "social", blockIds: ["socialStreamingLinks"] },
  { purpose: "download", blockIds: ["downloads"] }
];

function renderBody(body: string | string[]) {
  if (Array.isArray(body)) {
    return (
      <div className="space-y-2 text-sm text-muted">
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  }

  return <p className="text-sm text-muted">{body}</p>;
}

function renderBlock(block: (typeof pressEpkBlocks)[number], purpose?: string) {
  return (
    <article key={block.id} className="space-y-2 rounded-lg border border-white/10 p-4">
      {purpose ? <p className="text-xs uppercase tracking-[0.2em] text-muted">{purpose}</p> : null}
      <h3 className="font-display text-2xl font-semibold">{block.title}</h3>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{block.shortDescriptor}</p>
      {renderBody(block.body)}
      <Link href={block.target} className="first-impression-cta">
        {block.ctaLabel}
      </Link>
      {block.linkedAssets.length ? (
        <ul className="space-y-1 text-xs text-muted">
          {block.linkedAssets.map((assetId) => (
            <li key={assetId}>
              {assetId}: {assetMap[assetId]?.src ?? "Asset not found"}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default function PressPage() {
  const introBlock = pressEpkBlocks.find((block) => block.id === "pageIntro");
  const summaryBlock = pressEpkBlocks.find((block) => block.id === "artistSummary");

  const primaryBlocks = primaryBlockIds
    .map((id) => pressEpkBlocks.find((block) => block.id === id))
    .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));

  const secondaryBlocks = secondaryBlockIds
    .map((id) => pressEpkBlocks.find((block) => block.id === id))
    .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));

  const secondaryInfoBlocks = secondaryBlocks.filter(
    (block) => !secondaryLinkGroups.some((group) => group.blockIds.includes(block.id))
  );

  return (
    <section className="space-y-8">
      {introBlock ? (
        <section className="space-y-3 rounded-lg border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Press & EPK</p>
          <h1 className="font-display text-4xl font-semibold">{introBlock.title}</h1>
          {typeof introBlock.body === "string" ? <p className="text-sm text-muted">{introBlock.body}</p> : renderBody(introBlock.body)}
          {summaryBlock ? (typeof summaryBlock.body === "string" ? <p className="text-sm text-muted">{summaryBlock.body}</p> : renderBody(summaryBlock.body)) : null}
          <Link href={introBlock.target} className="first-impression-cta">
            {introBlock.ctaLabel}
          </Link>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Primary Press Blocks</h2>
        {primaryBlocks.map((block) => renderBlock(block, block.id === "contactBlock" ? "contact" : undefined))}
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Secondary Press Blocks</h2>
        {secondaryInfoBlocks.map((block) => renderBlock(block))}
        {secondaryLinkGroups.map((group) => {
          const groupBlocks = group.blockIds
            .map((id) => secondaryBlocks.find((block) => block.id === id))
            .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));

          return groupBlocks.map((block) => renderBlock(block, group.purpose));
        })}
      </section>
    </section>
  );
}
