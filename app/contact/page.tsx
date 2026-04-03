import { contactContent } from "@/content/data/contact.data";

export default function ContactPage() {
  return (
    <section className="space-y-3">
      <h1 className="font-display text-3xl font-bold">{contactContent.headline}</h1>
      <p className="text-muted">{contactContent.subhead}</p>
      <a href={contactContent.cta?.href} className="inline-block text-sm text-muted underline">
        {contactContent.cta?.label}
      </a>
    </section>
  );
}
