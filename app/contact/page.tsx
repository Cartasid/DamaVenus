import type { Metadata } from "next";
import { contactContent } from "@/content/data/contact.data";

export const metadata: Metadata = {
  title: { absolute: "Contact | Dama Venus" },
  description: "Send booking, press, or collaboration inquiries to Dama Venus via the official contact channel.",
  openGraph: {
    title: "Contact | Dama Venus",
    description: "Send booking, press, or collaboration inquiries to Dama Venus via the official contact channel.",
    url: "/contact"
  },
  twitter: {
    title: "Contact | Dama Venus",
    description: "Send booking, press, or collaboration inquiries to Dama Venus via the official contact channel."
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

        {contactContent.form.fields.map((field) => {
          const helperId = `${field.id}-help`;
          const isRequired = field.required ? " *" : "";

          return (
            <div className="space-y-1" key={field.id}>
              <label htmlFor={field.id} className="typo-body-s">
                {field.label}
                {isRequired}
              </label>

              {field.type === "textarea" ? (
                <textarea id={field.id} name={field.name} rows={6} className="w-full" aria-describedby={helperId} required={field.required} />
              ) : (
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.type === "email" ? "email" : undefined}
                  className="w-full"
                  aria-describedby={helperId}
                  required={field.required}
                />
              )}

              <p id={helperId} className="typo-body-s">
                {field.helperText}
              </p>
            </div>
          );
        })}

        <button type="submit" className="cta-primary">
          {contactContent.form.ctaLabel}
        </button>
        <div id="contact-form-status" role="status" aria-live="polite" data-feature="contact-success-message" hidden>
          <p className="typo-body-m">{contactContent.form.success.title}</p>
          <p className="typo-body-s">{contactContent.form.success.message}</p>
        </div>
      </form>

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
