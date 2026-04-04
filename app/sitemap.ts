import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/data/site.config";

const routes = ["", "/music", "/visuals", "/about", "/press", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date()
  }));
}
