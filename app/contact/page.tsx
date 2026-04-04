import { contactContent } from "@/content/data/contact.data";

export default function ContactPage() {
  return (
    <section className="section-stack-md">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-bold">{contactContent.intro.headline}</h1>
        <p className="text-muted">{contactContent.intro.subhead}</p>
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

        <button type="submit" className="cta-primary">
          {contactContent.form.ctaLabel}
        </button>
        <div id="contact-form-status" role="status" aria-live="polite" data-feature="contact-success-message" hidden>
          <p className="text-sm text-muted">Thanks, your inquiry has been sent successfully.</p>
        </div>
      </form>

      {contactContent.cta?.href ? (
        <section className="space-y-2" aria-label="Alternative contact options">
          <h2 className="text-sm font-semibold">Alternative Contact</h2>
          <div className="text-sm text-muted">
            <a href={contactContent.cta.href} className="text-link">
              {contactContent.cta.label}
            </a>
          </div>
        </section>
      ) : null}
    </section>
  );
}
