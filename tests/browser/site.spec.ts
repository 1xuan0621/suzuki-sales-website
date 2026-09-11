import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-09-08T04:00:00+08:00"));
  await page.route("**/api/notify", (route) => route.fulfill({ status: 503, json: { ok: false, error: "本機測試：暫時無法收件" } }));
  await page.goto("/");
});

const swiftCard = (page: Page) => page.getByRole("button", { name: /^SWIFT 靈活小車/ });

test("nested photo and car dialogs open, dismiss one layer and restore their openers", async ({ page }) => {
  await swiftCard(page).focus();
  await page.keyboard.press("Enter");
  const car = page.getByRole("dialog", { name: "SWIFT 詳細資訊", exact: true });
  await expect(car.getByRole("button", { name: "關閉", exact: true })).toBeFocused();
  const enlarge = car.getByRole("button", { name: /^放大 SWIFT/ });
  await enlarge.focus();
  await page.keyboard.press("Enter");
  const viewer = page.getByRole("dialog", { name: "SWIFT 照片檢視器" });
  await expect(viewer.getByRole("button", { name: "關閉放大照片" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.getByText("後側行駛外觀 · 2 / 3")).toBeVisible();
  const photo = viewer.getByRole("img", { name: "SWIFT 後側行駛外觀" });
  await expect.poll(() => photo.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(viewer).toHaveCount(0);
  await expect(enlarge).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(car).toHaveCount(0);
  await expect(swiftCard(page)).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("loan calculator updates payments and rejects negative prices", async ({ page }) => {
  await page.locator('a[href="#loan-calculator"]').click();
  const calculator = page.locator("#loan-calculator");
  await expect(calculator).toBeInViewport();
  const price = page.getByRole("spinbutton", { name: "車價（元）", exact: true });
  await price.fill("800000");
  await expect(calculator.getByText("11,500", { exact: true })).toBeVisible();
  const rate = page.getByRole("spinbutton", { name: "年利率（百分比）" });
  await rate.fill("3.19");
  await rate.press("Tab");
  await page.getByRole("button", { name: "84 期", exact: true }).click();
  await expect(calculator.getByText("8,511", { exact: true })).toBeVisible();
  await price.fill("-800000");
  await expect(price).toHaveValue("0");
  await expect(calculator.getByText("0 元", { exact: true })).toHaveCount(2);
});
