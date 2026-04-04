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

export default function ContactPage() {
  return (
    <section className="section-stack-md">
      <header className="space-y-3">
        <h1 className="typo-h1 font-bold">{contactContent.intro.headline}</h1>
        <p className="typo-body-m max-w-2xl">{contactContent.intro.subhead}</p>
      </header>

      <ContactForm />


      {contactContent.alternatePaths.length ? (
        <section className="space-y-2" aria-label="Alternative contact options">
          <h2 className="typo-label text-primary">Alternative Contact</h2>
          <div className="space-y-2 typo-body-m">
            {contactContent.alternatePaths.map((path) => (
              <div key={path.id}>
                {path.href ? (
                  <a href={path.href} className="underline">
                    {path.label}
                  </a>
                ) : path.email ? (
                  <a href={`mailto:${path.email}`} className="underline">
                    {path.label}
                  </a>
                ) : (
                  <span>{path.label}</span>
                )}
                <p className="typo-body-s">{path.note}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
