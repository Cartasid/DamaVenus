import Image from "next/image";
import { contactContent } from "@/content/data/contact.data";
import { assetMap } from "@/content/data/site.config";

export default function ContactPage() {
  const accentAsset = contactContent.accent ? assetMap[contactContent.accent.assetId] : undefined;
  const accentRole = contactContent.accent?.role ?? accentAsset?.role;
  const accentAlt = accentRole === "decorative" ? "" : contactContent.accent?.alt ?? accentAsset?.alt ?? "Contact accent";

  return (
    <section className="space-y-3">
      <h1 className="font-display text-3xl font-bold">{contactContent.intro.headline}</h1>
      <p className="text-muted">{contactContent.intro.subhead}</p>
      <a href={`mailto:${contactContent.primaryContact.email}`} className="inline-block text-sm text-muted underline">
        {contactContent.form.ctaLabel}
      </a>
      {accentAsset ? (
        <div className="relative mt-2 aspect-[21/6] max-w-xs overflow-hidden rounded-md border border-white/10 opacity-70" aria-hidden={accentRole === "decorative"}>
          <Image src={accentAsset.src} alt={accentAlt} fill className="object-cover" sizes="(min-width: 768px) 320px, 60vw" />
        </div>
      ) : null}
    </section>
  );
}
