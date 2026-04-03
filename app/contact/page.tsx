import { contactContent } from "@/content/data/contact.data";

export default function ContactPage() {
  return (
    <section className="space-y-3">
      <h1 className="font-display text-3xl font-bold">{contactContent.intro.headline}</h1>
      <p className="text-muted">{contactContent.intro.subhead}</p>
      <a href={`mailto:${contactContent.primaryContact.email}`} className="inline-block text-sm text-muted underline">
        {contactContent.form.ctaLabel}
      </a>
    </section>
  );
}
