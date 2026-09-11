import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/content/data/site.config";

const siteUrl = resolveSiteUrl();

const routes = [
  "",
  "/music",
  "/visuals",
  "/about",
  "/press",
  "/contact",
  "/privacy",
  "/imprint"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path}`
  }));
}
