import type { MetadataRoute } from "next";
import { contentRoutes, siteUrl } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return contentRoutes.map((route) => ({ url: new URL(route.path, siteUrl).toString(), lastModified: route.updatedAt }));
}
