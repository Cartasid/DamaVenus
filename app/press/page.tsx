import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pressEpkBlocks, pressMaterials } from "@/content/data/press.data";

export const metadata: Metadata = {
  title: { absolute: "Press & EPK | Dáma Venus — Bio, Images & Release Facts" },
  description:
    "Download the current official Dáma Venus EPK and access artist bio, high-resolution images, release facts, and press contact information.",
  openGraph: {
    title: "Press & EPK | Dáma Venus",
    description:
      "Current official press kit, bio, high-resolution images, release facts, and press contact information.",
    url: "/press",
    images: [{ url: "/og-press.png" }]
  },
  twitter: {
    title: "Press & EPK | Dáma Venus",
    description:
      "Current official press kit, bio, high-resolution images, release facts, and press contact information.",
    images: ["/og-press.png"]
  },
  alternates: { canonical: "/press" }
};

const labelStyle = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const
};

export default function PressPage() {
  const introBlock = pressEpkBlocks.find((block) => block.id === "pageIntro");
  const summaryBlock = pressEpkBlocks.find((block) => block.id === "artistSummary");
  const currentEpk = pressMaterials[0];

  return (
    <div className="pb-28">
      <section
        className="img-color-reveal relative overflow-hidden"
        style={{ height: "70vh", minHeight: "520px" }}
        aria-label="Press hero"
      >
        <Image
          src="/assets/dama-venus/press/press-hero-bnj7p-v01.jpg"
          alt="Dáma Venus — press editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover img-press-hero"
          style={{ objectPosition: "center 55%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.15) 100%)"
          }}
          aria-hidden="true"
        />
        {introBlock ? (
          <div className="relative z-10 flex h-full flex-col justify-end site-container pb-14">
            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(200,168,126,0.9)"
              }}
            >
              Press &amp; EPK
            </p>
            <h1
              className="text-primary"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 300,
                lineHeight: 0.95,
                maxWidth: "28rem"
              }}
            >
              {introBlock.title}
            </h1>
            {summaryBlock && typeof summaryBlock.body === "string" ? (
              <p
                className="mt-5 text-muted"
                style={{ fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "38rem" }}
              >
                {summaryBlock.body}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#epk-downloads" className="cta-primary">
                Download Current EPK
              </Link>
              <Link href="/music" className="cta-secondary">
                Official Releases
              </Link>
            </div>
          </div>
        ) : null}
      </section>

      <div className="site-container">
        <div
          className="mt-12 h-px"
          style={{ background: "rgba(200,168,126,0.08)" }}
        />
      </div>

      <section className="reveal site-container mt-24" id="epk-downloads">
        <p className="text-muted mb-8" style={labelStyle}>
          Electronic Press Kit
        </p>
        <div
          className="max-w-4xl p-10 md:p-14"
          style={{
            background: "rgba(200,168,126,0.03)",
            border: "1px solid rgba(200,168,126,0.1)"
          }}
        >
          <p
            className="text-accent mb-3"
            style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}
          >
            Current Official Edition
          </p>
          <h2
            className="text-primary mb-5"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.02
            }}
          >
            {currentEpk?.title ?? "Current Official EPK"}
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "44rem" }}
          >
            {currentEpk?.description ??
              "Current official press kit with biography, release context, press imagery, and contact information."}
          </p>
          <a
            href={currentEpk?.url ?? "/assets/dama-venus/docs/dama-venus-epk.pdf"}
            download
            className="mt-9 ghost-btn ghost-btn--lg no-underline inline-block"
          >
            Download Current EPK
          </a>
        </div>
      </section>
    </div>
  );
}
