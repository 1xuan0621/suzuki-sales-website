import assert from "node:assert/strict";
import test from "node:test";
import { createConsultationHandler, validateConsultation, type StoredConsultation } from "../src/lib/consultation";
import { sendDiscord, sendSpreadsheet, spreadsheetValue } from "../src/lib/consultation-delivery";
import { serializeJsonLd, siteSchema } from "../src/data/seo";
import { cars } from "../src/data/site";

const origin = "https://suzuki-taipei.com";
const payload = {
  requestId: "c92e31e1-8a75-420d-9bb2-453bcddc3da1", name: "網站功能測試", contact: "0900000000",
  car: "SWIFT", usage: "市區通勤代步", budget: "70-90 萬", website: "",
};
const record = { ...payload, receivedAt: "2026-09-08T00:00:00Z", fingerprint: "test" };
function request(value: unknown = payload, headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/notify`, {
    method: "POST", headers: { origin, "Content-Type": "application/json", ...headers }, body: JSON.stringify(value),
  });
}
function setup() {
  const records = new Map<string, StoredConsultation>();
  let deliveries = 0;
  const handle = createConsultationHandler({
    allowedOrigins: [origin],
    save: async (entry) => {
      const old = records.get(entry.requestId);
      if (old) return { created: false, record: old };
      records.set(entry.requestId, entry);
      return { created: true, record: entry };
    },
    deliver: async () => { deliveries++; },
  });
  return { handle, records, deliveries: () => deliveries };
}

test("only acknowledged durable storage produces success", async () => {
  const app = setup();
  const res = await app.handle(request());
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, receipt: payload.requestId });
  assert.equal(app.records.size, 1);
  assert.equal(app.deliveries(), 1);
  assert.equal(res.headers.get("cache-control"), "no-store");
});

test("parallel and later retries reuse one receipt and one delivery", async () => {
  const app = setup();
  const responses = await Promise.all(Array.from({ length: 5 }, () => app.handle(request())));
  assert.ok(responses.every((res) => res.status === 200));
  assert.equal(app.records.size, 1);
  assert.equal(app.deliveries(), 1);
  assert.equal((await app.handle(request())).status, 200);
  assert.equal(app.deliveries(), 1);
});

test("reusing a receipt for different content fails without replacing the original", async () => {
  const app = setup();
  await app.handle(request());
  assert.equal((await app.handle(request({ ...payload, car: "CARRY" }))).status, 409);
  assert.equal(app.records.get(payload.requestId)?.car, "SWIFT");
});

test("storage failure never reports success or sends notifications", async () => {
  let delivered = false;
  const handler = createConsultationHandler({ allowedOrigins: [origin], save: async () => { throw new Error("storage"); }, deliver: async () => { delivered = true; } });
  const res = await handler(request());
  assert.equal(res.status, 503);
  assert.equal((await res.json()).ok, false);
  assert.equal(delivered, false);
});

test("notification outage preserves the successfully stored receipt", async () => {
  let stored = false;
  const handler = createConsultationHandler({ allowedOrigins: [origin], save: async (entry) => { stored = true; return { created: true, record: entry }; }, deliver: async () => { throw new Error("notification outage"); } });
  const res = await handler(request());
  assert.equal(res.status, 200);
  assert.equal(stored, true);
  assert.equal((await res.json()).receipt, payload.requestId);
});

test("rejects untrusted origins, wrong media type, bots and malformed input before storage", async () => {
  const app = setup();
  assert.equal((await app.handle(request(payload, { origin: "https://attacker.invalid" }))).status, 403);
  assert.equal((await app.handle(request(payload, { "Content-Type": "text/plain" }))).status, 415);
  for (const patch of [{ website: "bot" }, { name: " " }, { name: "a".repeat(51) }, { contact: "123" }, { car: "unknown" }, { requestId: "../bad" }, { usage: 99 }]) {
    assert.equal((await app.handle(request({ ...payload, ...patch }))).status, 400);
  }
  assert.equal(app.records.size, 0);
  assert.equal(app.deliveries(), 0);
});

test("bounds actual body size even without a Content-Length header", async () => {
  const app = setup();
  assert.equal((await app.handle(request({ ...payload, extra: "x".repeat(5000) }))).status, 413);
  const bad = new Request(`${origin}/api/notify`, { method: "POST", headers: { origin, "Content-Type": "application/json" }, body: "{" });
  assert.equal((await app.handle(bad)).status, 400);
  assert.equal(app.records.size, 0);
});

test("normalizes supported Taiwan mobile phone formats", () => {
  assert.equal(validateConsultation({ ...payload, contact: "+886 900-000-000" })?.contact, "0900000000");
  assert.equal(validateConsultation({ ...payload, contact: "0900-000-000" })?.contact, "0900000000");
  assert.equal(validateConsultation({ ...payload, contact: "0900<script>000000" }), null);
});

test("Discord requires a message acknowledgment and disables mentions", async () => {
  const mock = (async (url: URL | RequestInfo, options?: RequestInit) => {
    assert.equal(new URL(String(url)).searchParams.get("wait"), "true");
    assert.deepEqual(JSON.parse(String(options?.body)).allowed_mentions, { parse: [] });
    return Response.json({ id: "test-message" });
  }) as typeof fetch;
  assert.equal(await sendDiscord(record, "https://discord.com/api/webhooks/123/test", mock), "confirmed");
  assert.equal(await sendDiscord(record, "https://discord.com/api/webhooks/123/test", (async () => new Response("", { status: 500 })) as typeof fetch), "failed");
  assert.equal(await sendDiscord(record, undefined, mock), "not_configured");
});

test("spreadsheet rejects HTTP 200 error pages and escapes formula input", async () => {
  const url = "https://script.google.com/macros/s/test/exec";
  assert.equal(await sendSpreadsheet(record, url, (async () => new Response("<html>Login</html>")) as typeof fetch), "unconfirmed");
  assert.equal(await sendSpreadsheet(record, url, (async () => Response.json({ result: "success" })) as typeof fetch), "confirmed");
  assert.equal(spreadsheetValue("=IMPORTXML('example')"), "'=IMPORTXML('example')");
  assert.equal(spreadsheetValue("一般姓名"), "一般姓名");
});

test("JSON-LD matches current visible car data and escapes script termination", () => {
  const schema = JSON.parse(serializeJsonLd(siteSchema));
  const items = schema["@graph"][1].itemListElement;
  assert.deepEqual(items.map((row: { item: { name: string } }) => row.item.name), cars.map((car) => car.name));
  assert.equal(items[1].item.offers.price, 730000);
  assert.equal(JSON.stringify(schema).includes("InStock"), false);
  assert.equal(JSON.stringify(schema).includes("TollFree"), false);
  const serialized = serializeJsonLd({ text: "</script><script>alert(1)</script>" });
  assert.equal(serialized.includes("<"), false);
  assert.equal(JSON.parse(serialized).text, "</script><script>alert(1)</script>");
});
