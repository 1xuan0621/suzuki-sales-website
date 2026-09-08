import { test, expect } from "@playwright/test";
import { guideRedirects } from "../../src/data/guides";
import { carFaqs, generalFaqGroups } from "../../src/data/faq";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/notify", (route) => route.fulfill({ status: 503, json: { ok: false, error: "本機測試：暫時無法收件" } }));
});

test("FAQ filters, text search, empty state and keyboard disclosure work", async ({ page }, testInfo) => {
  await page.goto("/faq");
  await expect(page.locator("main details")).toHaveCount(16);
  await page.getByRole("button", { name: "預算與付款", exact: true }).click();
  await expect(page.getByRole("button", { name: "預算與付款", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("main details")).toHaveCount(3);
  await page.getByRole("searchbox", { name: "想先了解什麼？" }).fill("零利率");
  await expect(page.locator("main details")).toHaveCount(1);
  const summary = page.locator("main details summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#cash-or-loan")).toHaveAttribute("open", "");
  await page.keyboard.press("Space");
  await expect(page.locator("#cash-or-loan")).not.toHaveAttribute("open", "");
  await page.getByRole("searchbox").fill("找不到的問題xyz");
  await expect(page.getByRole("heading", { name: "暫時沒有符合的問題" })).toBeVisible();
  await page.getByRole("button", { name: "查看全部問題", exact: true }).click();
  await expect(page.locator("main details")).toHaveCount(16);
  await page.getByRole("button", { name: "SWIFT 重點問答", exact: true }).click();
  await page.locator("#swift-vs-small-cars summary").click();
  await expect(page.locator("#swift-vs-small-cars table")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("faq-swift-comparison.png"), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole("link", { name: "前往 SWIFT 車型頁看完整問答" }).first().click();
  await expect(page).toHaveURL(/\/cars\/swift#swift-vs-small-cars$/);
  await expect(page.locator("#swift-vs-small-cars")).toHaveAttribute("open", "");
});

test("old guide URLs redirect permanently and open the right car answer", async ({ page, request }, testInfo) => {
  for (const redirect of guideRedirects) {
    const response = await request.get(redirect.source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(redirect.destination);
    await page.goto(redirect.source);
    expect(new URL(page.url()).pathname + new URL(page.url()).hash).toBe(redirect.destination);
    const hash = redirect.destination.split("#")[1];
    if (hash) {
      await expect(page.locator(`#${hash}`)).toHaveAttribute("open", "");
      await expect(page.locator(`#${hash} p`).first()).toBeVisible();
      await page.screenshot({ path: testInfo.outputPath(`${hash}.png`) });
    }
  }
});

test("guides link to readable answers and all FAQ content is present without JavaScript", async ({ page, request }) => {
  const bodyOnly = (html: string) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const hub = bodyOnly(await (await request.get("/faq")).text());
  for (const item of generalFaqGroups.flatMap((group) => group.items)) {
    expect(hub).toContain(item.answer);
  }
  for (const [carId, items] of Object.entries(carFaqs)) {
    const html = bodyOnly(await (await request.get(`/cars/${carId}`)).text());
    for (const item of items) expect(html).toContain(item.answer);
  }
  await page.goto("/guides/delivery-process");
  await page.getByRole("navigation", { name: "本文目錄" }).getByRole("link").nth(2).click();
  await expect(page).toHaveURL(/#step-3$/);
  await expect(page.locator("#step-3 h2")).toBeVisible();
  await page.getByRole("link", { name: "要先付尾款還是先驗車？領牌前能看車嗎？ →", exact: true }).click();
  await expect(page.locator("#payment-inspection")).toHaveAttribute("open", "");
  await expect(page.locator("#payment-inspection p").first()).toBeVisible();
});
