import type { Metadata } from "next";
import Image from "next/image";
import ImageReveal from "@/components/utils/image-reveal";
import { contactContent } from "@/content/data/contact.data";
import { assetMap } from "@/content/data/site.config";
import { ContactForm } from "./ContactForm";

const CONTACT_MOOD_ASSET = assetMap["home-contact-newsletter"];
const CONTACT_MOOD_IMAGE =
  CONTACT_MOOD_ASSET?.src ??
  "/assets/dama-venus/home/dv_home_release_cover_primary_color_4x5_v01.jpg";
const CONTACT_MOOD_ALT = CONTACT_MOOD_ASSET?.alt || "Dáma Venus — editorial portrait";

export const metadata: Metadata = {
  title: { absolute: "Strategic Access | Dáma Venus — IP Licensing & Partnerships" },
  description:
    "Access Dáma Venus for intellectual property licensing, strategic architectural partnerships, performance opportunities, and the 2027 Performance Framework.",
  openGraph: {
    title: "Strategic Access | Dáma Venus",
    description:
      "Intellectual property licensing, strategic architectural partnerships, performance opportunities, and 2027 Performance Framework access.",
    url: "/contact",
    images: [{ url: "/og-contact.png" }]
  },
  twitter: {
    title: "Strategic Access | Dáma Venus",
    description:
      "Intellectual property licensing, strategic architectural partnerships, performance opportunities, and 2027 Performance Framework access.",
    images: ["/og-contact.png"]
  },
  alternates: {
    canonical: "/contact"
  }
};

const labelStyle = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const
};

export default function ContactPage() {
  return (
    <div className="site-container py-24 pb-36">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ImageReveal
          className="relative hidden w-full self-start overflow-hidden lg:block"
          style={{ aspectRatio: "9 / 16" }}
          lightboxSrc={CONTACT_MOOD_IMAGE}
          lightboxAlt={CONTACT_MOOD_ALT}
        >
          <Image
            src={CONTACT_MOOD_IMAGE}
            alt={CONTACT_MOOD_ALT}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-contain"
            style={{ objectPosition: CONTACT_MOOD_ASSET?.objectPosition ?? "center center" }}
          />
        </ImageReveal>

        <section className="section-stack-md max-w-2xl">
          <header className="space-y-4">
            <h1 className="sr-only">Strategic Access — Dáma Venus</h1>
            <p
              className="text-accent"
              style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}
            >
              Strategic Access
            </p>
            <p
              role="doc-subtitle"
              className="text-primary"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 0.95
              }}
            >
              {contactContent.intro.headline}
            </p>
            <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>
              {contactContent.intro.subhead}
            </p>
            <div
              className="h-px"
              style={{ background: "rgba(200,168,126,0.2)", width: "40px" }}
            />
          </header>

          <div className="h-px" style={{ background: "rgba(200,168,126,0.08)" }} />

          <ContactForm />
        </section>
      </div>
    </div>
  );
}
