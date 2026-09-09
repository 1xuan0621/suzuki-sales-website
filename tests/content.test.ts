import assert from "node:assert/strict";
import test from "node:test";
import { contentRoutes } from "../src/data/content";
import { firstCarGuide, guides, getGuide, guideRedirects } from "../src/data/guides";
import { carFaqs, featuredCarFaqs, generalFaqGroups } from "../src/data/faq";
import { contentSources } from "../src/data/content-sources";
import type { CarId } from "../src/data/site";

const generalItems = generalFaqGroups.flatMap((group) => group.items);
const allItems = [...generalItems, ...Object.values(carFaqs).flat()];

function assertDestination(href: string) {
  const [path, hash] = href.split("#");
  assert.ok(contentRoutes.some((route) => route.path === path), `Missing page: ${href}`);
  if (!hash || path === "/") return;
  if (path === "/guides") {
    assert.ok(firstCarGuide.sections.some((section) => section.id === hash), `Missing guide section: ${href}`);
    return;
  }
  if (path.startsWith("/guides/")) {
    assert.ok(getGuide(path.split("/")[2])?.sections.some((section) => section.id === hash), `Missing guide section: ${href}`);
    return;
  }
  const items = path === "/faq" ? generalItems : carFaqs[path.split("/")[2] as CarId];
  assert.ok(hash === "faq" || items?.some((item) => item.id === hash), `Missing answer: ${href}`);
}

test("guide migrations have existing destinations and keep model topics out of the guide list", () => {
  for (const redirect of guideRedirects) {
    assert.equal(redirect.permanent, true);
    assert.ok(!contentRoutes.some((route) => route.path === redirect.source));
    assertDestination(redirect.destination);
  }
  for (const guide of guides) {
    assertDestination(`/guides/${guide.slug}`);
    assert.equal(new Set(guide.sections.map((section) => section.id)).size, guide.sections.length);
    for (const source of guide.sourceIds) assert.ok(contentSources[source]);
    for (const section of guide.sections) if (section.link) assertDestination(section.link.href);
  }
});

test("FAQ cross references resolve to the owning page and featured answers use existing car entries", () => {
  assert.equal(new Set(allItems.map((item) => item.id)).size, allItems.length);
  for (const entry of featuredCarFaqs) assert.ok(carFaqs[entry.carId].some((item) => item.id === entry.faqId));
  for (const item of allItems) {
    for (const link of item.links || []) assertDestination(link.href);
    for (const source of item.sourceIds) assert.equal(new URL(contentSources[source].url).protocol, "https:");
  }
});
