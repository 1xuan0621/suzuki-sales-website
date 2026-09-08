import assert from "node:assert/strict";
import test from "node:test";
import { contentRoutes } from "../src/data/content";
import { guides, guideRedirects, getGuide } from "../src/data/guides";
import { carFaqs, featuredCarFaqs, generalFaqGroups } from "../src/data/faq";
import { contentSources } from "../src/data/content-sources";
import type { CarId } from "../src/data/site";

const generalItems = generalFaqGroups.flatMap((group) => group.items);
const allItems = [...generalItems, ...Object.values(carFaqs).flat()];

function assertDestination(href: string) {
  const [path, hash] = href.split("#");
  assert.ok(contentRoutes.some((route) => route.path === path), `Missing page: ${href}`);
  if (!hash || path === "/") return;
  const items = path === "/faq" ? generalItems : carFaqs[path.split("/")[2] as CarId];
  assert.ok(hash === "faq" || items?.some((item) => item.id === hash), `Missing answer: ${href}`);
}

test("guide migrations have existing destinations and keep model topics out of the guide list", () => {
  for (const redirect of guideRedirects) {
    assert.equal(redirect.permanent, true);
    assert.ok(!contentRoutes.some((route) => route.path === redirect.source));
    assertDestination(redirect.destination);
  }
  assert.equal(getGuide("vitara-vs-s-cross"), undefined);
  assert.equal(getGuide("e-vitara-charging"), undefined);
  for (const guide of guides) {
    for (const slug of guide.relatedSlugs) assert.ok(getGuide(slug), slug);
    for (const id of guide.faqIds) assert.ok(generalItems.some((item) => item.id === id), id);
    assert.ok(guide.sourceIds.length > 0);
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
