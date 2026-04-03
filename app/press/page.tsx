import Link from "next/link";
import { pressEpkBlocks } from "@/content/data/press.data";
import { assetMap } from "@/content/data/site.config";

const primaryBlockIds = ["pageIntro", "artistSummary", "veryShortBio", "featuredPressImages", "contactBlock"];
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

function renderBlock(block: (typeof pressEpkBlocks)[number], options?: { purpose?: string; ctaVariant?: "primary" | "text" | "request" }) {
  const ctaVariant = options?.ctaVariant ?? "text";

  return (
    <article key={block.id} className="space-y-2 rounded-lg border border-white/10 p-4">
      {options?.purpose ? <p className="text-xs uppercase tracking-[0.2em] text-muted">{options.purpose}</p> : null}
      <h2 className="font-display text-2xl font-semibold">{block.title}</h2>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{block.shortDescriptor}</p>
      {renderBody(block.body)}
      {ctaVariant === "primary" ? (
        <Link href={block.target} className="first-impression-cta">
          {block.ctaLabel}
        </Link>
      ) : null}
      {ctaVariant === "text" ? (
        <Link href={block.target} className="text-sm font-medium underline underline-offset-4">
          {block.ctaLabel}
        </Link>
      ) : null}
      {ctaVariant === "request" ? <p className="text-sm font-medium text-muted">{block.ctaLabel}</p> : null}
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
  const primaryBlocks = primaryBlockIds
    .map((id) => pressEpkBlocks.find((block) => block.id === id))
    .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));

  const secondaryBlocks = secondaryBlockIds
    .map((id) => pressEpkBlocks.find((block) => block.id === id))
    .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));

  const secondaryInfoBlocks = secondaryBlocks.filter(
    (block) => !secondaryLinkGroups.some((group) => group.blockIds.includes(block.id))
  );

  const contactBlock = primaryBlocks.find((block) => block.id === "contactBlock");
  const primaryLeadBlocks = primaryBlocks.filter((block) => block.id !== "contactBlock");

  return (
    <section className="space-y-8">
      <section className="space-y-4">
        {primaryLeadBlocks.map((block, index) =>
          renderBlock(block, { ctaVariant: index === 0 ? "primary" : "text" })
        )}
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Secondary Press Blocks</h2>
        {secondaryInfoBlocks.map((block, index) => renderBlock(block, { ctaVariant: index === 0 ? "primary" : "text" }))}
        {secondaryLinkGroups.map((group) => {
          const groupBlocks = group.blockIds
            .map((id) => secondaryBlocks.find((block) => block.id === id))
            .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));

          return groupBlocks.map((block) =>
            renderBlock(block, {
              purpose: group.purpose,
              ctaVariant: block.id === "downloads" ? "request" : "text"
            })
          );
        })}
      </section>

      {contactBlock ? (
        <section className="space-y-4">
          {renderBlock(contactBlock, { purpose: "contact", ctaVariant: "primary" })}
        </section>
      ) : null}
    </section>
  );
}
