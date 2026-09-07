import assert from "node:assert/strict";
import test from "node:test";
import { isPromotionActive, septemberCampaign } from "../src/data/promotions.ts";

test("campaign boundaries follow Taiwan time, with an exclusive end", () => {
  const cases = [
    ["2026-08-31T15:59:59.999Z", false],
    ["2026-08-31T16:00:00.000Z", true],
    ["2026-09-30T15:59:59.999Z", true],
    ["2026-09-30T16:00:00.000Z", false],
    ["2026-10-08T00:00:00.000Z", false],
  ];
  for (const [instant, active] of cases) {
    assert.equal(isPromotionActive(septemberCampaign, Date.parse(instant)), active, instant);
  }
});

test("invalid dates fail closed instead of showing an offer", () => {
  assert.equal(isPromotionActive({ ...septemberCampaign, endsAt: "invalid" }, Date.now()), false);
  assert.equal(isPromotionActive(septemberCampaign, NaN), false);
});
