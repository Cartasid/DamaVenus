import type { Metadata } from "next";
import Link from "next/link";
import { pressEpkBlocks } from "@/content/data/press.data";

export const metadata: Metadata = {
  title: { absolute: "Press & EPK – Images, Bio & Release Facts | Dama Venus" },
  description: "Press-ready overview with images, bio, and release facts for fast editorial use.",
  openGraph: {
    title: "Press & EPK – Images, Bio & Release Facts | Dama Venus",
    description: "Images, bio, and release facts for press inquiries, plus approved links and contact.",
    url: "/press"
  },
  twitter: {
    title: "Press & EPK – Images, Bio & Release Facts | Dama Venus",
    description: "Images, bio, and release facts for press inquiries, plus approved links and contact."
  },
  alternates: {
    canonical: "/press"
  }
};

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
      <div className="space-y-2 typo-body-m max-w-2xl">
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  }

  return <p className="typo-body-m max-w-2xl">{body}</p>;
}

function renderBlock(block: (typeof pressEpkBlocks)[number], options?: { purpose?: string; ctaVariant?: "primary" | "secondary" | "soft" | "text" }) {
  const purpose = options?.purpose;
  const ctaVariant = options?.ctaVariant ?? "text";
  const ctaClassName =
    ctaVariant === "primary" ? "cta-primary" : ctaVariant === "secondary" ? "cta-secondary" : ctaVariant === "soft" ? "cta-soft" : "text-link";

  return (
    <article key={block.id} className="space-y-2 rounded-lg border border-white/10 p-4">
      {purpose ? <p className="typo-label">{purpose}</p> : null}
      <h3 className="typo-h2">{block.title}</h3>
      <p className="typo-label">{block.shortDescriptor}</p>
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
    <section className="section-stack-md">
      {introBlock ? (
        <section className="space-y-3 rounded-lg border border-white/10 p-6">
          <p className="typo-label">Press & EPK</p>
          <h1 className="typo-h1">{introBlock.title}</h1>
          {typeof introBlock.body === "string" ? <p className="typo-body-m max-w-2xl">{introBlock.body}</p> : renderBody(introBlock.body)}
          {summaryBlock ? (typeof summaryBlock.body === "string" ? <p className="typo-body-m max-w-2xl">{summaryBlock.body}</p> : renderBody(summaryBlock.body)) : null}
          <Link href={introBlock.target} className="first-impression-cta">
            {introBlock.ctaLabel}
          </Link>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="typo-h2">Primary Press Blocks</h2>
        {primaryLeadBlocks.map((block) => renderBlock(block))}
      </section>

      <section className="space-y-4">
        <h2 className="typo-h2">Secondary Press Blocks</h2>
        {secondaryInfoBlocks.filter((block) => block.id !== "contactBlock").map((block) => renderBlock(block))}
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
