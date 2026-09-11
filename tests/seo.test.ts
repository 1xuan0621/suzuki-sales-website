import assert from "node:assert/strict";
import test from "node:test";
import { cars, getCar } from "../src/data/site";
import { contentRoutes, carPages, carVersions, siteUrl } from "../src/data/content";
import { pageMetadata, carSchema } from "../src/data/seo";
import sitemap from "../src/app/sitemap";

test("published content has unique canonical URLs, consistent prices and no orphan car links", () => {
  const routes = contentRoutes.map((route) => route.path);
  assert.equal(new Set(routes).size, routes.length);
  assert.equal(getCar("unknown"), undefined);
  for (const car of cars) {
    for (const id of carPages[car.id].relatedCars) assert.ok(getCar(id));
    assert.equal(Math.min(...carVersions(car.id).map((version) => version.priceTwd)), Number(car.price.replace(/[^0-9.]/g, "")) * 10000);
    const schema = carSchema(car)["@graph"][0];
    assert.ok("offers" in schema);
    assert.deepEqual(schema.offers.map((offer) => offer.price), carVersions(car.id).map((version) => version.priceTwd));
  }
  for (const route of contentRoutes) {
    const metadata = pageMetadata(route.path, route.title, "description");
    assert.equal(metadata.alternates?.canonical, siteUrl + route.path);
    assert.equal(metadata.openGraph?.url, siteUrl + route.path);
  }
  assert.deepEqual(sitemap(), contentRoutes.map((route) => ({ url: siteUrl + route.path, lastModified: route.updatedAt })));
});
