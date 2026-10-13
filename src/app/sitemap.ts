import type { MetadataRoute } from "next";
import { contentRoutes, siteUrl } from "@/data/content";
import { localizedRoutes, languagePaths } from "@/data/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...contentRoutes, ...localizedRoutes].map((route) => {
    const paths = languagePaths(route.path);
    return {
      url: new URL(route.path, siteUrl).toString(), lastModified: route.updatedAt,
      ...(paths ? { alternates: { languages: Object.fromEntries(Object.entries(paths).map(([locale, path]) => [locale, new URL(path, siteUrl).toString()])) } } : {}),
    };
  });
}
