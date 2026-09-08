import { test, expect, type Page, type Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/notify", (route) => route.fulfill({ status: 503, json: { ok: false, error: "本機測試：暫時無法收件" } }));
  await page.goto("/");
});

const swiftCard = (page: Page) => page.getByRole("button", { name: /^SWIFT 靈活小車/ });

async function expectFocusInside(page: Page, dialog: Locator, times = 12) {
  for (const key of ["Tab", "Shift+Tab"]) {
    for (let i = 0; i < times; i++) {
      await page.keyboard.press(key);
      await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    }
  }
}

test("nested photo and car dialogs trap focus, dismiss one layer and restore their openers", async ({ page }, testInfo) => {
  await swiftCard(page).focus();
  await page.keyboard.press("Enter");
  const car = page.getByRole("dialog", { name: "SWIFT 詳細資訊", exact: true });
  await expect(car.getByRole("button", { name: "關閉", exact: true })).toBeFocused();
  await expectFocusInside(page, car);
  const enlarge = car.getByRole("button", { name: /^放大 SWIFT/ });
  await enlarge.focus();
  await page.keyboard.press("Enter");
  const viewer = page.getByRole("dialog", { name: "SWIFT 照片檢視器" });
  await expect(viewer.getByRole("button", { name: "關閉放大照片" })).toBeFocused();
  await expectFocusInside(page, viewer, 6);
  await page.keyboard.press("ArrowRight");
  await expect(viewer.getByText("後側行駛外觀 · 2 / 3")).toBeVisible();
  const photo = viewer.getByRole("img", { name: "SWIFT 後側行駛外觀" });
  await expect.poll(() => photo.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await viewer.screenshot({ path: testInfo.outputPath("swift-gallery.png") });
  await page.keyboard.press("Escape");
  await expect(viewer).toHaveCount(0);
  await expect(enlarge).toBeFocused();
  await car.screenshot({ path: testInfo.outputPath("car-dialog.png") });
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(car).toHaveCount(0);
  await expect(swiftCard(page)).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("comparison dialog supports keyboard scrolling, Tab wrapping and returning to comparison", async ({ page }) => {
  await page.getByRole("button", { name: "+ 加入比較", exact: true }).nth(1).click();
  const compare = page.getByRole("button", { name: "比較", exact: true });
  await compare.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "車款比較", exact: true });
  await expect(dialog.getByRole("button", { name: "關閉", exact: true }).first()).toBeFocused();
  await expectFocusInside(page, dialog, 5);
  await dialog.getByRole("region").focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(compare).toBeFocused();
});

test("interest leads to the selected consultation; calculator remains a separate action", async ({ page }) => {
  await page.getByLabel("姓名", { exact: true }).fill("本機保留輸入測試");
  await swiftCard(page).click();
  await page.getByRole("button", { name: "我有興趣", exact: true }).click();
  await expect(page.locator("#contact-heading")).toBeFocused();
  await expect(page.getByRole("combobox", { name: "想了解車款", exact: true })).toHaveValue("SWIFT");
  await expect(page.getByLabel("姓名", { exact: true })).toHaveValue("本機保留輸入測試");
  await expect.poll(() => page.locator("#contact").evaluate((element) => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(4);
  await page.getByRole("button", { name: /^Jimny 2026 硬派越野/ }).click();
  await page.getByRole("button", { name: "試算月付", exact: true }).click();
  await expect(page.getByRole("heading", { name: "試算月付金額，輕鬆購車" })).toBeFocused();
  await expect(page.getByLabel("選擇車款（自動帶入價格）")).toHaveValue("jimny");
  await expect(page.getByLabel("車價（元）")).toHaveValue("849000");
  // Re-selecting the same card must replace a manually changed calculator car.
  await page.getByLabel("選擇車款（自動帶入價格）").selectOption("carry");
  await page.getByRole("button", { name: /^Jimny 2026 硬派越野/ }).click();
  await page.getByRole("button", { name: "試算月付", exact: true }).click();
  await expect(page.getByLabel("選擇車款（自動帶入價格）")).toHaveValue("jimny");
  await expect(page.getByRole("combobox", { name: "想了解車款", exact: true })).toHaveValue("SWIFT");
});

test("loan rate starts at 3%, supports decimal entry and clamps both controls", async ({ page }, testInfo) => {
  const rate = page.getByRole("spinbutton", { name: "年利率（百分比）" });
  const slider = page.getByRole("slider", { name: "調整年利率" });
  await expect(rate).toHaveValue("3");
  await expect(slider).toHaveAttribute("min", "3");
  await expect(page.getByText("11,500", { exact: true })).toBeVisible();
  await rate.fill("3.19");
  await rate.press("Tab");
  await expect(rate).toHaveValue("3.19");
  await page.getByRole("button", { name: "84 期", exact: true }).click();
  await expect(page.getByText("8,511", { exact: true })).toBeVisible();
  await rate.fill("2");
  await rate.press("Tab");
  await expect(rate).toHaveValue("3");
  await rate.fill("9");
  await rate.press("Tab");
  await expect(rate).toHaveValue("8");
  await rate.fill("");
  await rate.press("Tab");
  await expect(rate).toHaveValue("3");
  await slider.focus();
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowLeft");
  await expect(slider).toHaveValue("3");
  await expect(page.getByRole("complementary", { name: "試算說明" }).getByRole("listitem")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "Suzuki 北投所", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator("#loan-calculator").screenshot({ path: testInfo.outputPath("calculator.png") });
});
