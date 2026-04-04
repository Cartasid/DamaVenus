import type { Metadata } from "next";
import { contactContent } from "@/content/data/contact.data";

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

      <form className="space-y-4" aria-label="Contact form">
        <p className="typo-label">* Pflichtfeld</p>

        <div className="space-y-1">
          <label htmlFor="name" className="typo-body-s">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="w-full"
            aria-describedby="name-help"
            required
          />
          <p id="name-help" className="typo-body-s">
            Bitte geben Sie Ihren Namen ein.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="typo-body-s">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full"
            aria-describedby="email-help"
            required
          />
          <p id="email-help" className="typo-body-s">
            Bitte geben Sie eine gültige E-Mail-Adresse ein.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="subject" className="typo-body-s">
            Subject *
          </label>
          <input id="subject" name="subject" type="text" className="w-full" aria-describedby="subject-help" required />
          <p id="subject-help" className="typo-body-s">
            Bitte geben Sie einen Betreff ein.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className="typo-body-s">
            Message *
          </label>
          <textarea id="message" name="message" rows={6} className="w-full" aria-describedby="message-help" required />
          <p id="message-help" className="typo-body-s">
            Bitte beschreiben Sie Ihr Anliegen.
          </p>
        </div>

        <button type="submit" className="cta-primary">
          {contactContent.form.ctaLabel}
        </button>
        <div id="contact-form-status" role="status" aria-live="polite" data-feature="contact-success-message" hidden>
          <p className="typo-body-m">Thanks, your inquiry has been sent successfully.</p>
        </div>
      </form>

      {contactContent.cta?.href ? (
        <section className="space-y-2" aria-label="Alternative contact options">
          <h2 className="typo-label text-primary">Alternative Contact</h2>
          <div className="typo-body-m">
            <a href={contactContent.cta.href} className="underline">
              {contactContent.cta.label}
            </a>
          </div>
        </section>
      ) : null}
    </section>
  );
}
