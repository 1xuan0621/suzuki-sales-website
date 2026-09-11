import { test, expect } from "@playwright/test";
import { contentRoutes, siteUrl } from "../../src/data/content";

test("all content is directly readable, has its own metadata and matches the sitemap", async ({ request }) => {
  for (const route of contentRoutes) {
    const response = await request.get(route.path);
    expect(response.status(), route.path).toBe(200);
    const html = await response.text();
    expect(html.match(/<h1[\s>]/g)?.length, route.path).toBe(1);
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*>/g) || [];
    expect(canonical, route.path).toHaveLength(1);
    expect(new URL((canonical[0] || "").match(/href="([^"]+)"/)![1]).href).toBe(siteUrl + route.path);
    expect(html).toContain(`<title>${route.title}</title>`);
    expect(new URL(html.match(/property="og:url" content="([^"]+)"/)![1]).href).toBe(siteUrl + route.path);
    expect(html).not.toMatch(/<meta[^>]*name="robots"[^>]*noindex/);
    expect(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")).not.toContain("2026 年 9 月購車禮遇");
    if (route.path.startsWith("/cars/")) {
      expect(html).toContain("車型常見 QA");
      expect(html).toContain("官方規配表（PDF）");
    }
  }
  for (const path of ["/cars/unknown", "/guides/unknown", "/visit/unknown"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<loc>/g)).toHaveLength(contentRoutes.length);
  expect(xml).not.toMatch(/<priority>|<changefreq>/);
  for (const route of contentRoutes) expect(xml).toContain(`<loc>${siteUrl}${route.path}</loc>`);
});
