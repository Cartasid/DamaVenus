import type { Metadata } from "next";
import Image from "next/image";
import { assetMap } from "@/content/data/site.config";

const HERO_ASSET = assetMap["shop-natuerlich-hero"];
const DETAIL_ASSET = assetMap["shop-natuerlich-detail"];
const ECO_BAG_ASSET = assetMap["shop-natuerlich-eco-bag"];
const FALLBACK_IMAGE = "/og-default.png";

export const metadata: Metadata = {
  title: { absolute: "Natürlich by Dama Venus | Hairbrush & Eco Bag" },
  description:
    "Natürlich by Dama Venus — the Pink Glitter Dream hairbrush and Natürlich Eco Bag. Signature accessories for your everyday rituals. Currently sold out.",
  openGraph: {
    title: "Natürlich by Dama Venus",
    description: "Pink Glitter Dream hairbrush and Natürlich Eco Bag — signature accessories for your everyday rituals. Currently sold out.",
    url: "/natuerlich",
    images: [{ url: HERO_ASSET?.src ?? FALLBACK_IMAGE }]
  },
  twitter: {
    title: "Natürlich by Dama Venus",
    description: "Pink Glitter Dream hairbrush and Natürlich Eco Bag — signature accessories for your everyday rituals. Currently sold out.",
    images: [HERO_ASSET?.src ?? FALLBACK_IMAGE]
  },
  alternates: { canonical: "/natuerlich" }
};

const labelStyle = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const
};

export default function NatuerlichPage() {
  return (
    <div className="site-container py-16 pb-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "1 / 1", background: "#0a0a0a" }}
          >
            <Image
              src={HERO_ASSET?.src ?? FALLBACK_IMAGE}
              alt={HERO_ASSET?.alt ?? "Natürlich by Dama Venus — pink glitter hairbrush"}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: HERO_ASSET?.objectPosition ?? "center center" }}
            />
            <div
              className="absolute inset-x-0 top-0 z-10 flex justify-center py-3"
              style={{
                background: "rgba(8,8,8,0.4)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderBottom: "1px solid rgba(220,14,109,0.4)"
              }}
            >
              <span
                style={{
                  ...labelStyle,
                  fontSize: "0.78rem",
                  letterSpacing: "0.4em",
                  color: "#fff"
                }}
              >
                Sold Out
              </span>
            </div>
          </div>

          <div
            className="relative mt-4 overflow-hidden"
            style={{ aspectRatio: "4 / 5", background: "#0a0a0a" }}
          >
            <Image
              src={DETAIL_ASSET?.src ?? FALLBACK_IMAGE}
              alt={DETAIL_ASSET?.alt ?? "Natürlich by Dama Venus — hairbrush front and back detail"}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: DETAIL_ASSET?.objectPosition ?? "center center" }}
            />
          </div>
        </div>

        <div className="max-w-xl lg:pt-4">
          <p style={{ ...labelStyle, color: "#f0569e" }}>♥ Limited Edition</p>

          <h1
            className="mt-4 text-primary"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
              fontWeight: 300,
              lineHeight: 1.02
            }}
          >
            Natürlich <span style={{ fontStyle: "italic" }}>by Dama Venus</span>
          </h1>

          <p
            className="mt-5"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.25rem, 2.4vw, 1.6rem)",
              color: "#f0569e",
              lineHeight: 1.3
            }}
          >
            Pink Glitter Dream
          </p>

          <p className="mt-3 text-muted" style={{ fontSize: "1rem", lineHeight: 1.8, maxWidth: "34rem" }}>
            The secret of those born for the top. An accessory of magnetism. Your glow attracts what
            you desire.
          </p>

          <p className="mt-5 text-muted" style={{ fontSize: "0.92rem", lineHeight: 1.8, maxWidth: "34rem" }}>
            A hand-finished detangling brush in signature magenta glitter, with cushioned pins and a
            mirror-gloss handle carrying the ♥ Natürlich crest — presented in its own gift box.
          </p>

          <div
            className="mt-6 h-px"
            style={{ background: "rgba(220,14,109,0.25)", width: "40px" }}
          />

          <div className="mt-8 flex items-center gap-6">
            <span
              className="text-primary"
              style={{ fontFamily: "var(--font-bodoni), Georgia, serif", fontSize: "1.9rem", fontWeight: 400 }}
            >
              &euro;19.99
            </span>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="cta-primary"
              style={{
                background: "linear-gradient(135deg, #dc0e6d, #f0569e)",
                opacity: 0.45,
                filter: "grayscale(0.6)",
                pointerEvents: "none"
              }}
              title="Currently sold out"
            >
              Buy Now
            </button>
          </div>

          <p className="mt-4" style={{ ...labelStyle, color: "rgba(245,240,235,0.4)" }}>
            Currently sold out — next drop announced via Contact.
          </p>
        </div>
      </div>
      <section
        id="eco-bag"
        aria-labelledby="eco-bag-title"
        className="mt-24 grid gap-12 border-t pt-16 lg:grid-cols-2 lg:gap-16"
        style={{ borderColor: "rgba(220,14,109,0.25)" }}
      >
        <div
          className="relative aspect-[2/3] overflow-hidden"
          style={{ background: "#0a0a0a" }}
        >
          <Image
            src={ECO_BAG_ASSET?.src ?? FALLBACK_IMAGE}
            alt={ECO_BAG_ASSET?.alt ?? "Natürlich Eco Bag — Dáma Venus signature tote"}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
          <div
            className="absolute inset-x-0 top-0 z-10 flex justify-center py-3"
            style={{
              background: "rgba(8,8,8,0.4)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderBottom: "1px solid rgba(220,14,109,0.4)"
            }}
          >
            <span
              style={{ ...labelStyle, fontSize: "0.78rem", letterSpacing: "0.4em", color: "#fff" }}
            >
              Sold Out
            </span>
          </div>
        </div>

        <div className="max-w-xl lg:pt-4">
          <p style={{ ...labelStyle, color: "#f0569e" }}>♥ Everyday Essential</p>
          <h2
            id="eco-bag-title"
            className="mt-4 text-primary"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
              fontWeight: 300,
              lineHeight: 1.02
            }}
          >
            Natürlich Eco Bag
          </h2>
          <p
            className="mt-5"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.25rem, 2.4vw, 1.6rem)",
              color: "#f0569e",
              lineHeight: 1.3
            }}
          >
            Your everyday carry, with a touch of Venus.
          </p>
          <p className="mt-3 text-muted" style={{ fontSize: "1rem", lineHeight: 1.8, maxWidth: "34rem" }}>
            From daily errands to your next creative chapter — bring a little Natürlich wherever you go.
          </p>
          <p className="mt-5 text-muted" style={{ fontSize: "0.92rem", lineHeight: 1.8, maxWidth: "34rem" }}>
            A reusable tote with the Dáma Venus ♥ Natürlich signature. Made for your everyday essentials
            and the moments in between.
          </p>
          <p className="mt-5 text-muted" style={{ fontSize: "0.92rem", lineHeight: 1.8, maxWidth: "34rem" }}>
            100% of the sales revenue from the Natürlich Eco Bag is donated to{" "}
            <a
              href="https://www.suipa.org.br/index.asp?pg=donations.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              aria-label="SUIPA donation page (opens in new tab)"
            >
              SUIPA
            </a>
            , supporting animal protection and care.
          </p>
          <div className="mt-6 h-px" style={{ background: "rgba(220,14,109,0.25)", width: "40px" }} />
          <div className="mt-8 flex items-center gap-6">
            <span
              className="text-primary"
              style={{ fontFamily: "var(--font-bodoni), Georgia, serif", fontSize: "1.9rem", fontWeight: 400 }}
            >
              &euro;5.00
            </span>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="cta-primary"
              style={{
                background: "linear-gradient(135deg, #dc0e6d, #f0569e)",
                opacity: 0.45,
                filter: "grayscale(0.6)",
                pointerEvents: "none"
              }}
              title="Currently sold out"
            >
              Buy Now
            </button>
          </div>
          <p className="mt-4" style={{ ...labelStyle, color: "rgba(245,240,235,0.4)" }}>
            Currently sold out.
          </p>
        </div>
      </section>
    </div>
  );
}
