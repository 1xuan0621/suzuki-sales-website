import assert from "node:assert/strict";
import test from "node:test";
import { isPromotionActive, octoberCampaign } from "../src/data/promotions.ts";

test("campaign boundaries follow Taiwan time, with an exclusive end", () => {
  const cases = [
    ["2026-09-30T15:59:59.999Z", false],
    ["2026-09-30T16:00:00.000Z", true],
    ["2026-10-30T15:59:59.999Z", true],
    ["2026-10-30T16:00:00.000Z", false],
    ["2026-11-08T00:00:00.000Z", false],
  ];
  for (const [instant, active] of cases) {
    assert.equal(isPromotionActive(octoberCampaign, Date.parse(instant)), active, instant);
  }
});

test("invalid dates fail closed instead of showing an offer", () => {
  assert.equal(isPromotionActive({ ...octoberCampaign, endsAt: "invalid" }, Date.now()), false);
  assert.equal(isPromotionActive(octoberCampaign, NaN), false);
});
