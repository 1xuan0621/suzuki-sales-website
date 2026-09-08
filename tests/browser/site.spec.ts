import { test, expect, type Page, type Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-09-08T04:00:00+08:00"));
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

test("interest leads to consultation; the homepage calculator remains available", async ({ page }) => {
  await page.getByLabel("姓名", { exact: true }).fill("本機保留輸入測試");
  await swiftCard(page).click();
  await page.getByRole("button", { name: "我有興趣", exact: true }).click();
  await expect(page.locator("#contact-heading")).toBeFocused();
  await expect(page.getByRole("combobox", { name: "想了解車款", exact: true })).toHaveValue("SWIFT");
  await expect(page.getByLabel("姓名", { exact: true })).toHaveValue("本機保留輸入測試");
  await expect.poll(() => page.locator("#contact").evaluate((element) => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(4);
  await page.getByRole("button", { name: /^Jimny 2026 硬派越野/ }).click();
  await expect(page.getByRole("button", { name: "試算月付", exact: true })).toHaveCount(0);
  await page.keyboard.press("Escape");
  await page.locator('a[href="#loan-calculator"]').click();
  await expect(page.getByRole("heading", { name: "試算月付金額，輕鬆購車" })).toBeInViewport();
  await page.getByLabel("選擇車款（自動帶入價格）").selectOption("jimny");
  await expect(page.getByLabel("選擇車款（自動帶入價格）")).toHaveValue("jimny");
  await expect(page.getByLabel("車價（元）")).toHaveValue("849000");
  await page.getByLabel("選擇車款（自動帶入價格）").selectOption("carry");
  await expect(page.getByLabel("車價（元）")).toHaveValue("499000");
  await expect(page.getByRole("combobox", { name: "想了解車款", exact: true })).toHaveValue("SWIFT");
});

test("all car dialogs have a single-line title, scrollable colors and keyboard-accessible details", async ({ page }, testInfo) => {
  for (const name of ["e VITARA", "SWIFT", "Jimny 2026", "VITARA", "S-CROSS", "CARRY"]) {
    await page.locator('#cars button[aria-haspopup="dialog"]').filter({ has: page.getByRole("heading", { name, exact: true }) }).click();
    const dialog = page.getByRole("dialog", { name: `${name} 詳細資訊`, exact: true });
    await expect(dialog.getByRole("button", { name: "試算月付", exact: true })).toHaveCount(0);
    const header = dialog.getByRole("heading", { name, exact: true }).locator("..");
    expect(await header.evaluate((element) => element.getBoundingClientRect().height)).toBe(48);
    const colors = dialog.getByRole("region", { name: "車色參考，可左右滑動" });
    expect(await colors.evaluate((element) => new Set(Array.from(element.children).map((child) => child.getBoundingClientRect().top)).size)).toBe(1);
    await colors.focus();
    await colors.press("End");
    await expect.poll(() => colors.evaluate((element) => Math.abs(element.scrollLeft - (element.scrollWidth - element.clientWidth)))).toBeLessThan(2);
    await colors.press("Home");
    await expect.poll(() => colors.evaluate((element) => element.scrollLeft)).toBe(0);
    const sources = dialog.locator("summary").filter({ hasText: "圖片與規格說明" });
    const terms = dialog.locator("summary").filter({ hasText: "優惠條件" });
    await expect(sources.locator("..")).not.toHaveAttribute("open", "");
    await expect(terms.locator("..")).not.toHaveAttribute("open", "");
    await sources.focus();
    await page.keyboard.press("Enter");
    await expect(dialog.getByRole("link", { name: "官方規配表（PDF）" })).toBeVisible();
    await terms.focus();
    await page.keyboard.press("Space");
    await expect(dialog.getByRole("link", { name: "官方活動辦法" })).toBeVisible();
    await expectFocusInside(page, dialog, 14);
    await sources.click();
    await terms.click();
    await dialog.locator(".overflow-y-auto").evaluate((element) => { element.scrollTop = 0; });
    expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    if (name === "VITARA") {
      await expect(dialog.getByText("90 萬 84 期・年利率 3.50%（須審核）。", { exact: true })).toHaveCount(1);
      await dialog.screenshot({ path: testInfo.outputPath("compact-vitara.png") });
    }
    await page.keyboard.press("Escape");
  }
});

test("color row supports horizontal scrolling without moving the page", async ({ page, isMobile }) => {
  await page.getByRole("button", { name: /^e VITARA/ }).click();
  const colors = page.getByRole("region", { name: "車色參考，可左右滑動" });
  await colors.scrollIntoViewIfNeeded();
  const box = (await colors.boundingBox())!;
  if (isMobile) {
    const session = await page.context().newCDPSession(page);
    const y = box.y + box.height / 2;
    const start = box.x + box.width - 10;
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: start, y }] });
    for (let step = 1; step <= 5; step++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: start - step * 25, y }] });
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await session.detach();
  } else {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(200, 0);
  }
  await expect.poll(() => colors.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
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
