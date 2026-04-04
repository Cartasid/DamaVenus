import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/data/site.config";

const routes = ["", "/music", "/visuals", "/about", "/press", "/contact", "/privacy", "/imprint"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date()
  }));
}
