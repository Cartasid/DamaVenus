import { pressContent, pressMaterials } from "@/content/data/press.data";
import { assetMap } from "@/content/data/site.config";

export default function PressPage() {
  return (
    <section className="space-y-3">
      <h1 className="font-display text-3xl font-bold">{pressContent.headline}</h1>
      <p className="text-muted">{pressContent.subhead}</p>
      <ul className="space-y-2">
        {pressMaterials.map((item) => (
          <li key={item.id} className="text-muted">
            {item.title} — {assetMap[item.asset.id]?.src}
          </li>
        ))}
      </ul>
    </section>
  );
}
