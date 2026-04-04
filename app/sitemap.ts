import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/content/data/site.config";

const siteUrl = resolveSiteUrl();

const routes = ["", "/music", "/visuals", "/about", "/press", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));
}
