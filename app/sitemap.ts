import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/content/data/site.config";

const siteUrl = resolveSiteUrl();

const routes: Array<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }> = [
  { path: "",          priority: 1.0, changeFrequency: "weekly" },
  { path: "/music",    priority: 0.9, changeFrequency: "weekly" },
  { path: "/visuals",  priority: 0.8, changeFrequency: "weekly" },
  { path: "/about",    priority: 0.8, changeFrequency: "monthly" },
  { path: "/press",    priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact",  priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy",  priority: 0.2, changeFrequency: "monthly" },
  { path: "/imprint",  priority: 0.2, changeFrequency: "monthly" }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    priority: route.priority,
    changeFrequency: route.changeFrequency
  }));
}
