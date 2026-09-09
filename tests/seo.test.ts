import assert from "node:assert/strict";
import test from "node:test";
import { cars, getCar } from "../src/data/site";
import { contentRoutes, carPages, carVersions, siteUrl } from "../src/data/content";
import { pageMetadata, carSchema, siteSchema } from "../src/data/seo";
import sitemap from "../src/app/sitemap";
import { analyticsEnabled, createAnalytics, safeReferrer } from "../src/lib/analytics";

test("published content has unique canonical URLs, truthful dates and no orphan editorial links", () => {
  const routes = contentRoutes.map((route) => route.path);
  assert.equal(routes.length, 12);
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

test("advisor and showroom retain separate identities and telephone numbers", () => {
  const graph = JSON.parse(JSON.stringify(siteSchema))["@graph"];
  const advisor = graph.find((node: { "@type": string }) => node["@type"] === "Person");
  const business = graph.find((node: { "@type": string }) => node["@type"] === "AutoDealer");
  const service = graph.find((node: { "@type": string }) => node["@type"] === "Service");
  assert.notEqual(advisor.telephone, business.telephone);
  assert.equal(advisor.worksFor["@id"], business["@id"]);
  assert.equal(service.provider["@id"], advisor["@id"]);
  assert.equal(service.areaServed.name, "台灣");
  assert.equal(business.areaServed, undefined);
});

test("analytics allowlists production, page paths, events and labels without leaking customer input", () => {
  assert.equal(analyticsEnabled("localhost", "G-TEST123", true), false);
  assert.equal(analyticsEnabled("preview.vercel.app", "G-TEST123", true), false);
  assert.equal(analyticsEnabled("suzuki-taipei.com", "G-TEST123", false), false);
  assert.equal(analyticsEnabled("suzuki-taipei.com", "", true), false);
  assert.equal(analyticsEnabled("suzuki-taipei.com", "G-TEST123", true), true);
  const calls: { name: string; payload: Record<string, string> }[] = [];
  const analytics = createAnalytics((name, payload) => calls.push({ name, payload }), "https://www.google.com/search?q=private-name");
  analytics.page("/?contact=0900000000#private");
  analytics.page("/#contact");
  analytics.event("line_click", "0900000000", "private-name");
  analytics.page("/cars/swift");
  analytics.page("/cars/swift#photos");
  analytics.lead("private-receipt", "swift");
  analytics.lead("private-receipt", "swift");
  analytics.page("/unknown/private-name");
  analytics.event("phone_click");
  assert.equal(calls.filter((call) => call.name === "page_view").length, 2);
  assert.equal(calls.filter((call) => call.name === "generate_lead").length, 1);
  assert.equal(calls.filter((call) => call.name === "phone_click").length, 0);
  assert.equal(calls[1].payload.car_id, "unspecified");
  assert.equal(calls[1].payload.entry, "content");
  assert.equal(calls[2].payload.page_referrer, siteUrl + "/");
  assert.doesNotMatch(JSON.stringify(calls), /0900000000|private/);
  assert.equal(safeReferrer("javascript:alert(1)"), "");
});

test("navigation back records a view, and analytics outages do not throw or repeat receipt events", () => {
  const calls: string[] = [];
  const analytics = createAnalytics((name) => { calls.push(name); if (name === "generate_lead") throw new Error("blocked"); });
  analytics.page("/"); analytics.page("/cars/jimny"); analytics.page("/");
  assert.doesNotThrow(() => { analytics.lead("receipt", "jimny"); analytics.lead("receipt", "jimny"); });
  assert.deepEqual(calls, ["page_view", "page_view", "page_view", "generate_lead"]);
});
