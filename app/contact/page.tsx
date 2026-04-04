import Image from "next/image";
import { contactContent } from "@/content/data/contact.data";
import { assetMap } from "@/content/data/site.config";

export default function ContactPage() {
  const accentAsset = contactContent.accent ? assetMap[contactContent.accent.assetId] : undefined;
  const accentRole = contactContent.accent?.role ?? accentAsset?.role;
  const accentAlt = accentRole === "decorative" ? "" : contactContent.accent?.alt ?? accentAsset?.alt ?? "Contact accent";

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-bold">{contactContent.headline}</h1>
        <p className="text-muted">{contactContent.subhead}</p>
      </header>

      <form className="space-y-4" aria-label="Contact form">
        <p className="text-xs text-muted">* Pflichtfeld</p>

        <div className="space-y-1">
          <label htmlFor="name" className="text-sm">
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
          <p id="name-help" className="text-xs text-muted">
            Bitte geben Sie Ihren Namen ein.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm">
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
          <p id="email-help" className="text-xs text-muted">
            Bitte geben Sie eine gültige E-Mail-Adresse ein.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="subject" className="text-sm">
            Subject *
          </label>
          <input id="subject" name="subject" type="text" className="w-full" aria-describedby="subject-help" required />
          <p id="subject-help" className="text-xs text-muted">
            Bitte geben Sie einen Betreff ein.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className="text-sm">
            Message *
          </label>
          <textarea id="message" name="message" rows={6} className="w-full" aria-describedby="message-help" required />
          <p id="message-help" className="text-xs text-muted">
            Bitte beschreiben Sie Ihr Anliegen.
          </p>
        </div>

        <button type="submit" className="inline-block text-sm underline">
          Send Inquiry
        </button>
        <div id="contact-form-status" role="status" aria-live="polite" data-feature="contact-success-message" hidden>
          <p className="text-sm text-muted">Thanks, your inquiry has been sent successfully.</p>
        </div>
      </form>

      {contactContent.cta?.href ? (
        <section className="space-y-2" aria-label="Alternative contact options">
          <h2 className="text-sm font-semibold">Alternative Contact</h2>
          <div className="text-sm text-muted">
            <a href={contactContent.cta.href} className="underline">
              {contactContent.cta.label}
            </a>
          </div>
        </section>
      ) : null}
    </section>
  );
}
