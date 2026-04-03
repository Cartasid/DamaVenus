import Link from "next/link";
import { pressEpkBlocks } from "@/content/data/press.data";

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

function renderBlock(block: (typeof pressEpkBlocks)[number], purpose?: string) {
  return (
    <article key={block.id} className="space-y-2 rounded-lg border border-white/10 p-4">
      {purpose ? <p className="text-xs uppercase tracking-[0.2em] text-muted">{purpose}</p> : null}
      <h2 className="font-display text-2xl font-semibold">{block.title}</h2>
      {renderBody(block.body)}
      <Link href={block.target} className="first-impression-cta">
        {block.ctaLabel}
      </Link>
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

  return (
    <section className="space-y-8">
      <section className="space-y-4">{primaryBlocks.map((block) => renderBlock(block, block.id === "contactBlock" ? "contact" : undefined))}</section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Press Highlights</h2>
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
