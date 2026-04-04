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
        {contactContent.form.fields.map((field) => (
          <div key={field.id} className="space-y-1">
            <label htmlFor={field.id} className="text-sm">
              {field.label}
              {field.required ? " *" : ""}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.name}
                rows={6}
                required={field.required}
                placeholder={field.placeholder}
                aria-describedby={`${field.id}-help`}
                className="w-full"
              />
            ) : (
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                autoComplete={field.type === "email" ? "email" : "name"}
                aria-describedby={`${field.id}-help`}
                className="w-full"
              />
            )}
            <p id={`${field.id}-help`} className="text-xs text-muted">
              {field.helperText}
            </p>
          </div>
        ))}

        <button type="submit" className="inline-block text-sm underline">
          {contactContent.form.ctaLabel}
        </button>
      </form>

      <div aria-live="polite" data-feature="contact-success-message" hidden>
        <p className="text-sm text-muted">Thanks, your inquiry has been sent successfully.</p>
      </div>

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
