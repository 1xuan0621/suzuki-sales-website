import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/notify", (route) => route.fulfill({ status: 503, json: { ok: false, error: "本機測試：暫時無法收件" } }));
});

test("FAQ filters, text search, empty state and keyboard disclosure work", async ({ page }) => {
  await page.goto("/faq");
  await expect(page.locator("main details")).toHaveCount(26);
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
  await expect(page.locator("main details")).toHaveCount(26);
  await page.getByRole("button", { name: "保養與日常檢查", exact: true }).click();
  await page.getByRole("searchbox").fill("胎壓");
  await expect(page.locator("main details")).toHaveCount(1);
  await page.locator("#tire-pressure summary").click();
  await page.getByRole("link", { name: "查看日常檢查與紀錄清單" }).click();
  await expect(page).toHaveURL(/\/guides\/car-maintenance#daily-checks$/);
  await expect(page.locator("#daily-checks")).toBeInViewport();
});

test("guide entrance reaches the article and returns to contact links", async ({ page }) => {
  await page.goto("/");
  await page.locator("#guides").getByRole("link").click();
  await expect(page).toHaveURL(/\/guides$/);
  await page.locator('a[href="/guides/first-car"]').click();
  await expect(page).toHaveURL(/\/guides\/first-car$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const returnLink = page.getByRole("link", { name: "返回聯絡區，找鈺漣聊聊 ↑", exact: true });
  await returnLink.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#guide-contact")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "LINE 諮詢", exact: true })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const slug of ["suv-selection", "powertrain-choice", "car-maintenance"]) {
    await page.goto("/guides");
    await page.locator(`a[href="/guides/${slug}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/guides/${slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "指南閱讀重點" }).getByRole("link")).toHaveCount(5);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.getByRole("navigation", { name: "指南閱讀重點" }).getByRole("link", { name: /看懂保養工單/ }).click();
  await page.getByRole("link", { name: "保養加項可以怎麼問？" }).click();
  await expect(page).toHaveURL(/\/faq#maintenance-extras$/);
  await expect(page.locator("#maintenance-extras")).toHaveAttribute("open", "");
});
