import { contactContent } from "@/content/data/contact.data";

export default function ContactPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-bold">{contactContent.intro.headline}</h1>
        <p className="text-muted">{contactContent.intro.subhead}</p>
      </header>

      <section className="space-y-2" aria-label="Primary contact path">
        <h2 className="text-sm font-semibold">{contactContent.primaryContact.label}</h2>
        <a href={`mailto:${contactContent.primaryContact.email}`} className="text-sm underline">
          {contactContent.primaryContact.email}
        </a>
      </section>

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
                className="w-full"
              />
            ) : (
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full"
              />
            )}
            <p className="text-xs text-muted">{field.helperText}</p>
          </div>
        ))}

        <button type="submit" className="inline-block text-sm underline">
          {contactContent.form.ctaLabel}
        </button>
      </form>

      <div aria-live="polite" data-feature="contact-success-message" hidden>
        <h2 className="text-sm font-semibold">{contactContent.form.success.title}</h2>
        <p className="text-sm text-muted">{contactContent.form.success.message}</p>
      </div>

      <section className="space-y-2" aria-label="Alternative contact options">
        <h2 className="text-sm font-semibold">Alternative Contact</h2>
        <ul className="space-y-2 text-sm text-muted">
          {contactContent.alternatePaths.map((path) => (
            <li key={path.id} className="space-y-1">
              <p className="font-medium text-foreground">{path.label}</p>
              {path.href ? (
                <a href={path.href} className="underline">
                  {path.href}
                </a>
              ) : null}
              {path.email ? (
                <a href={`mailto:${path.email}`} className="underline">
                  {path.email}
                </a>
              ) : null}
              <p>{path.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
