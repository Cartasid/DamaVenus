import { visualsContent } from "@/content/data/visuals.data";
import { assetMap } from "@/content/data/site.config";

export default function VisualsPage() {
  const visualAsset = visualsContent.asset ? assetMap[visualsContent.asset.id] : undefined;

  return (
    <section className="space-y-3">
      <h1 className="font-display text-3xl font-bold">{visualsContent.headline}</h1>
      <p className="text-muted">{visualsContent.subhead}</p>
      <p className="text-xs text-muted">Asset: {visualAsset?.src}</p>
    </section>
  );
}
