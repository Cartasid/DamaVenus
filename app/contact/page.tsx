import type { Metadata } from "next";
import Image from "next/image";
import ImageReveal from "@/components/utils/image-reveal";
import { contactContent } from "@/content/data/contact.data";
import { ContactForm } from "./ContactForm";

const CONTACT_MOOD_IMAGE = "/assets/dama-venus/music/dv_music_current_chapter_cover_color_4x5_v01.jpg";

export const metadata: Metadata = {
  title: { absolute: "Contact & Bookings | Dáma Venus — Collaborations & Inquiries" },
  description: "Book Dáma Venus for live performances, music collaborations, film projects, and brand partnerships. Send your inquiry via the official contact form.",
  openGraph: {
    title: "Contact & Bookings | Dáma Venus",
    description: "Book Dáma Venus for performances, collaborations, film projects, and brand partnerships.",
    url: "/contact",
    images: [{ url: "/og-default.png" }]
  },
  twitter: {
    title: "Contact & Bookings | Dáma Venus",
    description: "Book Dáma Venus for performances, collaborations, film projects, and brand partnerships.",
    images: ["/og-default.png"]
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

        {/* Mood Image */}
        <ImageReveal
          className="relative hidden lg:block overflow-hidden"
          style={{ minHeight: "600px" }}
          lightboxSrc={CONTACT_MOOD_IMAGE}
          lightboxAlt="Dáma Venus — editorial portrait"
        >
          <Image
            src={CONTACT_MOOD_IMAGE}
            alt="Dáma Venus — editorial portrait"
            fill
            loading="lazy"
            sizes="40vw"
            className="object-cover"
            style={{ objectPosition: "center center" }}
          />
        </ImageReveal>

      <section className="section-stack-md max-w-2xl">

        <header className="space-y-4">
          <p className="text-accent" style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}>Inquiries</p>
          <h1
            className="text-primary"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 0.95
            }}
          >
            {contactContent.intro.headline}
          </h1>
          <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>
            {contactContent.intro.subhead}
          </p>
          <div className="h-px" style={{ background: "rgba(200,168,126,0.2)", width: "40px" }} />
        </header>

        <div className="h-px" style={{ background: "rgba(200,168,126,0.08)" }} />

        <ContactForm />

        {contactContent.alternatePaths.length ? (
          <>
            <div className="h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
            <section className="space-y-4" aria-label="Alternative contact options">
              <p className="text-muted" style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}>Alternative Contact</p>
              <div className="space-y-4">
                {contactContent.alternatePaths.map((path) => (
                  <div key={path.id}>
                    {path.href ? (
                      <a href={path.href} className="text-offWhite underline underline-offset-4" style={{ textDecorationColor: "rgba(200,168,126,0.6)" }}>
                        {path.label}
                      </a>
                    ) : path.email ? (
                      <a href={`mailto:${path.email}`} className="text-offWhite underline underline-offset-4" style={{ textDecorationColor: "rgba(200,168,126,0.6)" }}>
                        {path.label}
                      </a>
                    ) : (
                      <span className="text-offWhite">{path.label}</span>
                    )}
                    <p className="mt-1 text-muted" style={{ fontSize: "0.8rem" }}>{path.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}

      </section>
      </div>
    </div>
  );
}
