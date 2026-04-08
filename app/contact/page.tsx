import type { Metadata } from "next";
import { contactContent } from "@/content/data/contact.data";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: { absolute: "Contact | Dama Venus" },
  description: "Send booking, press, or collaboration inquiries to Dama Venus via the official contact channel.",
  openGraph: {
    title: "Contact | Dama Venus",
    description: "Send booking, press, or collaboration inquiries to Dama Venus via the official contact channel.",
    url: "/contact",
    images: [{ url: "/og-default.svg" }]
  },
  twitter: {
    title: "Contact | Dama Venus",
    description: "Send booking, press, or collaboration inquiries to Dama Venus via the official contact channel.",
    images: ["/og-default.svg"]
  },
  alternates: {
    canonical: "/contact"
  }
};

const labelStyle = {
  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const
};

export default function ContactPage() {
  return (
    <div className="site-container py-16 pb-28">
      <section className="section-stack-md max-w-2xl">

        <header className="space-y-4">
          <p className="text-accent" style={labelStyle}>Inquiries</p>
          <h1
            className="text-primary"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
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
        </header>

        <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

        <ContactForm />

        {contactContent.alternatePaths.length ? (
          <section className="space-y-4" aria-label="Alternative contact options">
            <p className="text-muted" style={labelStyle}>Alternative Contact</p>
            <div className="space-y-4">
              {contactContent.alternatePaths.map((path) => (
                <div key={path.id}>
                  {path.href ? (
                    <a href={path.href} className="text-offWhite underline underline-offset-4">
                      {path.label}
                    </a>
                  ) : path.email ? (
                    <a href={`mailto:${path.email}`} className="text-offWhite underline underline-offset-4">
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
        ) : null}

      </section>
    </div>
  );
}
