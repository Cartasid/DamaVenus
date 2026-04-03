import { aboutContent } from "@/content/data/about.data";

export default function AboutPage() {
  return (
    <section className="space-y-3">
      <p className="text-sm uppercase tracking-wide text-muted">{aboutContent.label}</p>
      <h1 className="font-display text-3xl font-bold">{aboutContent.headline}</h1>
      {aboutContent.body?.map((line) => (
        <p key={line} className="text-muted">
          {line}
        </p>
      ))}
    </section>
  );
}
