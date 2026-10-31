import assert from "node:assert/strict";
import test from "node:test";
import { isPromotionActive, novemberCampaign, swiftNovemberCampaign } from "../src/data/promotions.ts";

test("campaign boundaries follow Taiwan time, with an exclusive end", () => {
  const campaigns = [
    [novemberCampaign, "2026-10-30T15:59:59.999Z", "2026-10-30T16:00:00.000Z"],
    [swiftNovemberCampaign, "2026-10-29T15:59:59.999Z", "2026-10-29T16:00:00.000Z"],
  ];
  for (const [campaign, beforeStart, start] of campaigns) {
    const cases = [
      [beforeStart, false],
      [start, true],
      ["2026-11-30T15:59:59.999Z", true],
      ["2026-11-30T16:00:00.000Z", false],
      ["2026-12-08T00:00:00.000Z", false],
    ];
    for (const [instant, active] of cases) {
      assert.equal(isPromotionActive(campaign, Date.parse(instant)), active, `${campaign.sourceUrl}: ${instant}`);
    }
  }
});

test("invalid dates fail closed instead of showing an offer", () => {
  assert.equal(isPromotionActive({ ...novemberCampaign, endsAt: "invalid" }, Date.now()), false);
  assert.equal(isPromotionActive(novemberCampaign, NaN), false);
});
