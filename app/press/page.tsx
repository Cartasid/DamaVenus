import Link from "next/link";
import { pressEpkBlocks } from "@/content/data/press.data";

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

function renderBlock(block: (typeof pressEpkBlocks)[number], options?: { purpose?: string; ctaVariant?: "primary" | "secondary" | "soft" | "text" }) {
  const purpose = options?.purpose;
  const ctaVariant = options?.ctaVariant ?? "text";
  const ctaClassName =
    ctaVariant === "primary" ? "cta-primary" : ctaVariant === "secondary" ? "cta-secondary" : ctaVariant === "soft" ? "cta-soft" : "text-link";

  return (
    <article key={block.id} className="space-y-2 rounded-lg border border-white/10 p-4">
      {purpose ? <p className="text-xs uppercase tracking-[0.2em] text-muted">{purpose}</p> : null}
      <h3 className="font-display text-2xl font-semibold">{block.title}</h3>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{block.shortDescriptor}</p>
      {renderBody(block.body)}
      <Link href={block.target} className={ctaClassName}>
        {block.ctaLabel}
      </Link>
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
  const contactBlock = primaryBlocks.find((block) => block.id === "contactBlock");
  const primaryLeadBlocks = primaryBlocks.filter((block) => block.id !== "contactBlock");

  return (
    <section className="space-y-8">
      {introBlock ? (
        <section className="space-y-3 rounded-lg border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Press & EPK</p>
          <h1 className="font-display text-4xl font-semibold">{introBlock.title}</h1>
          {typeof introBlock.body === "string" ? <p className="text-sm text-muted">{introBlock.body}</p> : renderBody(introBlock.body)}
          {summaryBlock ? (typeof summaryBlock.body === "string" ? <p className="text-sm text-muted">{summaryBlock.body}</p> : renderBody(summaryBlock.body)) : null}
          <Link href={introBlock.target} className="cta-primary">
            {introBlock.ctaLabel}
          </Link>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Primary Press Blocks</h2>
        {primaryLeadBlocks.map((block) => renderBlock(block, { ctaVariant: "primary" }))}
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Secondary Press Blocks</h2>
        {secondaryInfoBlocks.filter((block) => block.id !== "contactBlock").map((block) => renderBlock(block, { ctaVariant: "text" }))}
        {secondaryLinkGroups.map((group) => {
          const groupBlocks = group.blockIds
            .map((id) => secondaryBlocks.find((block) => block.id === id))
            .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));

          return groupBlocks.map((block) =>
            renderBlock(block, {
              purpose: group.purpose,
              ctaVariant: block.id === "downloads" ? "secondary" : "soft"
            })
          );
        })}
      </section>

      {contactBlock ? <section className="space-y-4">{renderBlock(contactBlock, { purpose: "contact", ctaVariant: "primary" })}</section> : null}
    </section>
  );
}
